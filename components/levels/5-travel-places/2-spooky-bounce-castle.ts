import { Level } from '../../types';

export const level2: Level = {
    id: 2,
    name: 'Spooky Bounce Castle',
    projectiles: 10,
    enemies: [
        { type: 'ghost', position: { x: 900, y: 350 }, emoji: '👻' },
        { type: 'flyer', position: { x: 1100, y: 150 }, emoji: '🦇' },
        { type: 'grunt', position: { x: 850, y: 625 }, emoji: '🎃' },
        { type: 'bomber', position: { x: 400, y: 625 }, emoji: '💀' },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l2b1', position: { x: 800, y: 420 }, health: 100, width: 20, height: 230 },
        { id: 'l2b2', position: { x: 980, y: 420 }, health: 100, width: 20, height: 230 },
        { id: 'l2b3', position: { x: 800, y: 620 }, health: 100, width: 200, height: 30 },
        { id: 'l2p1', position: { x: 800, y: 400 }, width: 200, height: 20, health: 100 },
        { id: 'l2p2', position: { x: 1000, y: 250 }, width: 150, height: 20, health: 100 },
    ],
    emojiStructures: [
        {id: 'l2s1', position: { x: 900, y: 500 }, emoji: '🏰', fontSize: 250 },
    ],
    theme: {
        sky: ['#2c1b47', '#4a2f6c', '#8e44ad']
    }
};