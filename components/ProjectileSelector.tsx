import React from 'react';
import { PokemonType } from '../types';
import { soundManager } from './SoundManager';

interface ProjectileSelectorProps {
    availableProjectiles: Record<PokemonType, number>;
    selectedType: PokemonType;
    onSelectType: (type: PokemonType) => void;
}

const TYPE_EMOJI_MAP: Record<PokemonType, string> = {
    [PokemonType.Fire]: '🔥',
    [PokemonType.Water]: '💧',
    [PokemonType.Grass]: '🍃',
    [PokemonType.Electric]: '⚡',
    [PokemonType.Ice]: '❄️',
    [PokemonType.Normal]: '⭐',
    // Add other types as they become available
    [PokemonType.Fighting]: '🥊',
    [PokemonType.Flying]: '🕊️',
    [PokemonType.Poison]: '☠️',
    [PokemonType.Ground]: '🏜️',
    [PokemonType.Rock]: '🪨',
    [PokemonType.Bug]: '🐛',
    [PokemonType.Ghost]: '👻',
    [PokemonType.Steel]: '🛡️',
    [PokemonType.Psychic]: '🌀',
    [PokemonType.Dragon]: '🐉',
    [PokemonType.Dark]: '🌑',
    [PokemonType.Fairy]: '✨',
};

const TYPE_COLOR_MAP: Record<PokemonType, string> = {
    [PokemonType.Fire]: 'bg-red-600 border-red-800 hover:bg-red-500',
    [PokemonType.Water]: 'bg-blue-600 border-blue-800 hover:bg-blue-500',
    [PokemonType.Grass]: 'bg-green-600 border-green-800 hover:bg-green-500',
    [PokemonType.Electric]: 'bg-yellow-500 border-yellow-700 hover:bg-yellow-400',
    [PokemonType.Ice]: 'bg-cyan-500 border-cyan-700 hover:bg-cyan-400',
    [PokemonType.Normal]: 'bg-gray-500 border-gray-700 hover:bg-gray-400',
    // Add other type colors
    [PokemonType.Fighting]: 'bg-orange-700 border-orange-900 hover:bg-orange-600',
    [PokemonType.Flying]: 'bg-sky-400 border-sky-600 hover:bg-sky-300',
    [PokemonType.Poison]: 'bg-purple-600 border-purple-800 hover:bg-purple-500',
    [PokemonType.Ground]: 'bg-amber-600 border-amber-800 hover:bg-amber-500',
    [PokemonType.Rock]: 'bg-stone-500 border-stone-700 hover:bg-stone-400',
    [PokemonType.Bug]: 'bg-lime-600 border-lime-800 hover:bg-lime-500',
    [PokemonType.Ghost]: 'bg-indigo-700 border-indigo-900 hover:bg-indigo-600',
    [PokemonType.Steel]: 'bg-slate-500 border-slate-700 hover:bg-slate-400',
    [PokemonType.Psychic]: 'bg-pink-500 border-pink-700 hover:bg-pink-400',
    [PokemonType.Dragon]: 'bg-violet-600 border-violet-800 hover:bg-violet-500',
    [PokemonType.Dark]: 'bg-zinc-800 border-zinc-900 hover:bg-zinc-700',
    [PokemonType.Fairy]: 'bg-fuchsia-400 border-fuchsia-600 hover:bg-fuchsia-300',
};

const ProjectileSelector: React.FC<ProjectileSelectorProps> = ({ availableProjectiles, selectedType, onSelectType }) => {
    
    const handleSelect = (type: PokemonType) => {
        if (availableProjectiles[type] > 0) {
            soundManager.playClick();
            onSelectType(type);
        }
    }

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/50 p-2 rounded-lg z-20 flex space-x-2">
            {Object.entries(availableProjectiles).map(([type, count]) => (
                <button
                    key={type}
                    onClick={() => handleSelect(type as PokemonType)}
                    disabled={count <= 0}
                    className={`relative w-16 h-16 rounded-md border-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed ${
                        TYPE_COLOR_MAP[type as PokemonType]
                    } ${
                        selectedType === type ? 'scale-110 ring-4 ring-yellow-400' : ''
                    }`}
                >
                    <span className="text-3xl">{TYPE_EMOJI_MAP[type as PokemonType]}</span>
                    <span className="absolute -bottom-1 -right-1 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm border-2 border-white">
                        {count}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default ProjectileSelector;
export { TYPE_EMOJI_MAP };
