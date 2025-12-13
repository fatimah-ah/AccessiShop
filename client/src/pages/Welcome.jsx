import React from 'react';
import { useNavigate } from 'react-router-dom';

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
                    Shop with ease using our clean interface, optional voice input,
                    and accessibility-first design.
                </p>

                <div className="button-group">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
