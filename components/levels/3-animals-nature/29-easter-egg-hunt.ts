// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level29: Level = {
    id: 29,
    name: 'Easter Egg Hunt',
    projectiles: 20,
    enemies: [
        { type: 'hopper', emoji: '🐇', position: { x: 600, y: 625 } },
        { type: 'hopper', emoji: '🐰', position: { x: 1180, y: 625 } },
        { type: 'grunt', emoji: '🥚', position: { x: 750, y: 500 } },
        { type: 'grunt', emoji: '🥚', position: { x: 900, y: 400 } },
        { type: 'grunt', emoji: '🥚', position: { x: 1150, y: 400 } },
        { type: 'brute', emoji: '🌟', position: { x: 940, y: 285 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l29p1', position: { x: 650, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l29p2', position: { x: 850, y: 420 }, width: 150, height: 20, health: 100 },
        { id: 'l29p3', position: { x: 1000, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l29p4', position: { x: 1050, y: 420 }, width: 150, height: 20, health: 100 },
        { id: 'l29p5', position: { x: 890, y: 320 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l29s1', position: { x: 940, y: 500 }, emoji: '⛪', fontSize: 250, health: 300 },
        { id: 'l29s2', position: { x: 450, y: 610 }, emoji: '🌷', fontSize: 80 },
    ],
    wormholes: [
        { id: 'l29-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l29-wh-b' },
        { id: 'l29-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l29-wh-a' },
    ],
    blackHoles: [
        { id: 'l29-bh-1', position: { x: 640, y: 200 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#abf7b1', '#b7e4c7', '#d8f3dc']
    }
};
