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
            <div className="top-bar">
                <div className="top-bar-contact">
                    Call Us: +123-456-789 | Sign up and GET 25% OFF for your first order. <Link to="/signup" style={{ color: 'var(--color-accent)', fontWeight: '700' }}>Sign up now</Link>
                </div>
                <div className="top-bar-links">
                    <a href="#" className="top-bar-link">FB</a>
                    <a href="#" className="top-bar-link">TW</a>
                    <a href="#" className="top-bar-link">IG</a>
                    <a href="#" className="top-bar-link">YT</a>
                </div>
            </div>

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
