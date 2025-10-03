// A simple sound manager using Web Audio API to avoid asset files.
let audioContext: AudioContext | null = null;
let isInitialized = false;

const initializeAudio = () => {
    if (isInitialized || audioContext) return;
    try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        isInitialized = true;
    } catch (e) {
        console.error("Web Audio API is not supported in this browser");
    }
};

type SoundName = 'deal' | 'hold' | 'win' | 'gambleWin' | 'gambleLose' | 'click';

const soundEffects: Record<SoundName, { type: OscillatorType, freq: number, duration: number, vol: number, freqEnd?: number }> = {
    deal: { type: 'sine', freq: 400, duration: 0.1, vol: 0.2 },
    hold: { type: 'sine', freq: 600, duration: 0.05, vol: 0.1 },
    win: { type: 'sine', freq: 800, duration: 0.3, vol: 0.3 },
    gambleWin: { type: 'sine', freq: 1000, duration: 0.15, vol: 0.25 },
    gambleLose: { type: 'sine', freq: 200, duration: 0.4, vol: 0.3 },
    click: { type: 'sine', freq: 700, duration: 0.08, vol: 0.15 },
};


export const playSound = (sound: SoundName) => {
    if (!isInitialized) {
        initializeAudio();
    }
    if (!audioContext) return;

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const sfx = soundEffects[sound];
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = sfx.type;
    oscillator.frequency.setValueAtTime(sfx.freq, audioContext.currentTime);
    if (sfx.freqEnd) {
        oscillator.frequency.exponentialRampToValueAtTime(sfx.freqEnd, audioContext.currentTime + sfx.duration);
    }

    gainNode.gain.setValueAtTime(sfx.vol, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + sfx.duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sfx.duration);
};
