import { Level } from '../../types';

export const level48: Level = {
    id: 48,
    name: 'Train Robbery',
    projectiles: 15,
    enemies: [
        // Enemies on the ground
        { type: 'hopper', position: { x: 300, y: 625 }, emoji: '🤠' },
        
        // Enemies on the train
        { type: 'grunt', position: { x: 1380, y: 475 }, emoji: '💰' },
        { type: 'brute', position: { x: 1450, y: 460 }, emoji: '💎' },
        { type: 'grunt', position: { x: 1600, y: 475 }, emoji: '💰' },
        { type: 'grunt', position: { x: 1800, y: 475 }, emoji: '🤠' },
        { type: 'brute', position: { x: 1880, y: 460 }, emoji: '👮' },
    ],
    platforms: [
        // The Train
        { id: 'train-car-1', position: { x: 1300, y: 500 }, width: 200, height: 80, movement: { type: 'horizontal-loop', speed: -2.5, startX: 1500, endX: -220 } },
        { id: 'train-car-2', position: { x: 1510, y: 500 }, width: 200, height: 80, movement: { type: 'horizontal-loop', speed: -2.5, startX: 1710, endX: -10 } },
        { id: 'train-car-3', position: { x: 1720, y: 500 }, width: 250, height: 80, movement: { type: 'horizontal-loop', speed: -2.5, startX: 1920, endX: 210 } },
    ],
    breakableBlocks: [
        // Crates on the train
        { id: 'crate-1', position: { x: 1420, y: 450 }, width: 50, height: 50, health: 100 },
        { id: 'crate-2', position: { x: 1850, y: 450 }, width: 50, height: 50, health: 100 },
    ],
    emojiStructures: [
        {id: 'cactus-1', position: { x: 200, y: 600 }, emoji: '🌵', fontSize: 100 },
        {id: 'cactus-2', position: { x: 450, y: 610 }, emoji: '🌵', fontSize: 80 },
        {id: 'cactus-3', position: { x: 1100, y: 590 }, emoji: '🌵', fontSize: 120 },
        // Train track
        {id: 'track-1', position: { x: 100, y: 590 }, emoji: '🛤️', fontSize: 100 },
        {id: 'track-2', position: { x: 300, y: 590 }, emoji: '🛤️', fontSize: 100 },
        {id: 'track-3', position: { x: 500, y: 590 }, emoji: '🛤️', fontSize: 100 },
        {id: 'track-4', position: { x: 700, y: 590 }, emoji: '🛤️', fontSize: 100 },
        {id: 'track-5', position: { x: 900, y: 590 }, emoji: '🛤️', fontSize: 100 },
        {id: 'track-6', position: { x: 1100, y: 590 }, emoji: '🛤️', fontSize: 100 },
    ],
    theme: {
      sky: ['#f59e0b', '#fbbf24', '#fcd34d']
    }
};
