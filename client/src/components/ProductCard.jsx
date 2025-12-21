import React from 'react';
import { FaShoppingCart, FaEye, FaRegHeart, FaExchangeAlt, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../Layout.css';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const imageSrc = product.image || 'https://via.placeholder.com/300x200?text=No+Image';

    const handleNavigate = (e) => {
        // Prevent navigation if clicking action buttons
        if (e.target.closest('.card-action-btn') || e.target.closest('.btn-primary')) return;
        navigate(`/product/${product._id}`);
    };

    return (
        <article
            className="product-card"
            onClick={handleNavigate}
            tabIndex="0"
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleNavigate(e);
                }
            }}
            aria-label={`View details for ${product.title}`}
        >
            <div className="card-image-wrapper">
                <span className="card-badge discount">40% off</span>

                <div className="card-actions-overlay">
                    <button className="card-action-btn" aria-label="Add to wishlist"><FaRegHeart /></button>
                    <button className="card-action-btn" aria-label="Compare product"><FaExchangeAlt /></button>
                    <button
                        className="card-action-btn"
                        aria-label="Quick view"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product._id}`);
                        }}
                    >
                        <FaEye />
                    </button>
                </div>

                <img
                    src={imageSrc}
                    alt={product.title}
                    className="card-image"
                />
            </div>

            <div className="card-content">
                <span className="card-category">{product.category}</span>
                <h3 className="card-title">{product.title}</h3>

                <div className="card-rating">
                    <FaStar color="#FFD700" />
                    <span className="rating-val">4.8</span>
                </div>

                <div className="card-footer">
                    <div className="card-price-container">
                        <span className="card-price">${product.price.toFixed(2)}</span>
                        <span className="card-price-original">${(product.price * 1.5).toFixed(2)}</span>
                    </div>
                    {/* Optional: Add to Cart button if needed, but the image shows a cleaner look with icons */}
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
