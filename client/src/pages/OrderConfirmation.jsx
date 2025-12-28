import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCheckCircle, FaBox, FaTruck, FaHome } from 'react-icons/fa';
import '../Layout.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    useEffect(() => {
        if (!order) {
            navigate('/home');
        }
    }, [order, navigate]);

    if (!order) {
        return null;
    }

    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <FaCheckCircle
                        style={{
                            fontSize: '5rem',
                            color: '#10B981',
                            marginBottom: '1rem'
                        }}
                    />
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                        Order Placed Successfully!
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                        Thank you for your purchase. Your order has been confirmed.
                    </p>
                </div>

                <div className="auth-card" style={{ marginBottom: '2rem', margin: '0 auto 2rem auto' }}>
                    <div style={{ borderBottom: '2px solid var(--nav-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Order Details</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Order Number: <strong style={{ color: 'var(--color-primary)' }}>{order.orderNumber}</strong>
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Placed on: {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Items Ordered</h3>
                        {order.items.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: '#F9FAFB',
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: '0.75rem'
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: 'var(--radius-sm)'
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ marginBottom: '0.25rem' }}>{item.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#F0FDF4', borderRadius: 'var(--radius-md)', border: '1px solid #86EFAC' }}>
                        <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaTruck /> Shipping Address
                        </h3>
                        <p style={{ marginBottom: '0.25rem' }}><strong>{order.shippingInfo.fullName}</strong></p>
                        <p style={{ marginBottom: '0.25rem' }}>{order.shippingInfo.address}</p>
                        <p style={{ marginBottom: '0.25rem' }}>
                            {order.shippingInfo.city}, {order.shippingInfo.postalCode}
                        </p>
                        <p style={{ marginBottom: '0.25rem' }}>{order.shippingInfo.country}</p>
                        <p style={{ color: 'var(--text-secondary)' }}>{order.shippingInfo.email}</p>
                    </div>

                    <div style={{ borderTop: '2px solid var(--nav-border)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Subtotal</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#10B981' }}>
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-primary)' }}>
                            <span>Total</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="auth-card" style={{ background: '#EFF6FF', border: '1px solid #93C5FD', margin: '0 auto' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaBox /> What's Next?
                    </h3>
                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                        <li>You will receive an order confirmation email at <strong>{order.shippingInfo.email}</strong></li>
                        <li>Your order is being processed and will be shipped within 2-3 business days</li>
                        <li>You can track your order status from your order history</li>
                        <li>Estimated delivery: 5-7 business days</li>
                    </ul>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center' }}>
                    <Link to="/home" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaHome /> Continue Shopping
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderConfirmation;
