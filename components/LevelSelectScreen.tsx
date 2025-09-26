import React from 'react';
import { Level } from '../types';

interface LevelSelectScreenProps {
    levels: Level[];
    onSelect: (level: Level) => void;
}

const HIGHSCORES = [
    { name: 'Cosmo', emoji: '🧑‍🚀' },
    { name: 'Glitch', emoji: '🤖' },
    { name: 'Specter', emoji: '👻' },
    { name: 'Ace', emoji: '🎯' },
    { name: 'Jester', emoji: '🤡' },
    { name: 'Boss', emoji: '👹' },
    { name: 'Rookie', emoji: '🐷' },
    { name: 'Alien', emoji: '👽' },
    { name: 'King', emoji: '👑' },
    { name: 'Nova', emoji: '✨' },
];

const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({ levels, onSelect }) => {
    return (
        <div className="text-white text-center p-8">
            <h1 className="text-5xl font-press-start text-yellow-400 mb-12" style={{ textShadow: '4px 4px 0 #000' }}>SELECT A LEVEL</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {levels.map((level, index) => {
                    const highscore = HIGHSCORES[index % HIGHSCORES.length];
                    const score = (level.id * 12345).toLocaleString();
                    return (
                        <div 
                            key={level.id}
                            onClick={() => onSelect(level)}
                            className="p-6 border-2 border-gray-600 hover:border-yellow-400 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <h2 className="text-2xl font-press-start text-cyan-400">{level.name}</h2>
                            <p className="mt-4 text-gray-400">Enemies: {level.enemies.length}</p>
                            <p className="mt-2 text-sm text-yellow-500">
                                🏆 {score} by {highscore.name} {highscore.emoji}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LevelSelectScreen;