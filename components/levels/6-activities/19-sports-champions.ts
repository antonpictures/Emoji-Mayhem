import { Level } from '../../types';

export const level19: Level = {
    id: 19,
    name: 'Sports Champions',
    projectiles: 15,
    enemies: [
        { type: 'hopper', emoji: '🏀', position: { x: 880, y: 500 } },
        { type: 'hopper', emoji: '🎾', position: { x: 1120, y: 530 } },
        { type: 'brute', emoji: '🥊', position: { x: 940, y: 185 } },
        { type: 'grunt', emoji: '🏈', position: { x: 630, y: 625 } },
        { type: 'grunt', emoji: '⚾', position: { x: 1200, y: 625 } },
        { type: 'grunt', emoji: '⚽', position: { x: 940, y: 625 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l19p1', position: { x: 830, y: 520 }, width: 250, height: 20, health: 100 },
        { id: 'l19p2', position: { x: 700, y: 420 }, width: 150, height: 20, health: 100 },
        { id: 'l19p4', position: { x: 1100, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l19p5', position: { x: 1020, y: 420 }, width: 150, height: 20, health: 100 },
        { id: 'l19p7', position: { x: 860, y: 220 }, width: 160, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l19s3', position: { x: 940, y: 400 }, emoji: '🏆', fontSize: 300, health: 200 },
    ],
    wormholes: [
        { id: 'l19-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l19-wh-b' },
        { id: 'l19-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l19-wh-a' },
    ],
    blackHoles: [
        { id: 'l19-bh-1', position: { x: 640, y: 300 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#5A9A78', '#80B895', '#A5D6B2']
    }
};
