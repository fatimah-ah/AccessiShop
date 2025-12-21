import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import Input from '../components/Input';
import ServicePoints from '../components/ServicePoints';
import axios from 'axios';
import '../Layout.css';

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const heroImages = [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200', // Shoes
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200', // Watch
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200'  // Headphones
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token) {
            navigate('/login');
            return;
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/products');
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [navigate]);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="app-layout">
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            <Navbar />

            <main id="main-content" className="main-content">
                <header className="page-header" style={{ textAlign: 'center' }}>
                    <h1 className="page-title">
                        Hello, {user ? user.name : 'Shopper'}
                    </h1>
                    <p className="page-subtitle">
                        Welcome back to AccessiShop.
                    </p>
                </header>

                <HeroCarousel images={heroImages} />

                <section
                    className="search-section"
                    aria-label="Search Products"
                    style={{ maxWidth: '600px', margin: '0 auto var(--spacing-2xl) auto' }}
                >
                    <Input
                        label="Find Products"
                        placeholder="Search for shoes, electronics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        enableVoice={true}
                    />
                </section>

                <section className="featured-products" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>
                            {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
                        </h2>
                        {!searchQuery && (
                            <button
                                className="btn btn-outline"
                                onClick={() => navigate('/shop')}
                            >
                                View All
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gap: '2rem'
                            }}
                        >
                            {filteredProducts.slice(0, 12).map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                            {filteredProducts.length === 0 && (
                                <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                    No products found matching your search.
                                </p>
                            )}
                        </div>
                    )}
                </section>

                <section className="dashboard-grid">
                    {!searchQuery && (
                        <div className="auth-card" style={{ maxWidth: '100%', textAlign: 'center' }}>
                            <h2>Explore More</h2>
                            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                Visit our shop to see the full collection.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/shop')}
                            >
                                Go to Shop
                            </button>
                        </div>
                    )}
                </section>
            </main>

            <ServicePoints />
            <Footer />
        </div>
    );
};

export default Home;
