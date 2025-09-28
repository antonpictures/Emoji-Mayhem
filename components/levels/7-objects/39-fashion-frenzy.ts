import { Level } from '../../types';

export const level39: Level = {
    id: 39,
    name: "Fashion Frenzy",
    projectiles: 20,
    enemies: [
        // Left side "shelves"
        { type: 'hopper', emoji: '👠', position: { x: 200, y: 625 } },
        { type: 'hopper', emoji: '👢', position: { x: 300, y: 625 } },
        { type: 'grunt', emoji: '👕', position: { x: 250, y: 525 } },
        { type: 'grunt', emoji: '👖', position: { x: 350, y: 425 } },
        
        // Flyers
        { type: 'flyer', emoji: '🧣', position: { x: 640, y: 150 } },
        { type: 'flyer', emoji: '👔', position: { x: 640, y: 250 } },

        // Right side "display"
        { type: 'tank', emoji: '👑', position: { x: 1000, y: 210 } },
        { type: 'brute', emoji: '👜', position: { x: 1000, y: 410 } },
        { type: 'grunt', emoji: '👗', position: { x: 950, y: 525 } },
        { type: 'grunt', emoji: '👙', position: { x: 1000, y: 625 } },
    ],
    platforms: [],
    breakableBlocks: [
        // Glass supports for the crown's platform
        { id: 'l39b1', position: { x: 940, y: 270 }, health: 50, width: 20, height: 80 },
        { id: 'l39b2', position: { x: 1060, y: 270 }, health: 50, width: 20, height: 80 },
        { id: 'l39p1', position: { x: 200, y: 550 }, width: 100, height: 20, health: 100 },
        { id: 'l39p2', position: { x: 300, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l39p3', position: { x: 900, y: 550 }, width: 150, height: 20, health: 100 },
        { id: 'l39p4', position: { x: 950, y: 450 }, width: 100, height: 20, health: 100 },
        { id: 'l39p5', position: { x: 950, y: 250 }, width: 100, height: 20, health: 100 },
    ],
    emojiStructures: [
        { id: 'l39s1', position: { x: 640, y: 500 }, emoji: '🛍️', fontSize: 300 },
        { id: 'l39s2', position: { x: 100, y: 620 }, emoji: '👟', fontSize: 100 },
        { id: 'l39s3', position: { x: 1180, y: 620 }, emoji: '👞', fontSize: 100 },
    ],
    theme: {
      sky: ['#ffdde1', '#ee9ca7', '#ffdde1'] // Pink, fashion theme
    }
};