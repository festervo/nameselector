import React from 'react';

interface DomainResultProps {
  name: string;
  isAvailable: boolean;
  onReset: () => void;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Confetti: React.FC = () => {
  const confettiPieces = Array.from({ length: 100 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
      backgroundColor: ['#38bdf8', '#a78bfa', '#f472b6', '#4ade80'][Math.floor(Math.random() * 4)],
    };
    return <i key={i} className="absolute top-[-10px] w-2 h-4 rounded-full opacity-0 animate-confetti-fall" style={style}></i>;
  });

  return <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">{confettiPieces}</div>;
};

export const DomainResult: React.FC<DomainResultProps> = ({ name, isAvailable, onReset }) => {
  const domainName = `${name.toLowerCase()}.com`;
  const goDaddyUrl = `https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${domainName}`;
  
  return (
    <div className={`relative w-full max-w-md text-center bg-slate-800 p-8 rounded-2xl shadow-2xl overflow-hidden
        ${isAvailable ? 'animate-pulseGlowGreen' : 'animate-pulseGlowRed'}`}
    >
      {isAvailable && <Confetti />}
      <div className="relative z-10">
        {isAvailable ? (
          <div className="flex flex-col items-center space-y-6">
            <CheckIcon className="h-20 w-20 text-green-400" />
            <h2 className="text-3xl font-bold text-green-300">Success! It's Yours!</h2>
            <p className="text-xl font-mono p-3 bg-slate-900 rounded-lg text-white break-all">{domainName}</p>
            <p className="text-slate-300">Your next big thing is one click away. Register it before someone else does!</p>
            <a
              href={goDaddyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4 bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition-colors transform hover:scale-105 inline-block"
            >
              Register on GoDaddy.com
            </a>
            <button
              onClick={onReset}
              className="w-full mt-2 text-slate-400 hover:text-white transition-colors"
            >
              Try Another Name
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <XCircleIcon className="h-20 w-20 text-red-400" />
            <h2 className="text-3xl font-bold text-red-300">Already Taken</h2>
            <p className="text-xl font-mono p-3 bg-slate-900 rounded-lg text-slate-400 line-through break-all">{domainName}</p>
            <p className="text-slate-300">Don't worry, the perfect name is still out there. Let's try another combination!</p>
            <button
              onClick={onReset}
              className="w-full mt-4 bg-sky-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-sky-600 transition-colors transform hover:scale-105"
            >
              Create a New Name
            </button>
          </div>
        )}
      </div>
    </div>
  );
};