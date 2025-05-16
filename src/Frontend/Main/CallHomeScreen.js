import React, { useState } from 'react';
import Nav from '../common/nav';
import Rout from '../common/rout';
import Footer from '../common/footer';

const CallHomeScreen = ({ onLogout }) => {
  const [cart, setCart] = useState([]);
  const [shop, setShop] = useState();
  const [search, setSearch] = useState('');

  const addtocart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist) {
      alert('This product is already added to cart');
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    console.log(cart);
  };

  return (
    <>
<Nav
      search={search}
      setSearch={setSearch}
      onLogout={onLogout}
    />
    <Rout
      setCart={setCart}
      cart={cart}
      shop={shop}
      addtocart={addtocart}
      onLogout={onLogout}
    />
      <Footer />
    </>
  );
};

export default CallHomeScreen;
