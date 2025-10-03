import { Level } from '../../types';

export const level30: Level = {
    id: 30,
    name: 'Cosmic Celebration',
    projectiles: 20,
    enemies: [
        { type: 'hopper', emoji: '👨‍🚀', position: { x: 600, y: 625 } },
        { type: 'hopper', emoji: '👩‍🚀', position: { x: 1180, y: 625 } },
        { type: 'tank', emoji: '🚀', position: { x: 940, y: 515 } },
        { type: 'flyer', emoji: '🛰️', position: { x: 700, y: 150 } },
        { type: 'flyer', emoji: '🛸', position: { x: 1100, y: 150 } },
        { type: 'sparky', emoji: '☄️', position: { x: 940, y: 300 } },
        { type: 'grunt', emoji: '⭐', position: { x: 980, y: 400 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l30b1', position: { x: 650, y: 400 }, health: 100, width: 80, height: 50 },
        { id: 'l30b2', position: { x: 1130, y: 400 }, health: 100, width: 50, height: 80 },
        { id: 'l30p1', position: { x: 890, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l30p4', position: { x: 800, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l30p5', position: { x: 1030, y: 420 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l30s1', position: { x: 450, y: 200 }, emoji: '🪐', fontSize: 200, health: 250 },
        { id: 'l30s2', position: { x: 1200, y: 500 }, emoji: '🌌', fontSize: 200, health: 150 },
    ],
    wormholes: [
        { id: 'l30-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l30-wh-b' },
        { id: 'l30-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l30-wh-a' },
    ],
    blackHoles: [
        { id: 'l30-bh-1', position: { x: 940, y: 100 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#020122', '#0c0032', '#190061']
    }
};
