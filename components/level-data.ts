// Fix: Added level data definitions.
import { Level } from '../types';
import { WORLD_WIDTH, GROUND_Y } from '../constants';

const GRUNT_R = 25;
const BRUTE_R = 40;

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Moon Bounce Mania",
    projectiles: 5,
    enemies: [
      { type: 'grunt', emoji: '💎', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - GRUNT_R } },
      { type: 'grunt', emoji: '💎', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - GRUNT_R } },
      { type: 'flyer', emoji: '🚀', position: { x: WORLD_WIDTH - 250, y: GROUND_Y - 200 } },
    ],
    theme: { sky: ['#000000', '#0a0a2a', '#1a1a3a'] }
  },
  {
    id: 2,
    name: "Spooky Bounce Castle",
    projectiles: 6,
    enemies: [
      { type: 'grunt', emoji: '🎃', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - GRUNT_R } },
      { type: 'ghost', emoji: '👻', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 200 } },
      { type: 'brute', emoji: '💀', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - 120 - BRUTE_R } },
    ],
    platforms: [
        { id: 'p2-1', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 120 }, width: 100, height: 20 }
    ],
    emojiStructures: [
      { id: 's2-1', emoji: '🏰', position: { x: WORLD_WIDTH - 250, y: GROUND_Y - 150 }, fontSize: 250 }
    ],
    theme: { sky: ['#010212', '#2c103c', '#581c87'] }
  },
  {
    id: 3,
    name: "Food Fight Frenzy",
    projectiles: 8,
    enemies: [
      { type: 'grunt', emoji: '🍕', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - GRUNT_R } },
      { type: 'grunt', emoji: '🌮', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - 100 - GRUNT_R } },
      { type: 'grunt', emoji: '🍔', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 200 - GRUNT_R } },
      { type: 'brute', emoji: '🍰', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 300 - BRUTE_R } },
    ],
    platforms: [
        { id: 'p3-1', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 100 }, width: 200, height: 20 },
        { id: 'p3-2', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - 200 }, width: 100, height: 20 },
        { id: 'p3-3', position: { x: WORLD_WIDTH - 250, y: GROUND_Y - 300 }, width: 150, height: 20 },
    ],
    theme: { sky: ['#fde68a', '#fca5a5', '#9333ea'] }
  },
  {
    id: 4,
    name: "Ocean Chaos",
    projectiles: 7,
    enemies: [
      { type: 'flyer', emoji: '🦈', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 200 } },
      { type: 'grunt', emoji: '🐠', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - GRUNT_R } },
      { type: 'brute', emoji: '🐙', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - BRUTE_R } },
      { type: 'sparky', emoji: '⚡', position: { x: WORLD_WIDTH - 500, y: GROUND_Y - 150 } },
    ],
    theme: { sky: ['#0a2a4a', '#0a5a8a', '#0abac2'] }
  },
  {
    id: 5,
    name: "Space Madness",
    projectiles: 8,
    enemies: [
      { type: 'flyer', emoji: '👽', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 250 } },
      { type: 'flyer', emoji: '🛸', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 300 } },
      { type: 'grunt', emoji: '⭐', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 100 - GRUNT_R } },
    ],
    platforms: [
        { id: 'p5-1', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - 100 }, width: 100, height: 20 }
    ],
    theme: { sky: ['#000010', '#100020', '#200030'] }
  },
  {
    id: 6,
    name: "Wild Safari",
    projectiles: 7,
    enemies: [
        { type: 'brute', emoji: '🐘', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - BRUTE_R } },
        { type: 'grunt', emoji: '🦁', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - GRUNT_R } },
        { type: 'grunt', emoji: '🐅', position: { x: WORLD_WIDTH - 450, y: GROUND_Y - 100 - GRUNT_R } },
    ],
    platforms: [
        { id: 'p6-1', position: { x: WORLD_WIDTH - 500, y: GROUND_Y - 100 }, width: 100, height: 20 }
    ],
    emojiStructures: [
        { id: 's6-1', emoji: '🌲', position: { x: WORLD_WIDTH - 150, y: GROUND_Y - 100 }, fontSize: 200 },
        { id: 's6-2', emoji: '🌳', position: { x: WORLD_WIDTH - 600, y: GROUND_Y - 80 }, fontSize: 160 }
    ],
    theme: { sky: ['#fde68a', '#a16207', '#4d7c0f'] }
  },
  {
      id: 7,
      name: "Ninja Dojo",
      projectiles: 8,
      enemies: [
        { type: 'flyer', emoji: '🥷', position: { x: WORLD_WIDTH - 250, y: GROUND_Y - 200 } },
        { type: 'bomber', emoji: '💣', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - BRUTE_R } },
        { type: 'grunt', emoji: '⚔️', position: { x: WORLD_WIDTH - 475, y: GROUND_Y - 150 - GRUNT_R } },
      ],
      breakableBlocks: [
        { id: 'bb7-1', position: { x: WORLD_WIDTH - 550, y: GROUND_Y - 150 }, width: 150, height: 30, health: 100 },
      ],
      platforms: [
        { id: 'p7-2', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - 100 }, width: 200, height: 20 },
      ],
      theme: { sky: ['#1f2937', '#7f1d1d', '#000000'] }
  },
  {
      id: 8,
      name: "Candy Crush",
      projectiles: 10,
      enemies: [
          { type: 'grunt', emoji: '🍭', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - GRUNT_R } },
          { type: 'grunt', emoji: '🍬', position: { x: WORLD_WIDTH - 280, y: GROUND_Y - GRUNT_R } },
          { type: 'brute', emoji: '🍩', position: { x: WORLD_WIDTH - 380, y: GROUND_Y - BRUTE_R } },
          { type: 'flyer', emoji: '🧁', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 200 } },
      ],
      theme: { sky: ['#a5b4fc', '#f9a8d4', '#d8b4fe'] }
  },
  {
      id: 9,
      name: "Robot Uprising",
      projectiles: 8,
      enemies: [
        { type: 'tank', emoji: '🛡️', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - BRUTE_R } },
        { type: 'brute', emoji: '🤖', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 150 - BRUTE_R } },
        { type: 'flyer', emoji: '🛸', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - 250 } },
        { type: 'grunt', emoji: '⚙️', position: { x: WORLD_WIDTH - 500, y: GROUND_Y - GRUNT_R } },
      ],
      platforms: [
        { id: 'p9-1', position: { x: WORLD_WIDTH - 280, y: GROUND_Y - 150 }, width: 160, height: 20 },
      ],
      theme: { sky: ['#4b5563', '#6b7280', '#2563eb'] }
  },
  {
      id: 10,
      name: "Dinosaur Valley",
      projectiles: 9,
      enemies: [
          { type: 'brute', emoji: '🦖', position: { x: WORLD_WIDTH - 250, y: GROUND_Y - BRUTE_R } },
          { type: 'brute', emoji: '🦕', position: { x: WORLD_WIDTH - 450, y: GROUND_Y - BRUTE_R } },
          { type: 'flyer', emoji: '🌋', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - 250 } },
      ],
      theme: { sky: ['#166534', '#b45309', '#78350f'] }
  },
  {
      id: 11,
      name: "Fruit Ninja",
      projectiles: 10,
      enemies: [
          { type: 'flyer', emoji: '🍎', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 200 } },
          { type: 'flyer', emoji: '🍊', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 250 } },
          { type: 'flyer', emoji: '🍌', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 220 } },
          { type: 'flyer', emoji: '🍓', position: { x: WORLD_WIDTH - 500, y: GROUND_Y - 280 } },
      ],
      theme: { sky: ['#fef08a', '#fb923c', '#ef4444'] }
  },
  {
      id: 12,
      name: "Winter Wonderland",
      projectiles: 6,
      enemies: [
          { type: 'brute', emoji: '⛄', position: { x: WORLD_WIDTH - 250, y: GROUND_Y - BRUTE_R } },
          { type: 'grunt', emoji: '🐧', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - 120 - GRUNT_R } },
          { type: 'flyer', emoji: '❄️', position: { x: WORLD_WIDTH - 450, y: GROUND_Y - 200 } },
      ],
      platforms: [
        { id: 'p12-1', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 120 }, width: 100, height: 20 },
      ],
      theme: { sky: ['#ffffff', '#e0f2fe', '#bae6fd'] }
  },
  {
      id: 13,
      name: "Pirate Treasure",
      projectiles: 10,
      enemies: [
          { type: 'brute', emoji: '💀', position: { x: WORLD_WIDTH - 500, y: GROUND_Y - 200 - BRUTE_R } },
          { type: 'grunt', emoji: '💰', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - GRUNT_R } },
          { type: 'grunt', emoji: '💎', position: { x: WORLD_WIDTH - 280, y: GROUND_Y - GRUNT_R } },
          { type: 'flyer', emoji: '🏴‍☠️', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - 300 } },
      ],
      platforms: [
        { id: 'p13-1', position: { x: WORLD_WIDTH - 550, y: GROUND_Y - 200 }, width: 100, height: 20 },
        { id: 'p13-2', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 100 }, width: 300, height: 20 },
      ],
      theme: { sky: ['#0ea5e9', '#06b6d4', '#f59e0b'] }
  },
    {
      id: 14,
      name: "Flower Power",
      projectiles: 7,
      enemies: [
          { type: 'flyer', emoji: '🦋', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 250 } },
          { type: 'grunt', emoji: '🌸', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - GRUNT_R } },
          { type: 'grunt', emoji: '🌻', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - GRUNT_R } },
          { type: 'grunt', emoji: '🌺', position: { x: WORLD_WIDTH - 500, y: GROUND_Y - GRUNT_R } },
      ],
      theme: { sky: ['#fecdd3', '#d9f99d', '#bfdbfe'] }
  },
  {
      id: 15,
      name: "Sports Arena",
      projectiles: 12,
      enemies: [
          { type: 'flyer', emoji: '⚽', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 200 } },
          { type: 'flyer', emoji: '🏀', position: { x: WORLD_WIDTH - 300, y: GROUND_Y - 250 } },
          { type: 'flyer', emoji: '🏈', position: { x: WORLD_WIDTH - 400, y: GROUND_Y - 200 } },
          { type: 'flyer', emoji: '⚾', position: { x: WORLD_WIDTH - 500, y: GROUND_Y - 250 } },
      ],
      platforms: [
        { id: 'p15-1', position: { x: WORLD_WIDTH - 550, y: GROUND_Y - 100 }, width: 20, height: 100 },
        { id: 'p15-2', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - 100 }, width: 20, height: 100 },
      ],
      theme: { sky: ['#86efac', '#22c55e', '#3b82f6'] }
  },
  {
      id: 16,
      name: "Forest Frogs",
      projectiles: 5,
      enemies: [
          { type: 'hopper', emoji: '🐸', position: { x: WORLD_WIDTH - 200, y: GROUND_Y - GRUNT_R } },
          { type: 'hopper', emoji: '🐸', position: { x: WORLD_WIDTH - 350, y: GROUND_Y - GRUNT_R } },
          { type: 'hopper', emoji: '🐸', position: { x: WORLD_WIDTH - 500, y: GROUND_Y - GRUNT_R } },
      ],
      theme: { sky: ['#22c55e', '#16a34a', '#14532d'] }
  }
];