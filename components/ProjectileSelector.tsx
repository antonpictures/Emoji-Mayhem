import React, { useState } from 'react';
import { PokemonType } from '../types';
import { soundManager } from './SoundManager';
import ProjectileInfoCard from './ProjectileInfoCard';
import { PLAYER_PROJECTILE_TYPES, TYPE_COLOR_MAP, TYPE_EMOJI_MAP } from './projectile-data';

interface ProjectileSelectorProps {
  onSelect: (type: PokemonType) => void;
  selectedType: PokemonType;
  ammo: Record<PokemonType, number>;
}

const ProjectileSelector: React.FC<ProjectileSelectorProps> = ({ onSelect, selectedType, ammo }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoveredType, setHoveredType] = useState<PokemonType | null>(null);

    const handleSelect = (type: PokemonType) => {
        soundManager.playClick();
        onSelect(type);
        setIsExpanded(false);
    }

    const currentAmmo = ammo[selectedType] || 0;

    if (isExpanded) {
        return (
            <>
                <div 
                    className="fixed inset-0 bg-black/60 z-30" 
                    onClick={() => setIsExpanded(false)}
                />
                <div className="absolute bottom-4 left-4 z-40">
                     <ProjectileInfoCard hoveredType={hoveredType} />
                     <div className="grid grid-cols-6 gap-2 w-96 bg-gray-900/80 p-3 rounded-xl border-2 border-purple-500/50 shadow-lg animate-fade-in-up">
                        {PLAYER_PROJECTILE_TYPES.map(type => {
                            const typeAmmo = ammo[type] || 0;
                            const isDisabled = typeAmmo === 0;
                            return (
                                <button
                                    key={type}
                                    onClick={() => handleSelect(type)}
                                    onMouseEnter={() => setHoveredType(type)}
                                    onMouseLeave={() => setHoveredType(null)}
                                    disabled={isDisabled}
                                    className={`relative w-12 h-12 rounded-lg text-3xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${selectedType === type ? 'scale-110 border-4 border-yellow-400 shadow-xl' : 'border-2 border-gray-600'} ${TYPE_COLOR_MAP[type]} ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                                >
                                {TYPE_EMOJI_MAP[type]}
                                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border border-white/50">
                                    {typeAmmo}
                                </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="absolute bottom-4 left-4 z-20">
            <button
                onClick={() => {
                    soundManager.playClick();
                    setIsExpanded(true);
                }}
                className={`relative w-24 h-24 rounded-full text-5xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-2xl border-4 border-white/80 hover:border-white ${TYPE_COLOR_MAP[selectedType]}`}
            >
                {TYPE_EMOJI_MAP[selectedType]}
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-lg font-bold rounded-full w-9 h-9 flex items-center justify-center border-2 border-white/50">
                    {currentAmmo}
                </span>
            </button>
        </div>
    );
};

export default ProjectileSelector;