import { Level } from '../../types';

export const level17: Level = {
    id: 17,
    name: 'Musical Mayhem',
    projectiles: 18,
    enemies: [
      // Left Side
      { type: 'brute', emoji: '🥁', position: {x: 200, y: 610} },
      { type: 'grunt', emoji: '🎺', position: {x: 250, y: 525} },
      { type: 'grunt', emoji: '🎤', position: {x: 300, y: 425} },
      { type: 'hopper', emoji: '🔔', position: {x: 400, y: 325} },

      // Center
      { type: 'flyer', emoji: '🎶', position: {x: 640, y: 100} },
      { type: 'flyer', emoji: '🎵', position: {x: 640, y: 200} },
      
      // Right Side
      { type: 'brute', emoji: '🎹', position: {x: 1100, y: 610} },
      { type: 'grunt', emoji: '🎻', position: {x: 1050, y: 525} },
      { type: 'grunt', emoji: '🎧', position: {x: 1000, y: 425} },
      { type: 'grunt', emoji: '🎷', position: {x: 900, y: 525} },
    ],
    platforms: [],
    breakableBlocks: [
        { id: 'l17p1', position: { x: 200, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l17p2', position: { x: 250, y: 450 }, width: 150, height: 20, health: 100 },
        { id: 'l17p3', position: { x: 350, y: 350 }, width: 100, height: 20, health: 100 },
        { id: 'l17p4', position: { x: 1000, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l17p5', position: { x: 950, y: 450 }, width: 150, height: 20, health: 100 },
        { id: 'l17p6', position: { x: 850, y: 550 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l17s1', position: { x: 100, y: 550 }, emoji: '🎙️', fontSize: 200 },
        { id: 'l17s2', position: { x: 1180, y: 550 }, emoji: '🎼', fontSize: 200 },
    ],
    theme: {
      sky: ['#8e2de2', '#4a00e0', '#3a0ca3']
    }
};