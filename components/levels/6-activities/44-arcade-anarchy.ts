import { Level } from '../../types';

export const level44: Level = {
    id: 44,
    name: "Arcade Anarchy",
    projectiles: 20,
    enemies: [
        { type: 'bomber', emoji: '🪅', position: { x: 750, y: 525 } },
        { type: 'tank', emoji: '🎮', position: { x: 940, y: 270 } },
        { type: 'grunt', emoji: '🕹️', position: { x: 940, y: 500 } },
        { type: 'brute', emoji: '🎰', position: { x: 1150, y: 385 } },
        { type: 'hopper', emoji: '🎲', position: { x: 1050, y: 625 } },
        { type: 'flyer', emoji: '🪁', position: { x: 600, y: 150 } },
        { type: 'sparky', emoji: '🪄', position: { x: 1100, y: 200 } },
    ],
    breakableBlocks: [
        { id: 'l44b1', position: { x: 890, y: 320 }, health: 150, width: 20, height: 330 },
        { id: 'l44b2', position: { x: 990, y: 320 }, health: 150, width: 20, height: 330 },
        { id: 'l44p3', position: { x: 890, y: 300 }, width: 120, height: 20, health: 100 },
        { id: 'l44p4', position: { x: 1000, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l44p5', position: { x: 1050, y: 420 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l44s1', position: { x: 940, y: 100 }, emoji: '🪩', fontSize: 150, health: 100 },
    ],
    wormholes: [
        { id: 'l44-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l44-wh-b' },
        { id: 'l44-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l44-wh-a' },
    ],
    blackHoles: [
        { id: 'l44-bh-1', position: { x: 640, y: 300 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#1d0f2b', '#4c1d59', '#ff00a0']
    }
};
