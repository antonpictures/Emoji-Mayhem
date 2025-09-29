import React from 'react';
import { Level } from '../types';
import { soundManager } from './SoundManager';

interface LevelSelectScreenProps {
  levels: Level[];
  onLevelSelect: (level: Level) => void;
  onQuit: () => void;
  onStartEditor: () => void;
  onEditLevel: (level: Level) => void;
  onDeleteLevel: (levelId: number) => void;
}

const HIGHSCORES = [
    { name: 'ZenMaster', emoji: '🧘' }, { name: 'Sparky', emoji: '⚡' }, { name: 'Drago', emoji: '🐉' },
    { name: 'PixelPro', emoji: '👾' }, { name: 'Comet', emoji: '☄️' }, { name: 'Blaze', emoji: '🔥' },
    { name: 'Aqua', emoji: '💧' }, { name: 'Raptor', emoji: '🦖' }, { name: 'Slicer', emoji: '🍉' },
    { name: 'Frosty', emoji: '🥶' }, { name: 'CaptJack', emoji: '🏴‍☠️' }, { name: 'Bloom', emoji: '🌸' },
    { name: 'MVP', emoji: '🏆' }, { name: 'RacerX', emoji: '🏎️' }, { name: 'LOLer', emoji: '😂' },
    { name: 'Stormy', emoji: '🌪️' }, { name: 'Maestro', emoji: '🎶' }, { name: 'Spooky', emoji: '👻' },
    { name: 'OldMac', emoji: '👨‍🌾' }, { name: 'TheKing', emoji: '👑' },
];

const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({ levels, onLevelSelect, onQuit, onStartEditor, onEditLevel, onDeleteLevel }) => {
  
  const campaignLevels = levels.filter(l => !l.isCustom).sort((a,b) => a.id - b.id);
  const customLevels = levels.filter(l => l.isCustom).sort((a,b) => a.id - b.id);

  const handleAction = (action: () => void) => {
    soundManager.initialize();
    soundManager.playClick();
    action();
  };
  
  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 p-4 font-sans">
      <div className="text-center p-6 md:p-10 bg-gray-800 rounded-lg shadow-xl border-2 border-blue-500 max-w-6xl w-full h-[90vh] flex flex-col">
        <h1 className="text-4xl md:text-6xl font-black text-yellow-400 mb-2 tracking-tighter">EMOJI MAYHEM</h1>
        <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl md:text-3xl font-black text-blue-400 mb-6 tracking-tight">CAMPAIGN LEVELS</h2>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
                  {campaignLevels.map((level, index) => {
                    const highscore = HIGHSCORES[index % HIGHSCORES.length];
                    return (
                      <button key={level.id} onClick={() => handleAction(() => onLevelSelect(level))} className="p-2 font-bold text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-all duration-200 transform hover:scale-105 aspect-square flex flex-col justify-between items-center shadow-lg">
                        <div className="flex-grow flex flex-col justify-center items-center">
                            <span className="block text-xl md:text-4xl font-black">{level.id}</span>
                            <span className="block text-[8px] md:text-xs mt-2 text-center leading-tight font-semibold">{level.name}</span>
                        </div>
                        <div className="w-full text-center text-[10px] text-yellow-300 opacity-75 truncate pt-1 border-t border-blue-500/50">
                            <span className="font-sans">{highscore.emoji}</span> {highscore.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-black text-green-400 mb-6 tracking-tight">MY LEVELS</h2>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
                  {customLevels.map((level) => (
                      <div key={level.id} className="group relative aspect-square">
                        <button onClick={() => handleAction(() => onLevelSelect(level))} className="w-full h-full p-2 font-bold text-lg bg-green-700 hover:bg-green-600 text-white rounded-md transition-all duration-200 flex flex-col justify-center items-center shadow-lg">
                            <span className="block text-[8px] md:text-xs text-center leading-tight">{level.name}</span>
                        </button>
                        <div className="absolute -top-2 -right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleAction(() => onEditLevel(level))} className="w-6 h-6 text-xs bg-blue-500 rounded-full shadow-md">✏️</button>
                            <button onClick={() => { if(confirm('Delete this level?')) handleAction(() => onDeleteLevel(level.id)) }} className="w-6 h-6 text-xs bg-red-500 rounded-full shadow-md">🗑️</button>
                        </div>
                      </div>
                  ))}
                  <button onClick={() => handleAction(onStartEditor)} className="p-2 font-bold text-lg bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-all duration-200 transform hover:scale-105 aspect-square flex flex-col justify-center items-center shadow-lg">
                    <span className="block text-4xl font-light">+</span>
                    <span className="block text-xs mt-1 font-semibold">NEW</span>
                  </button>
                </div>
            </div>
        </div>
         <div className="mt-8 flex justify-center">
            <button onClick={() => handleAction(onQuit)} className="px-8 py-3 font-bold text-lg bg-red-600 hover:bg-red-500 text-white rounded-md transition-all duration-200 shadow-lg">
                QUIT GAME
            </button>
         </div>
      </div>
    </div>
  );
};

export default LevelSelectScreen;