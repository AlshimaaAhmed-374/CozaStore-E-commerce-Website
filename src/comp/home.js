import React, { useEffect, useState } from "react";
import './home.css'
import Homeproduct from "./home_product";
import { Link } from "react-router-dom";
import { AiFillEye, AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube } from "react-icons/bi";

const Home =({addtocart}) =>{
    const [newProduct , setNewProduct]= useState([])
    const [featuredProduct , setFeatreProduct]= useState([])
    const [topProduct , setTopProduct]= useState([])
    const [trendingProduct, setTrendingProduct]=useState(Homeproduct);
    const filtercate =(x) =>
    {
        const filterptoduct = Homeproduct.filter((curElm)=>
        {
            return curElm.type ===x
        })
        setTrendingProduct(filterptoduct)
    }


    const allTrendingProduct =()=>
    {
        setTrendingProduct(Homeproduct)
    }
    useEffect(()=>
    {
        productcategory()
    })
    const productcategory =()=>
    {
        //new product
        const newcategory= Homeproduct.filter((x)=>
        {
            return x.type === 'new'
        })
        setNewProduct(newcategory)
        //featured product
        const featuredcategory =Homeproduct.filter((x)=>
        {
            return x.type === 'featured'
        })
        setFeatreProduct(featuredcategory)
                //top product
        const topcategory =Homeproduct.filter((x)=>
        {
            return x.type === 'top'
        })
        setTopProduct(topcategory)
    }
    return(
        <>
        <div className="home">
            <div className="top_banner">
                <div className="contant">
                    <h3>silver aluminum</h3>
                    <h2>Apple watch</h2>
                    <p>30 % off at your first order</p>
                    <Link to='/shop' className="link">Shop Now</Link>
                </div>
            </div>
            <div className="trending">
                <div className="container">
                    <div className="left_box">
                        <div className="header">
                            <div className="heading">
                                <h2 onclick ={()=>allTrendingProduct()}>trending product</h2>
                            </div>
                            <div className="cate">
                                <h3 onClick={()=> filtercate('new')}>New</h3>
                                <h3 onClick={()=> filtercate('featured')}>Featued</h3>
                                <h3 onClick={()=> filtercate('top')}>top Selling</h3>
                            </div>
                        </div>
                        <div className="products">
                            <div className="container">
                                {
                                    trendingProduct.map((curElm)=>
                                    {
                                        return(
                                            <>
                                            <div className="box">
                                                <div className="img_box">
                                                    <img src={curElm.img} alt =''></img>
                                                    <div className="icon">
                                                        <div className="icon_box">
                                                            <AiFillEye />
                                                        </div>
                                                        <div className="icon_box">
                                                            <AiFillHeart />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="info">
                                                    <h3>{curElm.Name}</h3>
                                                    <p>${curElm.price}</p>
                                                    <button className="btn" onclick={()=>addtocart(curElm)}>Add to cart</button>
                                                </div>
                                            </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <button>Show More</button>
                        </div>
                    </div>
                    <div className="right_box">
                        <div className="right_container">
                            <div className="testimonial">
                                <div className="head">
                                    <h3>out testimonial</h3>
                                </div>
                                <div className="detail">
                                    <div className="img_box">
                                        <img src='img/qq'alt='testmonial'></img>
                                    </div>
                                    <div className="info">
                                        <h3>stephan</h3>
                                        <h4>web designer</h4>
                                        <p>Duis faucibus enim vitae numm</p>
                                    </div>
                                </div>
                            </div>
                            <div className="newletters">
                                <div className="head">
                                    <h3>newsletter</h3>
                                </div>
                                <div className="form">
                                    <p>join our mailling list</p>
                                    <input type='email' placeholder="E-mail" autoComplete="off"></input>
                                    <button>Subscribe</button>
                                    <div className="icon_box">
                                        <div className="icon">
                                            <BiLogoFacebook />
                                        </div>
                                        <div className="icon">
                                            <BiLogoTwitter />
                                        </div>
                                        <div className="icon">
                                            <BiLogoInstagram />
                                        </div>
                                        <div className="icon">
                                            <BiLogoYoutube />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="banners">
                <div className="container">
                    <div className="left_box">
                        <div className="box">
                            <img src='img/image5.png' alt='banner'></img>
                        </div>
                        <div className="box">
                            <img src='img/image.png' alt='banner'></img>
                        </div>
                    </div>
                    <div className="right_box">
                        <div className="top">
                            <img src='img/image5.png' alt='banner'></img>
                            <img src='img/image5.png' alt='banner'></img>
                        </div>
                        <div className="bottom">
                        <img src='img/.png' alt='banner'></img>

                        </div>
                    </div>
                </div>
            </div>
            <div className="product_type">
                <div className="container">
                    <div className="box">
                       <div className="header">
                          <h2>New Product</h2>
                        </div>
                        {
                            newProduct.map((curElm)=>{
                                return(
                                    <>
                                    <div className="productbox">
                                        <div className="img-box">
                                            <img src={curElm.img} alt=''></img>
                                        </div>
                                        <div className="detail">
                                            <h3>{curElm.Name}</h3>
                                            <p>${curElm.price}</p>
                                            <div className="icon">
                                                <button><AiFillEye /></button>
                                                <button><AiFillHeart /></button>
                                                <button onclick={()=>addtocart(curElm)}><AiOutlineShoppingCart /></button>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div> 
                    <div className="box">
                       <div className="header">
                          <h2>Featued Product</h2>
                        </div>
                        {
                            featuredProduct.map((curElm)=>{
                                return(
                                    <>
                                    <div className="productbox">
                                        <div className="img-box">
                                            <img src={curElm.img} alt=''></img>
                                        </div>
                                        <div className="detail">
                                            <h3>{curElm.Name}</h3>
                                            <p>${curElm.price}</p>
                                            <div className="icon">
                                                <button><AiFillEye /></button>
                                                <button><AiFillHeart /></button>
                                                <button onclick={()=>addtocart(curElm)}><AiOutlineShoppingCart /></button>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>

                    <div className="box">
                       <div className="header">
                          <h2>Top Product</h2>
                        </div>
                        {
                            topProduct.map((curElm)=>{
                                return(
                                    <>
                                    <div className="productbox">
                                        <div className="img-box">
                                            <img src={curElm.img} alt=''></img>
                                        </div>
                                        <div className="detail">
                                            <h3>{curElm.Name}</h3>
                                            <p>${curElm.price}</p>
                                            <div className="icon">
                                                <button><AiFillEye /></button>
                                                <button><AiFillHeart /></button>
                                                <button onclick={()=>addtocart(curElm)}><AiOutlineShoppingCart /></button>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Home;