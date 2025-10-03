import { Level } from '../../types';

export const level15: Level = {
    id: 15,
    name: 'Sports Arena',
    projectiles: 12,
    enemies: [
        { type: 'hopper', emoji: '🏀', position: {x: 700, y: 625} },
        { type: 'hopper', emoji: '⚽', position: {x: 850, y: 625} },
        { type: 'hopper', emoji: '🏈', position: {x: 1000, y: 625} },
        { type: 'hopper', emoji: '⚾', position: {x: 1150, y: 625} }
    ],
    breakableBlocks: [
        {id: 'l15b1', position: {x: 800, y: 550}, width: 250, height: 20, health: 100},
    ],
    emojiStructures: [
        {id: 'l15s1', position: {x: 925, y: 470}, emoji: '🏆', fontSize: 150, health: 150},
        {id: 'l15s2', position: {x: 500, y: 600}, emoji: '🥅', fontSize: 120},
    ],
    wormholes: [
        { id: 'l15-wh-a', type: 'black', position: { x: 100, y: 100 }, radius: 30, pairId: 'l15-wh-b' },
        { id: 'l15-wh-b', type: 'white', position: { x: 1180, y: 600 }, radius: 30, pairId: 'l15-wh-a' },
    ],
    blackHoles: [
        { id: 'l15-bh-1', position: { x: 640, y: 200 }, radius: 25, gravityRadius: 200, gravityForce: 150 },
    ],
    theme: {
        sky: ['#60d394', '#aaf683', '#eeef20']
    }
};
