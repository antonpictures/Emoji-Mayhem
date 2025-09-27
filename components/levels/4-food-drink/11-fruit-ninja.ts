import { Level } from '../../types';

export const level11: Level = {
    id: 11,
    name: 'Fruit Ninja',
    projectiles: 15,
    enemies: [
        { type: 'grunt', emoji: '🍎', position: {x: 200, y: 625} },
        { type: 'grunt', emoji: '🍊', position: {x: 300, y: 625} },
        { type: 'grunt', emoji: '🍌', position: {x: 400, y: 625} },
        { type: 'grunt', emoji: '🍇', position: {x: 800, y: 625} },
        { type: 'grunt', emoji: '🍓', position: {x: 900, y: 625} },
        { type: 'grunt', emoji: '🥝', position: {x: 1000, y: 625} },
        { type: 'grunt', emoji: '🍑', position: {x: 1100, y: 625} }
    ],
    theme: {
        sky: ['#ffddd2', '#ffadad', '#ffd6a5']
    }
};
