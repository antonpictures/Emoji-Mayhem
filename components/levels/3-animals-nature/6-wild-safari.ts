// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level6: Level = {
    id: 6,
    name: 'Wild Safari',
    projectiles: 12,
    enemies: [
      { type: 'brute', position: { x: 950, y: 385 }, emoji: '🦁' },
      { type: 'grunt', position: { x: 600, y: 625 }, emoji: '🦓' },
      { type: 'hopper', position: { x: 1150, y: 625 }, emoji: '🦒' },
      { type: 'flyer', position: { x: 800, y: 200 }, emoji: '🐘' },
    ],
    breakableBlocks: [
        { id: 'l6p1', position: { x: 900, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l6b1', position: { x: 890, y: 440 }, health: 100, width: 20, height: 210 },
        { id: 'l6b2', position: { x: 990, y: 440 }, health: 100, width: 20, height: 210 },
        { id: 'l6p2', position: { x: 700, y: 550 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        {id: 'l6s1', position: { x: 600, y: 550 }, emoji: '🌳', fontSize: 200, health: 200 },
        {id: 'l6s2', position: { x: 1150, y: 550 }, emoji: '🌲', fontSize: 200, health: 200 },
        {id: 'l6s3', position: { x: 400, y: 620 }, emoji: '🌿', fontSize: 60 },
    ],
    wormholes: [
        { id: 'l6-wh-a', type: 'black', position: { x: 100, y: 500 }, radius: 30, pairId: 'l6-wh-b' },
        { id: 'l6-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l6-wh-a' },
    ],
    blackHoles: [
        { id: 'l6-bh-1', position: { x: 400, y: 300 }, radius: 20, gravityRadius: 170, gravityForce: 110 },
    ],
    theme: {
      sky: ['#f4a261', '#e76f51', '#d4a373']
    }
};
