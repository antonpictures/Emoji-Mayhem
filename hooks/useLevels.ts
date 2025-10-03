import { useState, useCallback } from 'react';
import { Level } from '../types';
import { LEVELS_DATA as initialLevels } from '../components/level-data';
import { COMMUNITY_LEVELS_DATA as communityLevelsData } from '../components/community-levels-data';

export const useLevels = () => {
  const [levels, setLevels] = useState<Level[]>(() => {
    const savedLevels = localStorage.getItem('emojiMayhem_customLevels');
    const customLevels = savedLevels ? JSON.parse(savedLevels) : [];
    return [...initialLevels, ...customLevels];
  });

  const [communityLevels] = useState<Level[]>(communityLevelsData);

  const saveCustomLevelsToStorage = (customLevels: Level[]) => {
      localStorage.setItem('emojiMayhem_customLevels', JSON.stringify(customLevels));
  };

  const handleSaveLevel = useCallback((levelToSave: Level) => {
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
  }, []);
  
  const handleDeleteLevel = useCallback((levelId: number) => {
      setLevels(prevLevels => {
          const newLevels = prevLevels.filter(l => l.id !== levelId);
          const newCustomLevels = newLevels.filter(l => l.isCustom);
          saveCustomLevelsToStorage(newCustomLevels);
          return newLevels;
      });
  }, []);

  return { levels, communityLevels, handleSaveLevel, handleDeleteLevel };
};
