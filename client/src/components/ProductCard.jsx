import React from 'react';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import '../Layout.css';

const ProductCard = ({ product }) => {
    // Determine image source - handle local vs remote if needed, for now assuming direct URL
    // Fallback image if product.image is missing or broken could be added here
    const imageSrc = product.image || 'https://via.placeholder.com/300x200?text=No+Image';

    return (
        <article
            className="product-card"
            style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%'
            }}
        >
            <div
                className="product-image-container"
                style={{
                    height: '200px',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <img
                    src={imageSrc}
                    alt={product.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                    }}
                />
            </div>

            <div className="product-details" style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span
                    className="product-category"
                    style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem',
                        display: 'block'
                    }}
                >
                    {product.category}
                </span>

                <h3
                    style={{
                        fontSize: '1.2rem',
                        margin: '0 0 0.5rem 0',
                        color: 'var(--text-primary)'
                    }}
                >
                    {product.title}
                </h3>

                <p
                    style={{
                        color: 'var(--color-primary)',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        marginTop: 'auto'
                    }}
                >
                    ${product.price.toFixed(2)}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button
                        className="btn btn-outline"
                        aria-label={`View details for ${product.title}`}
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <FaEye /> View
                    </button>
                    <button
                        className="btn btn-primary"
                        aria-label={`Add ${product.title} to cart`}
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <FaShoppingCart /> Add
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
