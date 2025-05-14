import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('http://localhost:5000/wishlist', { withCredentials: true });
      setWishlist(res.data.data.products || []);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error.message);
    }
  };

  const addToWishlist = async (product) => {
    try {
      const res = await axios.post('http://localhost:5000/wishlist/add', {
        productId: product._id || product.id,
      }, { withCredentials: true });
      setWishlist(res.data.data.products);
    } catch (error) {
      console.error('Failed to add to wishlist:', error.message);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.post('http://localhost:5000/wishlist/remove', {
        productId,
      }, { withCredentials: true });
      setWishlist(res.data.data.products);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error.message);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(product => (product._id || product.id) === productId);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
