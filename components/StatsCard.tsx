import React from 'react';
import { Vec2, PokemonType, HoverableEntity, Enemy } from '../types';
import { POKEMON_DATA } from './pokemon-data';
import { ENTITY_DATA } from '../services/entity-data';
import { ENEMY_CONFIG } from '../services/GameEngine';
// Fix: Corrected import path for TYPE_COLOR_MAP.
import { TYPE_COLOR_MAP } from './projectile-data';

interface StatsCardProps {
    hoveredEntity: HoverableEntity | null;
    cardPosition: Vec2 | null;
}

const isEnemy = (entity: HoverableEntity): entity is Enemy => {
    return (entity as Enemy).type !== undefined && (entity as Enemy).pokemonTypes !== undefined;
};

const StatsCard: React.FC<StatsCardProps> = ({ hoveredEntity, cardPosition }) => {
    if (!hoveredEntity || !cardPosition) return null;

    const renderEnemyCard = (enemy: Enemy) => {
        const pokemonInfo = POKEMON_DATA[enemy.emoji] || { name: 'Unknown', types: [PokemonType.Normal] };
        const maxHealth = ENEMY_CONFIG[enemy.type].health;
        const enemyDescriptions: Record<string, string> = {
            grunt: 'A standard, reliable foe.',
            brute: 'Tough and heavy, difficult to move.',
            flyer: 'Hovers in the air, tricky to hit.',
            bomber: 'Explodes upon defeat, causing area damage.',
            ghost: 'Can phase through objects.',
            hopper: 'Jumps around periodically.',
            tank: 'Extremely durable with high health.',
            sparky: 'Moves in an erratic pattern.'
        };

        return (
            <>
                <h3 className="text-xl font-bold text-yellow-300 flex items-center">
                    <span className="text-2xl mr-2">{enemy.emoji}</span>
                    {pokemonInfo.name}
                </h3>
                <p className="text-xs text-gray-400 mb-2">Type: {enemy.type}</p>
                <div className="flex space-x-2 mb-2">
                    {pokemonInfo.types.map((type: PokemonType) => (
                        <span key={type} className={`px-2 py-0.5 text-xs font-semibold text-white rounded-full ${TYPE_COLOR_MAP[type]}`}>
                            {type}
                        </span>
                    ))}
                </div>
                {maxHealth && (
                    <div className="w-full bg-gray-600 rounded-full h-2.5 mb-2">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(enemy.health / maxHealth) * 100}%` }}></div>
                    </div>
                )}
                <p className="text-sm text-gray-200">{enemyDescriptions[enemy.type] || 'A mysterious foe.'}</p>
            </>
        );
    };
    
    const renderStructureCard = (structure: Exclude<HoverableEntity, Enemy>) => {
        let emoji = '❓';
        if ('emoji' in structure) {
            emoji = structure.emoji;
        } else if ('width' in structure) {
            emoji = 'health' in structure && structure.health ? '🧱' : '🟫';
        } else if ('pairId' in structure) {
            emoji = structure.type === 'black' ? '🟠' : '⚪';
        } else if ('gravityRadius' in structure) {
            emoji = '⚫';
        }

        const entityInfo = ENTITY_DATA[emoji] || ENTITY_DATA['❓'];

        return (
             <>
                <h3 className="text-xl font-bold text-yellow-300 flex items-center">
                    <span className="text-2xl mr-2">{emoji}</span>
                    {entityInfo.name}
                </h3>
                {entityInfo.types.length > 0 && (
                    <div className="flex space-x-2 my-2">
                        {entityInfo.types.map((type: PokemonType) => (
                            <span key={type} className={`px-2 py-0.5 text-xs font-semibold text-white rounded-full ${TYPE_COLOR_MAP[type]}`}>
                                {type}
                            </span>
                        ))}
                    </div>
                )}
                 {'health' in structure && structure.health && (
                    <p className="text-sm text-gray-200">Health: {structure.health}</p>
                 )}
                <p className="text-sm text-gray-200 mt-1">{entityInfo.description}</p>
            </>
        )
    }
    
    let content = null;
    if (isEnemy(hoveredEntity)) {
        content = renderEnemyCard(hoveredEntity);
    } else { 
        content = renderStructureCard(hoveredEntity);
    }

    return (
        <div 
            className="absolute z-50 p-4 bg-gray-800 border-2 border-purple-500 rounded-lg shadow-lg w-64 pointer-events-none transition-opacity duration-200"
            style={{ 
                left: `${cardPosition.x}px`, 
                top: `${cardPosition.y}px`,
                opacity: hoveredEntity ? 1 : 0,
            }}
        >
            {content}
        </div>
    );
};

export default StatsCard;