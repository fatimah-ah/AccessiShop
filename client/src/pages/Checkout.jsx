import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicePoints from '../components/ServicePoints';
import axios from 'axios';
import '../Layout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, cartTotal, clearCart, refreshCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Get selected item IDs from navigation state
    const selectedItemIds = location.state?.selectedItemIds || [];

    // Filter cart to show only selected items
    const selectedCartItems = cart.filter(item => selectedItemIds.includes(item._id));
    const selectedTotal = selectedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: 'United States',
        phone: '',
        paymentMethod: 'credit_card'
    });

    useEffect(() => {
        // Redirect if cart is empty or no items selected
        if (cart.length === 0 || selectedItemIds.length === 0) {
            navigate('/cart');
        }
    }, [cart, selectedItemIds, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            // Prepare shipping info
            const shippingInfo = {
                fullName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                address: formData.address,
                city: formData.city,
                postalCode: formData.zip,
                country: formData.country,
                phone: formData.phone
            };

            // Create order
            const response = await axios.post('/api/orders', {
                shippingInfo,
                paymentMethod: formData.paymentMethod,
                selectedItemIds: selectedItemIds  // Pass selected items to backend
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Clear cart on success
            clearCart();

            // Navigate to order confirmation with order data
            navigate('/order-confirmation', {
                state: { order: response.data.order }
            });

        } catch (err) {
            console.error('Order creation error:', err);
            setError(
                err.response?.data?.message ||
                'Failed to place order. Please try again.'
            );
        } finally {
            setLoading(false);
        }
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
                            {selectedCartItems.map(item => (
                                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                                    <span>{item.title} x {item.quantity}</span>
                                    <span style={{ fontWeight: '600' }}>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid var(--nav-border)', margin: '1rem 0', paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span>Subtotal</span>
                                    <span>${selectedTotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontWeight: '600' }}>
                                    <span>Shipping</span>
                                    <span>FREE</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-primary)' }}>
                                    <span>Total</span>
                                    <span>${selectedTotal.toFixed(2)}</span>
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
