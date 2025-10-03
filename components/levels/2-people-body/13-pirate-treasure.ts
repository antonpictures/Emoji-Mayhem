import { Level } from '../../types';

export const level13: Level = {
    id: 13,
    name: 'Pool Hall Chaos',
    projectiles: 15,
    enemies: [
        { type: 'grunt', emoji: '🎱', position: {x: 640, y: 360} },      // 8-ball center
        { type: 'brute', emoji: '🎾', position: {x: 900, y: 500} },      // Tennis ball bottom right
        { type: 'bomber', emoji: '⚽', position: {x: 380, y: 500} },     // Soccer ball bottom left
        { type: 'sparky', emoji: '🏀', position: {x: 1100, y: 280} },   // Basketball top right
        { type: 'grunt', emoji: '⚾', position: {x: 180, y: 280} },      // Baseball top left
    ],
    platforms: [],
    emojiStructures: [
        // Pool table felt (green base)
        {id: 'l13s-table', position: {x: 640, y: 400}, emoji: '🟩', fontSize: 600, health: 300},
        
        // Corner pockets
        {id: 'l13s-pocket1', position: {x: 200, y: 150}, emoji: '🕳️', fontSize: 80},
        {id: 'l13s-pocket2', position: {x: 1080, y: 150}, emoji: '🕳️', fontSize: 80},
        {id: 'l13s-pocket3', position: {x: 200, y: 650}, emoji: '🕳️', fontSize: 80},
        {id: 'l13s-pocket4', position: {x: 1080, y: 650}, emoji: '🕳️', fontSize: 80},
        
        // Side pockets
        {id: 'l13s-pocket5', position: {x: 640, y: 130}, emoji: '🕳️', fontSize: 70},
        {id: 'l13s-pocket6', position: {x: 640, y: 670}, emoji: '🕳️', fontSize: 70},
        
        // Pool cue
        {id: 'l13s-cue', position: {x: 400, y: 350}, emoji: '🏑', fontSize: 120},
        
        // Decorative billiard balls (obstacles)
        {id: 'l13s-ball1', position: {x: 500, y: 300}, emoji: '🔴', fontSize: 60, health: 80},
        {id: 'l13s-ball2', position: {x: 780, y: 300}, emoji: '🔵', fontSize: 60, health: 80},
        {id: 'l13s-ball3', position: {x: 500, y: 500}, emoji: '🟡', fontSize: 60, health: 80},
        {id: 'l13s-ball4', position: {x: 780, y: 500}, emoji: '🟠', fontSize: 60, health: 80},
        
        // Triangle rack decoration
        {id: 'l13s-rack', position: {x: 950, y: 360}, emoji: '🔺', fontSize: 90},
    ],
    breakableBlocks: [
        // Cushion rails (table edges)
        {id: 'l13b-rail1', position: {x: 640, y: 100}, width: 380, height: 30, health: 120},
        {id: 'l13b-rail2', position: {x: 640, y: 700}, width: 380, height: 30, health: 120},
        {id: 'l13b-rail3', position: {x: 150, y: 400}, width: 30, height: 280, health: 120},
        {id: 'l13b-rail4', position: {x: 1130, y: 400}, width: 30, height: 280, health: 120},
        
        // Cue ball rest
        {id: 'l13b-rest', position: {x: 350, y: 360}, width: 80, height: 30, health: 100},
    ],
    wormholes: [
        // Entrance wormhole (cue ball entry)
        { id: 'l13-wh-a', type: 'white', position: { x: 120, y: 400 }, radius: 35, pairId: 'l13-wh-b' },
        // Exit wormhole (ball return)
        { id: 'l13-wh-b', type: 'white', position: { x: 1160, y: 400 }, radius: 35, pairId: 'l13-wh-a' },
    ],
    blackHoles: [
        // Center black hole (like center pocket hazard)
        { id: 'l13-bh-1', position: { x: 640, y: 400 }, radius: 30, gravityRadius: 200, gravityForce: 150 },
    ],
    theme: {
        sky: ['#1a4d2e', '#2d5f3f', '#4f7942']  // Dark green felt gradient
    }
};