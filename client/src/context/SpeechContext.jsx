import React, { createContext, useContext, useState, useRef } from 'react';

const SpeechContext = createContext();

export const useSpeech = () => useContext(SpeechContext);

export const SpeechProvider = ({ children }) => {
    const [isReading, setIsReading] = useState(false);
    const [currentText, setCurrentText] = useState('');

    const speak = (text) => {
        if (!('speechSynthesis' in window)) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance(text);

        // Reliability fix: Set state immediately in case browser delays onstart
        setIsReading(true);
        setCurrentText(text);

        msg.onstart = () => {
            setIsReading(true);
            setCurrentText(text);
        };

        msg.onend = () => {
            setIsReading(false);
            setCurrentText('');
        };

        msg.onerror = () => {
            setIsReading(false);
            setCurrentText('');
        };

        window.speechSynthesis.speak(msg);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setIsReading(false);
        setCurrentText('');
    };

    return (
        <SpeechContext.Provider value={{ isReading, currentText, speak, stop }}>
            {children}
        </SpeechContext.Provider>
    );
};
