import { Level } from '../../types';

export const level10: Level = {
    id: 10,
    name: 'Dinosaur Valley',
    projectiles: 10,
    enemies: [
        { type: 'brute', emoji: '🦖', position: {x: 900, y: 610} },
        { type: 'hopper', emoji: '🦕', position: {x: 400, y: 625} },
        { type: 'grunt', emoji: '🥚', position: {x: 1000, y: 525} }
    ],
    platforms: [
        {id: 'l10p1', position: {x: 950, y: 550}, width: 100, height: 20}
    ],
    emojiStructures: [
        {id: 'l10s1', position: {x: 640, y: 550}, emoji: '🌋', fontSize: 250}
    ],
    theme: {
        sky: ['#556b2f', '#8fbc8f', '#2e8b57']
    }
};
