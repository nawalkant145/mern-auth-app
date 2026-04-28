import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) { setLoading(false); return; }
      const { data } = await API.get('/user/me');
      if (data.success) setUser(data.user);
    } catch {
      localStorage.removeItem('accessToken');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  const signup = async (name, email, password) => {
    const { data } = await API.post('/auth/signup', { name, email, password });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data.user);
    return data;
  };

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try { await API.post('/auth/logout'); } catch {}
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const updateName = async (name) => {
    const { data } = await API.put('/user/update', { name });
    setUser(data.user);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateName, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
