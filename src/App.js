import React, { useState } from 'react';
import Nav from './comp/nav';
import { BrowserRouter } from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';
import Homeproduct from './comp/home_product';
function App() {
  //Add to cart
  const[cart,setCart]=useState([])
  //Shop product page
  const[shop,setShop]=useState(Homeproduct)

  const[search,setSearch] =useState('')
  // shop cat filter
  const Filter=(x)=>{
    const catefilter=Homeproduct.filter((product)=>
    {
      return product.cat===x
    })
    setShop(catefilter)
  }
  const allcatefilter =()=>{
    setShop(Homeproduct)
  }
  const searchproduct=()=>{
    const searchfilter=Homeproduct.filter((x)=>
    {
      return x.cat===search
    })
    setShop(searchfilter)
  }

  //add to cart
  const addtocart =(product)=>{
    const exist=cart.find((x)=>{
      return x.id===product.id
     })
     if(exist){
      alert("This product is already added to cart")
     }
     else
    {setCart([...cart,{...product,qty:1}]) }
   console.log (cart)
  }
  return (
    <BrowserRouter>
      <Nav search={search} setSearch={setSearch} searchproduct={searchproduct} />
      <Rout  setCart={setCart} cart={cart} shop={shop}  Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart}/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
