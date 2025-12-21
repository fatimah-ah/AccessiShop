import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--text-light)',
            padding: 'var(--spacing-lg) var(--spacing-xl)',
            textAlign: 'center',
            marginTop: 'auto'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                    AccessiShop
                </p>
                <p style={{ fontSize: '0.9rem', opacity: '0.9', marginTop: '0.5rem' }}>
                    &copy; {currentYear} | Accessible E-Commerce for Everyone
                </p>
            </div>
        </footer>
    );
};

export default Footer;
