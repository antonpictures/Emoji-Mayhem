import React from 'react';
import { PokemonType } from '../types';
import { PROJECTILE_ABILITY_DATA } from './projectile-data';
// Fix: Corrected import path for TYPE_EMOJI_MAP.
import { TYPE_EMOJI_MAP } from './projectile-data';

interface ProjectileInfoCardProps {
  hoveredType: PokemonType | null;
}

const ProjectileInfoCard: React.FC<ProjectileInfoCardProps> = ({ hoveredType }) => {
  if (!hoveredType) {
    return null;
  }

  const ability = PROJECTILE_ABILITY_DATA[hoveredType];

  if (!ability) {
      return null;
  }

  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 w-72 mb-3 p-3 bg-gray-800 border-2 border-purple-400 rounded-lg shadow-2xl transition-opacity duration-200 pointer-events-none"
    >
        <h3 className="text-lg font-bold text-yellow-300 flex items-center mb-1">
            <span className="text-2xl mr-2">{TYPE_EMOJI_MAP[hoveredType]}</span>
            {ability.name}
        </h3>
        <p className="text-sm text-gray-200">{ability.description}</p>
    </div>
  );
};

export default ProjectileInfoCard;