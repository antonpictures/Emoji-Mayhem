import { Level } from '../types';

export const COMMUNITY_LEVELS_DATA: Level[] = [
    {
        id: 1001,
        name: 'Cactus Canyon',
        projectiles: 12,
        creator: 'PixelPioneer',
        plays: 2458,
        likes: 312,
        isCommunity: true,
        enemies: [
            { type: 'hopper', position: { x: 250, y: 625 }, emoji: '🤠' },
            { type: 'hopper', position: { x: 1050, y: 625 }, emoji: '🤠' },
            { type: 'grunt', position: { x: 1400, y: 475 }, emoji: '💰' },
            { type: 'brute', position: { x: 1600, y: 460 }, emoji: '💎' },
            { type: 'tank', position: { x: 1880, y: 450 }, emoji: '👮' },
        ],
        platforms: [
            { id: 'com1-train-1', position: { x: 1300, y: 500 }, width: 200, height: 80, movement: { type: 'horizontal-loop', speed: -3, startX: 1600, endX: -300 } },
            { id: 'com1-train-2', position: { x: 1520, y: 500 }, width: 250, height: 80, movement: { type: 'horizontal-loop', speed: -3, startX: 1820, endX: -80 } },
        ],
        breakableBlocks: [
            { id: 'com1-crate-1', position: { x: 1550, y: 450 }, width: 50, height: 50, health: 100 },
        ],
        emojiStructures: [
            {id: 'com1-cactus-1', position: { x: 200, y: 600 }, emoji: '🌵', fontSize: 100 },
            {id: 'com1-cactus-2', position: { x: 450, y: 610 }, emoji: '🌵', fontSize: 80 },
            {id: 'com1-cactus-3', position: { x: 1100, y: 590 }, emoji: '🌵', fontSize: 120 },
            {id: 'com1-track-1', position: { x: 100, y: 590 }, emoji: '🛤️', fontSize: 100 },
            {id: 'com1-track-2', position: { x: 300, y: 590 }, emoji: '🛤️', fontSize: 100 },
            {id: 'com1-track-3', position: { x: 500, y: 590 }, emoji: '🛤️', fontSize: 100 },
            {id: 'com1-track-4', position: { x: 700, y: 590 }, emoji: '🛤️', fontSize: 100 },
            {id: 'com1-track-5', position: { x: 900, y: 590 }, emoji: '🛤️', fontSize: 100 },
            {id: 'com1-track-6', position: { x: 1100, y: 590 }, emoji: '🛤️', fontSize: 100 },
        ],
        theme: {
          sky: ['#f59e0b', '#fbbf24', '#fcd34d']
        }
    },
    {
        id: 1002,
        name: 'Krabby Patty Panic',
        creator: 'SpongeFan22',
        projectiles: 16,
        plays: 1820,
        likes: 450,
        isCommunity: true,
        enemies: [
            { type: 'grunt', emoji: '🧽', position: { x: 250, y: 325 } },
            { type: 'brute', emoji: '⭐', position: { x: 1000, y: 610 } },
            { type: 'hopper', emoji: '🐌', position: { x: 150, y: 625 } },
            { type: 'sparky', emoji: '🦠', position: { x: 800, y: 250 } },
            // Fix: Removed duplicate 'type' property from enemy definition.
            { type: 'brute', emoji: '🦀', position: { x: 640, y: 625 } },
            { type: 'grunt', emoji: '🍔', position: { x: 900, y: 425 } },
        ],
        breakableBlocks: [
            { id: 'com2b1', position: { x: 950, y: 500 }, health: 100, width: 150, height: 110 },
            { id: 'com2p1', position: { x: 200, y: 350 }, width: 100, height: 20, health: 100 },
            { id: 'com2p2', position: { x: 850, y: 450 }, width: 100, height: 20, health: 100 },
        ],
        emojiStructures: [
            { id: 'com2s1', position: { x: 250, y: 500 }, emoji: '🍍', fontSize: 350 },
            { id: 'com2s2', position: { x: 1050, y: 550 }, emoji: '🗿', fontSize: 250 },
            { id: 'com2s3', position: { x: 640, y: 550 }, emoji: '⚓', fontSize: 200 },
        ],
        theme: {
            sky: ['#48cae4', '#ade8f4', '#90e0ef']
        }
    }
];