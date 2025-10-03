import React from 'react';
import { Level } from '../types';
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
    
    const entities = {
        platforms: editingLevel.platforms || [],
        breakableBlocks: editingLevel.breakableBlocks || [],
        enemies: editingLevel.enemies || [],
        emojiStructures: editingLevel.emojiStructures || [],
        projectiles: [],
        particles: [],
        floatingTexts: [],
        // Fix: Add wormholes and blackHoles to satisfy the Entities type.
        wormholes: editingLevel.wormholes || [],
        blackHoles: editingLevel.blackHoles || [],
    };

    return (
        <div className="relative w-full h-full bg-gray-700 flex flex-row items-stretch overflow-hidden">
            <LevelEditorUI
                onSelectTool={setEditorTool}
                selectedTool={editorTool}
                onTest={() => onPlaytest(editingLevel)}
                onSave={() => onSaveAndExit(editingLevel)}
                onExit={onExitWithoutSaving}
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