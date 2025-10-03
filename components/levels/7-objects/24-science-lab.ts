import { Level } from '../../types';

export const level24: Level = {
    id: 24,
    name: 'Science Lab',
    projectiles: 16,
    enemies: [
        { type: 'grunt', emoji: '🧪', position: { x: 650, y: 625 } },
        { type: 'brute', emoji: '🔬', position: { x: 750, y: 485 } },
        { type: 'sparky', emoji: '🧬', position: { x: 940, y: 260 } },
        { type: 'brute', emoji: '🔭', position: { x: 1150, y: 485 } },
        { type: 'flyer', emoji: '📡', position: { x: 1150, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l24p1', position: { x: 600, y: 520 }, width: 250, height: 20, health: 100 },
        { id: 'l24p2', position: { x: 1100, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l24p3', position: { x: 840, y: 280 }, width: 200, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l24s1', position: { x: 940, y: 450 }, emoji: '⚗️', fontSize: 250, health: 200 },
    ],
    wormholes: [
        { id: 'l24-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l24-wh-b' },
        { id: 'l24-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l24-wh-a' },
    ],
    blackHoles: [
        { id: 'l24-bh-1', position: { x: 940, y: 100 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#003f5c', '#2f4b7c', '#665191']
    }
};
