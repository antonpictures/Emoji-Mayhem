import React from 'react';
import { Level } from '../types';
import { soundManager } from './SoundManager';

interface LevelSelectScreenProps {
  levels: Level[];
  onLevelSelect: (level: Level) => void;
  onQuit: () => void;
  onStartEditor: () => void;
}

const HIGHSCORES = [
    { name: 'ZenMaster', emoji: '🧘' },
    { name: 'Sparky', emoji: '⚡' },
    { name: 'Drago', emoji: '🐉' },
    { name: 'PixelPro', emoji: '👾' },
    { name: 'Comet', emoji: '☄️' },
    { name: 'Blaze', emoji: '🔥' },
    { name: 'Aqua', emoji: '💧' },
    { name: 'Raptor', emoji: '🦖' },
    { name: 'Slicer', emoji: '🍉' },
    { name: 'Frosty', emoji: '🥶' },
    { name: 'CaptJack', emoji: '🏴‍☠️' },
    { name: 'Bloom', emoji: '🌸' },
    { name: 'MVP', emoji: '🏆' },
    { name: 'RacerX', emoji: '🏎️' },
    { name: 'LOLer', emoji: '😂' },
    { name: 'Stormy', emoji: '🌪️' },
    { name: 'Maestro', emoji: '🎶' },
    { name: 'Spooky', emoji: '👻' },
    { name: 'OldMac', emoji: '👨‍🌾' },
    { name: 'TheKing', emoji: '👑' },
];

const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({ levels, onLevelSelect, onQuit, onStartEditor }) => {
  
  const handleLevelClick = (level: Level) => {
    soundManager.initialize();
    soundManager.playClick();
    onLevelSelect(level);
  };

  const handleEditorClick = () => {
    soundManager.initialize();
    soundManager.playClick();
    onStartEditor();
  };

  const handleQuitClick = () => {
    soundManager.initialize();
    soundManager.playClick();
    onQuit();
  };
  
  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 p-4">
      <div className="text-center p-6 md:p-10 bg-gray-800 rounded-lg shadow-xl border-2 border-blue-500 max-w-4xl w-full">
        <h1 className="text-3xl md:text-5xl font-press-start text-yellow-400 mb-2 tracking-tighter">EMOJI MAYHEM</h1>
        <h2 className="text-xl md:text-2xl font-press-start text-blue-400 mb-8">SELECT LEVEL</h2>
        <div className="grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-6 mb-8 max-h-[60vh] overflow-y-auto pr-2">
          {levels.map((level, index) => {
            const highscore = HIGHSCORES[index % HIGHSCORES.length];
            return (
              <button
                key={level.id}
                onClick={() => handleLevelClick(level)}
                className="p-2 font-press-start text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-all duration-200 transform hover:scale-105 aspect-square flex flex-col justify-between items-center"
              >
                <div className="flex-grow flex flex-col justify-center items-center">
                    <span className="block text-xl md:text-3xl">{level.id}</span>
                    <span className="block text-[8px] md:text-xs mt-2 text-center leading-tight">{level.name}</span>
                </div>
                <div className="w-full text-center text-[10px] text-yellow-300 opacity-75 truncate pt-1 border-t border-blue-500/50">
                    <span className="font-sans">{highscore.emoji}</span> {highscore.name}
                </div>
              </button>
            );
          })}
        </div>
         <div className="flex space-x-4 justify-center">
            <button
              onClick={handleEditorClick}
              className="px-8 py-3 font-press-start text-lg bg-green-600 hover:bg-green-500 text-white rounded-md transition-all duration-200"
            >
              LEVEL EDITOR
            </button>
            <button
                onClick={handleQuitClick}
                className="px-8 py-3 font-press-start text-lg bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-all duration-200"
            >
                QUIT
            </button>
         </div>
      </div>
    </div>
  );
};

export default LevelSelectScreen;