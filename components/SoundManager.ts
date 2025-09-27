// A simple sound manager using Web Audio API to avoid asset files.
class SoundManager {
    private audioContext: AudioContext | null = null;
    private isInitialized = false;

    // Initialize must be called from a user gesture, like a click.
    public initialize() {
        if (this.isInitialized || this.audioContext) return;
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.isInitialized = true;
        } catch (e) {
            console.error("Web Audio API is not supported in this browser");
        }
    }

    private playSound(type: OscillatorType, frequency: number, duration: number, volume: number = 0.5) {
        if (!this.audioContext) return;
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // --- Public methods for different game sounds ---

    public playFire() {
        this.playSound('sine', 100, 0.2, 0.2);
        this.playSound('triangle', 600, 0.2, 0.2);
    }
    
    public playBounce() {
        this.playSound('sine', 300, 0.1, 0.3);
    }

    public playImpact() {
        this.playSound('square', 150, 0.15, 0.4);
    }
    
    public playDestroy() {
        // A little explosion sound
        this.playSound('sawtooth', 400, 0.3, 0.5);
        this.playSound('sawtooth', 200, 0.3, 0.5);
    }
    
    public playBlockBreak() {
        // A crunchier sound
        this.playSound('square', 200, 0.2, 0.4);
        this.playSound('square', 100, 0.2, 0.4);
    }

    public playCollision() {
        this.playSound('sine', 120, 0.05, 0.15);
    }

    public playLevelComplete() {
        this.playSound('sine', 523.25, 0.15, 0.3); // C5
        setTimeout(() => this.playSound('sine', 659.25, 0.15, 0.3), 150); // E5
        setTimeout(() => this.playSound('sine', 783.99, 0.15, 0.3), 300); // G5
        setTimeout(() => this.playSound('sine', 1046.50, 0.2, 0.3), 450); // C6
    }
    
    public playGameOver() {
        this.playSound('sawtooth', 200, 0.5, 0.4);
        setTimeout(() => this.playSound('sawtooth', 100, 0.8, 0.4), 200);
    }
    
    public playClick() {
        this.playSound('sine', 800, 0.08, 0.25);
    }
}

export const soundManager = new SoundManager();
