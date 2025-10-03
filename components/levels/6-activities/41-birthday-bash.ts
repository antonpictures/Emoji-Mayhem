import { Level } from '../../types';

export const level41: Level = {
    id: 41,
    name: "Birthday Bash",
    projectiles: 20,
    enemies: [
        { type: 'tank', emoji: '🎂', position: { x: 940, y: 415 } },
        { type: 'hopper', emoji: '🥳', position: { x: 600, y: 625 } },
        { type: 'hopper', emoji: '💃', position: { x: 1200, y: 625 } },
        { type: 'brute', emoji: '👑', position: { x: 850, y: 300 } },
        { type: 'grunt', emoji: '🎁', position: { x: 850, y: 500 } },
        { type: 'flyer', emoji: '🎈', position: { x: 700, y: 150 } },
        { type: 'flyer', emoji: '🎈', position: { x: 1150, y: 150 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l41b1', position: { x: 800, y: 450 }, health: 100, width: 280, height: 200 },
        { id: 'l41p1', position: { x: 890, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l41p2', position: { x: 800, y: 320 }, width: 100, height: 20, health: 100 },
        { id: 'l41p4', position: { x: 700, y: 520 }, width: 200, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l41s1', position: { x: 550, y: 200 }, emoji: '🎉', fontSize: 200, health: 100 },
        { id: 'l41s2', position: { x: 1200, y: 200 }, emoji: '🎊', fontSize: 200, health: 100 },
    ],
    wormholes: [
        { id: 'l41-wh-a', type: 'black', position: { x: 100, y: 600 }, radius: 30, pairId: 'l41-wh-b' },
        { id: 'l41-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l41-wh-a' },
    ],
    blackHoles: [
        { id: 'l41-bh-1', position: { x: 940, y: 100 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#f8c5d8', '#f6a7c1', '#f389aa']
    }
};
