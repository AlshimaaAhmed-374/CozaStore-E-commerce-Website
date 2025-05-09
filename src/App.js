import React, { useState } from 'react';
import LoginSignup from './Frontend/LoginSignup/LoginSignup';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Home from './Frontend/Main/CallHomeScreen';
import { WishlistProvider } from './Frontend/WishlistContexttt.js';
function App() {
  // Add to cart
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login function
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {/* Only wrap the top level in BrowserRouter */}
      {!isLoggedIn ? (
        <div>
          <LoginSignup onLogin={handleLogin} />
        </div>
      ) : (
        <WishlistProvider >
            <Home />
        </WishlistProvider>
      
      )}
    </BrowserRouter>
  );
}
export default App;
