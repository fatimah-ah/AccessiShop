import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../Layout.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { cartCount } = useCart();

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to welcome
        navigate('/');
    };

    return (
        <header className="navbar-wrapper">
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
                            Home
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/shop"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            Shop
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/cart"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            style={{ position: 'relative' }}
                        >
                            <FaShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="cart-badge-count">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <button
                            onClick={handleLogout}
                            className="nav-btn"
                            aria-label="Logout from your account"
                        >
                            Logout <FaSignOutAlt style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
