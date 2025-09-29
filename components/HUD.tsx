import React from 'react';
import { soundManager } from './SoundManager';

interface HUDProps {
  score: number;
  levelName: string;
  projectiles: number;
  onBackToMenu: () => void;
  onEditLevel: () => void;
  canEdit: boolean;
}

const HUD: React.FC<HUDProps> = ({ score, levelName, projectiles, onBackToMenu, onEditLevel, canEdit }) => {
  const handleBackClick = () => {
    soundManager.initialize();
    soundManager.playClick();
    onBackToMenu();
  };

  const handleEditClick = () => {
    soundManager.initialize();
    soundManager.playClick();
    onEditLevel();
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start text-white z-20 pointer-events-none font-sans">
      <div className="font-black text-2xl tracking-tighter">
        <span>SCORE: </span>
        <span className="text-yellow-400">{score.toString().padStart(6, '0')}</span>
      </div>
      <div className="text-center">
        <div className="font-black text-2xl mb-2 tracking-tight">{levelName}</div>
        <div className="flex space-x-2">
            <button
            onClick={handleBackClick}
            className="px-4 py-2 font-bold text-xs bg-red-600 hover:bg-red-500 text-white rounded-md transition-all duration-200 pointer-events-auto shadow-lg border-2 border-red-800"
            >
                CHANGE LEVEL
            </button>
            {canEdit && (
                <button
                onClick={handleEditClick}
                className="px-4 py-2 font-bold text-xs bg-green-600 hover:bg-green-500 text-white rounded-md transition-all duration-200 pointer-events-auto shadow-lg border-2 border-green-800"
                >
                    EDIT LEVEL
                </button>
            )}
        </div>
      </div>
      <div className="font-black text-2xl tracking-tighter flex items-center">
        <span>LEFT: </span>
        <span className="text-yellow-300 ml-2">{projectiles}</span>
      </div>
    </div>
  );
};

export default HUD;