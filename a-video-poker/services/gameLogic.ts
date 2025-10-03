import { Card, Suit, Value } from '../types';
import { SUITS, VALUES, CARD_VALUE_MAP } from '../constants';

// Create a standard 52-card deck and shuffle it
export const createDeck = (): Card[] => {
    const deck: Card[] = [];
    for (const suit of SUITS) {
        for (const value of VALUES) {
            deck.push({ suit, value });
        }
    }
    // Shuffle using Fisher-Yates algorithm
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

// --- Hand Evaluation Helpers ---

const getCounts = (hand: Card[]) => {
    const valueCounts: { [key: string]: number } = {};
    const suitCounts: { [key: string]: number } = {};
    for (const card of hand) {
        valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
        suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    }
    return { valueCounts, suitCounts };
};

const isFlush = (suitCounts: { [key: string]: number }): boolean => {
    return Object.values(suitCounts).some(count => count === 5);
};

const isStraight = (hand: Card[]): boolean => {
    const sortedValues = hand.map(c => CARD_VALUE_MAP[c.value]).sort((a, b) => a - b);
    // Ace-low straight (A, 2, 3, 4, 5)
    if (JSON.stringify(sortedValues) === JSON.stringify([2, 3, 4, 5, 14])) {
        return true;
    }
    // Standard straight
    for (let i = 0; i < sortedValues.length - 1; i++) {
        if (sortedValues[i+1] - sortedValues[i] !== 1) {
            return false;
        }
    }
    return true;
};

// --- Main Evaluator ---

export const evaluateHand = (hand: Card[]): string => {
    const { valueCounts, suitCounts } = getCounts(hand);
    const values = Object.values(valueCounts);
    const flush = isFlush(suitCounts);
    const straight = isStraight(hand);
    
    if (flush && straight) {
        const sortedValues = hand.map(c => CARD_VALUE_MAP[c.value]).sort((a, b) => a - b);
        if (sortedValues[0] === 10) return "Royal Flush";
        return "Straight Flush";
    }
    if (values.includes(4)) return "Four of a Kind";
    if (values.includes(3) && values.includes(2)) return "Full House";
    if (flush) return "Flush";
    if (straight) return "Straight";
    if (values.includes(3)) return "Three of a Kind";
    if (values.filter(v => v === 2).length === 2) return "Two Pair";
    
    const jacksOrBetter = Object.entries(valueCounts).some(([value, count]) => {
        return count === 2 && ['J', 'Q', 'K', 'A'].includes(value);
    });
    if (jacksOrBetter) return "Jacks or Better";

    return "No Win";
};

// --- Winning Cards Highlighter ---

export const getWinningCards = (hand: Card[], result: string): boolean[] => {
    const winning = [false, false, false, false, false];
    if (result === "No Win") return winning;

    const { valueCounts } = getCounts(hand);

    if (result.includes('Flush') || result === 'Straight') {
        return [true, true, true, true, true];
    }
    
    if (result === "Four of a Kind" || result === "Three of a Kind" || result === "Full House") {
        const targetCount = result === "Four of a Kind" ? 4 : 3;
        const threeOrFour = Object.keys(valueCounts).find(v => valueCounts[v] === targetCount);
        hand.forEach((card, i) => {
            if (card.value === threeOrFour) winning[i] = true;
        });
         if (result === "Full House") {
            const pair = Object.keys(valueCounts).find(v => valueCounts[v] === 2);
            hand.forEach((card, i) => {
                if (card.value === pair) winning[i] = true;
            });
        }
        return winning;
    }

    if (result === "Two Pair" || result === "Jacks or Better") {
        const pairs = Object.keys(valueCounts).filter(v => valueCounts[v] === 2);
        pairs.forEach(pairValue => {
            hand.forEach((card, i) => {
                if (card.value === pairValue) winning[i] = true;
            });
        });
        return winning;
    }

    return winning;
};


// --- Auto Hold AI ---

export const autoHoldStrategy = (hand: Card[]): boolean[] => {
    const holds = [false, false, false, false, false];
    const result = evaluateHand(hand);

    // If we already have a winning hand, hold the winning cards
    if (result !== "No Win") {
        return getWinningCards(hand, result);
    }
    
    // For simplicity, hold any pair or better.
    const { valueCounts } = getCounts(hand);
    const pairs = Object.keys(valueCounts).filter(v => valueCounts[v] >= 2);
    if (pairs.length > 0) {
        pairs.forEach(pairValue => {
            hand.forEach((card, i) => {
                if (card.value === pairValue) {
                    holds[i] = true;
                }
            });
        });
    }

    return holds;
};