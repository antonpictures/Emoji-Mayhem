import { Level } from '../../types';

export const level34: Level = {
    id: 34,
    name: 'Bikini Bottom Blast',
    projectiles: 16,
    enemies: [
        { type: 'grunt', emoji: '🧽', position: { x: 700, y: 300 } },
        { type: 'brute', emoji: '⭐', position: { x: 1150, y: 610 } },
        { type: 'hopper', emoji: '🐌', position: { x: 650, y: 625 } },
        { type: 'sparky', emoji: '🦠', position: { x: 800, y: 250 } },
        { type: 'grunt', emoji: '🍔', position: { x: 900, y: 400 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l34b1', position: { x: 850, y: 500 }, health: 100, width: 150, height: 110 },
        { id: 'l34p1', position: { x: 650, y: 320 }, width: 100, height: 20, health: 100 },
        { id: 'l34p2', position: { x: 850, y: 420 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l34s1', position: { x: 700, y: 500 }, emoji: '🍍', fontSize: 350, health: 250 },
        { id: 'l34s2', position: { x: 1150, y: 550 }, emoji: '🗿', fontSize: 250, health: 350 },
        { id: 'l34s3', position: { x: 450, y: 610 }, emoji: '🌊', fontSize: 80 },
    ],
    wormholes: [
        { id: 'l34-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l34-wh-b' },
        { id: 'l34-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l34-wh-a' },
    ],
    blackHoles: [
        { id: 'l34-bh-1', position: { x: 940, y: 150 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#48cae4', '#ade8f4', '#90e0ef']
    }
};
