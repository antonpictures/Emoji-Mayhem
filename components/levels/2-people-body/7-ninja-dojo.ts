import { Level } from '../../types';

export const level7: Level = {
    id: 7,
    name: 'Ninja Dojo',
    projectiles: 8,
    enemies: [
      { type: 'hopper', position: { x: 300, y: 475 }, emoji: '🥷' },
      { type: 'hopper', position: { x: 980, y: 475 }, emoji: '🥷' },
      { type: 'bomber', position: { x: 640, y: 300 }, emoji: '💣' },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l7b1', position: { x: 540, y: 620 }, health: 50, width: 200, height: 30 },
        { id: 'l7b2', position: { x: 540, y: 370 }, health: 50, width: 20, height: 250 },
        { id: 'l7b3', position: { x: 720, y: 370 }, health: 50, width: 20, height: 250 },
        { id: 'l7p1', position: { x: 250, y: 500 }, width: 150, height: 20, health: 100 },
        { id: 'l7p2', position: { x: 930, y: 500 }, width: 150, height: 20, health: 100 },
        { id: 'l7p3', position: { x: 590, y: 350 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        {id: 'l7s1', position: { x: 640, y: 500 }, emoji: '⛩️', fontSize: 300 },
    ],
    theme: {
      sky: ['#800000', '#4d0000', '#260000']
    }
};