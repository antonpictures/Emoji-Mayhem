// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level47: Level = {
    id: 47,
    name: "Flirty Fiesta",
    projectiles: 20,
    enemies: [
        { type: 'brute', emoji: '😈', position: { x: 940, y: 285 } },
        { type: 'tank', emoji: '🥵', position: { x: 940, y: 600 } },
        { type: 'grunt', emoji: '💋', position: { x: 750, y: 500 } },
        { type: 'brute', emoji: '🍑', position: { x: 750, y: 385 } },
        { type: 'grunt', emoji: '🍆', position: { x: 1100, y: 625 } },
        { type: 'brute', emoji: '🍾', position: { x: 1150, y: 485 } },
        { type: 'flyer', emoji: '🎈', position: { x: 600, y: 150 } },
        { type: 'sparky', emoji: '🔥', position: { x: 1200, y: 100 } },
    ],
    breakableBlocks: [
        { id: 'l47p1', position: { x: 700, y: 520 }, width: 100, height: 20, health: 100 },
        { id: 'l47p2', position: { x: 700, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l47p3', position: { x: 1100, y: 520 }, width: 150, height: 20, health: 100 },
        { id: 'l47p4', position: { x: 890, y: 320 }, width: 100, height: 20, health: 100 },
        { id: 'l47b1', position: { x: 890, y: 470 }, health: 150, width: 100, height: 100 }, 
    ],
    emojiStructures: [
        { id: 'l47s3', position: { x: 940, y: 450 }, emoji: '💦', fontSize: 200, health: 50 },
    ],
    wormholes: [
        { id: 'l47-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l47-wh-b' },
        { id: 'l47-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l47-wh-a' },
    ],
    blackHoles: [
        { id: 'l47-bh-1', position: { x: 640, y: 250 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#4a0e2a', '#8d1c4f', '#ff007f']
    }
};
