import React from 'react';
import { soundManager } from '../components/SoundManager';
import { User, Chapter } from '../types';
import { CHAPTERS } from '../components/chapter-data';

interface ChapterSelectScreenProps {
  onSelectChapter: (chapter: Chapter) => void;
  onBackToTitle: () => void;
}

const ChapterSelectScreen: React.FC<ChapterSelectScreenProps> = ({ onSelectChapter, onBackToTitle }) => {
  const handleAction = (action: () => void) => {
    soundManager.initialize();
    soundManager.playClick();
    action();
  };
  
  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 font-sans p-4">
      <div className="text-center p-6 md:p-10 bg-gray-800 rounded-lg shadow-xl border-2 border-yellow-500 max-w-4xl w-full">
        <h1 className="text-4xl md:text-5xl font-black text-yellow-400 mb-6 tracking-tighter">
          Select a Chapter
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {CHAPTERS.map(chapter => (
                <button
                    key={chapter.id}
                    onClick={() => handleAction(() => onSelectChapter(chapter))}
                    className="group relative aspect-video bg-gray-700 hover:bg-gray-600 border-2 border-gray-600 hover:border-yellow-400 rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    <div className="text-6xl mb-2 transition-transform duration-300 group-hover:scale-110">
                        {chapter.emoji}
                    </div>
                    <div className="text-white text-sm md:text-base font-bold tracking-wide">
                        {chapter.name}
                    </div>
                </button>
            ))}
        </div>

        <button
          onClick={() => handleAction(onBackToTitle)}
          className="mt-8 px-8 py-2 self-center font-bold text-md bg-red-600 hover:bg-red-500 text-white rounded-md transition-all duration-200"
        >
          BACK TO MAIN MENU
        </button>
      </div>
    </div>
  );
};

export default ChapterSelectScreen;