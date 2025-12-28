import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { email: 'test@test.com' }
    const [loading, setLoading] = useState(true);

    // Configure axios to send cookies
    axios.defaults.withCredentials = true;

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/auth/me');
            setUser(res.data.user);
            setLoading(false);
        } catch (error) {
            setUser(null);
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
        setUser(res.data.user);
    };

    const signup = async (email, password) => {
        const res = await axios.post('http://localhost:5001/api/auth/signup', { email, password });
        setUser(res.data.user);
    };

    const logout = async () => {
        await axios.get('http://localhost:5001/api/auth/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
