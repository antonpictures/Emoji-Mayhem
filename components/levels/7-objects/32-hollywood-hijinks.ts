import { Level } from '../../types';

export const level32: Level = {
    id: 32,
    name: 'Hollywood Hijinks',
    projectiles: 18,
    enemies: [
        { type: 'brute', emoji: '🦸‍♂️', position: { x: 250, y: 510 } },
        { type: 'flyer', emoji: '🦇', position: { x: 640, y: 150 } },
        { type: 'sparky', emoji: '⚡', position: { x: 1000, y: 250 } }, // For Harry Potter
        { type: 'grunt', emoji: '🧟', position: { x: 200, y: 625 } },
        { type: 'grunt', emoji: '🧟', position: { x: 280, y: 625 } },
        { type: 'hopper', emoji: '👽', position: { x: 950, y: 425 } },
        { type: 'tank', emoji: '😎', position: { x: 1050, y: 600 } }, // For Terminator
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l32b1', position: { x: 1000, y: 500 }, health: 100, width: 150, height: 100 },
        { id: 'l32p1', position: { x: 200, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l32p2', position: { x: 900, y: 450 }, width: 150, height: 20, health: 100 },
        { id: 'l32p3', position: { x: 1000, y: 300 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l32s1', position: { x: 640, y: 450 }, emoji: '🎬', fontSize: 250 },
        { id: 'l32s2', position: { x: 150, y: 300 }, emoji: '🎥', fontSize: 150 },
    ],
    theme: {
        sky: ['#1c1c1c', '#3a3a3a', '#5a5a5a']
    }
};