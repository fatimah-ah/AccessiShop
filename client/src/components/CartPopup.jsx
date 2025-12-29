import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FaCheckCircle } from 'react-icons/fa';

const CartPopup = () => {
    const { popupState, closePopup } = useCart();

    useEffect(() => {
        if (popupState.isOpen) {
            const timer = setTimeout(() => {
                closePopup();
            }, 3500); // Stays for 3.5 seconds
            return () => clearTimeout(timer);
        }
    }, [popupState.isOpen, closePopup]);

    if (!popupState.isOpen || !popupState.product) return null;

    return (
        <div className="cart-notification-bar" onClick={closePopup}>
            <div className="cart-notification-content">
                <FaCheckCircle className="cart-success-icon" />
                <span className="cart-msg-text">
                    Added <strong>{popupState.product.title}</strong> to cart!
                </span>
            </div>
        </div>
    );
};

export default CartPopup;
