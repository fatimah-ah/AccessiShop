import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import { login } from '../services/api';

/**
 * Login Screen
 * 
 * Features:
 * - Email and password inputs with optional voice support
 * - Form validation
 * - Error/success messages with aria-live
 * - JWT token storage on success
 */

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
        const { email, password } = formData;

        if (!email || !password) {
            setMessage({ text: 'Please fill all fields', type: 'error' });
            return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage({ text: 'Invalid email format', type: 'error' });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setMessage({ text: '', type: '' });

        const result = await login(formData.email, formData.password);

        setIsLoading(false);

        if (result.success) {
            // Store JWT token
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));

            setMessage({ text: 'Login successful! Redirecting...', type: 'success' });

            // Redirect after short delay
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        } else {
            setMessage({ text: result.message, type: 'error' });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Login</h1>
                <p className="auth-subtitle">Welcome back to AccessiShop</p>

                <form onSubmit={handleSubmit} className="auth-form">
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
                        placeholder="Enter your password"
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
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="auth-link">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
