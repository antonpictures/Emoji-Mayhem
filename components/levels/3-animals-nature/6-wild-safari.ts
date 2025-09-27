import { Level } from '../../types';

export const level6: Level = {
    id: 6,
    name: 'Wild Safari',
    projectiles: 12,
    enemies: [
      { type: 'brute', position: { x: 800, y: 610 }, emoji: '🦁' },
      { type: 'grunt', position: { x: 400, y: 525 }, emoji: '🦓' },
      { type: 'grunt', position: { x: 1000, y: 525 }, emoji: '🦒' },
      { type: 'hopper', position: { x: 600, y: 625 }, emoji: '🐊' },
      { type: 'flyer', position: { x: 700, y: 250 }, emoji: '🐘' },
    ],
    platforms: [
      { id: 'l6p1', position: { x: 350, y: 550 }, width: 150, height: 20 },
      { id: 'l6p2', position: { x: 950, y: 550 }, width: 150, height: 20 },
    ],
    emojiStructures: [
        {id: 'l6s1', position: { x: 200, y: 550 }, emoji: '🌳', fontSize: 200 },
        {id: 'l6s2', position: { x: 1100, y: 550 }, emoji: '🌲', fontSize: 200 },
    ],
    theme: {
      sky: ['#f4a261', '#e76f51', '#d4a373']
    }
};
