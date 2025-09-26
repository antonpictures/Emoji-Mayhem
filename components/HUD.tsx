
import React from 'react';
// Fix: Corrected import path to be a relative module import.
import { PLAYER_MAX_HEALTH } from '../constants';

interface HUDProps {
  shots: number;
  score: number;
  levelName: string;
  playerHealth: number;
  onQuit: () => void;
}

const HUD: React.FC<HUDProps> = ({ shots, score, levelName, playerHealth, onQuit }) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 text-white font-mono pointer-events-auto">
      <div className="flex items-center space-x-6">
        <div>
          <span className="text-sm text-gray-400">LEVEL:</span>
          <span className="ml-2 text-lg font-bold text-cyan-400">{levelName}</span>
        </div>
        <div>
          <span className="text-sm text-gray-400">SCORE:</span>
          <span className="ml-2 text-lg font-bold text-yellow-400">{score}</span>
        </div>
        <div>
          <span className="text-sm text-gray-400">SHOTS:</span>
          <span className="ml-2 text-lg font-bold">{shots}</span>
        </div>
      </div>
      <div className="w-1/4">
        <span className="text-sm text-gray-400">HEALTH:</span>
        <div className="w-full h-4 bg-gray-700 mt-1 rounded-full border-2 border-gray-500">
            <div 
                className="h-full bg-green-500 rounded-full transition-all duration-300" 
                style={{ width: `${(playerHealth / PLAYER_MAX_HEALTH) * 100}%` }}
            />
        </div>
      </div>
      <div>
        <button
          onClick={onQuit}
          className="px-4 py-2 font-press-start text-sm bg-gray-600 hover:bg-gray-500 rounded-md transition-all duration-200"
        >
          QUIT
        </button>
      </div>
    </div>
  );
};

export default HUD;
