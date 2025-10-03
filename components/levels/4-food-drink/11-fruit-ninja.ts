import { Level } from '../../types';

export const level11: Level = {
    id: 11,
    name: 'Fruit Ninja',
    projectiles: 15,
    enemies: [
        { type: 'grunt', emoji: '🍎', position: { x: 700, y: 625 } },
        { type: 'grunt', emoji: '🍊', position: { x: 700, y: 540 } },
        { type: 'grunt', emoji: '🍌', position: { x: 700, y: 460 } },
        { type: 'grunt', emoji: '🍇', position: { x: 1180, y: 625 } },
        { type: 'grunt', emoji: '🍓', position: { x: 1180, y: 540 } },
        { type: 'grunt', emoji: '🥝', position: { x: 1180, y: 460 } },
        { type: 'brute', emoji: '🍍', position: { x: 940, y: 385 } },
        { type: 'hopper', emoji: '🍑', position: { x: 940, y: 625 } }
    ],
    breakableBlocks: [
        {id: 'l11b1', position: {x: 650, y: 560}, width: 100, height: 20, health: 50},
        {id: 'l11b2', position: {x: 650, y: 480}, width: 100, height: 20, health: 50},
        {id: 'l11b3', position: {x: 1130, y: 560}, width: 100, height: 20, health: 50},
        {id: 'l11b4', position: {x: 1130, y: 480}, width: 100, height: 20, health: 50},
        {id: 'l11b5', position: {x: 900, y: 420}, width: 80, height: 20, health: 100},
    ],
    wormholes: [
        { id: 'l11-wh-a', type: 'black', position: { x: 100, y: 200 }, radius: 30, pairId: 'l11-wh-b' },
        { id: 'l11-wh-b', type: 'white', position: { x: 1180, y: 200 }, radius: 30, pairId: 'l11-wh-a' },
    ],
    blackHoles: [
        { id: 'l11-bh-1', position: { x: 940, y: 100 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#ffddd2', '#ffadad', '#ffd6a5']
    }
};
