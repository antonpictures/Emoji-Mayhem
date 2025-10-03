// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level1: Level = {
    id: 1,
    name: 'Moon Bounce Mania',
    projectiles: 10,
    enemies: [
      { type: 'grunt', position: { x: 750, y: 625 }, emoji: '🤖' },
      { type: 'grunt', position: { x: 1100, y: 520 }, emoji: '🤖' },
      { type: 'flyer', position: { x: 950, y: 200 }, emoji: '🛸' }
    ],
    breakableBlocks: [
      { id: 'l1b1', position: { x: 1050, y: 540 }, health: 100, width: 100, height: 20 },
      { id: 'l1b2', position: { x: 800, y: 470 }, health: 100, width: 100, height: 20 },
      { id: 'l1b3', position: { x: 790, y: 490 }, health: 100, width: 20, height: 160 },
      { id: 'l1b4', position: { x: 890, y: 490 }, health: 100, width: 20, height: 80 },
    ],
    emojiStructures: [
        { id: 'l1s1', position: { x: 450, y: 150 }, emoji: '⭐', fontSize: 50 },
        { id: 'l1s2', position: { x: 1200, y: 250 }, emoji: '✨', fontSize: 50 },
        { id: 'l1s3', position: { x: 600, y: 100 }, emoji: '🌙', fontSize: 50 },
    ],
    wormholes: [
        { id: 'l1-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l1-wh-b', gravityRadius: 150, gravityForce: 40 },
        { id: 'l1-wh-b', type: 'white', position: { x: 1180, y: 550 }, radius: 30, pairId: 'l1-wh-a', gravityRadius: 150, gravityForce: 40 },
    ],
    blackHoles: [
        { id: 'l1-bh-1', position: { x: 640, y: 360 }, radius: 25, gravityRadius: 200, gravityForce: 150 },
    ],
    theme: {
      sky: ['#000030', '#000045', '#101055']
    }
};
