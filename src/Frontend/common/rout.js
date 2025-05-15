import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../HomeScreen/home";
import Shop from "../ShopScreen/shop";
import Cart from "../cartScreen/cart";
import Profile from "../ProfileScreen/Profile";
import Login from "../Login/login";
import Signup from "../Signup/signup";
import Contact from "../ContactScreen/Contact";
import About from "../AboutScreen/About";

const MainRoutes = ({ shop, Filter, allcatefilter, addtocart, cart, setCart, onLogout}) => {
  return (
    <Routes>
            <Route path='/' element={<Home addtocart={addtocart} />} />
            <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>} />
            <Route path='shop' element={<Shop shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart} />} />
            <Route path="/profile-page" element={<Profile addtocart={addtocart} onLogout={onLogout}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/contact-page" element={<Contact  />} />
            <Route path="/about-page" element={<About />} />
    </Routes>
  );
};

export default MainRoutes;
