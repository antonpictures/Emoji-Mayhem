import { Level } from '../../types';

export const level13: Level = {
    id: 13,
    name: 'Pirate Treasure',
    projectiles: 12,
    enemies: [
        { type: 'grunt', emoji: '🦜', position: {x: 950, y: 425} },
        { type: 'brute', emoji: '💀', position: {x: 800, y: 610} },
        { type: 'grunt', emoji: '💰', position: {x: 400, y: 625} },
        { type: 'bomber', emoji: '💎', position: {x: 800, y: 500} }
    ],
    platforms: [
        {id: 'l13p1', position: {x: 900, y: 450}, width: 100, height: 20}
    ],
    emojiStructures: [
        {id: 'l13s1', position: {x: 200, y: 550}, emoji: '🏝️', fontSize: 200}
    ],
    breakableBlocks: [
        {id: 'l13b1', position: {x: 750, y: 550}, width: 100, height: 60, health: 150}
    ],
    theme: {
        sky: ['#89c2d9', '#61a5c2', '#468faf']
    }
};
