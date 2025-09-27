import React from 'react';
import { ENEMY_CONFIG } from './Game';

interface LevelEditorUIProps {
    onSelectTool: (tool: string | null) => void;
    selectedTool: string | null;
    onTest: () => void;
    onSave: () => void;
    onExit: () => void;
}

const LevelEditorUI: React.FC<LevelEditorUIProps> = ({ onSelectTool, selectedTool, onTest, onSave, onExit }) => {
    
    const tools = [
        ...Object.entries(ENEMY_CONFIG).map(([key, config]) => ({ id: key, label: config.emoji })),
        { id: 'platform', label: '🟫' },
        { id: 'breakable', label: '🧱' }
    ];

    return (
        <div className="absolute top-0 left-0 h-full bg-gray-900/80 text-white p-4 z-40 flex flex-col space-y-4">
            <h3 className="font-press-start text-lg text-yellow-300">TOOLS</h3>
            <div className="grid grid-cols-2 gap-2">
                {tools.map(tool => (
                    <button
                        key={tool.id}
                        onClick={() => onSelectTool(tool.id)}
                        className={`p-2 rounded text-2xl transition-colors ${selectedTool === tool.id ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                        title={tool.id}
                    >
                        {tool.label}
                    </button>
                ))}
            </div>
            
            <div className="flex-grow"></div>

            <div className="space-y-2">
                 <button onClick={onTest} className="w-full p-2 bg-green-600 hover:bg-green-500 rounded font-press-start text-sm">
                    TEST LEVEL
                </button>
                <button onClick={onSave} className="w-full p-2 bg-blue-600 hover:bg-blue-500 rounded font-press-start text-sm">
                    SAVE & EXIT
                </button>
                <button onClick={onExit} className="w-full p-2 bg-red-700 hover:bg-red-600 rounded font-press-start text-sm">
                    EXIT
                </button>
            </div>
            <div className="text-xs text-gray-400 mt-4">
                <p>Click tool, then click screen to place.</p>
                <p>Drag to move.</p>
                <p>Right-click to delete.</p>
            </div>
        </div>
    );
};

export default LevelEditorUI;
