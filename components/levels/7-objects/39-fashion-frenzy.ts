import { Level } from '../../types';

export const level39: Level = {
    id: 39,
    name: "Fashion Frenzy",
    projectiles: 20,
    enemies: [
        { type: 'hopper', emoji: '👠', position: { x: 700, y: 625 } },
        { type: 'grunt', emoji: '👕', position: { x: 850, y: 500 } },
        { type: 'flyer', emoji: '🧣', position: { x: 940, y: 150 } },
        { type: 'tank', emoji: '👑', position: { x: 1000, y: 200 } },
        { type: 'brute', emoji: '👜', position: { x: 1000, y: 385 } },
        { type: 'grunt', emoji: '👗', position: { x: 1150, y: 500 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l39b1', position: { x: 940, y: 240 }, health: 50, width: 20, height: 80 },
        { id: 'l39b2', position: { x: 1060, y: 240 }, health: 50, width: 20, height: 80 },
        { id: 'l39p1', position: { x: 800, y: 520 }, width: 100, height: 20, health: 100 },
        { id: 'l39p3', position: { x: 1100, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l39p4', position: { x: 950, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l39p5', position: { x: 950, y: 220 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l39s1', position: { x: 940, y: 500 }, emoji: '🛍️', fontSize: 300, health: 150 },
    ],
    wormholes: [
        { id: 'l39-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l39-wh-b' },
        { id: 'l39-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l39-wh-a' },
    ],
    blackHoles: [
        { id: 'l39-bh-1', position: { x: 640, y: 300 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#ffdde1', '#ee9ca7', '#ffdde1']
    }
};
