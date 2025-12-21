import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: '5rem 0 2rem 0',
            marginTop: 'auto'
        }}>
            <div className="main-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
                <div className="footer-col">
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        AccessiShop
                    </h2>
                    <p style={{ opacity: 0.8, marginBottom: '2rem', lineHeight: '1.8' }}>
                        The most accessible e-commerce platform for everyone. Shop with ease and confidence.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '1.25rem' }}>
                        <FaFacebook cursor="pointer" />
                        <FaTwitter cursor="pointer" />
                        <FaInstagram cursor="pointer" />
                        <FaLinkedin cursor="pointer" />
                    </div>
                </div>

                <div className="footer-col">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Company</h3>
                    <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem', opacity: 0.8 }}>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Press Center</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Customer Service</h3>
                    <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem', opacity: 0.8 }}>
                        <li>Help Center</li>
                        <li>Returns & Refunds</li>
                        <li>Shipping Info</li>
                        <li>Product Recalls</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Newsletter</h3>
                    <p style={{ opacity: 0.8, marginBottom: '1rem' }}>Enter your email to get latest updates.</p>
                    <div style={{ display: 'flex' }}>
                        <input
                            type="email"
                            placeholder="Email address"
                            style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', border: 'none', flex: 1 }}
                        />
                        <button style={{ background: 'var(--color-accent)', color: 'white', border: 'none', padding: '0 1.5rem', borderRadius: '0 var(--radius-md) var(--radius-md) 0', fontWeight: '700' }}>
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.6 }}>
                <p>&copy; {currentYear} AccessiShop | All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
