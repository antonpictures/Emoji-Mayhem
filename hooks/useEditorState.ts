import React, { useState, useCallback, useRef, useMemo } from 'react';
import { Level, Vec2, Enemy, Platform, BreakableBlock, EmojiStructure, PokemonType, EnemyType, Wormhole, BlackHole } from '../types';
import { WORLD_WIDTH, WORLD_HEIGHT } from '../constants';
import { generateAiLevel } from '../services/AIService';
// Fix: Corrected the import paths for ENEMY_CONFIG and POKEMON_DATA.
import { ENEMY_CONFIG } from '../services/GameEngine';
import { POKEMON_DATA } from '../components/pokemon-data';

type EditorObjectType = 'enemy' | 'platform' | 'breakableBlock' | 'emojiStructure' | 'wormhole' | 'blackHole';
type EditorObject = (Enemy | Platform | BreakableBlock | EmojiStructure | Wormhole | BlackHole) & { objectType: EditorObjectType };
type DragInfo = {
    type: 'move' | 'resize';
    handle: string; // e.g., 'body', 'bottom-right'
    startMousePos: Vec2;
    startObjectState: EditorObject;
};

const EDITOR_GRID_SNAP = 5;
const MIN_SIZE = 10;

// Sanitizes a level to ensure all objects have a unique ID, which is critical for the editor.
const sanitizeLevel = (level: Level): Level => {
    const levelWithIds = JSON.parse(JSON.stringify(level));
    const assignIdIfNeeded = (obj: { id?: string }, prefix: string) => {
        if (!obj.id) {
            obj.id = `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        }
    };
    (levelWithIds.enemies || []).forEach((e: any) => assignIdIfNeeded(e, 'enm'));
    (levelWithIds.platforms || []).forEach((p: any) => assignIdIfNeeded(p, 'plt'));
    (levelWithIds.breakableBlocks || []).forEach((b: any) => assignIdIfNeeded(b, 'brk'));
    (levelWithIds.emojiStructures || []).forEach((s: any) => assignIdIfNeeded(s, 'emo'));
    (levelWithIds.wormholes || []).forEach((w: any) => assignIdIfNeeded(w, 'wh'));
    (levelWithIds.blackHoles || []).forEach((bh: any) => assignIdIfNeeded(bh, 'bh'));
    return levelWithIds;
};


export const useEditorState = (initialLevel: Level) => {
    const sanitizedInitialLevel = useMemo(() => sanitizeLevel(initialLevel), [initialLevel]);

    const [editingLevel, setEditingLevel] = useState<Level>(sanitizedInitialLevel);
    const [editorTool, setEditorTool] = useState<string | null>(null);
    const [history, setHistory] = useState<Level[]>([JSON.parse(JSON.stringify(sanitizedInitialLevel))]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [viewOffset, setViewOffset] = useState<Vec2>({ x: 0, y: 0 });
    const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
    const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
    const [isAiGenerating, setIsAiGenerating] = useState(false);
    
    const svgRef = useRef<SVGSVGElement>(null);

    const recordHistory = useCallback((newLevelState: Level) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(newLevelState)));
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex]);

    const getEditorObjects = useCallback((): EditorObject[] => {
        if (!editingLevel) return [];
        const allObjects: EditorObject[] = [];
        // Fix: Explicitly construct the Enemy object to ensure it matches the required type,
        // instead of spreading a Partial<Enemy> which caused type errors.
        const fullEnemies: Enemy[] = (editingLevel.enemies || []).map(e => {
            const config = ENEMY_CONFIG[e.type];
            const emoji = e.emoji || config.emoji!;
            const pokemonInfo = POKEMON_DATA[emoji] || { name: 'Unknown', types: [PokemonType.Normal]};
            return {
                id: e.id || `e-editor-${Math.random()}`,
                position: { ...e.position },
                velocity: { x: 0, y: 0 },
                health: config.health!,
                radius: e.radius || config.radius!,
                type: e.type,
                // Fix: Changed 'points' to 'mpsReward' to match the Enemy type definition and fix property access error.
                mpsReward: config.mpsReward!,
                color: config.color!,
                emoji: emoji,
                pokemonTypes: pokemonInfo.types,
                scale: e.scale || {x: 1, y: 1},
                isSolid: config.isSolid,
                jumpCooldown: config.jumpCooldown,
                zigzagDirection: 1, // Default value
            };
        });
        
        fullEnemies.forEach(e => allObjects.push({ ...e, objectType: 'enemy' }));
        editingLevel.platforms?.forEach(p => allObjects.push({ ...p, objectType: 'platform' }));
        editingLevel.breakableBlocks?.forEach(b => allObjects.push({ ...b, objectType: 'breakableBlock' }));
        editingLevel.emojiStructures?.forEach(s => allObjects.push({ ...s, objectType: 'emojiStructure' }));
        editingLevel.wormholes?.forEach(w => allObjects.push({ ...w, objectType: 'wormhole' }));
        editingLevel.blackHoles?.forEach(b => allObjects.push({ ...b, objectType: 'blackHole' }));
        return allObjects;
      }, [editingLevel]);

    const getObjectBoundingBox = useCallback((obj: EditorObject): {x: number, y: number, width: number, height: number} => {
        if ('radius' in obj && obj.objectType !== 'enemy') { // Wormhole, BlackHole
            const o = obj as Wormhole | BlackHole;
            return { x: o.position.x - o.radius, y: o.position.y - o.radius, width: o.radius * 2, height: o.radius * 2 };
        }
        if (obj.objectType === 'enemy') {
            const e = obj as Enemy;
            return { x: e.position.x - e.radius, y: e.position.y - e.radius, width: e.radius * 2, height: e.radius * 2 };
        }
        if (obj.objectType === 'emojiStructure') {
            const s = obj as EmojiStructure;
            return { x: s.position.x - s.fontSize / 2, y: s.position.y - s.fontSize / 2, width: s.fontSize, height: s.fontSize };
        }
        const o = obj as Platform | BreakableBlock;
        return { x: o.position.x, y: o.position.y, width: o.width, height: o.height };
    }, []);

    const getSVGMousePos = useCallback((e: React.MouseEvent, svgElement: SVGSVGElement | null): Vec2 => {
        if (!svgElement) return { x: 0, y: 0 };
        const screenPoint = svgElement.createSVGPoint();
        screenPoint.x = e.clientX;
        screenPoint.y = e.clientY;
        const ctm = svgElement.getScreenCTM();
        if (!ctm) return { x: 0, y: 0 };
        return screenPoint.matrixTransform(ctm.inverse());
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent, svg: SVGSVGElement | null) => {
        if (e.button === 2) return;
        const mousePos = getSVGMousePos(e, svg);
        const handle = (e.target as HTMLElement).dataset?.handle;

        if (handle && selectedObjectId) {
             const selectedObject = getEditorObjects().find(o => o.id === selectedObjectId);
             if (selectedObject) {
                e.stopPropagation();
                setDragInfo({ type: 'resize', handle, startMousePos: mousePos, startObjectState: selectedObject });
                return;
             }
        }
        
        const clickedObject = getEditorObjects().reverse().find(obj => {
            const box = getObjectBoundingBox(obj);
            return mousePos.x >= box.x && mousePos.x <= box.x + box.width && mousePos.y >= box.y && mousePos.y <= box.y + box.height;
        });

        if (clickedObject) {
            e.stopPropagation();
            setSelectedObjectId(clickedObject.id);
            setDragInfo({ type: 'move', handle: 'body', startMousePos: mousePos, startObjectState: clickedObject });
        } else {
            setSelectedObjectId(null);
            if (editorTool) {
                const newLevel = JSON.parse(JSON.stringify(editingLevel!));
                const snappedPos = { x: Math.round(mousePos.x / EDITOR_GRID_SNAP) * EDITOR_GRID_SNAP, y: Math.round(mousePos.y / EDITOR_GRID_SNAP) * EDITOR_GRID_SNAP };
                const id = `${editorTool.slice(0, 4)}-${Date.now()}`;

                if (editorTool === 'platform') {
                    if (!newLevel.platforms) newLevel.platforms = [];
                    newLevel.platforms.push({ id, position: snappedPos, width: 150, height: 20, health: 200, scale: {x: 1, y: 1} });
                } else if (editorTool === 'breakable') {
                    if (!newLevel.breakableBlocks) newLevel.breakableBlocks = [];
                    newLevel.breakableBlocks.push({ id, position: snappedPos, width: 80, height: 80, health: 100, scale: {x: 1, y: 1} });
                } else if (Object.keys(ENEMY_CONFIG).includes(editorTool)) {
                    if (!newLevel.enemies) newLevel.enemies = [];
                    newLevel.enemies.push({ id, type: editorTool as EnemyType, position: snappedPos, emoji: ENEMY_CONFIG[editorTool as EnemyType].emoji, scale: {x: 1, y: 1} });
                } else if (editorTool.startsWith('emoji:')) {
                    const emoji = editorTool.substring('emoji:'.length);
                    if (!newLevel.emojiStructures) newLevel.emojiStructures = [];
                    newLevel.emojiStructures.push({ id: `emoji-${Date.now()}`, position: snappedPos, emoji, fontSize: 50, scale: {x: 1, y: 1} });
                }
                setEditingLevel(newLevel);
                recordHistory(newLevel);
            }
        }
    }, [getSVGMousePos, getEditorObjects, getObjectBoundingBox, editorTool, editingLevel, recordHistory, selectedObjectId]);
    
    const handleMouseMove = useCallback((e: React.MouseEvent, svg: SVGSVGElement | null) => {
        if (!dragInfo || !editingLevel) return;
        const mousePos = getSVGMousePos(e, svg);
        let dx = mousePos.x - dragInfo.startMousePos.x;
        let dy = mousePos.y - dragInfo.startMousePos.y;
        
        const newLevel = JSON.parse(JSON.stringify(editingLevel));
        const collectionMap: Record<EditorObjectType, keyof Level> = {
            enemy: 'enemies',
            platform: 'platforms',
            breakableBlock: 'breakableBlocks',
            emojiStructure: 'emojiStructures',
            wormhole: 'wormholes',
            blackHole: 'blackHoles'
        };
        const collectionName = collectionMap[dragInfo.startObjectState.objectType];
        
        const collection = (newLevel as any)[collectionName] as any[];
        const entity = collection?.find((item: any) => item.id === dragInfo.startObjectState.id);
        if(!entity) return;

        if (dragInfo.type === 'move') {
            const startPos = (dragInfo.startObjectState as any).position;
            entity.position = { x: Math.round((startPos.x + dx) / EDITOR_GRID_SNAP) * EDITOR_GRID_SNAP, y: Math.round((startPos.y + dy) / EDITOR_GRID_SNAP) * EDITOR_GRID_SNAP };
        } else if (dragInfo.type === 'resize') {
            const startState = dragInfo.startObjectState;
            const startBox = getObjectBoundingBox(startState);
            const startScale = (startState as any).scale || { x: 1, y: 1 };
            
            let { x: newX, y: newY, width: newW, height: newH } = startBox;

            if (dragInfo.handle.includes('right')) newW += dx;
            if (dragInfo.handle.includes('left')) { newW -= dx; newX += dx; }
            if (dragInfo.handle.includes('bottom')) newH += dy;
            if (dragInfo.handle.includes('top')) { newH -= dy; newY += dy; }
            if (dragInfo.handle === 'top-center' || dragInfo.handle === 'bottom-center') { newW = startBox.width; newX = startBox.x; }
            if (dragInfo.handle === 'middle-left' || dragInfo.handle === 'middle-right') { newH = startBox.height; newY = startBox.y; }

            const scaleX = newW < 0 ? -1 : 1;
            const scaleY = newH < 0 ? -1 : 1;
            entity.scale = { x: startScale.x * scaleX, y: startScale.y * scaleY };

            if (newW < 0) { newX += newW; newW = -newW; }
            if (newH < 0) { newY += newH; newH = -newH; }
            newW = Math.max(MIN_SIZE, newW);
            newH = Math.max(MIN_SIZE, newH);

            if (entity.objectType === 'enemy' || entity.objectType === 'emojiStructure') {
                const newSize = Math.max(newW, newH);
                entity.position = { x: newX + newW / 2, y: newY + newH / 2 };
                if (entity.objectType === 'enemy') (entity as Enemy).radius = newSize / 2;
                else (entity as EmojiStructure).fontSize = newSize;
            } else {
                entity.position = { x: newX, y: newY };
                (entity as Platform).width = newW;
                (entity as Platform).height = newH;
            }
        }
        setEditingLevel(newLevel);
    }, [dragInfo, editingLevel, getSVGMousePos, getObjectBoundingBox]);
    
    const handleMouseUp = useCallback(() => {
        if (dragInfo && editingLevel) recordHistory(editingLevel);
        setDragInfo(null);
    }, [dragInfo, editingLevel, recordHistory]);

    const handleContextMenu = useCallback((e: React.MouseEvent, svg: SVGSVGElement | null) => {
        e.preventDefault();
        const mousePos = getSVGMousePos(e, svg);
        const clickedObject = getEditorObjects().reverse().find(obj => {
            const box = getObjectBoundingBox(obj);
            return mousePos.x >= box.x && mousePos.x <= box.x + box.width && mousePos.y >= box.y && mousePos.y <= box.y + box.height;
        });
        if (clickedObject && editingLevel) {
            const newLevel = JSON.parse(JSON.stringify(editingLevel));
            const collectionMap: Record<EditorObjectType, keyof Level> = {
                enemy: 'enemies',
                platform: 'platforms',
                breakableBlock: 'breakableBlocks',
                emojiStructure: 'emojiStructures',
                wormhole: 'wormholes',
                blackHole: 'blackHoles'
            };
            const collectionName = collectionMap[clickedObject.objectType];
            (newLevel as any)[collectionName] = ((newLevel as any)[collectionName] as any[]).filter((item: any) => item.id !== clickedObject.id);
            setEditingLevel(newLevel);
            recordHistory(newLevel);
            setSelectedObjectId(null);
        }
    }, [editingLevel, getObjectBoundingBox, getEditorObjects, getSVGMousePos, recordHistory]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key !== 'Delete' || !selectedObjectId || !editingLevel) return;
        const objectToDelete = getEditorObjects().find(o => o.id === selectedObjectId);
        if (objectToDelete) {
            const newLevel = JSON.parse(JSON.stringify(editingLevel));
             const collectionMap: Record<EditorObjectType, keyof Level> = {
                enemy: 'enemies',
                platform: 'platforms',
                breakableBlock: 'breakableBlocks',
                emojiStructure: 'emojiStructures',
                wormhole: 'wormholes',
                blackHole: 'blackHoles'
            };
            const collectionName = collectionMap[objectToDelete.objectType];
            (newLevel as any)[collectionName] = ((newLevel as any)[collectionName] as any[]).filter((item: any) => item.id !== objectToDelete.id);
            setEditingLevel(newLevel);
            recordHistory(newLevel);
            setSelectedObjectId(null);
        }
    }, [selectedObjectId, editingLevel, getEditorObjects, recordHistory]);

    const handleAiGenerate = useCallback(async (prompt: string) => {
        if (!editingLevel) return;
        setIsAiGenerating(true);
        try {
            const newLevelData = await generateAiLevel(prompt, editingLevel);
            const validatedLevel: Level = { ...newLevelData, id: editingLevel.id, isCustom: editingLevel.isCustom };
            setEditingLevel(validatedLevel);
            recordHistory(validatedLevel);
            alert("AI has redesigned the level!");
        } catch (error) {
            console.error("AI level generation failed:", error);
            alert("Sorry, the AI couldn't redesign the level. Please try a different prompt.");
        } finally {
            setIsAiGenerating(false);
        }
    }, [editingLevel, recordHistory]);

    const handleUndo = () => { if (historyIndex > 0) { const newIndex = historyIndex - 1; setHistoryIndex(newIndex); setEditingLevel(history[newIndex]); } };
    const handleRedo = () => { if (historyIndex < history.length - 1) { const newIndex = historyIndex + 1; setHistoryIndex(newIndex); setEditingLevel(history[newIndex]); } };
    const handleZoom = (direction: 'in' | 'out') => setZoom(prev => Math.max(0.2, Math.min(5, direction === 'in' ? prev * 1.2 : prev / 1.2)));
    const handleResetView = () => { setZoom(1); setViewOffset({x: 0, y: 0}); };

    return {
        editingLevel, editorTool, setEditorTool,
        history, historyIndex,
        zoom, viewOffset,
        selectedObjectId,
        isAiGenerating,
        handleUndo, handleRedo, handleZoom, handleResetView,
        handleAiGenerate,
        handleMouseDown, handleMouseMove, handleMouseUp, handleContextMenu,
        handleKeyDown,
        svgRef
    };
};
