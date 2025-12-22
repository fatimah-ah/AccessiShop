import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus, FaTimes, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicePoints from '../components/ServicePoints';
import '../Layout.css';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();

    return (
        <div className="app-layout">
            <Navbar />

            <main className="main-content">
                {/* Minimal Header with Breadcrumbs */}
                <header className="page-header-minimal">
                    <h1 className="page-title" style={{ fontSize: '3rem', fontWeight: '800' }}>Shopping Cart</h1>
                    <div className="breadcrumbs-minimal">
                        <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> /
                        <span style={{ fontWeight: '600', marginLeft: '0.5rem' }}>Shopping Cart</span>
                    </div>
                </header>

                {cart.length === 0 ? (
                    <div className="empty-cart" style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <div style={{ fontSize: '4rem', color: 'var(--nav-border)', marginBottom: '2rem' }}>
                            <FaShoppingCart />
                        </div>
                        <h2>Your cart is empty</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Looks like you haven't added anything to your cart yet.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '3rem', alignItems: 'start' }}>
                        <div className="cart-main">
                            <div className="cart-table-wrapper">
                                <table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map(item => (
                                            <tr key={item._id}>
                                                <td>
                                                    <button
                                                        className="delete-btn-x"
                                                        onClick={() => removeFromCart(item._id)}
                                                        aria-label="Remove item"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </td>
                                                <td>
                                                    <div className="cart-item-info">
                                                        <img src={item.image} alt={item.title} className="cart-item-image" />
                                                        <div className="cart-item-details">
                                                            <h4>{item.title}</h4>
                                                            <p>Category: {item.category}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ fontWeight: '700' }}>${item.price.toFixed(2)}</td>
                                                <td>
                                                    <div className="qty-selector-pill">
                                                        <button className="qty-btn-minimal" onClick={() => updateQuantity(item._id, item.quantity - 1)}><FaMinus /></button>
                                                        <span className="qty-val-minimal">{item.quantity}</span>
                                                        <button className="qty-btn-minimal" onClick={() => updateQuantity(item._id, item.quantity + 1)}><FaPlus /></button>
                                                    </div>
                                                </td>
                                                <td style={{ fontWeight: '800', color: 'var(--color-primary)' }}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="cart-actions-row">
                                <div className="coupon-group">
                                    <input type="text" placeholder="Coupon Code" className="coupon-input" />
                                    <button className="btn-dark-green">Apply Coupon</button>
                                </div>
                                <span className="clear-cart-text" onClick={clearCart}>Clear Shopping Cart</span>
                            </div>
                        </div>

                        <aside className="cart-summary-sidebar">
                            <div className="summary-card-minimal">
                                <h3>Order Summary</h3>
                                <div className="summary-details-minimal">
                                    <div className="summary-row-minimal">
                                        <span>Items</span>
                                        <span>{cartCount}</span>
                                    </div>
                                    <div className="summary-row-minimal">
                                        <span>Sub Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row-minimal">
                                        <span>Shipping</span>
                                        <span style={{ color: '#10B981', fontWeight: '700' }}>$00.00</span>
                                    </div>
                                    <div className="summary-row-minimal">
                                        <span>Taxes</span>
                                        <span>$00.00</span>
                                    </div>
                                    <div className="summary-row-minimal">
                                        <span>Coupon Discount</span>
                                        <span>-$00.00</span>
                                    </div>
                                    <div className="summary-row-minimal total">
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="btn-checkout-full" onClick={() => navigate('/checkout')}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        </aside>
                    </div>
                )}
            </main>

            <ServicePoints />
            <Footer />
        </div>
    );
};

export default Cart;
