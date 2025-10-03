import { Level } from '../../types';

export const level32: Level = {
    id: 32,
    name: 'Hollywood Hijinks',
    projectiles: 18,
    enemies: [
        { type: 'brute', emoji: '🦸‍♂️', position: { x: 750, y: 485 } },
        { type: 'flyer', emoji: '🦇', position: { x: 940, y: 150 } },
        { type: 'sparky', emoji: '⚡', position: { x: 1000, y: 250 } },
        { type: 'grunt', emoji: '🧟', position: { x: 700, y: 625 } },
        { type: 'hopper', emoji: '👽', position: { x: 950, y: 400 } },
        { type: 'tank', emoji: '😎', position: { x: 1150, y: 600 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l32b1', position: { x: 1050, y: 500 }, health: 100, width: 150, height: 100 },
        { id: 'l32p1', position: { x: 700, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l32p2', position: { x: 900, y: 420 }, width: 150, height: 20, health: 100 },
        { id: 'l32p3', position: { x: 1000, y: 270 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l32s1', position: { x: 940, y: 450 }, emoji: '🎬', fontSize: 250, health: 150 },
    ],
    wormholes: [
        { id: 'l32-wh-a', type: 'black', position: { x: 100, y: 600 }, radius: 30, pairId: 'l32-wh-b' },
        { id: 'l32-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l32-wh-a' },
    ],
    blackHoles: [
        { id: 'l32-bh-1', position: { x: 640, y: 200 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#1c1c1c', '#3a3a3a', '#5a5a5a']
    }
};
