// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level33: Level = {
    id: 33,
    name: 'Cartoon Capers',
    projectiles: 16,
    enemies: [
        { type: 'hopper', emoji: '🥴', position: { x: 700, y: 625 } },
        { type: 'brute', emoji: '👴', position: { x: 1000, y: 485 } },
        { type: 'grunt', emoji: '👦', position: { x: 950, y: 500 } },
        { type: 'tank', emoji: '🤖', position: { x: 1100, y: 300 } },
        { type: 'flyer', emoji: '🧙', position: { x: 940, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l33b1', position: { x: 700, y: 620 }, health: 100, width: 450, height: 30 },
        { id: 'l33p2', position: { x: 900, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l33p3', position: { x: 1050, y: 320 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l33s1', position: { x: 940, y: 400 }, emoji: '📺', fontSize: 300, health: 250 },
    ],
    wormholes: [
        { id: 'l33-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l33-wh-b' },
        { id: 'l33-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l33-wh-a' },
    ],
    blackHoles: [
        { id: 'l33-bh-1', position: { x: 640, y: 200 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#87CEEB', '#FFC0CB', '#90EE90']
    }
};
