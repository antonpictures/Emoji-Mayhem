import { Level } from '../../types';

export const level48: Level = {
    id: 48,
    name: 'Wild West Train Heist',
    projectiles: 15,
    enemies: [
        // Bandits on the train
        { type: 'hopper', position: { x: 1400, y: 430 }, emoji: '🤠' },
        { type: 'grunt', position: { x: 1550, y: 445 }, emoji: '💰' },
        { type: 'brute', position: { x: 1700, y: 430 }, emoji: '💎' },
        { type: 'grunt', position: { x: 1850, y: 445 }, emoji: '🪙' },
        { type: 'sparky', position: { x: 2000, y: 430 }, emoji: '🔫' },
        // Sheriff guarding the loot
        { type: 'brute', position: { x: 2100, y: 430 }, emoji: '👮' },
    ],
    platforms: [
        // Three moving train cars
        { id: 'train-car-1', position: { x: 1400, y: 480 }, width: 200, height: 70, health: 300, movement: { type: 'horizontal-loop', speed: -2.8, startX: 1500, endX: -220 } },
        { id: 'train-car-2', position: { x: 1680, y: 480 }, width: 200, height: 70, health: 300, movement: { type: 'horizontal-loop', speed: -2.8, startX: 1780, endX: 60 } },
        { id: 'train-car-3', position: { x: 1960, y: 480 }, width: 220, height: 70, health: 300, movement: { type: 'horizontal-loop', speed: -2.8, startX: 2060, endX: 340 } },
        
        // Ground platform (station)
        { id: 'station-platform', position: { x: 350, y: 620 }, width: 300, height: 40, health: 200 },
    ],
    breakableBlocks: [
        // Cargo crates on train cars
        { id: 'crate-1', position: { x: 1380, y: 430 }, width: 55, height: 55, health: 120 },
        { id: 'crate-2', position: { x: 1660, y: 430 }, width: 55, height: 55, health: 120 },
        { id: 'crate-3', position: { x: 2050, y: 430 }, width: 55, height: 55, health: 120 },
        
        // Barrels at station
        { id: 'barrel-1', position: { x: 280, y: 575 }, width: 45, height: 45, health: 100 },
        { id: 'barrel-2', position: { x: 460, y: 575 }, width: 45, height: 45, health: 100 },
    ],
    emojiStructures: [
        // Desert scenery
        {id: 'cactus-1', position: { x: 150, y: 600 }, emoji: '🌵', fontSize: 110, health: 90 },
        {id: 'cactus-2', position: { x: 620, y: 610 }, emoji: '🌵', fontSize: 85, health: 90 },
        {id: 'cactus-3', position: { x: 900, y: 595 }, emoji: '🌵', fontSize: 125, health: 90 },
        {id: 'cactus-4', position: { x: 1100, y: 605 }, emoji: '🌵', fontSize: 95, health: 90 },
        
        // Railroad tracks extending across
        {id: 'track-1', position: { x: 150, y: 590 }, emoji: '🛤️', fontSize: 110 },
        {id: 'track-2', position: { x: 350, y: 590 }, emoji: '🛤️', fontSize: 110 },
        {id: 'track-3', position: { x: 550, y: 590 }, emoji: '🛤️', fontSize: 110 },
        {id: 'track-4', position: { x: 750, y: 590 }, emoji: '🛤️', fontSize: 110 },
        {id: 'track-5', position: { x: 950, y: 590 }, emoji: '🛤️', fontSize: 110 },
        {id: 'track-6', position: { x: 1150, y: 590 }, emoji: '🛤️', fontSize: 110 },
        
        // Train station elements
        {id: 'station-sign', position: { x: 400, y: 540 }, emoji: '🏜️', fontSize: 70 },
        {id: 'wanted-poster', position: { x: 250, y: 520 }, emoji: '📜', fontSize: 60, health: 60 },
        
        // Locomotive at the front
        {id: 'locomotive', position: { x: 2250, y: 490 }, emoji: '🚂', fontSize: 140, health: 200 },
        
        // Smoke from train
        {id: 'smoke-1', position: { x: 2200, y: 380 }, emoji: '💨', fontSize: 80 },
        {id: 'smoke-2', position: { x: 2150, y: 330 }, emoji: '☁️', fontSize: 70 },
        
        // Tumbleweed
        {id: 'tumbleweed', position: { x: 800, y: 630 }, emoji: '🌾', fontSize: 60 },
        
        // Horse (getaway vehicle)
        {id: 'horse', position: { x: 550, y: 570 }, emoji: '🐴', fontSize: 80, health: 100 },
    ],
    wormholes: [
        // Tunnel entrance (black wormhole)
        { id: 'l48-wh-a', type: 'black', position: { x: 120, y: 300 }, radius: 35, pairId: 'l48-wh-b' },
        // Tunnel exit (white wormhole) - for quick escapes
        { id: 'l48-wh-b', type: 'white', position: { x: 1160, y: 300 }, radius: 35, pairId: 'l48-wh-a' },
    ],
    blackHoles: [
        // Dust devil hazard in the middle
        { id: 'l48-bh-1', position: { x: 640, y: 400 }, radius: 28, gravityRadius: 200, gravityForce: 140 },
    ],
    theme: {
      sky: ['#d97706', '#f59e0b', '#fbbf24']  // Sunset orange gradient
    }
};