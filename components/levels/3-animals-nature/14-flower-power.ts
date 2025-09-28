import { Level } from '../../types';

export const level14: Level = {
    id: 14,
    name: 'Flower Power',
    projectiles: 16,
    enemies: [
        { type: 'grunt', emoji: '🌸', position: {x: 150, y: 525} },
        { type: 'grunt', emoji: '🌹', position: {x: 250, y: 425} },
        { type: 'grunt', emoji: '🌼', position: {x: 350, y: 325} },
        { type: 'grunt', emoji: '🥀', position: {x: 1100, y: 525} },
        { type: 'brute', emoji: '💔', position: {x: 1000, y: 410} },
        { type: 'tank', emoji: '🖤', position: {x: 900, y: 600} }
    ],
    platforms: [],
    breakableBlocks: [
        {id: 'l14b1', position: {x: 850, y: 500}, width: 200, height: 20, health: 100},
        {id: 'l14p1', position: {x: 100, y: 550}, width: 100, height: 20, health: 100},
        {id: 'l14p2', position: {x: 200, y: 450}, width: 100, height: 20, health: 100},
        {id: 'l14p3', position: {x: 300, y: 350}, width: 100, height: 20, health: 100},
        {id: 'l14p4', position: {x: 1050, y: 550}, width: 100, height: 20, health: 100},
        {id: 'l14p5', position: {x: 950, y: 450}, width: 100, height: 20, health: 100},
    ],
    theme: {
        sky: ['#fec5bb', '#fcd5ce', '#fae1dd']
    }
};