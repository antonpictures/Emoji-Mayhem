
import React from 'react';

interface HUDProps {
  score: number;
  levelName: string;
  projectiles: number;
}

const HUD: React.FC<HUDProps> = ({ score, levelName, projectiles }) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white z-20 pointer-events-none">
      <div className="font-press-start text-xl">
        <span>SCORE: </span>
        <span className="text-yellow-400">{score.toString().padStart(6, '0')}</span>
      </div>
      <div className="font-press-start text-xl">
        <span>{levelName}</span>
      </div>
      <div className="font-press-start text-xl flex items-center">
        <span>PROJECTILES: </span>
        <div className="flex ml-2">
            {[...Array(projectiles)].map((_, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-yellow-400 border-2 border-black -ml-1"></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HUD;
