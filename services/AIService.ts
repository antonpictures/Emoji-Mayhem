import { GoogleGenAI, Type } from '@google/genai';
import { Level } from '../types';
import { ENEMY_CONFIG } from './GameEngine';
import { WORLD_WIDTH, WORLD_HEIGHT, GROUND_Y } from '../constants';

export const generateAiLevel = async (prompt: string, currentLevel: Level): Promise<Level> => {
    const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

    const vec2Schema = {
        type: Type.OBJECT,
        properties: { x: { type: Type.NUMBER }, y: { type: Type.NUMBER } },
        required: ['x', 'y']
    };

    const levelSchema = {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.NUMBER },
            name: { type: Type.STRING },
            projectiles: { type: Type.NUMBER },
            enemies: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING }, type: { type: Type.STRING, enum: Object.keys(ENEMY_CONFIG) },
                        position: vec2Schema, emoji: { type: Type.STRING }, radius: { type: Type.NUMBER }
                    },
                    required: ['type', 'position']
                }
            },
            platforms: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING }, position: vec2Schema, width: { type: Type.NUMBER },
                        height: { type: Type.NUMBER }, health: { type: Type.NUMBER }
                    },
                    required: ['id', 'position', 'width', 'height']
                }
            },
            breakableBlocks: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING }, position: vec2Schema, width: { type: Type.NUMBER },
                        height: { type: Type.NUMBER }, health: { type: Type.NUMBER }
                    },
                    required: ['id', 'position', 'width', 'height', 'health']
                }
            },
            emojiStructures: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING }, position: vec2Schema, emoji: { type: Type.STRING },
                        fontSize: { type: Type.NUMBER }
                    },
                    required: ['id', 'position', 'emoji', 'fontSize']
                }
            },
            theme: {
                type: Type.OBJECT,
                properties: { sky: { type: Type.ARRAY, items: { type: Type.STRING }, minItems: 3, maxItems: 3 } },
                required: ['sky']
            },
            isCustom: { type: Type.BOOLEAN }
        },
        required: ['id', 'name', 'projectiles']
    };

    const systemPrompt = `You are an expert level designer for a 2D physics-based slingshot game called 'Emoji Google Maps'. The world dimensions are ${WORLD_WIDTH}x${WORLD_HEIGHT}. The ground is at y=${GROUND_Y}. (0,0) is the top-left corner.
You will be given the current level design as a JSON object and a user request. Modify the level design based on the request and return the complete, updated JSON object for the entire level.
- Do not add properties that are not in the schema.
- Ensure all object positions are within the world boundaries.
- Make sure objects are not placed below the ground (y=${GROUND_Y}).
- Be creative and make the level fun and playable.
- Maintain existing 'id's for objects when modifying them. Assign new unique IDs for new objects.
- Return ONLY the raw JSON object.`;

    const fullPrompt = `Current Level JSON:\n${JSON.stringify(currentLevel, null, 2)}\n\nUser Request:\n"${prompt}"\n\nNow, provide the complete, modified level JSON object.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: levelSchema,
        },
    });

    return JSON.parse(response.text);
};
