import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Frontend/Login/login';
import Signup from './Frontend/Signup/signup';
import { WishlistProvider } from './Frontend/WishlistContexttt.js';
import CallHomeScreen from './Frontend/Main/CallHomeScreen';
import Contact from "./Frontend/ContactScreen/Contact";
import About from "./Frontend/AboutScreen/About";
import Profile from "./Frontend/ProfileScreen/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('isLoggedIn') === 'true');
  const [userId, setUserId] = useState(() => sessionStorage.getItem('userId') || null);

  const handleLogin = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userId', id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('userId');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.setItem('isLoggedIn', 'false');
      sessionStorage.removeItem('userId');
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!isLoggedIn ? <Signup onLogin={handleLogin} /> : <Navigate to="/" replace />} />

        {/* Protected routes */}
        {isLoggedIn && (
          <>
            <Route
              path="/*"
              element={
                <WishlistProvider>
                  <CallHomeScreen onLogout={handleLogout} userId={userId} />
                </WishlistProvider>
              }
            />

          </>
        )}

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
