/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Blob } from "@google/genai";
import { decodeUsed, decodeAudioDataUsed } from './audioUtils-empirerts';
import { generateDeclarations, getSystemInstruction } from './functionDeclarations-empirerts';
// FIX: Corrected import path for types.
import { GameState, LiveAgentStatus } from './types-empirerts';

interface UseInteractiveAgentProps {
    gameState: GameState;
    onFunctionCall: (call: { name: string, args: any }) => void;
    onStatusChange: (status: LiveAgentStatus) => void;
    onTranscription: (transcription: string) => void;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

export function useInteractiveAgent({ gameState, onFunctionCall, onStatusChange, onTranscription }: UseInteractiveAgentProps) {
    const aiRef = React.useRef<GoogleGenAI | null>(null);
    const audioCtxRef = React.useRef<AudioContext | null>(null);
    const liveSessionRef = React.useRef<any | null>(null);
    const streamRef = React.useRef<MediaStream | null>(null);
    const audioProcessorRef = React.useRef<ScriptProcessorNode | null>(null);
    const mediaSourceRef = React.useRef<MediaStreamAudioSourceNode | null>(null);
    const nextStartTimeRef = React.useRef(0);
    const activeSessionId = React.useRef<string | null>(null);
    const sessionPromiseRef = React.useRef<Promise<any> | null>(null);

    const initAudioContext = React.useCallback(async () => {
        if (audioCtxRef.current && audioCtxRef.current.state === 'running') return;
        if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        if (audioCtxRef.current.state === 'suspended') {
            await audioCtxRef.current.resume();
        }
    }, []);

    const stopSession = React.useCallback(async () => {
        onStatusChange('idle');
        onTranscription('');
        activeSessionId.current = null;
        sessionPromiseRef.current = null;

        if (liveSessionRef.current) {
            try { await liveSessionRef.current.close(); } catch (e) { console.warn("Error closing live session:", e); }
            liveSessionRef.current = null;
        }
        if (audioProcessorRef.current) {
            audioProcessorRef.current.disconnect();
            audioProcessorRef.current.onaudioprocess = null;
            audioProcessorRef.current = null;
        }
        if (mediaSourceRef.current) {
            mediaSourceRef.current.disconnect();
            mediaSourceRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    }, [onStatusChange, onTranscription]);

    const startSession = React.useCallback(async () => {
        if (activeSessionId.current === 'narrator' || !process.env.API_KEY) return;
        
        aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });

        await stopSession();
        activeSessionId.current = 'narrator';

        try {
            await initAudioContext();
            onStatusChange('connecting');
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

            const { declarations, contextPrompt, initialPrompt } = generateDeclarations(gameState);

            const sessionPromise = aiRef.current.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
                        mediaSourceRef.current = inputAudioContext.createMediaStreamSource(streamRef.current!);
                        audioProcessorRef.current = inputAudioContext.createScriptProcessor(4096, 1, 1);

                        audioProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromiseRef.current?.then(session => session.sendRealtimeInput({ media: pcmBlob }));
                        };
                        mediaSourceRef.current.connect(audioProcessorRef.current);
                        audioProcessorRef.current.connect(inputAudioContext.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
                            onStatusChange('speaking');
                            const audioData = message.serverContent.modelTurn.parts[0].inlineData.data;
                            const audioBytes = decodeUsed(audioData);
                            const audioBuffer = await decodeAudioDataUsed(audioBytes, audioCtxRef.current!, 24000, 1);
                            const source = audioCtxRef.current!.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(audioCtxRef.current!.destination);
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtxRef.current!.currentTime);
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                        }
                        if (message.serverContent?.inputTranscription) {
                            onTranscription(message.serverContent.inputTranscription.text);
                        }
                        if (message.serverContent?.turnComplete) {
                            onStatusChange('listening');
                            onTranscription('');
                        }
                        if (message.toolCall) {
                            onStatusChange('thinking');
                            message.toolCall.functionCalls.forEach(call => {
                                if (call.name) {
                                    onFunctionCall({ name: call.name, args: call.args });
                                }
                            });
                        }
                    },
                    onerror: (e: ErrorEvent) => { console.error("Live API Error:", e); onStatusChange('error'); },
                    onclose: () => { if (activeSessionId.current === 'narrator') stopSession(); },
                },
                config: {
                    systemInstruction: getSystemInstruction(contextPrompt),
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                    tools: [{ functionDeclarations: declarations }],
                    inputAudioTranscription: {},
                },
            });
             sessionPromiseRef.current = sessionPromise;
             liveSessionRef.current = await sessionPromise;
             await liveSessionRef.current.sendRealtimeInput({ text: initialPrompt });
             onStatusChange('listening');

        } catch (e) {
            console.error("Failed to start agent session:", e);
            onStatusChange('error');
        }
    }, [stopSession, initAudioContext, onStatusChange, onTranscription, onFunctionCall, gameState]);

    return { startSession, endSession: stopSession };
}