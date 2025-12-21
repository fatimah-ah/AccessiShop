import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import '../Layout.css';

/**
 * Navbar Component
 * 
 * Accessibility Features:
 * - Semantic <nav> tag
 * - Skip link support (in parent or here if needed, usually global)
 * - Clear focus indicators (via Layout.css)
 * - Large touch targets
 */

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to welcome
        navigate('/');
    };

    return (
        <nav className="navbar" role="navigation" aria-label="Main Navigation">
            <Link to="/home" className="brand-link" aria-label="AccessiShop Home">
                AccessiShop
            </Link>

            <ul className="nav-links">
                <li className="nav-item">
                    <NavLink
                        to="/home"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <FaHome style={{ marginRight: '0.5rem' }} /> Home
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/shop"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <FaShoppingBag style={{ marginRight: '0.5rem' }} /> Shop
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/cart"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <FaShoppingCart style={{ marginRight: '0.5rem' }} /> Cart
                    </NavLink>
                </li>

                <li className="nav-item">
                    <button
                        onClick={handleLogout}
                        className="nav-btn"
                        aria-label="Logout from your account"
                    >
                        Logout
                        <FaSignOutAlt style={{ marginLeft: '0.5rem' }} />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
