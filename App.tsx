import React, { useState, useEffect, useCallback } from 'react';
import Game from './components/Game';
import { LEVELS_DATA as initialLevels } from './components/level-data';
import { COMMUNITY_LEVELS_DATA as communityLevels } from './components/community-levels-data';
import { Level } from './types';

const App: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>(() => {
    const savedLevels = localStorage.getItem('emojiMayhem_customLevels');
    const customLevels = savedLevels ? JSON.parse(savedLevels) : [];
    return [...initialLevels, ...customLevels];
  });

  const handleQuit = () => {
    alert("Thanks for playing!");
    window.location.reload(); 
  };
  
  const saveCustomLevelsToStorage = (customLevels: Level[]) => {
      localStorage.setItem('emojiMayhem_customLevels', JSON.stringify(customLevels));
  };

  const handleSaveLevel = (levelToSave: Level) => {
    setLevels(prevLevels => {
        const customLevels = prevLevels.filter(l => l.isCustom);
        const existingIndex = customLevels.findIndex(l => l.id === levelToSave.id);
        let newCustomLevels;

        if (existingIndex > -1) {
            newCustomLevels = [...customLevels];
            newCustomLevels[existingIndex] = levelToSave;
        } else {
            newCustomLevels = [...customLevels, levelToSave];
        }
        
        saveCustomLevelsToStorage(newCustomLevels);
        return [...initialLevels, ...newCustomLevels];
    });
  };
  
  const handleDeleteLevel = (levelId: number) => {
      setLevels(prevLevels => {
          const newLevels = prevLevels.filter(l => l.id !== levelId);
          const newCustomLevels = newLevels.filter(l => l.isCustom);
          saveCustomLevelsToStorage(newCustomLevels);
          return newLevels;
      });
  };

  return (
    <div className="w-screen h-screen bg-gray-800 flex items-center justify-center font-sans overflow-hidden">
      <Game 
        onQuit={handleQuit} 
        levels={levels}
        communityLevels={communityLevels}
        onSaveLevel={handleSaveLevel}
        onDeleteLevel={handleDeleteLevel}
      />
    </div>
  );
};

export default App;