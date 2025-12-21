import React from 'react';
import { FaTruck, FaMoneyCheckAlt, FaHeadset } from 'react-icons/fa';

const ServicePoints = () => {
    const services = [
        {
            icon: <FaTruck />,
            title: "Free Shipping",
            desc: "Free shipping for order above $100"
        },
        {
            icon: <FaMoneyCheckAlt />,
            title: "Flexible Payment",
            desc: "Multiple secure payment options"
        },
        {
            icon: <FaHeadset />,
            title: "24x7 Support",
            desc: "We support online all days"
        }
    ];

    return (
        <section className="service-points" style={{ padding: '4rem 0', background: '#FDFDFD' }}>
            <div className="main-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {services.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'white', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '2rem', color: '#D4A373', background: '#FEF9EF', padding: '1rem', borderRadius: '50%', display: 'flex' }}>
                            {item.icon}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicePoints;
