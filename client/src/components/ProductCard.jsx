import { FaShoppingCart, FaEye, FaRegHeart, FaMicrophone, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../Layout.css';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const imageSrc = product.image || 'https://via.placeholder.com/300x200?text=No+Image';

    const handleNavigate = (e) => {
        // Prevent navigation if clicking action buttons or Add to Cart
        if (e.target.closest('.card-action-btn') || e.target.closest('.btn-cart-small')) return;
        navigate(`/product/${product._id}`);
    };

    const handleVoiceRead = (e) => {
        e.stopPropagation();
        const msg = new SpeechSynthesisUtterance();
        msg.text = `Product: ${product.title}. Price: ${product.price.toFixed(2)} dollars. Category: ${product.category}. Description: ${product.description || 'No description available.'}`;
        window.speechSynthesis.speak(msg);
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
                    <button
                        className="card-action-btn voice-read-btn"
                        aria-label="Read product details"
                        onClick={handleVoiceRead}
                    >
                        <FaMicrophone />
                    </button>
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
                    <button
                        className="btn-cart-small"
                        aria-label="Add to cart"
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                    >
                        <FaShoppingCart />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
