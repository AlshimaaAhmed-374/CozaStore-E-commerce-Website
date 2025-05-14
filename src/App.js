import React, { useState, useEffect } from 'react';
import LoginSignup from './Frontend/LoginSignup/LoginSignup';
import { BrowserRouter } from 'react-router-dom';
import Home from './Frontend/Main/CallHomeScreen';
import { WishlistProvider } from './Frontend/WishlistContexttt.js';

function App() {
  // Initialize login state from sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  // Sync state with sessionStorage on logout
  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.setItem('isLoggedIn', 'false');
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <div>
          <LoginSignup onLogin={handleLogin} />
        </div>
      ) : (
        <WishlistProvider>
          <Home />
        </WishlistProvider>
      )}
    </BrowserRouter>
  );
}

export default App;