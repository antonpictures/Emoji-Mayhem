import React, { useMemo } from 'react';
import { Level, PokemonType } from '../types';
import { soundManager } from './SoundManager';
import { ENEMY_CONFIG } from '../services/GameEngine';
import { POKEMON_DATA } from './pokemon-data';
import { TYPE_CHART } from './pokemon-type-chart';
// Fix: Corrected import path for TYPE_EMOJI_MAP.
import { TYPE_EMOJI_MAP, PLAYER_PROJECTILE_TYPES } from './ProjectileSelector';

interface LevelStartScreenProps {
  level: Level;
  onStart: () => void;
}

const LevelStartScreen: React.FC<LevelStartScreenProps> = ({ level, onStart }) => {
  const handleClick = () => {
    soundManager.playClick();
    onStart();
  };

  const recommendedTypes = useMemo(() => {
    const playerProjectileTypes = PLAYER_PROJECTILE_TYPES;

    const enemyTypesInLevel = new Set<PokemonType>();
    level.enemies.forEach(enemyDef => {
        const config = ENEMY_CONFIG[enemyDef.type];
        const emoji = enemyDef.emoji || config.emoji;
        const pokemonInfo = POKEMON_DATA[emoji!] || { types: [PokemonType.Normal] };
        pokemonInfo.types.forEach(type => enemyTypesInLevel.add(type));
    });

    if (enemyTypesInLevel.size === 0) return [];

    return playerProjectileTypes.filter(attackerType => {
        const chart = TYPE_CHART[attackerType];
        for (const defenderType of Array.from(enemyTypesInLevel)) {
            if (chart.super_effective.includes(defenderType)) {
                return true;
            }
        }
        return false;
    });

  }, [level]);

  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 font-sans">
      <div className="text-center p-10 bg-gray-800 rounded-lg shadow-xl border-2 border-blue-500 max-w-lg">
        <h2 className="text-5xl font-black tracking-tighter text-blue-300 mb-2">{level.name}</h2>
        <p className="text-2xl font-bold text-white mb-6">Objective: Defeat all enemies!</p>

        {recommendedTypes.length > 0 && (
            <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
                <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider mb-3">Level Hints</h4>
                <p className="text-gray-300 text-sm mb-3">Try using these types for a <span className="text-green-400 font-bold">Super Effective</span> advantage!</p>
                <div className="flex justify-center space-x-3">
                    {recommendedTypes.map(type => (
                        <div key={type} className="flex flex-col items-center">
                            <span className="text-4xl">{TYPE_EMOJI_MAP[type]}</span>
                            <span className="text-xs font-semibold text-gray-200 mt-1">{type}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
        
        <button
          onClick={handleClick}
          className="px-12 py-4 font-bold text-2xl bg-green-600 hover:bg-green-500 text-white rounded-md transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          START
        </button>
      </div>
    </div>
  );
};

export default LevelStartScreen;