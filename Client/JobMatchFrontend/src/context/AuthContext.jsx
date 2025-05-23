import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: decoded.id, role: decoded.role });
      localStorage.setItem('userId', decoded.id); // Store userId in localStorage
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://jobmatch-ixrz.onrender.com/api/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      const decoded = JSON.parse(atob(res.data.token.split('.')[1]));
      setUser({ id: decoded.id, role: decoded.role });
      localStorage.setItem('userId', decoded.id); // Store userId
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email, password, role) => {
    try {
      const res = await axios.post('https://jobmatch-ixrz.onrender.com/api/auth/signup', { email, password, role });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      const decoded = JSON.parse(atob(res.data.token.split('.')[1]));
      setUser({ id: decoded.id, role: decoded.role });
      localStorage.setItem('userId', decoded.id); // Store userId
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Remove userId on logout
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);