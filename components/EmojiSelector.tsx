import React, { useState, useEffect } from 'react';
import { Emoji } from '../types';

interface EmojiSelectorProps {
  emojis: Emoji[];
  onGenerate: (emoji1: Emoji, emoji2: Emoji) => void;
  onLoadNew: () => void;
}

export const EmojiSelector: React.FC<EmojiSelectorProps> = ({ emojis, onGenerate, onLoadNew }) => {
  const [selected, setSelected] = useState<Emoji[]>([]);

  // When the list of available emojis changes, deselect any that are no longer in the list.
  useEffect(() => {
    setSelected(currentSelected =>
      currentSelected.filter(selectedEmoji =>
        emojis.some(availableEmoji => availableEmoji.emoji === selectedEmoji.emoji)
      )
    );
  }, [emojis]);

  const handleSelect = (emoji: Emoji) => {
    if (selected.find(s => s.emoji === emoji.emoji)) {
      setSelected(selected.filter(s => s.emoji !== emoji.emoji));
    } else if (selected.length < 2) {
      setSelected([...selected, emoji]);
    }
  };

  const handleFeelingLucky = () => {
    if (emojis.length < 2) return;

    const index1 = Math.floor(Math.random() * emojis.length);
    let index2;
    do {
      index2 = Math.floor(Math.random() * emojis.length);
    } while (index1 === index2);

    setSelected([emojis[index1], emojis[index2]]);
  };

  const isSelected = (emoji: Emoji) => {
    return selected.find(s => s.emoji === emoji.emoji);
  };

  return (
    <div className="w-full max-w-lg text-center bg-slate-800 p-8 rounded-2xl shadow-2xl">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-fuchsia-400 mb-2">
        Startup Name Fusion
      </h1>
      <p className="text-slate-300 mb-8">Pick two emojis to magically blend into a unique company name.</p>
      
      <div className="grid grid-cols-5 gap-4 mb-6">
        {emojis.map((emoji) => (
          <button
            key={emoji.name}
            onClick={() => handleSelect(emoji)}
            className={`text-4xl p-3 rounded-lg transition-all duration-200 transform
              ${isSelected(emoji) ? 'bg-sky-500 scale-110 ring-2 ring-sky-300' : 'bg-slate-700 hover:bg-slate-600 hover:scale-110'}
            `}
          >
            {emoji.emoji}
          </button>
        ))}
      </div>
      
      <div className="flex flex-col space-y-3">
        <button
          onClick={onLoadNew}
          className="w-full bg-slate-700 text-slate-300 font-bold py-3 px-6 rounded-lg text-lg hover:bg-slate-600 transition-colors transform hover:scale-105"
        >
          Load New Emojis 🎲
        </button>
        <button
          onClick={handleFeelingLucky}
          className="w-full bg-transparent border-2 border-slate-600 text-slate-300 font-bold py-3 px-6 rounded-lg text-lg hover:bg-slate-700 hover:border-slate-500 transition-colors transform hover:scale-105"
        >
          I'm Feeling Lucky ✨
        </button>
        <button
          onClick={() => onGenerate(selected[0], selected[1])}
          disabled={selected.length !== 2}
          className="w-full bg-sky-500 text-white font-bold py-3 px-6 rounded-lg text-lg
            disabled:bg-slate-600 disabled:cursor-not-allowed
            hover:enabled:bg-sky-600 transition-colors transform hover:enabled:scale-105"
        >
          {selected.length === 2 ? `Fuse ${selected[0].emoji} + ${selected[1].emoji}` : 'Pick Two Emojis'}
        </button>
      </div>
    </div>
  );
};