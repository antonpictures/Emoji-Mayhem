import React, { useState } from 'react';
// Fix: Corrected the import path for ENEMY_CONFIG.
import { ENEMY_CONFIG } from '../services/GameEngine';
import { soundManager } from './SoundManager';
import { EMOJI_CATEGORIES } from './emoji-data';

interface LevelEditorUIProps {
    onSelectTool: (tool: string | null) => void;
    selectedTool: string | null;
    onTest: () => void;
    onSave: () => void;
    onExit: () => void;
    onUndo: () => void;
    onRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onResetView: () => void;
    onAiGenerate: (prompt: string) => void;
    isAiGenerating: boolean;
}

const LevelEditorUI: React.FC<LevelEditorUIProps> = ({ 
    onSelectTool, selectedTool, onTest, onSave, onExit,
    onUndo, onRedo, canUndo, canRedo,
    onZoomIn, onZoomOut, onResetView,
    onAiGenerate, isAiGenerating
}) => {
    
    const [openCategory, setOpenCategory] = useState<string | null>('Enemies');
    const [aiPrompt, setAiPrompt] = useState('');

    const handleToolClick = (toolId: string) => {
        soundManager.playClick();
        onSelectTool(selectedTool === toolId ? null : toolId);
    };

    const handleActionClick = (action: () => void) => {
        soundManager.playClick();
        action();
    };
    
    // Fix: Add type assertion to resolve property access error on 'config'.
    const enemyTools = Object.entries(ENEMY_CONFIG).map(([key, config]) => ({ id: key, label: (config as any).emoji }));
    const blockTools = [
        { id: 'platform', label: '🟫' },
        { id: 'breakable', label: '🧱' }
    ];

    const categories = {
        'Enemies': enemyTools,
        'Blocks': blockTools,
        ...Object.fromEntries(
            Object.entries(EMOJI_CATEGORIES).map(([categoryName, emojis]) => [
                categoryName,
                emojis.map(emoji => ({ id: `emoji:${emoji}`, label: emoji }))
            ])
        )
    };

    return (
        <div className="flex-shrink-0 h-full w-48 bg-gray-900/80 text-white p-2 flex flex-col space-y-3 overflow-y-auto font-sans">
            {/* Main Actions */}
            <div className="flex-shrink-0">
                <button onClick={() => handleActionClick(onTest)} className="w-full mb-1 p-2 bg-green-600 hover:bg-green-500 rounded font-bold text-xs">TEST</button>
                <button onClick={() => handleActionClick(onSave)} className="w-full p-2 bg-blue-600 hover:bg-blue-500 rounded font-bold text-xs">SAVE & EXIT</button>
                <button onClick={() => handleActionClick(onExit)} className="w-full mt-1 p-2 bg-red-700 hover:bg-red-600 rounded font-bold text-xs">EXIT</button>
            </div>
            
            {/* Edit & View */}
            <div className="flex-shrink-0 space-y-2">
                <div>
                    <h3 className="font-bold text-sm text-yellow-300 mb-1">EDIT</h3>
                    <div className="grid grid-cols-2 gap-1">
                        <button onClick={() => handleActionClick(onUndo)} disabled={!canUndo} className="p-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xs">UNDO</button>
                        <button onClick={() => handleActionClick(onRedo)} disabled={!canRedo} className="p-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xs">REDO</button>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-sm text-yellow-300 mb-1">VIEW</h3>
                    <div className="grid grid-cols-2 gap-1">
                        <button onClick={() => handleActionClick(onZoomIn)} className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-lg font-bold">+</button>
                        <button onClick={() => handleActionClick(onZoomOut)} className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-lg font-bold">-</button>
                    </div>
                    <button onClick={() => handleActionClick(onResetView)} className="w-full mt-1 p-2 bg-gray-700 hover:bg-gray-600 rounded font-bold text-xs">RESET</button>
                </div>
            </div>

            {/* AI Assistant */}
            <div className="flex-shrink-0">
                <h3 className="font-bold text-sm text-yellow-300 mb-1">AI ASSISTANT</h3>
                <textarea 
                    className="w-full h-24 p-1 bg-gray-800 border border-gray-600 rounded text-xs"
                    placeholder="e.g., 'Make this level harder by adding two brutes and a tower.'"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    disabled={isAiGenerating}
                />
                <button 
                    onClick={() => handleActionClick(() => onAiGenerate(aiPrompt))} 
                    className="w-full mt-1 p-2 bg-purple-600 hover:bg-purple-500 rounded font-bold text-xs disabled:opacity-50 disabled:cursor-wait"
                    disabled={isAiGenerating || !aiPrompt.trim()}
                >
                    {isAiGenerating ? 'GENERATING...' : 'GENERATE'}
                </button>
            </div>

            {/* Tools Accordion */}
            <div className="flex-grow">
                 <h3 className="font-bold text-sm text-yellow-300 mb-1">TOOLS</h3>
                 {Object.entries(categories).map(([categoryName, tools]) => (
                    <div key={categoryName} className="mb-1">
                        <button 
                            onClick={() => setOpenCategory(openCategory === categoryName ? null : categoryName)} 
                            className="w-full text-left font-bold text-xs text-blue-300 hover:text-blue-200 py-1 flex justify-between items-center"
                        >
                           <span>{categoryName.toUpperCase()}</span>
                           <span className="text-lg">{openCategory === categoryName ? '−' : '+'}</span>
                        </button>
                        {openCategory === categoryName && (
                            <div className="grid grid-cols-4 gap-1 mt-1 bg-black/20 p-1 rounded-md">
                                {tools.map(tool => (
                                    <button
                                        key={tool.id}
                                        onClick={() => handleToolClick(tool.id)}
                                        className={`p-1 rounded text-2xl transition-all duration-150 transform hover:scale-110 ${selectedTool === tool.id ? 'bg-blue-500 scale-110' : 'bg-gray-700 hover:bg-gray-600'}`}
                                        title={tool.id.startsWith('emoji:') ? tool.label : tool.id}
                                    >
                                        {tool.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Instructions */}
            <div className="text-xs text-gray-400 mt-2 flex-shrink-0">
                <p>L-Click: Place/Select</p>
                <p>Drag: Move selected</p>
                <p>R-Click+Drag: Pan</p>
                <p>R-Click on item: Delete</p>
                <p>Del key: Delete selected</p>
            </div>
        </div>
    );
};

export default LevelEditorUI;