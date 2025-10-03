// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level7: Level = {
    id: 7,
    name: 'Ninja Dojo',
    projectiles: 10,
    enemies: [
      { type: 'hopper', position: { x: 750, y: 430 }, emoji: '🥷' },
      { type: 'hopper', position: { x: 1100, y: 600 }, emoji: '🥷' },
      { type: 'bomber', position: { x: 920, y: 280 }, emoji: '💣' },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l7p1', position: { x: 700, y: 620 }, width: 450, height: 30, health: 150 },
        { id: 'l7p2', position: { x: 700, y: 450 }, width: 250, height: 20, health: 100 },
        { id: 'l7p3', position: { x: 870, y: 300 }, width: 100, height: 20, health: 100 },
        { id: 'l7b1', position: { x: 720, y: 470 }, health: 100, width: 20, height: 150 },
        { id: 'l7b2', position: { x: 1080, y: 490 }, health: 100, width: 20, height: 130 },
    ],
    emojiStructures: [
        {id: 'l7s1', position: { x: 925, y: 530 }, emoji: '⛩️', fontSize: 200, health: 200 },
        {id: 'l7s2', position: { x: 400, y: 600 }, emoji: '🏮', fontSize: 80 },
    ],
    wormholes: [
        { id: 'l7-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l7-wh-b' },
        { id: 'l7-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l7-wh-a' },
    ],
    blackHoles: [
        { id: 'l7-bh-1', position: { x: 640, y: 200 }, radius: 25, gravityRadius: 190, gravityForce: 140 },
    ],
    theme: {
      sky: ['#800000', '#4d0000', '#260000']
    }
};
