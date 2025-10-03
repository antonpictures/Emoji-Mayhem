import { Level } from '../../types';

export const level35: Level = {
    id: 35,
    name: 'Frozen Fortress',
    projectiles: 18,
    enemies: [
        { type: 'brute', emoji: '👩🏻‍🦳', position: { x: 950, y: 185 } }, 
        { type: 'grunt', emoji: '⛄', position: { x: 650, y: 625 } }, 
        { type: 'hopper', emoji: '🦌', position: { x: 1180, y: 625 } }, 
        { type: 'tank', emoji: '🧊', position: { x: 950, y: 385 } },
        { type: 'grunt', emoji: '⛄', position: { x: 800, y: 500 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l35b1', position: { x: 700, y: 540 }, health: 150, width: 20, height: 110 },
        { id: 'l35b2', position: { x: 1150, y: 540 }, health: 150, width: 20, height: 110 },
        { id: 'l35b3', position: { x: 800, y: 320 }, health: 100, width: 300, height: 20 },
        { id: 'l35p1', position: { x: 900, y: 220 }, width: 100, height: 20, health: 100 },
        { id: 'l35p2', position: { x: 850, y: 420 }, width: 200, height: 20, health: 100 },
        { id: 'l35p3', position: { x: 650, y: 520 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l35s1', position: { x: 950, y: 500 }, emoji: '🏰', fontSize: 500, health: 500 },
    ],
    wormholes: [
        { id: 'l35-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l35-wh-b' },
        { id: 'l35-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l35-wh-a' },
    ],
    blackHoles: [
        { id: 'l35-bh-1', position: { x: 640, y: 300 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#caf0f8', '#ade8f4', '#90e0ef']
    }
};
