import React from 'react';

interface GameOverScreenProps {
  onRestart: () => void;
  onQuit: () => void;
  isTestingEditorLevel: boolean;
  onReturnToEditor: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onRestart, onQuit, isTestingEditorLevel, onReturnToEditor }) => {
  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30">
      <div className="text-center p-10 bg-gray-800 rounded-lg shadow-xl border-2 border-red-500">
        <h2 className="text-5xl font-press-start text-red-500 mb-4">GAME OVER</h2>
        <p className="text-xl text-white mb-6">Negativity prevails... for now. Try again!</p>
        <div className="flex space-x-4">
          {isTestingEditorLevel ? (
             <button
              onClick={onReturnToEditor}
              className="px-8 py-3 font-press-start text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-all duration-200 transform hover:scale-105"
            >
              RETURN TO EDITOR
            </button>
          ) : (
            <button
              onClick={onRestart}
              className="px-8 py-3 font-press-start text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-all duration-200 transform hover:scale-105"
            >
              RESTART
            </button>
          )}
          <button
            onClick={onQuit}
            className="px-8 py-3 font-press-start text-lg bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-all duration-200"
          >
            QUIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;