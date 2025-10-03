import { Level } from '../../types';

export const level17: Level = {
    id: 17,
    name: 'Musical Mayhem',
    projectiles: 18,
    enemies: [
      { type: 'brute', emoji: '🥁', position: {x: 650, y: 610} },
      { type: 'grunt', emoji: '🎺', position: {x: 650, y: 500} },
      { type: 'flyer', emoji: '🎶', position: {x: 940, y: 100} },
      { type: 'brute', emoji: '🎹', position: {x: 1180, y: 610} },
      { type: 'grunt', emoji: '🎻', position: {x: 1050, y: 500} },
      { type: 'grunt', emoji: '🎷', position: {x: 1000, y: 400} },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l17p1', position: { x: 600, y: 520 }, width: 200, height: 20, health: 100 },
        { id: 'l17p2', position: { x: 950, y: 420 }, width: 150, height: 20, health: 100 },
        { id: 'l17p4', position: { x: 1000, y: 520 }, width: 200, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l17s1', position: { x: 500, y: 550 }, emoji: '🎙️', fontSize: 200, health: 200 },
        { id: 'l17s2', position: { x: 1200, y: 350 }, emoji: '🎼', fontSize: 200, health: 100 },
    ],
    wormholes: [
        { id: 'l17-wh-a', type: 'black', position: { x: 100, y: 600 }, radius: 30, pairId: 'l17-wh-b' },
        { id: 'l17-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l17-wh-a' },
    ],
    blackHoles: [
        { id: 'l17-bh-1', position: { x: 940, y: 250 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#8e2de2', '#4a00e0', '#3a0ca3']
    }
};
