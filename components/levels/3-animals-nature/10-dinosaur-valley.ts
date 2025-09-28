import { Level } from '../../types';

export const level10: Level = {
    id: 10,
    name: 'Dinosaur Valley',
    projectiles: 10,
    enemies: [
        { type: 'brute', emoji: '🦖', position: {x: 1050, y: 610} },
        { type: 'hopper', emoji: '🦕', position: {x: 300, y: 625} },
        { type: 'grunt', emoji: '🥚', position: {x: 640, y: 325} }
    ],
    platforms: [],
    breakableBlocks: [
        {id: 'l10b1', position: {x: 550, y: 370}, health: 100, width: 20, height: 280},
        {id: 'l10b2', position: {x: 710, y: 370}, health: 100, width: 20, height: 280},
        {id: 'l10p1', position: {x: 600, y: 350}, width: 80, height: 20, health: 100}
    ],
    emojiStructures: [
        {id: 'l10s1', position: {x: 640, y: 550}, emoji: '🌋', fontSize: 250}
    ],
    theme: {
        sky: ['#556b2f', '#8fbc8f', '#2e8b57']
    }
};