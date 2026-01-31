import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

// API Base URL - change this based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in and validate token
    const validateToken = async () => {
      const savedToken = localStorage.getItem('adminToken');
      const savedAdmin = localStorage.getItem('adminData');
      
      if (savedToken) {
        try {
          // Validate token by making a request to the server
          const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
            headers: {
              'Authorization': `Bearer ${savedToken}`
            }
          });
          
          if (response.ok) {
            setToken(savedToken);
            setAdmin(savedAdmin ? JSON.parse(savedAdmin) : { email: 'Admin' });
            setIsAuthenticated(true);
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminData');
          }
        } catch (error) {
          console.error('Token validation error:', error);
          // Keep logged in if server is unreachable but we have stored data
          if (savedAdmin) {
            setToken(savedToken);
            setAdmin(JSON.parse(savedAdmin));
            setIsAuthenticated(true);
          }
        }
      }
      setLoading(false);
    };
    
    validateToken();
  }, []);

  const handleLogin = (token, adminData) => {
    setToken(token);
    setAdmin(adminData);
    setIsAuthenticated(true);
    // Save admin data to localStorage for persistence
    localStorage.setItem('adminData', JSON.stringify(adminData));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
  };

  // Show loading state while validating token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated && token) {
    return (
      <AdminDashboard 
        token={token} 
        admin={admin} 
        onLogout={handleLogout} 
      />
    );
  }

  return <AdminLogin onLogin={handleLogin} />;
};

export default Admin;