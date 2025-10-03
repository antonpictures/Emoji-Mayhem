import React from 'react';
import RTSGame from '../RTSGame-empirerts';
import { soundManager } from '../components/SoundManager';

interface EmpireRTSScreenProps {
  onBackToTitle: () => void;
}

const EmpireRTSScreen: React.FC<EmpireRTSScreenProps> = ({ onBackToTitle }) => {
    const handleBackClick = () => {
        soundManager.initialize();
        soundManager.playClick();
        onBackToTitle();
    };

    return (
        <div className="w-full h-full">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[110]">
                <button
                    onClick={handleBackClick}
                    className="px-6 py-2 font-bold text-sm bg-red-600 hover:bg-red-500 text-white rounded-md transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                    BACK TO MAIN MENU
                </button>
            </div>
            <RTSGame />
        </div>
    );
};

export default EmpireRTSScreen;