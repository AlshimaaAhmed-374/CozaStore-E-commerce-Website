import React, { useState } from 'react';
import Nav from '../common/nav';
import Rout from '../common/rout';
import Footer from '../common/footer';
import Homeproduct from '../home_product';

const CallHomeScreen = ({ onLogout }) => {
  const [cart, setCart] = useState([]);
  const [shop, setShop] = useState(Homeproduct);
  const [search, setSearch] = useState('');

  // Shop category filter
  const Filter = (x) => {
    const catefilter = Homeproduct.filter((product) => product.cat === x);
    setShop(catefilter);
  };

  const allcatefilter = () => {
    setShop(Homeproduct);
  };

  const searchproduct = () => {
    const searchfilter = Homeproduct.filter((x) => x.cat === search);
    setShop(searchfilter);
  };

  // Add to cart
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
      searchproduct={searchproduct}
      onLogout={onLogout}
    />
    <Rout
      setCart={setCart}
      cart={cart}
      shop={shop}
      Filter={Filter}
      allcatefilter={allcatefilter}
      addtocart={addtocart}
      onLogout={onLogout}
    />
      <Footer />
    </>
  );
};

export default CallHomeScreen;
