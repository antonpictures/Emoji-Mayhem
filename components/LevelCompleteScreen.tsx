import React from 'react';
import { soundManager } from './SoundManager';

interface LevelCompleteScreenProps {
  score: number;
  onNext: () => void;
  isTestingEditorLevel: boolean;
  onReturnToEditor: () => void;
}

const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({ score, onNext, isTestingEditorLevel, onReturnToEditor }) => {
  const handleClick = () => {
    soundManager.playClick();
    if (isTestingEditorLevel) {
      onReturnToEditor();
    } else {
      onNext();
    }
  };
  
  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30">
      <div className="text-center p-10 bg-gray-800 rounded-lg shadow-xl border-2 border-green-500">
        <h2 className="text-5xl font-press-start text-green-400 mb-4">LEVEL COMPLETE!</h2>
        <p className="text-2xl text-white mb-6">You scored <span className="font-bold text-yellow-400">{score}</span> points!</p>
        <button
          onClick={handleClick}
          className={`px-8 py-3 font-press-start text-lg text-white rounded-md transition-all duration-200 transform hover:scale-105 ${isTestingEditorLevel ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600 hover:bg-green-500'}`}
        >
          {isTestingEditorLevel ? 'RETURN TO EDITOR' : 'CONTINUE'}
        </button>
      </div>
    </div>
  );
};

export default LevelCompleteScreen;