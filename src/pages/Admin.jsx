import React, { useState, useEffect } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import AdminLogin from '../components/AdminLogin';
import adminApi from '../services/adminApi';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('adminProfile');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await adminApi.get('/api/auth/verify', token);
        setAdmin(data.admin);
        localStorage.setItem('adminProfile', JSON.stringify(data.admin));
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminProfile');
        setToken(null);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleLoginSuccess = (newToken, newAdmin) => {
    localStorage.setItem('adminToken', newToken);
    if (newAdmin) localStorage.setItem('adminProfile', JSON.stringify(newAdmin));
    setToken(newToken);
    setAdmin(newAdmin || null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminProfile');
    setToken(null);
    setAdmin(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard token={token} admin={admin} onLogout={handleLogout} />;
};

export default Admin;
