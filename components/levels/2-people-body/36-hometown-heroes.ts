// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level36: Level = {
    id: 36,
    name: 'Hometown Heroes',
    projectiles: 18,
    enemies: [
        { type: 'brute', emoji: '🧑‍🚒', position: { x: 1050, y: 610 } },
        { type: 'grunt', emoji: '👮', position: { x: 750, y: 530 } },
        { type: 'grunt', emoji: '🧑‍⚕️', position: { x: 1150, y: 330 } },
        { type: 'hopper', emoji: '🧑‍🍳', position: { x: 800, y: 400 } },
        { type: 'sparky', emoji: '🧑‍🔧', position: { x: 940, y: 250 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l36p1', position: { x: 700, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l36p2', position: { x: 1100, y: 350 }, width: 150, height: 20, health: 100 },
        { id: 'l36p3', position: { x: 750, y: 420 }, width: 150, height: 20, health: 100 },
        { id: 'l36b1', position: { x: 900, y: 500 }, health: 100, width: 200, height: 110 },
    ],
    emojiStructures: [
        { id: 'l36s1', position: { x: 780, y: 470 }, emoji: '🏥', fontSize: 250, health: 300 },
        { id: 'l36s2', position: { x: 1100, y: 550 }, emoji: '🏭', fontSize: 150, health: 250 },
        { id: 'l36s3', position: { x: 450, y: 610 }, emoji: '🏠', fontSize: 80 },
    ],
    wormholes: [
        { id: 'l36-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l36-wh-b' },
        { id: 'l36-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l36-wh-a' },
    ],
    blackHoles: [
        { id: 'l36-bh-1', position: { x: 640, y: 200 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#6c757d', '#adb5bd', '#dee2e6']
    }
};
