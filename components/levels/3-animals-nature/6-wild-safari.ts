import { Level } from '../../types';

export const level6: Level = {
    id: 6,
    name: 'Wild Safari',
    projectiles: 12,
    enemies: [
      { type: 'brute', position: { x: 950, y: 410 }, emoji: '🦁' },
      { type: 'grunt', position: { x: 300, y: 625 }, emoji: '🦓' },
      { type: 'grunt', position: { x: 1100, y: 625 }, emoji: '🦒' },
      { type: 'hopper', position: { x: 500, y: 625 }, emoji: '🐊' },
      { type: 'flyer', position: { x: 700, y: 200 }, emoji: '🐘' },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l6b1', position: { x: 900, y: 470 }, health: 100, width: 20, height: 180 },
        { id: 'l6b2', position: { x: 1030, y: 470 }, health: 100, width: 20, height: 180 },
        { id: 'l6p1', position: { x: 250, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l6p2', position: { x: 900, y: 450 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        {id: 'l6s1', position: { x: 200, y: 550 }, emoji: '🌳', fontSize: 200 },
        {id: 'l6s2', position: { x: 1100, y: 550 }, emoji: '🌲', fontSize: 200 },
    ],
    theme: {
      sky: ['#f4a261', '#e76f51', '#d4a373']
    }
};