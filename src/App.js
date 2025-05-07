import React, { useState } from 'react';
import LoginSignup from './Frontend/LoginSignup/LoginSignup';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Home from './Frontend/Main/CallHomeScreen';

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
        <Home />
      )}
    </BrowserRouter>
  );
}
export default App;
