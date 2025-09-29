import React from 'react';
import { soundManager } from './SoundManager';

interface GameOverScreenProps {
  onRestart: () => void;
  onBackToMenu: () => void;
  isTestingEditorLevel: boolean;
  onReturnToEditor: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onRestart, onBackToMenu, isTestingEditorLevel, onReturnToEditor }) => {
  
  const handlePrimaryClick = () => {
    soundManager.playClick();
    if (isTestingEditorLevel) {
      onReturnToEditor();
    } else {
      onRestart();
    }
  };

  const handleBackToMenuClick = () => {
    soundManager.playClick();
    onBackToMenu();
  };

  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 font-sans">
      <div className="text-center p-10 bg-gray-800 rounded-lg shadow-xl border-2 border-red-500">
        <h2 className="text-5xl font-black tracking-tighter text-red-500 mb-4">GAME OVER</h2>
        <p className="text-xl text-white mb-6">The emojis have won... for now. Try again!</p>
        <div className="flex space-x-4">
          <button
            onClick={handlePrimaryClick}
            className="px-8 py-3 font-bold text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-all duration-200 transform hover:scale-105"
          >
            {isTestingEditorLevel ? 'RETURN TO EDITOR' : 'RESTART'}
          </button>
          <button
            onClick={handleBackToMenuClick}
            className="px-8 py-3 font-bold text-lg bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-all duration-200"
          >
            MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;