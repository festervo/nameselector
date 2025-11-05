import React from 'react';

interface LoadingSpinnerProps {
  message: string;
  emoji1?: string;
  emoji2?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, emoji1, emoji2 }) => {
  // A simple spinner as a fallback if emojis are not provided for any reason
  if (!emoji1 || !emoji2) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-400"></div>
        <p className="text-lg text-sky-200">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Orbit Path */}
        <div className="absolute inset-0 border-4 border-dashed border-slate-600 rounded-full animate-spin [animation-duration:10s]"></div>
        
        {/* Emoji 1 */}
        <div className="absolute animate-[orbit1_2.5s_infinite_ease-in-out]">
          <div className="text-6xl bg-slate-800 p-2 rounded-full shadow-lg">{emoji1}</div>
        </div>

        {/* Emoji 2 */}
        <div className="absolute animate-[orbit2_2.5s_infinite_ease-in-out]">
          <div className="text-6xl bg-slate-800 p-2 rounded-full shadow-lg">{emoji2}</div>
        </div>
      </div>
      <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-fuchsia-400">{message}</p>
    </div>
  );
};