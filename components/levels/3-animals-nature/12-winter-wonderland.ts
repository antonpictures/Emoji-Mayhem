import { Level } from '../../types';

export const level12: Level = {
    id: 12,
    name: 'Winter Wonderland',
    projectiles: 10,
    enemies: [
        { type: 'grunt', emoji: '⛄', position: {x: 800, y: 625} },
        { type: 'grunt', emoji: '🐧', position: {x: 400, y: 525} },
        { type: 'flyer', emoji: '🦌', position: {x: 640, y: 200} }
    ],
    platforms: [
        {id: 'l12p1', position: {x: 350, y: 550}, width: 150, height: 20},
        {id: 'l12p2', position: {x: 750, y: 550}, width: 150, height: 20}
    ],
    emojiStructures: [
        {id: 'l12s1', position: {x: 1000, y: 550}, emoji: '🏔️', fontSize: 200}
    ],
    theme: {
        sky: ['#caf0f8', '#ade8f4', '#90e0ef']
    }
};
