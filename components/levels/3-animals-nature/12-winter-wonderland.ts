import { Level } from '../../types';

export const level12: Level = {
    id: 12,
    name: 'Winter Wonderland',
    projectiles: 10,
    enemies: [
        { type: 'brute', emoji: '⛄', position: {x: 940, y: 385} },
        { type: 'grunt', emoji: '🐧', position: {x: 700, y: 530} },
        { type: 'flyer', emoji: '🦌', position: {x: 940, y: 150} },
        { type: 'grunt', emoji: '🐧', position: {x: 1180, y: 625} },
    ],
    breakableBlocks: [
        {id: 'l12b1', position: {x: 900, y: 420}, health: 80, width: 80, height: 20},
        {id: 'l12b2', position: {x: 890, y: 440}, health: 80, width: 20, height: 210},
        {id: 'l12b3', position: {x: 970, y: 440}, health: 80, width: 20, height: 210},
        {id: 'l12p1', position: {x: 650, y: 550}, width: 150, height: 20, health: 100},
    ],
    emojiStructures: [
        {id: 'l12s1', position: {x: 1150, y: 550}, emoji: '🏔️', fontSize: 200, health: 250},
        {id: 'l12s2', position: {x: 450, y: 610}, emoji: '🌲', fontSize: 100, health: 150},
    ],
    wormholes: [
        { id: 'l12-wh-a', type: 'black', position: { x: 500, y: 100 }, radius: 30, pairId: 'l12-wh-b' },
        { id: 'l12-wh-b', type: 'white', position: { x: 1200, y: 300 }, radius: 30, pairId: 'l12-wh-a' },
    ],
    blackHoles: [
        { id: 'l12-bh-1', position: { x: 200, y: 400 }, radius: 25, gravityRadius: 200, gravityForce: 150 },
    ],
    theme: {
        sky: ['#caf0f8', '#ade8f4', '#90e0ef']
    }
};
