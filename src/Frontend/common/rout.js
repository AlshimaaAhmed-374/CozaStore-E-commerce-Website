import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../HomeScreen/home";
import Shop from "../ShopScreen/shop";
import Cart from "../cartScreen/cart";



const Rout = ({shop,Filter,allcatefilter,addtocart,cart,setCart}) => {
    return (
        <Routes>
            <Route path='/' element={<Home addtocart={addtocart} />} />
            <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>} />

            <Route path='shop' element={<Shop shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart}/>} />

        </Routes>
    );
};

export default Rout;
