// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

export const level45: Level = {
    id: 45,
    name: "Arts & Crafts Corner",
    projectiles: 18,
    enemies: [
        { type: 'grunt', emoji: '🧵', position: { x: 700, y: 625 } },
        { type: 'hopper', emoji: '🎭', position: { x: 1100, y: 625 } },
        { type: 'brute', emoji: '🎨', position: { x: 700, y: 385 } },
        { type: 'brute', emoji: '🖼️', position: { x: 1150, y: 385 } },
        { type: 'sparky', emoji: '🪡', position: { x: 940, y: 250 } },
        { type: 'flyer', emoji: '🪢', position: { x: 940, y: 150 } },
    ],
    breakableBlocks: [
        { id: 'l45p1', position: { x: 650, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l45p2', position: { x: 1100, y: 420 }, width: 100, height: 20, health: 100 },
        { id: 'l45p3', position: { x: 890, y: 270 }, width: 100, height: 20, health: 100 },
        { id: 'l45b1', position: { x: 690, y: 440 }, health: 100, width: 20, height: 210 },
        { id: 'l45b2', position: { x: 1140, y: 440 }, health: 100, width: 20, height: 210 },
    ],
    wormholes: [
        { id: 'l45-wh-a', type: 'black', position: { x: 100, y: 300 }, radius: 30, pairId: 'l45-wh-b' },
        { id: 'l45-wh-b', type: 'white', position: { x: 1180, y: 300 }, radius: 30, pairId: 'l45-wh-a' },
    ],
    blackHoles: [
        { id: 'l45-bh-1', position: { x: 640, y: 100 }, radius: 25, gravityRadius: 180, gravityForce: 130 },
    ],
    theme: {
      sky: ['#f8f7f2', '#e9e3d5', '#d1c8b7']
    }
};
