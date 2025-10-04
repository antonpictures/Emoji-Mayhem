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
            <RTSGame onBackToTitle={handleBackClick} />
        </div>
    );
};

export default EmpireRTSScreen;