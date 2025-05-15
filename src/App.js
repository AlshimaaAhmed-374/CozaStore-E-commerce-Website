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

  const [userId, setUserId] = useState(() => {
    return sessionStorage.getItem('userId') || null;
  });

  // Handle login
  const handleLogin = (id) => {
    setIsLoggedIn(true);
   // setUserId(id);

    sessionStorage.setItem('isLoggedIn', 'true');
    //sessionStorage.setItem('userId', id);  // Save the userId
  };

  // Sync state with sessionStorage on logout
  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.setItem('isLoggedIn', 'false');
      //sessionStorage.removeItem('userId');
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <div>
          <LoginSignup onLogin={handleLogin} />
        </div>
      ) : (
        <WishlistProvider  >
          <Home  />
        </WishlistProvider>
      )}
    </BrowserRouter>
  );
}
//userId={userId}
export default App;