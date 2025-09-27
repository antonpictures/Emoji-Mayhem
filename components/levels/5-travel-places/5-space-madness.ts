import { Level } from '../../types';

export const level5: Level = {
    id: 5,
    name: 'Space Madness',
    projectiles: 10,
    enemies: [
      { type: 'flyer', position: { x: 300, y: 200 }, emoji: '👽' },
      { type: 'flyer', position: { x: 1000, y: 300 }, emoji: '🛸' },
      { type: 'grunt', position: { x: 800, y: 500 }, emoji: '⭐' },
      { type: 'brute', position: { x: 500, y: 400 }, emoji: '☄️' },
    ],
    platforms: [
      { id: 'l5p1', position: { x: 450, y: 450 }, width: 100, height: 20 },
      { id: 'l5p2', position: { x: 750, y: 550 }, width: 100, height: 20 },
    ],
    emojiStructures: [
      { id: 'l5s1', position: { x: 1100, y: 150 }, emoji: '🪐✨˚☽˚｡⋆', fontSize: 50 },
      { id: 'l5s2', position: { x: 200, y: 500 }, emoji: '*ੈ✩‧₊˚✧˖°☾.', fontSize: 50 },
      { id: 'l5s3', position: { x: 640, y: 100 }, emoji: '₊˚.✈︎‧˖☁︎ ｡˚☽', fontSize: 50 },
      { id: 'l5s4', position: { x: 900, y: 100 }, emoji: '🌌', fontSize: 150 },
    ],
    theme: {
      sky: ['#000020', '#100525', '#200020']
    }
};
