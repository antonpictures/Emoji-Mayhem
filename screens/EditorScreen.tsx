import React, { useCallback } from 'react';
// Fix: Import Wormhole and BlackHole to be used in type casting.
import { Level, Wormhole, BlackHole } from '../types';
import { useEditorState } from '../hooks/useEditorState';
import GameCanvas from '../components/common/GameCanvas';
import LevelEditorUI from '../components/LevelEditorUI';
import { WORLD_WIDTH, WORLD_HEIGHT } from '../constants';

interface EditorScreenProps {
    initialLevel: Level;
    onSaveAndExit: (level: Level) => void;
    onExitWithoutSaving: () => void;
    onPlaytest: (level: Level) => void;
}

const EditorScreen: React.FC<EditorScreenProps> = ({ initialLevel, onSaveAndExit, onExitWithoutSaving, onPlaytest }) => {
    const {
        editingLevel,
        editorTool,
        setEditorTool,
        historyIndex,
        history,
        zoom,
        viewOffset,
        selectedObjectId,
        isAiGenerating,
        handleUndo,
        handleRedo,
        handleZoom,
        handleResetView,
        handleAiGenerate,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleContextMenu,
        handleKeyDown,
        svgRef
    } = useEditorState(initialLevel);

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleExportLevel = useCallback(() => {
        const levelData = JSON.stringify(editingLevel, null, 2);
        const blob = new Blob([levelData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        // Create a unique filename
        const safeName = editingLevel.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
        const timestamp = Date.now();
        a.download = `emojimap-${safeName}-${timestamp}.json`;
        
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [editingLevel]);
    
    const entities = {
        platforms: editingLevel.platforms || [],
        breakableBlocks: editingLevel.breakableBlocks || [],
        enemies: editingLevel.enemies || [],
        emojiStructures: editingLevel.emojiStructures || [],
        projectiles: [],
        particles: [],
        floatingTexts: [],
        poisonClouds: [],
        // Fix: Cast wormholes and blackHoles to satisfy the Entities type required by GameCanvas.
        wormholes: (editingLevel.wormholes || []) as Wormhole[],
        blackHoles: (editingLevel.blackHoles || []) as BlackHole[],
    };

    return (
        <div className="relative w-full h-full bg-gray-700 flex flex-row items-stretch overflow-hidden">
            <LevelEditorUI
                onSelectTool={setEditorTool}
                selectedTool={editorTool}
                onTest={() => onPlaytest(editingLevel)}
                onSave={() => onSaveAndExit(editingLevel)}
                onExit={onExitWithoutSaving}
                onExport={handleExportLevel}
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                onZoomIn={() => handleZoom('in')}
                onZoomOut={() => handleZoom('out')}
                onResetView={handleResetView}
                onAiGenerate={handleAiGenerate}
                isAiGenerating={isAiGenerating}
            />
            <div className="relative flex-grow h-full">
                 <GameCanvas
                    ref={svgRef}
                    levelTheme={editingLevel.theme}
                    zoom={zoom}
                    viewOffset={viewOffset}
                    entities={entities}
                    isEditing={true}
                    selectedObjectId={selectedObjectId}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onContextMenu={handleContextMenu}
                />
            </div>
        </div>
    );
};

export default EditorScreen;