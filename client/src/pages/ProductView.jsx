import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FaStar, FaMinus, FaPlus, FaShoppingCart, FaBolt, FaArrowLeft, FaChevronLeft, FaChevronRight, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ServicePoints from '../components/ServicePoints';
import '../Layout.css';

const ProductView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('info');
    const [isSpeakSupported, setIsSpeakSupported] = useState(false);
    const [selectedColor, setSelectedColor] = useState('Brown');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [shareMessage, setShareMessage] = useState('');

    useEffect(() => {
        setIsSpeakSupported('speechSynthesis' in window);

        const fetchProductData = async () => {
            try {
                const res = await axios.get(`/api/products/${id}`);
                setProduct(res.data);

                const allRes = await axios.get('/api/products');
                const related = allRes.data.filter(p => p.category === res.data.category && p._id !== res.data._id);
                setRelatedProducts(related.slice(0, 4));

                setLoading(false);
            } catch (err) {
                console.error("Error fetching product details:", err);
                setLoading(false);
            }
        };

        fetchProductData();
        window.scrollTo(0, 0);
    }, [id]);

    const handleSpeakDetails = () => {
        if (!isSpeakSupported || !product) return;
        const msg = new SpeechSynthesisUtterance();
        msg.text = `Product: ${product.title}. Price: ${product.price} dollars. Description: ${product.simpleDescription || product.description}`;
        window.speechSynthesis.speak(msg);
    };

    const handleQuantityChange = (type) => {
        if (type === 'inc') setQuantity(prev => prev + 1);
        if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
    };

    // Mock images list for navigation demo
    const productImages = product ? [product.image, product.image, product.image, product.image] : [];

    const handleImageNav = (direction) => {
        if (direction === 'next') {
            setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
        } else {
            setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
        }
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setShareMessage('Link copied!');
            setTimeout(() => setShareMessage(''), 2000);
        });
    };

    if (loading) return <div className="loading-state">Loading...</div>;
    if (!product) return <div className="error-state">Product not found.</div>;

    return (
        <div className="app-layout">
            <Navbar />

            <main className="main-content">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> /
                    <Link to="/shop" style={{ color: 'inherit', textDecoration: 'none', margin: '0 0.5rem' }}>Shop</Link> /
                    <span style={{ margin: '0 0.5rem' }}>{product.category}</span> /
                    <span style={{ margin: '0 0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>Product Details</span>
                </nav>

                <div className="product-view-container">
                    {/* Left: Product Image Section */}
                    <div className="product-view-gallery">
                        <div className="main-image-wrapper" style={{ position: 'relative' }}>
                            <img
                                src={productImages[currentImageIndex]}
                                alt={`${product.title} - View ${currentImageIndex + 1}`}
                                className="main-product-image"
                            />
                            <button className="gallery-nav-btn prev" onClick={() => handleImageNav('prev')} aria-label="Previous image"><FaChevronLeft /></button>
                            <button className="gallery-nav-btn next" onClick={() => handleImageNav('next')} aria-label="Next image"><FaChevronRight /></button>
                        </div>
                        <div className="thumbnails-list" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            {productImages.map((img, i) => (
                                <div
                                    key={i}
                                    className={`thumbnail ${i === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(i)}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: 'var(--radius-md)',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: i === currentImageIndex ? '2px solid var(--color-primary)' : '1px solid var(--nav-border)'
                                    }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details Section */}
                    <div className="product-view-details">
                        <span className="product-badge in-stock">In Stock</span>
                        <span className="product-view-category">{product.category}</span>
                        <h1 className="product-view-title">{product.title}</h1>

                        <div className="product-view-rating">
                            <div className="stars">
                                {[1, 2, 3, 4].map(i => <FaStar key={i} color="#FFD700" />)}
                                <FaStar color="#E2E8F0" />
                            </div>
                            <span className="rating-text">4.8 (245 Reviews)</span>
                        </div>

                        <div className="product-view-price-container">
                            <span className="current-price">${product.price.toFixed(2)}</span>
                            <span className="original-price">${(product.price * 1.2).toFixed(2)}</span>
                        </div>

                        <p className="product-view-description">
                            {product.simpleDescription || product.description}
                        </p>

                        <div className="color-selector-section" style={{ marginBottom: '2rem' }}>
                            <p style={{ fontWeight: '700', marginBottom: '0.75rem' }}>Color: <span style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>{selectedColor}</span></p>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {['#000', '#8B4513', '#2F4F4F', '#008080'].map((color, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedColor(['Black', 'Brown', 'Grey', 'Green'][idx])}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: color,
                                            border: selectedColor === ['Black', 'Brown', 'Grey', 'Green'][idx] ? '2px solid white' : 'none',
                                            boxShadow: selectedColor === ['Black', 'Brown', 'Grey', 'Green'][idx] ? '0 0 0 2px var(--color-primary)' : 'none',
                                            cursor: 'pointer'
                                        }}
                                        aria-label={`Select ${['Black', 'Brown', 'Grey', 'Green'][idx]} color`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="product-view-actions">
                            <div className="quantity-selector">
                                <button onClick={() => handleQuantityChange('dec')} aria-label="Decrease quantity" className="qty-btn"><FaMinus /></button>
                                <span className="qty-value">{quantity}</span>
                                <button onClick={() => handleQuantityChange('inc')} aria-label="Increase quantity" className="qty-btn"><FaPlus /></button>
                            </div>

                            <button
                                className="btn btn-primary"
                                style={{ flex: 1, height: '56px' }}
                                onClick={() => addToCart(product, quantity)}
                            >
                                <FaShoppingCart style={{ marginRight: '0.5rem' }} /> Add To Cart
                            </button>

                            <button
                                className="btn btn-accent"
                                style={{ height: '56px', padding: '0 2rem' }}
                                onClick={() => {
                                    addToCart(product, quantity);
                                    navigate('/cart');
                                }}
                            >
                                Buy Now
                            </button>

                            <button className="wishlist-btn" aria-label="Add to wishlist">
                                <FaRegHeart />
                            </button>
                        </div>

                        <div className="product-meta-info" style={{ marginTop: '2.5rem', borderTop: '1px solid var(--nav-border)', paddingTop: '1.5rem', display: 'grid', gap: '0.5rem', fontSize: '0.95rem' }}>
                            <p><strong>SKU:</strong> F-INC8765-ABC</p>
                            <p><strong>Tags:</strong> {product.category}, Premium, Sustainable</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                <strong>Share:</strong>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaShareAlt cursor="pointer" onClick={handleShare} title="Copy Link" />
                                    {shareMessage && <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>{shareMessage}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Info Block (Warranty, Shipping, Return) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)' }}>
                            <div>
                                <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Warranty Info</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>1-year international warranty.</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Shipping</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Free shipping over $100.</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Return</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>30-day easy returns.</p>
                            </div>
                        </div>

                        {isSpeakSupported && (
                            <button
                                className="btn btn-outline"
                                onClick={handleSpeakDetails}
                                style={{ marginTop: '2rem', width: '100%', borderStyle: 'dashed' }}
                            >
                                Read product details (Voice)
                            </button>
                        )}
                    </div>
                </div>

                {/* Tabs Section */}
                <section className="product-tabs-section">
                    <div className="tab-nav" role="tablist">
                        {['Description', 'Additional Information', 'Review'].map(tab => (
                            <button
                                key={tab}
                                role="tab"
                                aria-selected={activeTab === tab.toLowerCase().split(' ')[0]}
                                className={`tab-link ${activeTab === tab.toLowerCase().split(' ')[0] ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="tab-panel">
                        {activeTab === 'description' && (
                            <div className="description-panel">
                                <p>{product.description}</p>
                            </div>
                        )}
                        {activeTab === 'additional' && (
                            <div className="specs-table-container">
                                <table className="specs-table">
                                    <thead>
                                        <tr>
                                            <th>Attribute</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Material</td><td>Solid Wood & Premium Leather</td></tr>
                                        <tr><td>Weight</td><td>18.5 Kilograms</td></tr>
                                        <tr><td>Dimensions</td><td>24.5"D x 26.8"W x 34.2"H</td></tr>
                                        <tr><td>Warranty</td><td>2 Years Manufacturer Warranty</td></tr>
                                        <tr><td>Origin</td><td>Imported</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'review' && (
                            <div className="reviews-panel" style={{ display: 'grid', gap: '2rem' }}>
                                {[
                                    { name: 'Sarah Johnson', date: 'Oct 12, 2024', rating: 5, comment: 'Absolutely love this piece! The quality exceeded my expectations and it looks stunning in my living room.' },
                                    { name: 'Michael Chen', date: 'Sep 28, 2024', rating: 4, comment: 'Very comfortable and easy to assemble. The color is slightly darker than the photo, but still beautiful.' },
                                    { name: 'Emily Davis', date: 'Aug 15, 2024', rating: 5, comment: 'Perfect addition to my office. The ergonomic support is great for long working hours.' }
                                ].map((rev, idx) => (
                                    <div key={idx} className="review-item" style={{ borderBottom: '1px solid var(--nav-border)', paddingBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <strong style={{ fontSize: '1.1rem' }}>{rev.name}</strong>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{rev.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} color={i < rev.rating ? "#FFD700" : "#E2E8F0"} size={14} />
                                            ))}
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{rev.comment}</p>
                                    </div>
                                ))}
                                <button className="btn btn-outline" style={{ width: 'fit-content' }}>Write a Review</button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Related Products Section */}
                <section className="related-products-section">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ color: 'var(--color-accent)', fontWeight: '600' }}>Related Products</span>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Explore Related Products</h2>
                    </div>
                    <div className="product-grid">
                        {relatedProducts.map(p => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </section>
            </main>

            <ServicePoints />
            <Footer />
        </div>
    );
};

export default ProductView;
