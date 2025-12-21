import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Auth.css';

/**
 * Welcome Screen - Landing Page
 * 
 * Simple, clean entry point with:
 * - App name and tagline
 * - Two clear action buttons
 * - Centered card layout
 */

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <div className="auth-card welcome-card">
                <h1 className="app-title">AccessiShop</h1>
                <p className="app-tagline">
                    Accessible e-commerce for everyone
                </p>
                <p className="app-description">
                    Shop with ease using our clean interface, voice commands,
                    and built-in accessibility features.
                </p>

                <div className="button-group">
                    <button
                        className="btn btn-primary btn-full"
                        onClick={() => navigate('/login')}
                        aria-label="Login to your account"
                    >
                        Login
                    </button>
                    <button
                        className="btn btn-secondary btn-full"
                        onClick={() => navigate('/signup')}
                        aria-label="create a new account"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
