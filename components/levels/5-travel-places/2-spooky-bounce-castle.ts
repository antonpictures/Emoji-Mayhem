import { Level } from '../../types';

export const level2: Level = {
    id: 2,
    name: 'Spooky Bounce Castle',
    projectiles: 12,
    enemies: [
        { type: 'ghost', position: { x: 960, y: 325 }, emoji: '👻' },
        { type: 'flyer', position: { x: 950, y: 150 }, emoji: '🦇' },
        { type: 'grunt', position: { x: 750, y: 625 }, emoji: '🎃' },
        { type: 'bomber', position: { x: 1150, y: 625 }, emoji: '💀' },
    ],
    breakableBlocks: [
        { id: 'l2b1', position: { x: 700, y: 580 }, health: 100, width: 20, height: 70 },
        { id: 'l2b2', position: { x: 1200, y: 580 }, health: 100, width: 20, height: 70 },
        { id: 'l2b3', position: { x: 900, y: 370 }, health: 100, width: 20, height: 180 },
        { id: 'l2b4', position: { x: 1020, y: 370 }, health: 100, width: 20, height: 180 },
        { id: 'l2p1', position: { x: 700, y: 550 }, width: 520, height: 30, health: 100 },
        { id: 'l2p2', position: { x: 900, y: 350 }, width: 140, height: 20, health: 100 },
    ],
    emojiStructures: [
        {id: 'l2s1', position: { x: 950, y: 450 }, emoji: '🏰', fontSize: 250, health: 400 },
        {id: 'l2s2', position: { x: 500, y: 600 }, emoji: '⚰️', fontSize: 80 },
    ],
    wormholes: [
        { id: 'l2-wh-a', type: 'black', position: { x: 550, y: 100 }, radius: 30, pairId: 'l2-wh-b', gravityRadius: 150, gravityForce: 40 },
        { id: 'l2-wh-b', type: 'white', position: { x: 1200, y: 100 }, radius: 30, pairId: 'l2-wh-a', gravityRadius: 150, gravityForce: 40 },
    ],
    blackHoles: [
        { id: 'l2-bh-1', position: { x: 300, y: 500 }, radius: 20, gravityRadius: 180, gravityForce: 120 },
    ],
    theme: {
        sky: ['#2c1b47', '#4a2f6c', '#8e44ad']
    }
};