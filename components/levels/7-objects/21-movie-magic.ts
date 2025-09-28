import { Level } from '../../types';

export const level21: Level = {
    id: 21,
    name: 'Movie Magic',
    projectiles: 15,
    enemies: [
      { type: 'brute', emoji: '📺', position: { x: 250, y: 500 } },
      { type: 'grunt', emoji: '📷', position: { x: 150, y: 625 } },
      { type: 'grunt', emoji: '📹', position: { x: 350, y: 625 } },
      { type: 'grunt', emoji: '🔦', position: { x: 950, y: 325 } },
      { type: 'sparky', emoji: '💡', position: { x: 640, y: 150 } },
      { type: 'brute', emoji: '🎥', position: { x: 1050, y: 500 } },
      { type: 'grunt', emoji: '📼', position: { x: 1150, y: 625 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l21p1', position: { x: 200, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l21p2', position: { x: 1000, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l21p3', position: { x: 900, y: 350 }, width: 150, height: 20, health: 100 },
        { id: 'l21p4', position: { x: 560, y: 200 }, width: 160, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l21s1', position: { x: 640, y: 450 }, emoji: '🎬', fontSize: 250 },
        { id: 'l21s2', position: { x: 1100, y: 250 }, emoji: '📽️', fontSize: 150 },
        { id: 'l21s3', position: { x: 200, y: 250 }, emoji: '🏮', fontSize: 150 },
    ],
    theme: {
      sky: ['#141414', '#2d2d2d', '#4a4a4a']
    }
};