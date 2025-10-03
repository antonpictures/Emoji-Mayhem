import React from 'react';
import { soundManager } from './SoundManager';

interface HUDProps {
  mps: number;
  levelName: string;
  projectiles: number;
  onBackToMenu: () => void;
  onEditLevel: () => void;
  canEdit: boolean;
  onAiFixLevel: () => void;
  isAiFixing: boolean;
}

const HUD: React.FC<HUDProps> = ({ mps, levelName, projectiles, onBackToMenu, onEditLevel, canEdit, onAiFixLevel, isAiFixing }) => {
  const handleBackClick = () => {
    soundManager.initialize();
    soundManager.playClick();
    onBackToMenu();
  };

  const handleEditClick = () => {
    if (!canEdit) return;
    soundManager.initialize();
    soundManager.playClick();
    onEditLevel();
  };

  const handleAiFixClick = () => {
    soundManager.initialize();
    soundManager.playClick();
    onAiFixLevel();
  }

  return (
    <div className="absolute top-0 left-0 right-0 p-2 sm:p-4 flex justify-between items-start text-white z-20 pointer-events-none font-sans">
      <div className="font-black text-base sm:text-2xl tracking-tighter">
        <span>$MPS: </span>
        <span className="text-yellow-400">{mps}</span>
      </div>
      <div className="text-center">
        <div className="font-black text-lg sm:text-2xl mb-2 tracking-tight">{levelName}</div>
        <div className="flex space-x-2">
            <button
            onClick={handleBackClick}
            className="px-4 py-2 font-bold text-xs bg-red-600 hover:bg-red-500 text-white rounded-md transition-all duration-200 pointer-events-auto shadow-lg border-2 border-red-800"
            >
                CHANGE LEVEL
            </button>
            <button
                onClick={handleAiFixClick}
                disabled={isAiFixing}
                className="px-4 py-2 font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-all duration-200 pointer-events-auto shadow-lg border-2 border-purple-800 disabled:bg-gray-500 disabled:border-gray-700 disabled:cursor-wait"
            >
                {isAiFixing ? 'GENERATING...' : 'AI FIX LEVEL'}
            </button>
            <div className="relative group">
                <button
                    onClick={handleEditClick}
                    disabled={!canEdit}
                    className="px-4 py-2 font-bold text-xs bg-green-600 hover:bg-green-500 text-white rounded-md transition-all duration-200 pointer-events-auto shadow-lg border-2 border-green-800 disabled:bg-gray-500 disabled:border-gray-700 disabled:cursor-not-allowed"
                >
                    EDIT LEVEL
                </button>
                {!canEdit && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Only custom levels can be edited.
                    </div>
                )}
            </div>
        </div>
      </div>
      <div className="font-black text-base sm:text-2xl tracking-tighter flex items-center">
        <span>LEFT: </span>
        <span className="text-yellow-300 ml-2">{projectiles}</span>
      </div>
    </div>
  );
};

export default HUD;