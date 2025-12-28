import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaStop, FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    required = false,
    enableVoice = false,
    ariaDescribedBy = ''
}) => {
    const [isListening, setIsListening] = useState(false);
    const [isVoiceSupported, setIsVoiceSupported] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const recognitionRef = useRef(null);

    // Check if Web Speech API is supported
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition && enableVoice) {
            setIsVoiceSupported(true);
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            // Handle speech recognition result
            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                onChange({ target: { value: transcript } });
                setIsListening(false);
            };

            // Handle errors
            recognitionRef.current.onerror = () => {
                setIsListening(false);
            };

            // Auto-stop when done
            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [enableVoice, onChange]);

    const toggleVoiceInput = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Determine the actual input type
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className="input-wrapper">
            <label htmlFor={label} className="input-label">
                {label} {required && <span className="required-indicator">*</span>}
            </label>
            <div className="input-container">
                <input
                    id={label}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="input-field"
                    aria-describedby={ariaDescribedBy || undefined}
                    aria-required={required}
                />

                <div className="input-actions">
                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="input-action-btn"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            title={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    )}

                    {isVoiceSupported && (
                        <button
                            type="button"
                            onClick={toggleVoiceInput}
                            className={`voice-button ${isListening ? 'listening' : ''}`}
                            aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                            title={isListening ? 'Stop listening' : 'Click to speak'}
                        >
                            {isListening ? <FaStop /> : <FaMicrophone />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Input;
