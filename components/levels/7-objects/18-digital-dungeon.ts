import { Level } from '../../types';

export const level18: Level = {
    id: 18,
    name: 'Digital Dungeon',
    projectiles: 15,
    enemies: [
      { type: 'hopper', position: { x: 650, y: 625 } },
      { type: 'brute', emoji: '⌨️', position: { x: 800, y: 385 } },
      { type: 'tank', emoji: '🔋', position: { x: 650, y: 485 } },
      { type: 'sparky', emoji: '🔌', position: { x: 1000, y: 300 } },
      { type: 'brute', emoji: '🖨️', position: { x: 1150, y: 465 } },
      { type: 'grunt', emoji: '💽', position: { x: 900, y: 400 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l18p1', position: { x: 600, y: 520 }, width: 250, height: 20, health: 100 },
        { id: 'l18p2', position: { x: 750, y: 420 }, width: 200, height: 20, health: 100 },
        { id: 'l18p3', position: { x: 1100, y: 500 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l18s2', position: { x: 1000, y: 550 }, emoji: '🖥️', fontSize: 200, health: 250 },
    ],
    wormholes: [
        { id: 'l18-wh-a', type: 'black', position: { x: 100, y: 300 }, radius: 30, pairId: 'l18-wh-b' },
        { id: 'l18-wh-b', type: 'white', position: { x: 1180, y: 300 }, radius: 30, pairId: 'l18-wh-a' },
    ],
    blackHoles: [
        { id: 'l18-bh-1', position: { x: 640, y: 150 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#0d1b2a', '#1b263b', '#415a77']
    }
};
