import { Level } from '../../types';

export const level22: Level = {
    id: 22,
    name: 'Library of Legends',
    projectiles: 16,
    enemies: [
        { type: 'grunt', emoji: '📕', position: { x: 700, y: 625 } },
        { type: 'brute', emoji: '📖', position: { x: 750, y: 500 } },
        { type: 'grunt', emoji: '📓', position: { x: 700, y: 400 } },
        { type: 'grunt', emoji: '📙', position: { x: 1100, y: 625 } },
        { type: 'brute', emoji: '📔', position: { x: 1150, y: 500 } },
        { type: 'grunt', emoji: '📜', position: { x: 1100, y: 400 } },
        { type: 'flyer', emoji: '📄', position: { x: 940, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l22p1', position: { x: 650, y: 520 }, width: 200, height: 20, health: 100 },
        { id: 'l22p2', position: { x: 650, y: 420 }, width: 200, height: 20, health: 100 },
        { id: 'l22p3', position: { x: 1050, y: 520 }, width: 200, height: 20, health: 100 },
        { id: 'l22p4', position: { x: 1050, y: 420 }, width: 200, height: 20, health: 100 },
        { id: 'l22p5', position: { x: 840, y: 320 }, width: 200, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l22s1', position: { x: 940, y: 550 }, emoji: '📚', fontSize: 250, health: 300 },
    ],
    wormholes: [
        { id: 'l22-wh-a', type: 'black', position: { x: 500, y: 100 }, radius: 30, pairId: 'l22-wh-b' },
        { id: 'l22-wh-b', type: 'white', position: { x: 1200, y: 100 }, radius: 30, pairId: 'l22-wh-a' },
    ],
    blackHoles: [
        { id: 'l22-bh-1', position: { x: 940, y: 100 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#8c5a3b', '#6b4226', '#4a2c16']
    }
};
