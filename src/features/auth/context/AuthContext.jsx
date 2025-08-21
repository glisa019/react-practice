import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginService, register as registerService, registerConsumer as registerConsumerService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const setCookie = (name, value, days = 7) => {
    const maxAge = 60 * 60 * 24 * days;
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  const login = async (credentials) => {
    const response = await loginService(credentials);
    setUser(response.account);
    localStorage.setItem('user', JSON.stringify(response.account));
    setCookie('token', response.token);
    return response;
  };

  const register = async (userData) => {
    const response = await registerService(userData);
    setUser(response.account);
    localStorage.setItem('user', JSON.stringify(response.account));
    setCookie('token', response.token);
    return response;
  };

  const registerConsumer = async (userData) => {
    const response = await registerConsumerService(userData);
    setUser(response.account);
    localStorage.setItem('user', JSON.stringify(response.account));
    setCookie('token', response.token);
    return response;
  };

  const logout = () => {  
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('themeSettings');
    setCookie('token', '', -1);
  };

  const [token, setToken] = useState(() => getCookie('token'));

  useEffect(() => {
    setToken(getCookie('token'));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, registerConsumer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
