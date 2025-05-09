import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../HomeScreen/home";
import Shop from "../ShopScreen/shop";
import Cart from "../cartScreen/cart";
import LoginSignup from "../LoginSignup/LoginSignup";
import Contact from "../ContactScreen/Contact";
import About from "../AboutScreen/About";
import Profile from "../ProfileScreen/Profile";



const Rout = ({shop,Filter,allcatefilter,addtocart,cart,setCart}) => {
    return (
        <Routes>
            <Route path='/' element={<Home addtocart={addtocart} />} />
            <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>} />
            <Route path='shop' element={<Shop shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart}/>} />
            <Route path="/profile-page" element={<Profile />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/contact-page" element={<Contact />} />
            <Route path="/about-page" element={<About />} />
        </Routes>
    );
};

export default Rout;
