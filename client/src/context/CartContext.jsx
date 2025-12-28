import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load cart from backend on mount (if user is logged in)
    useEffect(() => {
        const loadCart = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/api/cart', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    // Convert backend cart format to frontend format
                    const backendCart = response.data.items || [];
                    const formattedCart = backendCart.map(item => ({
                        ...item.productId,
                        quantity: item.quantity
                    }));
                    setCart(formattedCart);
                } catch (error) {
                    console.error('Failed to load cart from backend:', error);
                    // Fallback to localStorage if backend fails
                    const savedCart = localStorage.getItem('cart');
                    if (savedCart) {
                        try {
                            setCart(JSON.parse(savedCart));
                        } catch (e) {
                            console.error("Failed to parse cart from localStorage", e);
                        }
                    }
                }
            } else {
                // Not logged in, use localStorage
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    try {
                        setCart(JSON.parse(savedCart));
                    } catch (e) {
                        console.error("Failed to parse cart from localStorage", e);
                    }
                }
            }
        };
        loadCart();
    }, []);

    // Save cart to localStorage on changes (for non-logged-in users)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = async (product, quantity = 1) => {
        const token = localStorage.getItem('token');

        // Update local state immediately for better UX
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === product._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });

        // Sync with backend if logged in
        if (token) {
            try {
                await axios.post('/api/cart/add', {
                    productId: product._id,
                    quantity
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Failed to sync cart with backend:', error);
            }
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        const token = localStorage.getItem('token');

        // Update local state
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId ? { ...item, quantity: newQuantity } : item
            )
        );

        // Sync with backend if logged in
        if (token) {
            try {
                await axios.put('/api/cart/update', {
                    productId,
                    quantity: newQuantity
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Failed to sync cart update with backend:', error);
            }
        }
    };

    const removeFromCart = async (productId) => {
        const token = localStorage.getItem('token');

        // Update local state
        setCart(prevCart => prevCart.filter(item => item._id !== productId));

        // Sync with backend if logged in
        if (token) {
            try {
                await axios.delete('/api/cart/remove', {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { productId }
                });
            } catch (error) {
                console.error('Failed to sync cart removal with backend:', error);
            }
        }
    };

    const clearCart = async () => {
        const token = localStorage.getItem('token');

        // Update local state
        setCart([]);
        localStorage.removeItem('cart');

        // Sync with backend if logged in
        if (token) {
            try {
                await axios.delete('/api/cart/clear', {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Failed to clear cart on backend:', error);
            }
        }
    };

    const refreshCart = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('/api/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Convert backend cart format to frontend format
                const backendCart = response.data.items || [];
                const formattedCart = backendCart.map(item => ({
                    ...item.productId,
                    quantity: item.quantity
                }));
                setCart(formattedCart);
            } catch (error) {
                console.error('Failed to refresh cart from backend:', error);
            }
        }
    };

    const mergeCart = async (guestCart, token) => {
        if (!guestCart || guestCart.length === 0) return;

        try {
            // Add each item from guest cart to backend
            for (const item of guestCart) {
                await axios.post('/api/cart/add', {
                    productId: item._id,
                    quantity: item.quantity
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            // Refresh cart from backend to get the final merged state
            await refreshCart();
            // Clear guest cart from localStorage
            localStorage.removeItem('cart');
        } catch (error) {
            console.error('Failed to merge guest cart:', error);
        }
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, refreshCart, mergeCart, cartTotal, cartCount, loading }}>
            {children}
        </CartContext.Provider>
    );
};
