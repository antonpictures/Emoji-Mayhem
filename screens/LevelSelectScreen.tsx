import React, { useState, useMemo, useRef } from 'react';
// Fix: Corrected import path for types.
import { Level, User } from '../types';
import { soundManager } from '../components/SoundManager';
import UserProfile from '../components/common/UserProfile';

interface LevelSelectScreenProps {
  levels: Level[];
  onLevelSelect: (level: Level) => void;
  onBackToTitle: () => void;
  onStartEditor: () => void;
  onEditLevel: (level: Level) => void;
  onDeleteLevel: (levelId: number) => void;
  onSaveLevel: (level: Level) => void;
  currentUser: User | null;
  onLogout: () => void;
}

type FilterType = 'all' | 'official' | 'community' | 'custom';
type SortType = 'id' | 'plays' | 'name' | 'likes';

const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({
  levels,
  onLevelSelect,
  onBackToTitle,
  onStartEditor,
  onEditLevel,
  onDeleteLevel,
  onSaveLevel,
  currentUser,
  onLogout,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('id');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sortedAndFilteredLevels = useMemo(() => {
    let filtered = levels;
    if (filter === 'official') {
        filtered = levels.filter(l => !l.isCustom && !l.isCommunity);
    } else if (filter === 'community') {
        filtered = levels.filter(l => l.isCommunity);
    } else if (filter === 'custom') {
        filtered = levels.filter(l => l.isCustom);
    }

    return [...filtered].sort((a, b) => {
        switch (sort) {
            case 'plays': return (b.plays || 0) - (a.plays || 0);
            case 'likes': return (b.likes || 0) - (a.likes || 0);
            case 'name': return a.name.localeCompare(b.name);
            case 'id':
            default: return a.id - b.id;
        }
    });
  }, [levels, filter, sort]);


  const handleAction = (action: () => void) => {
    soundManager.initialize();
    soundManager.playClick();
    action();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target?.result as string;
            const importedLevel = JSON.parse(text);

            if (importedLevel && typeof importedLevel.name === 'string' && Array.isArray(importedLevel.enemies)) {
                const newLevel: Level = {
                    ...importedLevel,
                    id: Date.now(),
                    isCustom: true,
                    creator: undefined,
                    plays: undefined,
                    likes: undefined,
                    isCommunity: undefined,
                };
                onSaveLevel(newLevel);
                alert(`Level "${newLevel.name}" imported successfully!`);
            } else {
                throw new Error('Invalid level file format.');
            }
        } catch (error) {
            console.error("Failed to import level:", error);
            alert("Failed to import level. The file may be corrupted or in the wrong format.");
        }
    };
    reader.readAsText(file);
    event.target.value = '';
};

  const FilterButton: React.FC<{ filterType: FilterType, children: React.ReactNode, color: string }> = ({ filterType, children, color }) => (
    <button
      onClick={() => setFilter(filterType)}
      className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${filter === filterType ? `${color} text-white` : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
    >
      {children}
    </button>
  );


  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 p-4 font-sans">
      <div className="relative text-center p-6 bg-gray-800 rounded-lg shadow-xl border-2 border-purple-500 max-w-4xl w-full h-[90vh] flex flex-col">
        {currentUser && <UserProfile user={currentUser} onLogout={onLogout} />}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-yellow-400 mb-4 tracking-tighter">
            SELECT LEVEL
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 px-2">
            <div className="flex space-x-2 mb-2 sm:mb-0">
                <FilterButton filterType="all" color="bg-yellow-600">All</FilterButton>
                <FilterButton filterType="official" color="bg-blue-600">Official</FilterButton>
                <FilterButton filterType="community" color="bg-purple-600">Community</FilterButton>
                <FilterButton filterType="custom" color="bg-green-700">My Levels</FilterButton>
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm font-semibold text-gray-300">Sort by:</label>
                <select id="sort" onChange={(e) => setSort(e.target.value as SortType)} value={sort} className="bg-gray-700 text-white rounded p-2 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option value="id">ID</option>
                    <option value="plays">Most Played</option>
                    <option value="likes">Most Liked</option>
                    <option value="name">Name (A-Z)</option>
                </select>
            </div>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 space-y-3">
             {sortedAndFilteredLevels.map(level => {
                const levelType = level.isCustom ? 'custom' : level.isCommunity ? 'community' : 'official';
                const typeInfo = {
                    official: { color: 'border-blue-500', tag: 'Official' },
                    community: { color: 'border-purple-500', tag: 'Community' },
                    custom: { color: 'border-green-500', tag: 'My Level' },
                };
                return (
                    <div key={level.id} className={`group relative bg-gray-700/50 p-3 rounded-lg flex items-center justify-between border-l-4 ${typeInfo[levelType].color}`}>
                        <div className="flex items-center text-left">
                            <span className="text-2xl font-bold text-gray-400 mr-4 w-10 text-center">{level.id}</span>
                            <div>
                                <h3 className="text-lg font-bold text-white">{level.name}</h3>
                                <div className="text-xs text-gray-400 flex items-center space-x-3 flex-wrap">
                                    {level.creator && <span>by {level.creator}</span>}
                                    <span><span className="text-yellow-400">▶️</span> {(level.plays || 0).toLocaleString()} plays</span>
                                    {level.likes && <span><span className="text-red-400">❤️</span> {level.likes.toLocaleString()} likes</span>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {level.isCustom && (
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleAction(() => onEditLevel(level))} className="w-8 h-8 text-sm bg-blue-500 hover:bg-blue-400 rounded-md shadow-md flex items-center justify-center" title="Edit Level">✏️</button>
                                    <button onClick={() => { if (confirm('Are you sure you want to delete this level?')) handleAction(() => onDeleteLevel(level.id)); }} className="w-8 h-8 text-sm bg-red-500 hover:bg-red-400 rounded-md shadow-md flex items-center justify-center" title="Delete Level">🗑️</button>
                                </div>
                            )}
                            <button onClick={() => handleAction(() => onLevelSelect(level))} className="px-6 py-2 font-bold text-sm bg-yellow-500 hover:bg-yellow-400 text-black rounded-md transition-all duration-200 transform hover:scale-105">
                                PLAY
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-600 flex justify-between items-center">
            <button
            onClick={() => handleAction(onBackToTitle)}
            className="px-6 py-2 font-bold text-md bg-red-600 hover:bg-red-500 text-white rounded-md transition-all"
            >
            MAIN MENU
            </button>
            <div className="flex space-x-2">
                 <button
                    onClick={() => handleAction(onStartEditor)}
                    className="px-6 py-2 font-bold text-md bg-green-700 hover:bg-green-600 text-white rounded-md transition-all"
                    >
                    + CREATE
                </button>
                <button
                    onClick={handleImportClick}
                    className="px-6 py-2 font-bold text-md bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-all"
                    >
                    📥 IMPORT
                </button>
            </div>
        </div>
         <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelected}
            className="hidden"
            accept=".json"
        />
      </div>
    </div>
  );
};

export default LevelSelectScreen;