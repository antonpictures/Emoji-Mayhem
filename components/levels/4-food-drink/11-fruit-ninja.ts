import { Level } from '../../types';

export const level11: Level = {
    id: 11,
    name: 'Fruit Ninja',
    projectiles: 15,
    enemies: [
        // Left tower
        { type: 'grunt', emoji: '🍎', position: {x: 200, y: 625} },
        { type: 'grunt', emoji: '🍊', position: {x: 200, y: 550} },
        { type: 'grunt', emoji: '🍌', position: {x: 200, y: 475} },
        
        // Right tower
        { type: 'grunt', emoji: '🍇', position: {x: 1080, y: 625} },
        { type: 'grunt', emoji: '🍓', position: {x: 1080, y: 550} },
        { type: 'grunt', emoji: '🥝', position: {x: 1080, y: 475} },
        
        // Center
        { type: 'brute', emoji: '🍍', position: {x: 640, y: 410} },
        { type: 'hopper', emoji: '🍑', position: {x: 640, y: 625} }
    ],
    breakableBlocks: [
        {id: 'l11b1', position: {x: 150, y: 590}, width: 100, height: 20, health: 50},
        {id: 'l11b2', position: {x: 150, y: 510}, width: 100, height: 20, health: 50},
        {id: 'l11b3', position: {x: 1030, y: 590}, width: 100, height: 20, health: 50},
        {id: 'l11b4', position: {x: 1030, y: 510}, width: 100, height: 20, health: 50},
        {id: 'l11b5', position: {x: 600, y: 450}, width: 80, height: 20, health: 100},
    ],
    theme: {
        sky: ['#ffddd2', '#ffadad', '#ffd6a5']
    }
};