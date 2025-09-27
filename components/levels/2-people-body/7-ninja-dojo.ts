import { Level } from '../../types';

export const level7: Level = {
    id: 7,
    name: 'Ninja Dojo',
    projectiles: 8,
    enemies: [
      { type: 'hopper', position: { x: 400, y: 475 }, emoji: '🥷' },
      { type: 'hopper', position: { x: 1000, y: 475 }, emoji: '🥷' },
      { type: 'bomber', position: { x: 700, y: 300 }, emoji: '💣' },
    ],
    platforms: [
        { id: 'l7p1', position: { x: 350, y: 500 }, width: 150, height: 20 },
        { id: 'l7p2', position: { x: 950, y: 500 }, width: 150, height: 20 },
    ],
    breakableBlocks: [
        { id: 'l7b1', position: { x: 600, y: 620 }, health: 50, width: 200, height: 30 },
    ],
    emojiStructures: [
        {id: 'l7s1', position: { x: 700, y: 500 }, emoji: '⛩️', fontSize: 300 },
    ],
    theme: {
      sky: ['#800000', '#4d0000', '#260000']
    }
};
