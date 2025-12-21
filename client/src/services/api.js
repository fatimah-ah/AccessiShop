import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Signup API call
export const signup = async (name, email, password) => {
    try {
        const response = await api.post('/auth/signup', { name, email, password });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Signup failed. Please try again.',
        };
    }
};

// Login API call
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Login failed. Please try again.',
        };
    }
};

export default api;
