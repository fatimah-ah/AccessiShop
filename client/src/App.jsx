import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductView from './pages/ProductView';
import './Auth.css';

/**
 * Main App Component
 * 
 * Sets up routing for authentication flow:
 * - / → Welcome screen
 * - /login → Login page
 * - /signup → Signup page
 * - /home → Home page
 * - /shop → Shop page
 * - /product/:id → Product details
 */

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductView />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
