import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Frontend/Login/login';
import Signup from './Frontend/Signup/signup';
import Home from './Frontend/Main/CallHomeScreen';
import { WishlistProvider } from './Frontend/WishlistContexttt.js';

function App() {
  // Initialize login state from sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

  const [userId, setUserId] = useState(() => {
    return sessionStorage.getItem('userId') || null;
  });

  // Handle login
  const handleLogin = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userId', id);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('userId');
  };

  // Sync state with sessionStorage on logout
  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.setItem('isLoggedIn', 'false');
      sessionStorage.removeItem('userId');
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={!isLoggedIn ? 
            <Login onLogin={handleLogin} /> : 
            <Navigate to="/" replace />} 
        />
        <Route 
          path="/signup" 
          element={!isLoggedIn ? 
            <Signup onLogin={handleLogin} /> : 
            <Navigate to="/" replace />} 
        />
        
        {/* Protected routes */}
        <Route 
          path="/" 
          element={isLoggedIn ? 
            <WishlistProvider>
              <Home onLogout={handleLogout} userId={userId} />
            </WishlistProvider> : 
            <Navigate to="/login" replace />} 
        />
        
        {/* Catch-all route */}
        <Route 
          path="*" 
          element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;