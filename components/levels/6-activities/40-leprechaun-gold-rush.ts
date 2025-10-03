import { Level } from '../../types';

export const level40: Level = {
    id: 40,
    name: "Leprechaun's Gold Rush",
    projectiles: 18,
    enemies: [
        { type: 'tank', emoji: '💰', position: { x: 1150, y: 600 } },
        { type: 'hopper', emoji: '🧝‍♂️', position: { x: 950, y: 500 } },
        { type: 'hopper', emoji: '🧝‍♂️', position: { x: 1150, y: 500 } },
        { type: 'brute', emoji: '🍺', position: { x: 700, y: 610 } },
        { type: 'grunt', emoji: '☘️', position: { x: 850, y: 400 } },
        { type: 'flyer', emoji: '🌟', position: { x: 940, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l40p1', position: { x: 650, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l40p2', position: { x: 800, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l40p4', position: { x: 900, y: 520 }, width: 300, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l40s1', position: { x: 940, y: 400 }, emoji: '🌈', fontSize: 400, health: 200 },
    ],
    wormholes: [
        { id: 'l40-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l40-wh-b' },
        { id: 'l40-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l40-wh-a' },
    ],
    blackHoles: [
        { id: 'l40-bh-1', position: { x: 640, y: 250 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#6a994e', '#a7c957', '#f2e8cf']
    }
};
