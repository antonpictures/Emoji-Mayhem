import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    name: 'Travel & Places',
    emoji: '🚀',
    levelIds: [1, 2, 4, 5, 28, 30, 42, 48],
    position: { top: '20%', left: '15%' },
    color: 'blue'
  },
  {
    id: 2,
    name: 'Food & Drink',
    emoji: '🍕',
    levelIds: [3, 8, 11, 43, 46],
    position: { top: '45%', left: '25%' },
    color: 'red'
  },
  {
    id: 3,
    name: 'Animals & Nature',
    emoji: '🦁',
    levelIds: [6, 10, 12, 14, 16, 26, 29, 31, 37],
    position: { top: '70%', left: '35%' },
    color: 'green'
  },
  {
    id: 4,
    name: 'People & Body',
    emoji: '🥷',
    levelIds: [7, 13, 36],
    position: { top: '25%', left: '45%' },
    color: 'yellow'
  },
  {
    id: 5,
    name: 'Activities',
    emoji: '🏆',
    levelIds: [15, 17, 19, 33, 34, 35, 38, 40, 41, 44, 45, 47],
    position: { top: '55%', left: '55%' },
    color: 'purple'
  },
  {
    id: 6,
    name: 'Objects & Symbols',
    emoji: '⚙️',
    levelIds: [9, 18, 20, 21, 22, 23, 24, 25, 27, 32, 39],
    position: { top: '30%', left: '75%' },
    color: 'gray'
  },
];
