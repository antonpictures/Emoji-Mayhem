import { useState, useCallback, useMemo } from 'react';
// Fix: Corrected import path for Level type.
import { Level } from '../types';
import { LEVELS_DATA as initialLevels } from '../components/level-data';
import { COMMUNITY_LEVELS_DATA as communityLevelsData } from '../components/community-levels-data';

const CUSTOM_LEVELS_STORAGE_KEY = 'emojiMayhem_customLevels';
const PLAY_COUNTS_STORAGE_KEY = 'emojiMayhem_playCounts';

export const useLevels = () => {
  const [playCounts, setPlayCounts] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(PLAY_COUNTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error('Failed to load play counts:', e);
      return {};
    }
  });

  const [levels, setLevels] = useState<Level[]>(() => {
    try {
      const savedLevels = localStorage.getItem(CUSTOM_LEVELS_STORAGE_KEY);
      const customLevels = savedLevels ? JSON.parse(savedLevels) : [];
      return [...initialLevels, ...communityLevelsData, ...customLevels];
    } catch (e) {
      console.error('Failed to load custom levels:', e);
      return [...initialLevels, ...communityLevelsData];
    }
  });

  const allLevelsWithPlays = useMemo(() => {
    const levelMap = new Map<number, Level>();
    levels.forEach(level => {
      levelMap.set(level.id, level);
    });

    return Array.from(levelMap.values()).map(level => ({
      ...level,
      plays: playCounts[level.id] || level.plays || 0,
    }));
  }, [levels, playCounts]);

  const saveCustomLevelsToStorage = (allLevels: Level[]) => {
    try {
      const customLevels = allLevels.filter(l => l.isCustom);
      localStorage.setItem(CUSTOM_LEVELS_STORAGE_KEY, JSON.stringify(customLevels));
    } catch (e) {
      console.error('Failed to save custom levels:', e);
    }
  };

  const handleSaveLevel = useCallback((levelToSave: Level) => {
    setLevels(prevLevels => {
      const existingIndex = prevLevels.findIndex(l => l.id === levelToSave.id);
      let newLevels;
      if (existingIndex > -1) {
        newLevels = [...prevLevels];
        newLevels[existingIndex] = levelToSave;
      } else {
        newLevels = [...prevLevels, levelToSave];
      }
      saveCustomLevelsToStorage(newLevels);
      return newLevels;
    });
  }, []);

  const handleDeleteLevel = useCallback((levelId: number) => {
    setLevels(prevLevels => {
      const newLevels = prevLevels.filter(l => l.id !== levelId);
      saveCustomLevelsToStorage(newLevels);
      return newLevels;
    });
  }, []);

  const incrementPlayCount = useCallback((levelId: number) => {
    setPlayCounts(prev => {
      const newCounts = { ...prev, [levelId]: (prev[levelId] || 0) + 1 };
      try {
        localStorage.setItem(PLAY_COUNTS_STORAGE_KEY, JSON.stringify(newCounts));
      } catch (e) {
        console.error('Failed to save play counts:', e);
      }
      return newCounts;
    });
  }, []);

  return { levels: allLevelsWithPlays, handleSaveLevel, handleDeleteLevel, incrementPlayCount };
};
