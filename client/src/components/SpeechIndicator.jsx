import React from 'react';
import { useSpeech } from '../context/SpeechContext';
import { FaVolumeUp } from 'react-icons/fa';

const SpeechIndicator = () => {
    const { isReading } = useSpeech();

    if (!isReading) return null;

    return (
        <div className="speech-indicator-bar">
            <div className="speech-indicator-content">
                <div className="reading-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <FaVolumeUp className="speech-icon-anim" />
                <span className="reading-text">System is Reading Product Details...</span>
            </div>
        </div>
    );
};

export default SpeechIndicator;
