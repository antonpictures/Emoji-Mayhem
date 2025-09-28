import { Level } from '../../types';

export const level1: Level = {
    id: 1,
    name: 'Moon Bounce Mania',
    projectiles: 8,
    enemies: [
      { type: 'grunt', position: { x: 300, y: 400 }, emoji: '🚀' },
      { type: 'brute', position: { x: 1000, y: 500 }, emoji: '💎' },
      { type: 'flyer', position: { x: 700, y: 150 }, emoji: '🌙' }
    ],
    platforms: [],
    breakableBlocks: [
      { id: 'l1b1', position: { x: 950, y: 450 }, health: 100, width: 100, height: 100 },
      { id: 'l1p1', position: { x: 250, y: 450 }, width: 100, height: 20, health: 100 },
      { id: 'l1p2', position: { x: 950, y: 550 }, width: 100, height: 20, health: 100 },
      { id: 'l1p3', position: { x: 500, y: 300 }, width: 100, height: 20, health: 100 }
    ],
    emojiStructures: [
        { id: 'l1s1', position: { x: 150, y: 150 }, emoji: 'ੈ✩‧₊࿐ ࿔*', fontSize: 50 },
        { id: 'l1s2', position: { x: 1100, y: 250 }, emoji: '✫゜・。.⋆.˚', fontSize: 50 },
        { id: 'l1s3', position: { x: 800, y: 100 }, emoji: '☁︎⋆｡°✩', fontSize: 50 },
    ],
    theme: {
      sky: ['#000030', '#000045', '#101055']
    }
};