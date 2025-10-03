// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level4: Level = {
    id: 4,
    name: 'Ocean Chaos',
    projectiles: 15,
    enemies: [
      { type: 'brute', position: { x: 650, y: 600 }, emoji: '🐙' },
      { type: 'flyer', position: { x: 940, y: 150 }, emoji: '🦈' },
      { type: 'grunt', position: { x: 900, y: 500 }, emoji: '👨‍✈️' },
      { type: 'grunt', position: { x: 1150, y: 500 }, emoji: '🧑‍🔧' },
      { type: 'sparky', position: { x: 900, y: 270 }, emoji: '⚡' },
    ],
    breakableBlocks: [
      { id: 'l4mast', position: { x: 890, y: 320 }, health: 150, width: 20, height: 200 },
      { id: 'l4deck1', position: { x: 700, y: 550 }, health: 200, width: 500, height: 30 },
      { id: 'l4deck2', position: { x: 800, y: 520 }, width: 400, height: 20, health: 150 },
    ],
    emojiStructures: [
      { id: 'l4s2', position: { x: 550, y: 600 }, emoji: '⚓', fontSize: 100, health: 150 },
      { id: 'l4s3', position: { x: 1220, y: 600 }, emoji: '🌊', fontSize: 100 },
    ],
    wormholes: [
        { id: 'l4-wh-a', type: 'black', position: { x: 100, y: 600 }, radius: 30, pairId: 'l4-wh-b' },
        { id: 'l4-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l4-wh-a' },
    ],
    blackHoles: [
        { id: 'l4-bh-1', position: { x: 400, y: 200 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#23395d', '#192841', '#0f1828']
    }
};
