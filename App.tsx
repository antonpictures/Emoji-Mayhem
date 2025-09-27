
import React, { useState } from 'react';
import Game from './components/Game';
// Fix: Corrected the import name for level data from 'LEVELS' to 'LEVELS_DATA' to match the exported member in the module.
import { LEVELS_DATA as initialLevels } from './components/level-data';
import { Level } from './types';

const App: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>(initialLevels);

  const handleQuit = () => {
    alert("Thanks for playing!");
    window.location.reload(); 
  };
  
  const handleAddLevel = (newLevel: Level) => {
    setLevels(prevLevels => [...prevLevels, { ...newLevel, id: prevLevels.length + 1 }]);
  };

  return (
    <div className="w-screen h-screen bg-gray-800 flex items-center justify-center font-sans overflow-hidden">
      <Game 
        onQuit={handleQuit} 
        levels={levels}
        onAddLevel={handleAddLevel}
      />
    </div>
  );
};

export default App;