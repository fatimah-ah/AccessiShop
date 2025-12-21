import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import '../Layout.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/products');
                const data = res.data;
                setProducts(data);
                setFilteredProducts(data);

                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(data.map(p => p.category))];
                setCategories(uniqueCategories);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === category));
        }
    };

    return (
        <div className="app-layout">
            <a href="#shop-content" className="skip-link">Skip to shop content</a>
            <Navbar />

            <main id="shop-content" className="main-content">
                <header className="page-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 className="page-title">Shop All Products</h1>
                    <p className="page-subtitle">Browse our complete accessible catalog.</p>
                </header>

                <div className="shop-layout" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

                    {/* Sidebar / Topbar Filter */}
                    <aside
                        className="shop-sidebar"
                        style={{
                            flex: '1 0 200px',
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}
                    >
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Categories</h2>
                        <div className="category-list" role="tablist" aria-label="Product Categories">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    role="tab"
                                    aria-selected={activeCategory === cat}
                                    className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => handleCategoryClick(cat)}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        marginBottom: '0.5rem',
                                        display: 'block'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <section
                        className="shop-grid"
                        style={{ flex: '999 1 600px' }}
                        aria-label="Product Grid"
                    >
                        {loading ? (
                            <p>Loading catalog...</p>
                        ) : (
                            <>
                                <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                    Showing {filteredProducts.length} results
                                </p>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                        gap: '2rem'
                                    }}
                                >
                                    {filteredProducts.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                                {filteredProducts.length === 0 && (
                                    <p>No products found in this category.</p>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Shop;
