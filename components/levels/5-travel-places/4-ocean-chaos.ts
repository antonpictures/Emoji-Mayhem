import { Level } from '../../types';

export const level4: Level = {
    id: 4,
    name: 'Ocean Chaos',
    projectiles: 15,
    enemies: [
      { type: 'grunt', position: { x: 800, y: 550 }, emoji: '👨‍✈️' }, // Captain
      { type: 'grunt', position: { x: 950, y: 500 }, emoji: '🧑‍🔧' }, // Sailor
      { type: 'grunt', position: { x: 650, y: 500 }, emoji: '🧑‍🔧' }, // Sailor
      { type: 'grunt', position: { x: 800, y: 450 }, emoji: '👨' }, // Navigator
      { type: 'sparky', position: { x: 1100, y: 400 }, emoji: '⚡' },
      { type: 'brute', position: { x: 300, y: 600 }, emoji: '🐙' },
      { type: 'flyer', position: { x: 400, y: 200 }, emoji: '🦈' },
    ],
    platforms: [
      // Ship decks
      { id: 'l4p1', position: { x: 700, y: 580 }, width: 250, height: 20 }, // Main deck
      { id: 'l4p2', position: { x: 600, y: 530 }, width: 200, height: 20 }, // Lower deck
      { id: 'l4p3', position: { x: 900, y: 530 }, width: 200, height: 20 }, // Lower deck
      { id: 'l4p4', position: { x: 750, y: 480 }, width: 100, height: 20 }, // Captain's quarters
    ],
    breakableBlocks: [
      { id: 'l4bb1', position: { x: 650, y: 620 }, health: 100, width: 50, height: 30 },
      { id: 'l4bb2', position: { x: 950, y: 620 }, health: 100, width: 50, height: 30 },
    ],
    emojiStructures: [
      { id: 'l4s1', position: { x: 800, y: 550 }, emoji: '🚢', fontSize: 250 },
      { id: 'l4s2', position: { x: 150, y: 600 }, emoji: '⚓', fontSize: 100 },
      { id: 'l4s3', position: { x: 640, y: 150 }, emoji: '⛈', fontSize: 150 },
    ],
    theme: {
      sky: ['#23395d', '#192841', '#0f1828']
    }
};
