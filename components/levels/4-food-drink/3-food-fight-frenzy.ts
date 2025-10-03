// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level3: Level = {
    id: 3,
    name: "Food Fight Frenzy",
    projectiles: 15,
    enemies: [
        { type: 'brute', position: { x: 940, y: 385 }, emoji: '🎂' },
        { type: 'grunt', position: { x: 1150, y: 530 }, emoji: '🍔' },
        { type: 'grunt', position: { x: 700, y: 530 }, emoji: '🍕' },
        { type: 'flyer', position: { x: 750, y: 150 }, emoji: '☕' },
        { type: 'flyer', position: { x: 1150, y: 150 }, emoji: '🍏' },
    ],
    breakableBlocks: [
        { id: 'l3p1', position: { x: 800, y: 580 }, width: 300, height: 20, health: 100 },
        { id: 'l3p2', position: { x: 900, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l3b1', position: { x: 890, y: 440 }, health: 100, width: 20, height: 140 },
        { id: 'l3b2', position: { x: 990, y: 440 }, health: 100, width: 20, height: 140 },
        { id: 'l3p3', position: { x: 650, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l3p4', position: { x: 1100, y: 550 }, width: 100, height: 20, health: 100 },
    ],
    wormholes: [
        { id: 'l3-wh-a', type: 'black', position: { x: 1200, y: 600 }, radius: 30, pairId: 'l3-wh-b' },
        { id: 'l3-wh-b', type: 'white', position: { x: 100, y: 300 }, radius: 30, pairId: 'l3-wh-a' },
    ],
    blackHoles: [
        { id: 'l3-bh-1', position: { x: 950, y: 100 }, radius: 25, gravityRadius: 220, gravityForce: 160 },
    ],
    theme: {
        sky: ['#ffecd2', '#fcb69f', '#ffc3a0']
    }
};
