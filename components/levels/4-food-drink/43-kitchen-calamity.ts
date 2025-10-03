import { Level } from '../../types';

export const level43: Level = {
    id: 43,
    name: "Kitchen Calamity",
    projectiles: 18,
    enemies: [
        { type: 'brute', emoji: '🍕', position: { x: 750, y: 500 } },
        { type: 'grunt', emoji: '🧂', position: { x: 700, y: 400 } },
        { type: 'tank', emoji: '🥫', position: { x: 1150, y: 600 } },
        { type: 'hopper', emoji: '🥚', position: { x: 1000, y: 300 } },
        { type: 'flyer', emoji: '🍿', position: { x: 940, y: 150 } },
        { type: 'brute', emoji: '🥞', position: { x: 1100, y: 385 } },
        { type: 'grunt', emoji: '🧇', position: { x: 1100, y: 500 } },
    ],
    breakableBlocks: [
        { id: 'l43p1', position: { x: 700, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l43p2', position: { x: 650, y: 420 }, width: 200, height: 20, health: 100 },
        { id: 'l43p3', position: { x: 950, y: 320 }, width: 100, height: 20, health: 100 },
        { id: 'l43p4', position: { x: 1050, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l43p5', position: { x: 1050, y: 520 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l43s1', position: { x: 940, y: 550 }, emoji: '🍳', fontSize: 200, health: 200 },
    ],
    wormholes: [
        { id: 'l43-wh-a', type: 'black', position: { x: 100, y: 600 }, radius: 30, pairId: 'l43-wh-b' },
        { id: 'l43-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l43-wh-a' },
    ],
    blackHoles: [
        { id: 'l43-bh-1', position: { x: 640, y: 150 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#f2e8cf', '#d4a373', '#a16207']
    }
};
