import { Level } from '../../types';

export const level5: Level = {
    id: 5,
    name: 'Space Madness',
    projectiles: 10,
    enemies: [
      { type: 'flyer', position: { x: 600, y: 200 }, emoji: '👽' },
      { type: 'flyer', position: { x: 1200, y: 300 }, emoji: '🛸' },
      { type: 'grunt', position: { x: 1000, y: 625 }, emoji: '⭐' },
      { type: 'brute', position: { x: 800, y: 515 }, emoji: '☄️' },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l5b1', position: { x: 950, y: 470 }, health: 100, width: 20, height: 180 },
        { id: 'l5p1', position: { x: 700, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l5p2', position: { x: 950, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l5b2', position: { x: 1100, y: 400 }, health: 100, width: 80, height: 80 },
    ],
    emojiStructures: [
      { id: 'l5s1', position: { x: 1150, y: 150 }, emoji: '🪐✨˚☽˚｡⋆', fontSize: 50 },
      { id: 'l5s2', position: { x: 500, y: 500 }, emoji: '*ੈ✩‧₊˚✧˖°☾.', fontSize: 50 },
      { id: 'l5s4', position: { x: 400, y: 100 }, emoji: '🌌', fontSize: 150, health: 100 },
    ],
    wormholes: [
        { id: 'l5-wh-a', type: 'black', position: { x: 100, y: 360 }, radius: 35, pairId: 'l5-wh-b' },
        { id: 'l5-wh-b', type: 'white', position: { x: 1180, y: 360 }, radius: 35, pairId: 'l5-wh-a' },
    ],
    theme: {
      sky: ['#000020', '#100525', '#200020']
    }
};
