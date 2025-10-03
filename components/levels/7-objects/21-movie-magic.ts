import { Level } from '../../types';

export const level21: Level = {
    id: 21,
    name: 'Movie Magic',
    projectiles: 15,
    enemies: [
      { type: 'brute', emoji: '📺', position: { x: 700, y: 485 } },
      { type: 'grunt', emoji: '🔦', position: { x: 950, y: 300 } },
      { type: 'sparky', emoji: '💡', position: { x: 940, y: 180 } },
      { type: 'brute', emoji: '🎥', position: { x: 1150, y: 485 } },
      { type: 'grunt', emoji: '📼', position: { x: 1150, y: 625 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l21p1', position: { x: 650, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l21p2', position: { x: 1100, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l21p3', position: { x: 900, y: 320 }, width: 150, height: 20, health: 100 },
        { id: 'l21p4', position: { x: 860, y: 200 }, width: 160, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l21s1', position: { x: 940, y: 450 }, emoji: '🎬', fontSize: 250, health: 150 },
        { id: 'l21s2', position: { x: 500, y: 250 }, emoji: '📽️', fontSize: 150, health: 150 },
    ],
    wormholes: [
        { id: 'l21-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l21-wh-b' },
        { id: 'l21-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l21-wh-a' },
    ],
    blackHoles: [
        { id: 'l21-bh-1', position: { x: 640, y: 300 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#141414', '#2d2d2d', '#4a4a4a']
    }
};
