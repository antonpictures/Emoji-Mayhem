import { Level } from '../../types';

export const level2: Level = {
    id: 2,
    name: 'Spooky Bounce Castle',
    projectiles: 10,
    enemies: [
        { type: 'ghost', position: { x: 800, y: 550 }, emoji: '👻' },
        { type: 'flyer', position: { x: 1000, y: 200 }, emoji: '🦇' },
        { type: 'grunt', position: { x: 950, y: 350 }, emoji: '🎃' },
        { type: 'bomber', position: { x: 600, y: 625 }, emoji: '💀' },
    ],
    platforms: [
        { id: 'l2p1', position: { x: 750, y: 600 }, width: 200, height: 20 },
        { id: 'l2p2', position: { x: 900, y: 400 }, width: 150, height: 20 },
    ],
    emojiStructures: [
        {id: 'l2s1', position: { x: 850, y: 500 }, emoji: '🏰', fontSize: 200 },
    ],
    theme: {
        sky: ['#2c1b47', '#4a2f6c', '#8e44ad']
    }
};
