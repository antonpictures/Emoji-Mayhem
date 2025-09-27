import { Level } from '../../types';

export const level27: Level = {
    id: 27,
    name: 'Campus Chaos',
    projectiles: 18,
    enemies: [
        // Ground floor
        { type: 'grunt', emoji: '🤓', position: { x: 200, y: 625 } },
        { type: 'hopper', emoji: '🐯', position: { x: 1080, y: 625 } }, // Biology

        // First floor
        { type: 'grunt', emoji: '📘', position: { x: 300, y: 525 } }, // Math
        { type: 'grunt', emoji: '📙', position: { x: 400, y: 525 } }, // Philosophy
        { type: 'brute', emoji: '📖', position: { x: 950, y: 510 } }, // History

        // High places
        { type: 'grunt', emoji: '📜', position: { x: 1100, y: 325 } }, // Law
        { type: 'tank', emoji: '🌏', position: { x: 640, y: 400 } }, // Geography
        { type: 'sparky', emoji: '🌠', position: { x: 500, y: 150 } }, // Physics
    ],
    platforms: [
        // "Building" structure
        // Left side
        { id: 'l27p1', position: { x: 250, y: 550 }, width: 200, height: 20 },
        // Right side
        { id: 'l27p2', position: { x: 900, y: 550 }, width: 200, height: 20 },
        { id: 'l27p3', position: { x: 1050, y: 350 }, width: 100, height: 20 },
        // Center
        { id: 'l27p4', position: { x: 540, y: 450 }, width: 200, height: 20 },
    ],
    breakableBlocks: [
        { id: 'l27b1', position: { x: 900, y: 480 }, health: 100, width: 200, height: 30 },
    ],
    emojiStructures: [
        { id: 'l27s1', position: { x: 640, y: 250 }, emoji: '🎓', fontSize: 250 },
    ],
    theme: {
        sky: ['#6d4c41', '#a1887f', '#d7ccc8'] // University, library tones
    }
};