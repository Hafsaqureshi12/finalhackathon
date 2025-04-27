import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:5000/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setAuthData(response.data);
            })
            .catch(() => {
                localStorage.removeItem('token');
            });
        }
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        setAuthData(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthData(null);
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
