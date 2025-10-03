import React, { useState, useMemo, useRef } from 'react';
// Fix: Corrected import path for types.
import { Level, User, Chapter } from '../types';
import { soundManager } from '../components/SoundManager';
import UserProfile from '../components/common/UserProfile';

interface LevelSelectScreenProps {
  levels: Level[];
  communityLevels: Level[];
  onLevelSelect: (level: Level) => void;
  onBackToTitle: () => void;
  onStartEditor: () => void;
  onEditLevel: (level: Level) => void;
  onDeleteLevel: (levelId: number) => void;
  onSaveLevel: (level: Level) => void;
  currentUser: User | null;
  onLogout: () => void;
  chapter: Chapter | null;
}

type ActiveTab = 'campaign' | 'my-levels' | 'community';

const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({
  levels,
  communityLevels,
  onLevelSelect,
  onBackToTitle,
  onStartEditor,
  onEditLevel,
  onDeleteLevel,
  onSaveLevel,
  currentUser,
  onLogout,
  chapter,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    chapter ? 'campaign' : 'my-levels',
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const campaignLevels = useMemo(() => {
    const allCampaign = levels
      .filter((l) => !l.isCustom && !l.isCommunity)
      .sort((a, b) => a.id - b.id);
    if (!chapter) {
      return allCampaign;
    }
    return allCampaign.filter((l) => chapter.levelIds.includes(l.id));
  }, [levels, chapter]);

  const customLevels = levels
    .filter((l) => l.isCustom)
    .sort((a, b) => a.id - b.id);
  const sortedCommunityLevels = [...communityLevels].sort(
    (a, b) => (b.plays || 0) - (a.plays || 0),
  );

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

            // Basic validation
            if (importedLevel && typeof importedLevel.name === 'string' && Array.isArray(importedLevel.enemies)) {
                // Create a new level object to avoid conflicts
                const newLevel: Level = {
                    ...importedLevel,
                    id: Date.now(), // Assign a new unique ID
                    isCustom: true,
                    // Clear any potential community properties
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
    
    // Reset file input to allow importing the same file again
    event.target.value = '';
};


  const TabButton: React.FC<{
    tabId: ActiveTab;
    color: string;
    children: React.ReactNode;
  }> = ({ tabId, color, children }) => {
    const isActive = activeTab === tabId;
    return (
      <button
        onClick={() => setActiveTab(tabId)}
        className={`px-6 py-2 text-sm font-bold rounded-t-lg transition-all ${
          isActive
            ? `${color} text-white`
            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 p-4 font-sans">
      <div className="relative text-center p-6 md:p-10 bg-gray-800 rounded-lg shadow-xl border-2 border-purple-500 max-w-6xl w-full h-[90vh] flex flex-col">
        {currentUser && <UserProfile user={currentUser} onLogout={onLogout} />}
        <h1 className="text-4xl md:text-6xl font-black text-yellow-400 mb-4 tracking-tighter">
          EMOJI Google Maps
        </h1>

        <div className="flex justify-center space-x-2 border-b-2 border-purple-500 mb-4">
          <TabButton tabId="campaign" color="bg-blue-600">
            {chapter ? chapter.name.toUpperCase() : 'CAMPAIGN'}
          </TabButton>
          <TabButton tabId="my-levels" color="bg-green-700">
            MY LEVELS
          </TabButton>
          <TabButton tabId="community" color="bg-purple-600">
            COMMUNITY
          </TabButton>
        </div>

        <div className="flex-grow overflow-y-auto pr-2">
          {activeTab === 'campaign' && (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 md:gap-6">
              {campaignLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleAction(() => onLevelSelect(level))}
                  className="p-2 font-bold text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-all duration-200 transform hover:scale-105 aspect-square flex flex-col justify-center items-center shadow-lg"
                >
                  <span className="block text-xl md:text-4xl font-black">
                    {level.id}
                  </span>
                  <span className="block text-[8px] md:text-xs mt-1 text-center leading-tight font-semibold">
                    {level.name}
                  </span>
                </button>
              ))}
            </div>
          )}
          {activeTab === 'my-levels' && (
            <div>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 md:gap-6">
                    {customLevels.map((level) => (
                        <div key={level.id} className="group relative aspect-square">
                        <button
                            onClick={() => handleAction(() => onLevelSelect(level))}
                            className="w-full h-full p-2 font-bold text-lg bg-green-700 hover:bg-green-600 text-white rounded-md transition-all duration-200 flex flex-col justify-center items-center shadow-lg"
                        >
                            <span className="block text-[8px] md:text-xs text-center leading-tight">
                            {level.name}
                            </span>
                        </button>
                        <div className="absolute -top-2 -right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                            onClick={() => handleAction(() => onEditLevel(level))}
                            className="w-6 h-6 text-xs bg-blue-500 rounded-full shadow-md"
                            >
                            ✏️
                            </button>
                            <button
                            onClick={() => {
                                if (confirm('Delete this level?'))
                                handleAction(() => onDeleteLevel(level.id));
                            }}
                            className="w-6 h-6 text-xs bg-red-500 rounded-full shadow-md"
                            >
                            🗑️
                            </button>
                        </div>
                        </div>
                    ))}
                     <button
                        onClick={() => handleAction(onStartEditor)}
                        className="p-2 font-bold text-lg bg-green-900 hover:bg-green-800 border-2 border-dashed border-green-600 text-green-400 rounded-md transition-all duration-200 transform hover:scale-105 aspect-square flex flex-col justify-center items-center shadow-lg"
                        >
                        <span className="block text-4xl font-black">+</span>
                        <span className="block text-xs mt-1 font-semibold">CREATE</span>
                    </button>
                    <button
                        onClick={handleImportClick}
                        className="p-2 font-bold text-lg bg-gray-700 hover:bg-gray-600 border-2 border-dashed border-gray-500 text-gray-300 rounded-md transition-all duration-200 transform hover:scale-105 aspect-square flex flex-col justify-center items-center shadow-lg"
                        >
                        <span className="block text-4xl font-black">📥</span>
                        <span className="block text-xs mt-1 font-semibold">IMPORT</span>
                    </button>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelected}
                    className="hidden"
                    accept=".json"
                />
            </div>
          )}
           {activeTab === 'community' && (
             <div className="space-y-3">
                {sortedCommunityLevels.map(level => (
                    <div key={level.id} className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-purple-300">{level.name}</h3>
                            <p className="text-xs text-gray-400">by {level.creator} | {level.plays} plays | {level.likes} likes</p>
                        </div>
                        <button 
                            onClick={() => handleAction(() => onLevelSelect(level))}
                            className="px-6 py-2 font-bold text-sm bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-all duration-200 transform hover:scale-105"
                        >
                            PLAY
                        </button>
                    </div>
                ))}
             </div>
           )}
        </div>

        <button
          onClick={() => handleAction(onBackToTitle)}
          className="mt-6 px-8 py-2 self-center font-bold text-md bg-red-600 hover:bg-red-500 text-white rounded-md transition-all duration-200"
        >
          BACK TO CHAPTERS
        </button>
      </div>
    </div>
  );
};

export default LevelSelectScreen;