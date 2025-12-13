import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import { signup } from '../services/api';

/**
 * Signup Screen
 * 
 * Features:
 * - Name, email, and password inputs with optional voice support
 * - Form validation matching backend requirements
 * - Error/success messages with aria-live
 * - Auto-redirect to login after successful signup
 */

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        // Clear message when user starts typing
        if (message.text) setMessage({ text: '', type: '' });
    };

    const validateForm = () => {
        const { name, email, password } = formData;

        if (!name || !email || !password) {
            setMessage({ text: 'Please fill all fields', type: 'error' });
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage({ text: 'Invalid email format', type: 'error' });
            return false;
        }

        // Password strength validation (min 6 characters)
        if (password.length < 6) {
            setMessage({ text: 'Password must be at least 6 characters long', type: 'error' });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setMessage({ text: '', type: '' });

        const result = await signup(formData.name, formData.email, formData.password);

        setIsLoading(false);

        if (result.success) {
            setMessage({ text: 'Signup successful! Redirecting to login...', type: 'success' });

            // Redirect to login after short delay
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } else {
            setMessage({ text: result.message, type: 'error' });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Sign Up</h1>
                <p className="auth-subtitle">Create your AccessiShop account</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <Input
                        label="Name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange({ target: { id: 'name', value: e.target.value } })}
                        placeholder="Your full name"
                        required
                        enableVoice={true}
                    />

                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange({ target: { id: 'email', value: e.target.value } })}
                        placeholder="your.email@example.com"
                        required
                        enableVoice={true}
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleChange({ target: { id: 'password', value: e.target.value } })}
                        placeholder="At least 6 characters"
                        required
                        enableVoice={true}
                    />

                    {/* Error/Success Message with aria-live */}
                    {message.text && (
                        <div
                            className={`message ${message.type}`}
                            role="alert"
                            aria-live="polite"
                        >
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Sign Up'}
                    </button>

                    <p className="auth-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
