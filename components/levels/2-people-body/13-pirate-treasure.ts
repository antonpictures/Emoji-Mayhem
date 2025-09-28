import { Level } from '../../types';

export const level13: Level = {
    id: 13,
    name: 'Pirate Treasure',
    projectiles: 15, // Increased from 12
    enemies: [
        // Original enemies
        { type: 'grunt', emoji: '🦜', position: {x: 950, y: 425} },
        { type: 'brute', emoji: '💀', position: {x: 800, y: 610} },
        { type: 'grunt', emoji: '💰', position: {x: 400, y: 625} },
        { type: 'bomber', emoji: '💎', position: {x: 800, y: 500} },
        
        // New enemies
        { type: 'sparky', emoji: '🧭', position: {x: 500, y: 300} },
        { type: 'grunt', emoji: '🗺️', position: {x: 1100, y: 525} },
    ],
    platforms: [],
    emojiStructures: [
        // Original structure
        {id: 'l13s1', position: {x: 200, y: 550}, emoji: '🏝️', fontSize: 200},
        
        // New wave structures
        {id: 'l13s2', position: {x: 100, y: 670}, emoji: '🌊', fontSize: 80},
        {id: 'l13s3', position: {x: 300, y: 670}, emoji: '🌊', fontSize: 80},
        {id: 'l13s4', position: {x: 500, y: 670}, emoji: '🌊', fontSize: 80},
        {id: 'l13s5', position: {x: 700, y: 670}, emoji: '🌊', fontSize: 80},
        {id: 'l13s6', position: {x: 900, y: 670}, emoji: '🌊', fontSize: 80},
        {id: 'l13s7', position: {x: 1100, y: 670}, emoji: '🌊', fontSize: 80},
    ],
    breakableBlocks: [
        // Original block
        {id: 'l13b1', position: {x: 750, y: 550}, width: 100, height: 60, health: 150},
        // Converted platforms
        {id: 'l13p1', position: {x: 900, y: 450}, width: 100, height: 20, health: 100},
        {id: 'l13p2', position: {x: 450, y: 350}, width: 100, height: 20, health: 100}, // For compass
        {id: 'l13p3', position: {x: 1050, y: 550}, width: 100, height: 20, health: 100}, // For map
        {id: 'l13p4', position: {x: 350, y: 500}, width: 100, height: 20, health: 100},
    ],
    theme: {
        sky: ['#89c2d9', '#61a5c2', '#468faf']
    }
};