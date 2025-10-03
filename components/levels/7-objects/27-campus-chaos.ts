// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level27: Level = {
    id: 27,
    name: 'Campus Chaos',
    projectiles: 18,
    enemies: [
        { type: 'grunt', emoji: '🤓', position: { x: 700, y: 500 } },
        { type: 'hopper', emoji: '🐯', position: { x: 1180, y: 625 } },
        { type: 'brute', emoji: '📖', position: { x: 950, y: 500 } },
        { type: 'tank', emoji: '🌏', position: { x: 940, y: 385 } },
        { type: 'sparky', emoji: '🌠', position: { x: 900, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l27p1', position: { x: 650, y: 520 }, width: 200, height: 20, health: 100 },
        { id: 'l27p2', position: { x: 900, y: 520 }, width: 200, height: 20, health: 100 },
        { id: 'l27p3', position: { x: 1050, y: 320 }, width: 100, height: 20, health: 100 },
        { id: 'l27p4', position: { x: 840, y: 420 }, width: 200, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l27s1', position: { x: 940, y: 250 }, emoji: '🎓', fontSize: 250, health: 150 },
    ],
    wormholes: [
        { id: 'l27-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l27-wh-b' },
        { id: 'l27-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l27-wh-a' },
    ],
    blackHoles: [
        { id: 'l27-bh-1', position: { x: 640, y: 300 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#6d4c41', '#a1887f', '#d7ccc8']
    }
};
