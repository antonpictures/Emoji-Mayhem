import { Level } from '../../types';

export const level19: Level = {
    id: 19,
    name: 'Sports Champions',
    projectiles: 15,
    enemies: [
        { type: 'hopper', emoji: '🏀', position: { x: 200, y: 525 } },
        { type: 'hopper', emoji: '🎾', position: { x: 400, y: 425 } },
        { type: 'grunt', emoji: '🏈', position: { x: 150, y: 625 } },
        { type: 'grunt', emoji: '⚾', position: { x: 300, y: 325 } },
        { type: 'brute', emoji: '🥊', position: { x: 640, y: 200 } },
        { type: 'hopper', emoji: '🏀', position: { x: 1080, y: 525 } },
        { type: 'hopper', emoji: '🎾', position: { x: 880, y: 425 } },
        { type: 'grunt', emoji: '🏈', position: { x: 1130, y: 625 } },
        { type: 'grunt', emoji: '⚾', position: { x: 980, y: 325 } },
        { type: 'grunt', emoji: '⚽', position: { x: 640, y: 525 } },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l19p1', position: { x: 150, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l19p2', position: { x: 350, y: 450 }, width: 150, height: 20, health: 100 },
        { id: 'l19p3', position: { x: 250, y: 350 }, width: 150, height: 20, health: 100 },
        { id: 'l19p4', position: { x: 980, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l19p5', position: { x: 780, y: 450 }, width: 150, height: 20, health: 100 },
        { id: 'l19p6', position: { x: 880, y: 350 }, width: 150, height: 20, health: 100 },
        { id: 'l19p7', position: { x: 560, y: 250 }, width: 160, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l19s1', position: { x: 150, y: 600 }, emoji: '🥅', fontSize: 150 },
        { id: 'l19s2', position: { x: 1130, y: 600 }, emoji: '🥅', fontSize: 150 },
        { id: 'l19s3', position: { x: 640, y: 400 }, emoji: '🏆', fontSize: 300 },
    ],
    theme: {
      sky: ['#5A9A78', '#80B895', '#A5D6B2']
    }
};