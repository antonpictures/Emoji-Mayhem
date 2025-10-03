import React from 'react';
import { soundManager } from './SoundManager';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    soundManager.playClick();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 animate-pop-in"
      onClick={handleClose}
    >
      <div
        className="relative bg-gray-800 border border-purple-500 rounded-2xl shadow-lg p-6 max-w-sm w-full mx-4 text-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          About Google Maps Games
        </h2>
        <p className="text-slate-300 mb-4">
          This gaming experience is proudly brought to you by{' '}
          <strong className="text-yellow-300">$MPS on Solana</strong>.
        </p>

        <a
          href="https://pump.fun/coin/6PHhkb9GNDTp6tsfr9EsZvJjyssxn8yi4HpPnqNvpump"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full my-4 p-3 bg-yellow-500 text-black font-bold text-center rounded-lg shadow-lg hover:bg-yellow-400 transition-colors"
          onClick={() => soundManager.playClick()}
        >
          BUY $MPS to support our games!
        </a>

        <button
          onClick={handleClose}
          className="mt-4 px-6 py-2 font-bold text-md bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AboutModal;
