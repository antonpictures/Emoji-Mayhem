import React, { useState, useEffect, useRef } from 'react';
import { PokemonType } from '../types';
import { soundManager } from './SoundManager';

interface ProjectileSelectorProps {
  availableProjectiles: Record<PokemonType, number>;
  selectedType: PokemonType;
  onSelectType: (type: PokemonType) => void;
}

export const TYPE_EMOJI_MAP: Record<PokemonType, string> = {
    [PokemonType.Normal]: '⚪',
    [PokemonType.Fire]: '🔥',
    [PokemonType.Water]: '💧',
    [PokemonType.Grass]: '🍃',
    [PokemonType.Electric]: '⚡',
    [PokemonType.Ice]: '❄️',
    [PokemonType.Fighting]: '🥊',
    [PokemonType.Poison]: '☠️',
    [PokemonType.Ground]: '⛰️',
    [PokemonType.Flying]: '🕊️',
    [PokemonType.Psychic]: '🔮',
    [PokemonType.Bug]: '🐛',
    [PokemonType.Rock]: '🪨',
    [PokemonType.Ghost]: '👻',
    [PokemonType.Dragon]: '🐉',
    [PokemonType.Dark]: '🌑',
    [PokemonType.Steel]: '⚙️',
    [PokemonType.Fairy]: '✨',
};

export const TYPE_COLOR_MAP: Record<PokemonType, string> = {
    [PokemonType.Normal]: 'bg-gray-400',
    [PokemonType.Fire]: 'bg-red-500',
    [PokemonType.Water]: 'bg-blue-500',
    [PokemonType.Grass]: 'bg-green-500',
    [PokemonType.Electric]: 'bg-yellow-400',
    [PokemonType.Ice]: 'bg-cyan-300',
    [PokemonType.Fighting]: 'bg-orange-700',
    [PokemonType.Poison]: 'bg-purple-600',
    [PokemonType.Ground]: 'bg-yellow-600',
    [PokemonType.Flying]: 'bg-indigo-400',
    [PokemonType.Psychic]: 'bg-pink-500',
    [PokemonType.Bug]: 'bg-lime-500',
    [PokemonType.Rock]: 'bg-yellow-800',
    [PokemonType.Ghost]: 'bg-indigo-800',
    [PokemonType.Dragon]: 'bg-indigo-600',
    [PokemonType.Dark]: 'bg-gray-800',
    [PokemonType.Steel]: 'bg-gray-500',
    [PokemonType.Fairy]: 'bg-pink-300',
};

// This list defines the subset of projectiles available to the player.
export const PLAYER_PROJECTILE_TYPES = [
    PokemonType.Normal, PokemonType.Fire, PokemonType.Water, PokemonType.Grass,
    PokemonType.Electric, PokemonType.Fighting, PokemonType.Rock
];

const ProjectileSelector: React.FC<ProjectileSelectorProps> = ({ availableProjectiles, selectedType, onSelectType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (type: PokemonType) => {
    if (availableProjectiles[type] > 0) {
      soundManager.playClick();
      onSelectType(type);
      setIsExpanded(false); // Collapse after selection
    }
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation(); // Important! Prevent canvas click.
    if (Object.values(availableProjectiles).some(count => count > 0)) {
        soundManager.playClick();
        setIsExpanded(prev => !prev);
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  const renderCollapsedButton = () => {
    const count = availableProjectiles[selectedType] || 0;
    if (count === 0 && !Object.values(availableProjectiles).some(c => c > 0)) return null;

    return (
      <button
        onClick={handleToggleExpand}
        className="relative w-20 h-20 rounded-lg transition-all duration-200 transform hover:scale-110"
        title="Change Projectile"
      >
        <div className={`absolute inset-0 rounded-lg ${TYPE_COLOR_MAP[selectedType]} ${isExpanded ? 'ring-4 ring-white' : 'ring-4 ring-yellow-400'}`}></div>
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <span className="text-5xl" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            {TYPE_EMOJI_MAP[selectedType]}
          </span>
        </div>
        <div className="absolute -top-1 -right-1 bg-gray-800 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white">
          {count}
        </div>
      </button>
    );
  };
  
  const renderExpandedGrid = () => {
    if (!isExpanded) return null;
    
    const typesWithAmmo = (Object.keys(PokemonType) as Array<keyof typeof PokemonType>)
        .map(key => PokemonType[key])
        .filter(type => availableProjectiles[type] > 0);
    
    return (
      <div className="absolute bottom-full mb-4 bg-gray-900/80 p-3 rounded-xl grid grid-cols-6 gap-2 w-[380px]">
         {typesWithAmmo.map((pokemonType) => {
            const count = availableProjectiles[pokemonType] || 0;
            return (
              <button
                key={pokemonType}
                onClick={(e) => { e.stopPropagation(); handleSelect(pokemonType); }}
                className="relative w-12 h-12 rounded-lg transition-all duration-200 transform hover:scale-110"
                title={`${pokemonType} (${count} left)`}
              >
                <div className={`absolute inset-0 rounded-lg ${TYPE_COLOR_MAP[pokemonType]} ring-2 ring-black/30`}></div>
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <span className="text-3xl" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                    {TYPE_EMOJI_MAP[pokemonType]}
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 bg-gray-800 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[10px] border border-white">
                    {count}
                </div>
              </button>
            );
          })}
      </div>
    );
  };

  return (
    <div ref={selectorRef} className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-auto">
      {renderExpandedGrid()}
      {renderCollapsedButton()}
    </div>
  );
};

export default ProjectileSelector;