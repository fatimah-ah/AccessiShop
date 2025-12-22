import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicePoints from '../components/ServicePoints';
import '../Layout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, cartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Order placed successfully!');
        navigate('/home');
    };

    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <header className="page-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="page-title">Checkout</h1>
                    <p className="page-subtitle">Complete your purchase</p>
                </header>

                <form onSubmit={handleSubmit} className="checkout-container" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem' }}>
                    <div className="checkout-form-sections">
                        <section className="checkout-section" style={{ marginBottom: '3rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--nav-border)', paddingBottom: '0.5rem' }}>Shipping Information</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="input-group">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" className="input-field" required onChange={handleInputChange} />
                                </div>
                                <div className="input-group">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" className="input-field" required onChange={handleInputChange} />
                                </div>
                                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                    <label>Email Address</label>
                                    <input type="email" name="email" className="input-field" required onChange={handleInputChange} />
                                </div>
                                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                    <label>Street Address</label>
                                    <input type="text" name="address" className="input-field" required onChange={handleInputChange} />
                                </div>
                                <div className="input-group">
                                    <label>City</label>
                                    <input type="text" name="city" className="input-field" required onChange={handleInputChange} />
                                </div>
                                <div className="input-group">
                                    <label>ZIP / Postal Code</label>
                                    <input type="text" name="zip" className="input-field" required onChange={handleInputChange} />
                                </div>
                            </div>
                        </section>

                        <section className="checkout-section">
                            <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--nav-border)', paddingBottom: '0.5rem' }}>Payment Method</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                    <label>Card Number</label>
                                    <input type="text" name="cardNumber" className="input-field" placeholder="0000 0000 0000 0000" required onChange={handleInputChange} />
                                </div>
                                <div className="input-group">
                                    <label>Expiry Date</label>
                                    <input type="text" name="expiry" className="input-field" placeholder="MM/YY" required onChange={handleInputChange} />
                                </div>
                                <div className="input-group">
                                    <label>CVV</label>
                                    <input type="text" name="cvv" className="input-field" placeholder="123" required onChange={handleInputChange} />
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="order-summary-card" style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', height: 'fit-content', position: 'sticky', top: '120px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--nav-border)' }}>
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Your Order</h3>
                        <div className="summary-details-minimal" style={{ display: 'grid', gap: '1rem' }}>
                            {cart.map(item => (
                                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                                    <span>{item.title} x {item.quantity}</span>
                                    <span style={{ fontWeight: '600' }}>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid var(--nav-border)', margin: '1rem 0', paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontWeight: '600' }}>
                                    <span>Shipping</span>
                                    <span>FREE</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-primary)' }}>
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn-checkout-full" style={{ marginTop: '2rem' }}>
                            Place Order
                        </button>
                    </aside>
                </form>
            </main>
            <ServicePoints />
            <Footer />
        </div>
    );
};

export default Checkout;
