import { Level } from '../../types';

export const level12: Level = {
    id: 12,
    name: 'Winter Wonderland',
    projectiles: 10,
    enemies: [
        { type: 'grunt', emoji: '⛄', position: {x: 950, y: 425} },
        { type: 'grunt', emoji: '🐧', position: {x: 300, y: 625} },
        { type: 'flyer', emoji: '🦌', position: {x: 640, y: 150} }
    ],
    platforms: [],
    breakableBlocks: [
        {id: 'l12b1', position: {x: 850, y: 470}, health: 100, width: 200, height: 20},
        {id: 'l12b2', position: {x: 850, y: 490}, health: 100, width: 20, height: 160},
        {id: 'l12b3', position: {x: 1030, y: 490}, health: 100, width: 20, height: 160},
        {id: 'l12p1', position: {x: 250, y: 550}, width: 150, height: 20, health: 100},
        {id: 'l12p2', position: {x: 900, y: 450}, width: 150, height: 20, health: 100}
    ],
    emojiStructures: [
        {id: 'l12s1', position: {x: 1100, y: 550}, emoji: '🏔️', fontSize: 200}
    ],
    theme: {
        sky: ['#caf0f8', '#ade8f4', '#90e0ef']
    }
};