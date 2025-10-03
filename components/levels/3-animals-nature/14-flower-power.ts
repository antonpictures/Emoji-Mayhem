// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level14: Level = {
    id: 14,
    name: 'Flower Power',
    projectiles: 16,
    enemies: [
        { type: 'grunt', emoji: '🌸', position: {x: 750, y: 615} },
        { type: 'grunt', emoji: '🌹', position: {x: 1150, y: 530} },
        { type: 'brute', emoji: '🥀', position: {x: 1000, y: 500} },
        { type: 'tank', emoji: '🌵', position: {x: 920, y: 265} }
    ],
    breakableBlocks: [
        {id: 'l14p1', position: {x: 700, y: 550}, width: 150, height: 20, health: 100},
        {id: 'l14p2', position: {x: 1100, y: 550}, width: 100, height: 20, health: 100},
        {id: 'l14p3', position: {x: 950, y: 520}, width: 100, height: 20, health: 100},
        {id: 'l14p4', position: {x: 950, y: 420}, width: 100, height: 20, health: 100},
        {id: 'l14b1', position: {x: 870, y: 320}, width: 20, height: 100, health: 100},
        {id: 'l14b2', position: {x: 970, y: 320}, width: 20, height: 100, health: 100},
        {id: 'l14b3', position: {x: 870, y: 300}, width: 120, height: 20, health: 100},
    ],
    emojiStructures: [
        { id: 'l14s1', position: { x: 500, y: 600 }, emoji: '🌷', fontSize: 100 },
        { id: 'l14s2', position: { x: 1200, y: 400 }, emoji: '🌻', fontSize: 100 },
    ],
    wormholes: [
        { id: 'l14-wh-a', type: 'black', position: { x: 100, y: 600 }, radius: 30, pairId: 'l14-wh-b' },
        { id: 'l14-wh-b', type: 'white', position: { x: 1180, y: 100 }, radius: 30, pairId: 'l14-wh-a' },
    ],
    blackHoles: [
        { id: 'l14-bh-1', position: { x: 640, y: 200 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
        sky: ['#fec5bb', '#fcd5ce', '#fae1dd']
    }
};
