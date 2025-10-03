/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Empire MPS

import React from 'react';
// FIX: Corrected import paths for types and constants.
import { GameState, BuildingType, Unit, Building, ResourceNode, Terrain } from './types-empirerts';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, UNIT_RADIUS, BUILDING_RADIUS, EMOJI_MAP } from './constants-empirerts';

interface GameCanvasProps {
    gameState: GameState;
    dispatch: React.Dispatch<any>;
    placementMode: BuildingType | null;
    setPlacementMode: (type: BuildingType | null) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ gameState, dispatch, placementMode, setPlacementMode }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
    const [dragEnd, setDragEnd] = React.useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    const getMousePosInWorld = (e: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left + gameState.camera.x;
        const y = e.clientY - rect.top + gameState.camera.y;
        return { x, y };
    };

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // --- Clear and setup ---
        ctx.clearRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        ctx.fillStyle = '#1a472a'; // Dark green background
        ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        ctx.save();
        ctx.translate(-gameState.camera.x, -gameState.camera.y);
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const drawObject = (obj: Unit | Building | ResourceNode | Terrain, emoji: string, radius: number) => {
            // Draw HP bar for units and buildings
            if ('hp' in obj && 'maxHp' in obj && obj.hp < obj.maxHp) {
                const barWidth = radius * 2;
                const barHeight = 5;
                const barX = obj.x - radius;
                const barY = obj.y + radius + 5;
                const hpPercent = obj.hp / obj.maxHp;

                ctx.fillStyle = '#333';
                ctx.fillRect(barX, barY, barWidth, barHeight);
                ctx.fillStyle = hpPercent > 0.5 ? 'green' : hpPercent > 0.2 ? 'orange' : 'red';
                ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(barX, barY, barWidth, barHeight);
            }
             // Draw the object itself
            ctx.font = `${radius * 2}px Arial`;
            ctx.fillText(emoji, obj.x, obj.y);

            // Draw allegiance flag for units
            if ('speed' in obj && obj.owner !== 'NEUTRAL') {
                const flag = obj.owner === 'PLAYER' ? '🔵' : '🚩';
                const flagYOffset = radius + 10;
                ctx.font = `12px Arial`;
                ctx.fillText(flag, obj.x, obj.y - flagYOffset);
            }

            if (gameState.selectedObjectIds.includes(obj.id)) {
                ctx.strokeStyle = 'yellow';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, radius + 5, 0, 2 * Math.PI);
                ctx.stroke();
            }
        };

        // --- Draw Game Objects ---
        gameState.terrain.forEach(t => drawObject(t, EMOJI_MAP[t.type], t.radius));
        gameState.resourceNodes.forEach(r => drawObject(r, EMOJI_MAP[r.visualType || r.type], 25));
        gameState.buildings.forEach(b => {
            ctx.globalAlpha = b.buildProgress < 100 ? 0.5 : 1;
            drawObject(b, EMOJI_MAP[b.type], BUILDING_RADIUS);
            ctx.globalAlpha = 1;
        });
        gameState.units.forEach(u => drawObject(u, EMOJI_MAP[u.type], UNIT_RADIUS));
        
        // --- Draw Fight Effects ---
        gameState.fightEffects.forEach(effect => {
             ctx.fillStyle = `rgba(255, 255, 0, ${effect.ttl / 20})`; // Fade out
             ctx.font = `20px Arial`;
             ctx.fillText('💥', effect.x, effect.y);
        });

        // --- Restore transform for UI elements ---
        ctx.restore();

        // --- Draw Selection Box ---
        if (isDragging) {
            ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
            ctx.fillStyle = 'rgba(255, 255, 0, 0.2)';
            ctx.lineWidth = 1;
            const rectX = Math.min(dragStart.x, dragEnd.x);
            const rectY = Math.min(dragStart.y, dragEnd.y);
            const rectW = Math.abs(dragStart.x - dragEnd.x);
            const rectH = Math.abs(dragStart.y - dragEnd.y);
            ctx.fillRect(rectX, rectY, rectW, rectH);
            ctx.strokeRect(rectX, rectY, rectW, rectH);
        }
        
         // --- Draw Building Placement Preview ---
        if (placementMode) {
            const worldPos = { x: mousePos.x + gameState.camera.x, y: mousePos.y + gameState.camera.y };
            ctx.globalAlpha = 0.5;
            ctx.font = `${BUILDING_RADIUS * 2}px Arial`;
            ctx.fillText(EMOJI_MAP[placementMode], mousePos.x, mousePos.y);
            ctx.globalAlpha = 1.0;
        }

    }, [gameState, isDragging, dragStart, dragEnd, placementMode, mousePos]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        if (e.button === 0) { // Left click
            if(placementMode) {
                 const worldPos = getMousePosInWorld(e);
                 const builder = gameState.units.find(u => gameState.selectedObjectIds.includes(u.id) && u.type === 'Villager');
                 if(builder) {
                    dispatch({ type: 'CREATE_BUILDING', payload: { owner: 'PLAYER', buildingType: placementMode, x: worldPos.x, y: worldPos.y, builderId: builder.id }});
                 }
                 setPlacementMode(null);
                 return;
            }

            setIsDragging(true);
            setDragStart({ x: startX, y: startY });
            setDragEnd({ x: startX, y: startY });
        }
    };
    
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        setMousePos({ x: currentX, y: currentY });

        if (isDragging) {
            setDragEnd({ x: currentX, y: currentY });
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (e.button === 0) { // Left click
            setIsDragging(false);

            const rectX1 = dragStart.x + gameState.camera.x;
            const rectY1 = dragStart.y + gameState.camera.y;
            const rectX2 = dragEnd.x + gameState.camera.x;
            const rectY2 = dragEnd.y + gameState.camera.y;
            
            const selectionBounds = {
                minX: Math.min(rectX1, rectX2),
                minY: Math.min(rectY1, rectY2),
                maxX: Math.max(rectX1, rectX2),
                maxY: Math.max(rectY1, rectY2),
            };

            const isClick = Math.abs(rectX1 - rectX2) < 5 && Math.abs(rectY1 - rectY2) < 5;

            const selectedIds = [
                ...gameState.units,
                ...gameState.buildings,
                ...gameState.resourceNodes,
            ].filter(obj => {
                if (isClick) {
                    return Math.hypot(obj.x - rectX1, obj.y - rectY1) < (obj.type === 'TownHall' ? BUILDING_RADIUS : UNIT_RADIUS) + 10;
                } else {
                    return obj.x > selectionBounds.minX && obj.x < selectionBounds.maxX &&
                           obj.y > selectionBounds.minY && obj.y < selectionBounds.maxY &&
                           obj.owner === 'PLAYER'; // Can only drag-select own units/buildings
                }
            }).map(obj => obj.id);

            // If it's a click, select only the top-most one. For now, we take the first.
             const finalIds = isClick && selectedIds.length > 0 ? [selectedIds[0]] : selectedIds;
             dispatch({ type: 'SELECT_OBJECTS', payload: { objectIds: finalIds } });
        }
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (placementMode) {
            setPlacementMode(null);
            return;
        }

        const worldPos = getMousePosInWorld(e);
        const selectedPlayerUnits = gameState.units.filter(u => gameState.selectedObjectIds.includes(u.id) && u.owner === 'PLAYER');

        if (selectedPlayerUnits.length === 0) return;

        // Check if right-clicked on an enemy, resource, or own building to repair
        const targetObject = [
            ...gameState.units, 
            ...gameState.buildings, 
            ...gameState.resourceNodes
        ].find(obj => Math.hypot(obj.x - worldPos.x, obj.y - worldPos.y) < UNIT_RADIUS + 20);

        if (targetObject) {
            if (targetObject.owner === 'ENEMY') {
                dispatch({ type: 'SET_UNIT_ACTION', payload: { unitIds: selectedPlayerUnits.map(u=>u.id), action: 'attacking', target: targetObject.id } });
            } else if (targetObject.owner === 'NEUTRAL' && 'amount' in targetObject && selectedPlayerUnits.some(u=>u.type === 'Villager')) {
                const villagerIds = selectedPlayerUnits.filter(u=>u.type === 'Villager').map(u=>u.id);
                dispatch({ type: 'SET_UNIT_ACTION', payload: { unitIds: villagerIds, action: 'gathering', target: targetObject.id } });
            } else if (targetObject.owner === 'PLAYER' && 'buildProgress' in targetObject && targetObject.hp < targetObject.maxHp && selectedPlayerUnits.some(u=>u.type === 'Villager')) {
                const villagerIds = selectedPlayerUnits.filter(u=>u.type === 'Villager').map(u=>u.id);
                dispatch({ type: 'SET_UNIT_ACTION', payload: { unitIds: villagerIds, action: 'repairing', target: targetObject.id } });
            }
        } else {
            // It's a move command
            dispatch({ type: 'SET_UNIT_ACTION', payload: { unitIds: selectedPlayerUnits.map(u => u.id), action: 'moving', target: worldPos } });
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width={VIEWPORT_WIDTH}
            height={VIEWPORT_HEIGHT}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onContextMenu={handleContextMenu}
            onMouseLeave={() => setIsDragging(false)}
        />
    );
};

export default GameCanvas;