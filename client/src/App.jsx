import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './Auth.css';

/**
 * Main App Component
 * 
 * Sets up routing for authentication flow:
 * - / → Welcome screen
 * - /login → Login page
 * - /signup → Signup page
 */

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
