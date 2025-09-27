import { Level } from '../../types';

export const level8: Level = {
    id: 8,
    name: 'Candy Crush',
    projectiles: 12,
    enemies: [
        { type: 'grunt', emoji: '🍭', position: {x: 300, y: 625} },
        { type: 'grunt', emoji: '🍬', position: {x: 400, y: 525} },
        { type: 'grunt', emoji: '🍩', position: {x: 500, y: 425} },
        { type: 'brute', emoji: '🎂', position: {x: 900, y: 610} },
        { type: 'grunt', emoji: '🍪', position: {x: 800, y: 525} },
        { type: 'grunt', emoji: '🍫', position: {x: 1000, y: 425} }
    ],
    platforms: [
        {id: 'l8p1', position: {x: 350, y: 550}, width: 100, height: 20},
        {id: 'l8p2', position: {x: 450, y: 450}, width: 100, height: 20},
        {id: 'l8p3', position: {x: 850, y: 550}, width: 100, height: 20},
        {id: 'l8p4', position: {x: 950, y: 450}, width: 100, height: 20}
    ],
    theme: {
        sky: ['#ffafcc', '#bde0fe', '#a2d2ff']
    }
};
