// Fix: Corrected import path for Level type.
import { Level } from '../../../types';

const volcanoHealth = 30;
const volcanoEmojis = [];
const baseX = 820;
const baseY = 630;
const size = 30;

// Build the volcano cone
for (let row = 0; row < 8; row++) {
    const numCols = 10 - row;
    for (let col = 0; col < numCols; col++) {
        volcanoEmojis.push({
            id: `l10s-v-${row}-${col}`,
            position: { x: baseX + row * (size/2) + col * size, y: baseY - row * size },
            emoji: '🟫',
            fontSize: size,
            health: volcanoHealth
        });
    }
}
// Add lava
volcanoEmojis.push({ id: `l10s-lava1`, position: { x: 930, y: baseY - 8 * size }, emoji: '🟥', fontSize: size * 2, health: volcanoHealth });
volcanoEmojis.push({ id: `l10s-lava2`, position: { x: 960, y: baseY - 7 * size - 10 }, emoji: '🟧', fontSize: size, health: volcanoHealth });
volcanoEmojis.push({ id: `l10s-lava3`, position: { x: 900, y: baseY - 7 * size - 10 }, emoji: '🟧', fontSize: size, health: volcanoHealth });


export const level10: Level = {
    id: 10,
    name: 'Dinosaur Valley',
    projectiles: 10,
    enemies: [
        { type: 'brute', emoji: '🦖', position: {x: 1100, y: 610} },
        { type: 'hopper', emoji: '🦕', position: {x: 650, y: 625} },
        { type: 'grunt', emoji: '🥚', position: {x: 940, y: 300 } }
    ],
    platforms: [],
    breakableBlocks: [
        {id: 'l10b1', position: {x: 850, y: 340}, health: 100, width: 20, height: 310},
        {id: 'l10b2', position: {x: 1010, y: 340}, health: 100, width: 20, height: 310},
        {id: 'l10p1', position: {x: 900, y: 320}, width: 80, height: 20, health: 100}
    ],
    emojiStructures: [
        ...volcanoEmojis,
        {id: 'l10s2', position: {x: 450, y: 600}, emoji: '🌴', fontSize: 120},
        {id: 'l10s3', position: {x: 1200, y: 600}, emoji: '🌴', fontSize: 120},
    ],
    wormholes: [
        { id: 'l10-wh-a', type: 'black', position: { x: 100, y: 150 }, radius: 30, pairId: 'l10-wh-b' },
        { id: 'l10-wh-b', type: 'white', position: { x: 1180, y: 150 }, radius: 30, pairId: 'l10-wh-a' },
    ],
    blackHoles: [
        { id: 'l10-bh-1', position: { x: 640, y: 400 }, radius: 25, gravityRadius: 200, gravityForce: 150 },
    ],
    theme: {
        sky: ['#556b2f', '#8fbc8f', '#2e8b57']
    }
};