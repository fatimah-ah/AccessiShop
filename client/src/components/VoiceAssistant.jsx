import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const VoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    const recognitionRef = React.useRef(null);
    const processingRef = React.useRef(false);

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setIsActive(true);
            setFeedback('');
            setTranscript('Listening for voice command...');
            processingRef.current = false;
        };

        recognition.onresult = (event) => {
            if (processingRef.current) return;

            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const text = event.results[i][0].transcript.toLowerCase();
                if (event.results[i].isFinal) {
                    setTranscript(text);
                    handleCommand(text);
                } else {
                    interimTranscript += text;
                }
            }
            if (interimTranscript && !processingRef.current) {
                setTranscript(interimTranscript);
                checkQuickCommand(interimTranscript);
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            stopSession();
        };

        recognition.onend = () => {
            setIsListening(false);
            if (!processingRef.current) {
                // If ended without command, show "Try again" or hide
                setTimeout(() => {
                    if (!processingRef.current) setIsActive(false);
                }, 4000);
            }
        };

        recognition.start();
    };

    const stopSession = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
        setIsActive(false);
        setFeedback('');
        setTranscript('');
        processingRef.current = false;
    };

    const checkQuickCommand = (text) => {
        const cmd = text.trim().toLowerCase();
        if (cmd === 'home' || cmd === 'shop' || cmd === 'cart') {
            handleCommand(cmd);
        }
    };

    const handleCommand = (command) => {
        if (processingRef.current) return;
        const cmd = command.toLowerCase().trim();

        // Search detection
        const searchTriggers = ['search', 'find', 'look for', 'lookup'];
        for (const trigger of searchTriggers) {
            if (cmd.startsWith(trigger)) {
                const query = cmd.replace(trigger, '').trim();
                if (query) {
                    executeAction(`Searching for "${query}"...`, `/shop?search=${encodeURIComponent(query)}`);
                    return;
                }
            }
        }

        // Navigation detection
        if (cmd.includes('cart')) {
            executeAction('Navigating to Cart...', '/cart');
        } else if (cmd.includes('shop') || cmd.includes('product') || cmd.includes('store')) {
            executeAction('Navigating to Shop...', '/shop');
        } else if (cmd.includes('home') || cmd.includes('welcome')) {
            executeAction('Navigating to Home...', '/home');
        }
    };

    const executeAction = (msg, path) => {
        processingRef.current = true;
        if (recognitionRef.current) recognitionRef.current.stop();

        setIsListening(false);
        setFeedback(msg);
        setTranscript('');

        // Final confirmation before navigating
        setTimeout(() => {
            navigate(path);
            // Hide everything after a short delay
            setTimeout(() => {
                setIsActive(false);
                setFeedback('');
                processingRef.current = false;
            }, 800);
        }, 1200);
    };

    return (
        <div className="voice-assistant-root">
            <button
                className={`voice-assistant-btn ${isListening ? 'listening' : ''}`}
                onClick={isListening ? stopSession : startListening}
                aria-label="Activate voice assistant"
                title="Voice Assistant"
            >
                {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>

            {isActive && (
                <div className="voice-modal-overlay" onClick={stopSession}>
                    <div className="voice-capsule" onClick={e => e.stopPropagation()}>
                        <div className="voice-capsule-content">
                            <div className={`voice-visualizer ${isListening ? 'active' : ''}`}>
                                <span></span><span></span><span></span><span></span>
                            </div>
                            <div className="voice-text-area">
                                <span className="voice-status-tag">{isListening ? 'Listening' : 'Processing'}</span>
                                <p className="voice-transcript-text">{feedback || transcript || 'Wait...'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceAssistant;
