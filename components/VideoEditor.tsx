import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import Header from './video-editor/Header';

const VideoEditor: React.FC = () => {
    const [imgSrc, setImgSrc] = useState('');
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [prompt, setPrompt] = useState('Make the background a futuristic city at night');
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    // This effect handles starting and stopping the camera stream.
    useEffect(() => {
        if (isCameraOpen) {
            const startCamera = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (err) {
                    console.error("Error accessing camera: ", err);
                    setError("Could not access camera. Please ensure you have granted permission.");
                    setIsCameraOpen(false); // Reset on error
                }
            };
            startCamera();
        } else {
            // Stop the camera when isCameraOpen becomes false or on component unmount
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        }
    }, [isCameraOpen]);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleGenerate = async () => {
        if (!imgSrc || !crop || !imgRef.current) {
            setError("Please upload an image and select a crop area first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setEditedImage(null);

        try {
            const croppedCanvas = document.createElement('canvas');
            const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
            const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
            croppedCanvas.width = crop.width * scaleX;
            croppedCanvas.height = crop.height * scaleY;
            const ctx = croppedCanvas.getContext('2d');
            
            if (!ctx) {
                throw new Error('Could not get canvas context');
            }

            ctx.drawImage(
                imgRef.current,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width * scaleX,
                crop.height * scaleY
            );
            
            const base64ImageData = croppedCanvas.toDataURL('image/jpeg').split(',')[1];
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [
                        { inlineData: { data: base64ImageData, mimeType: 'image/jpeg' } },
                        { text: prompt },
                    ],
                },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });
            
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                    setEditedImage(imageUrl);
                    break;
                }
            }
        } catch (err) {
            console.error(err);
            setError("Failed to generate image. Please check your prompt or try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCamera = () => {
        setImgSrc('');
        setCrop(undefined);
        setIsCameraOpen(true);
    };

    const handleCapture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            setImgSrc(canvas.toDataURL('image/jpeg'));
            
            // This will trigger the cleanup logic in the useEffect
            setIsCameraOpen(false);
        }
    };

    const handleCloseCamera = () => {
        setIsCameraOpen(false);
    }
    
    return (
        <div className="w-full h-full flex flex-col font-sans text-gray-200 relative overflow-hidden">
            <div id="star-bg">
                <div id="stars1"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
                <div id="shooting-stars">
                    <div className="star"></div><div className="star"></div><div className="star"></div>
                </div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center p-4 z-10">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-2xl">
                        
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-white">AI Creative Studio</h2>
                            <p className="text-gray-400">Use your creativity to edit photos and earn $MPS! Video editing coming soon.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            {/* Left Panel: Image Upload & Crop */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-cyan-400">1. Upload or Capture</h3>
                                {isCameraOpen ? (
                                    <div className="space-y-2">
                                        <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border-2 border-gray-600" />
                                        <div className="flex gap-2">
                                            <button onClick={handleCapture} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Capture Photo</button>
                                            <button onClick={handleCloseCamera} className="flex-1 bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Close Camera</button>
                                        </div>
                                    </div>
                                ) : !imgSrc ? (
                                    <div className="flex gap-2">
                                        <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold py-4 px-4 rounded-lg transition-colors text-center">
                                            📤 Upload Image
                                        </button>
                                        <button onClick={handleOpenCamera} className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold py-4 px-4 rounded-lg transition-colors text-center">
                                            📸 Use Camera
                                        </button>
                                        <input type="file" accept="image/*" onChange={onSelectFile} ref={fileInputRef} className="hidden" />
                                    </div>
                                ) : null}

                                {imgSrc && !isCameraOpen && (
                                    <div className="bg-black/30 p-2 rounded-lg">
                                        <ReactCrop crop={crop} onChange={c => setCrop(c)} aspect={1}>
                                            <img ref={imgRef} alt="Crop me" src={imgSrc} />
                                        </ReactCrop>
                                        <button onClick={() => setImgSrc('')} className="mt-2 w-full text-sm bg-red-800 hover:bg-red-700 text-white py-1 px-3 rounded">Change Image</button>
                                    </div>
                                )}
                            </div>

                            {/* Right Panel: Prompt & Result */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-cyan-400">2. Describe Your Edit</h3>
                                <textarea
                                    value={prompt}
                                    onChange={e => setPrompt(e.target.value)}
                                    placeholder="e.g., add a pirate hat on the person"
                                    className="w-full h-24 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                />
                                <button
                                    onClick={handleGenerate}
                                    disabled={isLoading || !imgSrc}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? 'Generating...' : '✨ Generate with AI'}
                                </button>
                                
                                <h3 className="font-semibold text-lg text-cyan-400 pt-4">3. Result</h3>
                                <div className="w-full aspect-square bg-black/30 rounded-lg flex items-center justify-center border border-gray-700">
                                    {isLoading && <div className="text-gray-400 animate-pulse">AI is creating...</div>}
                                    {error && <div className="text-red-400 p-4 text-center">{error}</div>}
                                    {editedImage && <img src={editedImage} alt="Generated result" className="max-w-full max-h-full rounded-lg" />}
                                    {!isLoading && !error && !editedImage && <div className="text-gray-500">Your edited image will appear here.</div>}
                                </div>
                                {editedImage && <p className="text-center text-sm text-yellow-300 font-semibold">+100 $MPS earned for your creativity!</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoEditor;