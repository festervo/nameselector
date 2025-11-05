import React, { useState, useEffect } from 'react';
import { AppStep, Emoji } from './types';
import { EmojiSelector } from './components/EmojiSelector';
import { LoadingSpinner } from './components/LoadingSpinner';
import { DomainResult } from './components/DomainResult';
import { generateCompanyName } from './services/geminiService';
import { EMOJIS } from './constants';

const EMOJI_GRID_SIZE = 20;

// Helper to shuffle an array and return a new one
const shuffleArray = (array: Emoji[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('selection');
  const [selectedEmojis, setSelectedEmojis] = useState<Emoji[]>([]);
  const [companyName, setCompanyName] = useState<string>('');
  const [isDomainAvailable, setIsDomainAvailable] = useState<boolean>(false);
  const [displayedEmojis, setDisplayedEmojis] = useState<Emoji[]>([]);

  const loadNewEmojis = () => {
    setDisplayedEmojis(shuffleArray(EMOJIS).slice(0, EMOJI_GRID_SIZE));
  };

  // Load initial set of emojis on mount
  useEffect(() => {
    loadNewEmojis();
  }, []);

  // Mock domain check
  const checkDomainAvailability = (name: string): Promise<boolean> => {
    console.log(`Checking availability for ${name.toLowerCase()}.com...`);
    return new Promise(resolve => {
      setTimeout(() => {
        // 50% chance of being available for demo purposes
        const available = Math.random() > 0.5;
        resolve(available);
      }, 2000);
    });
  };

  const handleGenerateAndCheck = async (emoji1: Emoji, emoji2: Emoji) => {
    setSelectedEmojis([emoji1, emoji2]);
    setStep('generating');
    try {
      // 1. Generate name
      const name = await generateCompanyName(emoji1.name, emoji2.name);
      setCompanyName(name);
      
      // 2. Transition to checking UI while showing the new name
      setStep('checking_domain');
      
      // 3. Check domain availability
      const available = await checkDomainAvailability(name);
      setIsDomainAvailable(available);
      
      // 4. Show final result
      setStep('domain_result');
    } catch (error) {
      console.error("Failed to generate and check domain:", error);
      // Reset to selection on error
      handleReset();
    }
  };

  const handleReset = () => {
    setStep('selection');
    setSelectedEmojis([]);
    setCompanyName('');
    setIsDomainAvailable(false);
    loadNewEmojis(); // Also refresh emojis on reset
  };

  const renderStep = () => {
    switch (step) {
      case 'selection':
        return <EmojiSelector emojis={displayedEmojis} onGenerate={handleGenerateAndCheck} onLoadNew={loadNewEmojis} />;
      case 'generating':
        return (
          <LoadingSpinner
            message="Fusing your emojis into a name..."
            emoji1={selectedEmojis[0]?.emoji}
            emoji2={selectedEmojis[1]?.emoji}
          />
        );
      case 'checking_domain':
        return (
          <div className="w-full max-w-md text-center bg-slate-800 p-8 rounded-2xl shadow-2xl animate-fadeInUp">
            <p className="text-slate-300 mb-4">We've named it...</p>
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-fuchsia-400 mb-8 break-all">
              {companyName}
            </h2>
            <div className="flex items-center justify-center space-x-3 text-lg text-sky-200">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-sky-400"></div>
                <span>Checking .com availability...</span>
            </div>
          </div>
        );
      case 'domain_result':
        return (
          <DomainResult
            name={companyName}
            isAvailable={isDomainAvailable}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center p-4 font-sans text-white">
      <main className="w-full flex items-center justify-center">
        {renderStep()}
      </main>
      <footer className="absolute bottom-4 text-center text-slate-500 text-sm">
        <p>Powered by Gemini API. Domain checks are simulated.</p>
      </footer>
    </div>
  );
};

export default App;