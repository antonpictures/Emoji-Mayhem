import React from 'react';
import VideoPokerGame from '../a-video-poker/poker-App';
import { soundManager } from '../components/SoundManager';

interface VideoPokerScreenProps {
  onBackToTitle: () => void;
}

const VideoPokerScreen: React.FC<VideoPokerScreenProps> = ({ onBackToTitle }) => {
    const handleBackClick = () => {
        soundManager.playClick();
        onBackToTitle();
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center font-sans bg-brand-dark-bg">
            <div className="absolute top-4 left-4 z-50">
                <button
                    onClick={handleBackClick}
                    className="px-6 py-2 font-bold text-sm bg-red-600 hover:bg-red-500 text-white rounded-md transition-all duration-200 transform hover:scale-105"
                >
                    BACK TO MAIN MENU
                </button>
            </div>
            <div className="w-full h-full">
                <VideoPokerGame onBackToTitle={onBackToTitle} />
            </div>
        </div>
    );
};

export default VideoPokerScreen;