import { Level } from '../../types';

export const level1: Level = {
    id: 1,
    name: 'Moon Bounce Mania',
    projectiles: 8,
    enemies: [
      { type: 'grunt', position: { x: 400, y: 500 }, emoji: '🚀' },
      { type: 'brute', position: { x: 800, y: 400 }, emoji: '💎' },
      { type: 'flyer', position: { x: 600, y: 200 }, emoji: '🌙' }
    ],
    platforms: [
      { id: 'l1p1', position: { x: 350, y: 550 }, width: 100, height: 20 },
      { id: 'l1p2', position: { x: 750, y: 450 }, width: 100, height: 20 }
    ],
    emojiStructures: [
        { id: 'l1s1', position: { x: 200, y: 150 }, emoji: 'ੈ✩‧₊࿐ ࿔*', fontSize: 50 },
        { id: 'l1s2', position: { x: 1000, y: 250 }, emoji: '✫゜・。.⋆.˚', fontSize: 50 },
        { id: 'l1s3', position: { x: 700, y: 100 }, emoji: '☁︎⋆｡°✩', fontSize: 50 },
    ],
    theme: {
      sky: ['#000030', '#000045', '#101055']
    }
};
