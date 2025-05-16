import React from 'react'
import './shop.css';
import { FaHeart } from "react-icons/fa";
import { useWishlist } from '../WishlistContexttt';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Shop = ({ addtocart }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [shop, setShop] = useState([]); 
    const [message, setMessage] = useState("");

const fetchProducts = async (category = 'all') => {
    const url = category === 'all' 
        ? 'http://localhost:5000/shop/all' 
        : `http://localhost:5000/shop?cat=${category}`;
    const response = await axios.get(url);
    setShop(response.data.data);  
};
const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
    };

    useEffect(() => {
        fetchProducts(); 
    }, []);

    const handleCategoryClick = (category) => {
        fetchProducts(category);
    };

const handleWishlistClick = (product) => {
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
            showMessage("Removed from wishlist!");
        } else {
            addToWishlist(product);
            showMessage("Added to wishlist!");
        }
    };

    return (
        <div className='shop'> 
                {message && (
                <div className="message-popup">
                    {message}
                </div>
                )}
            <h2>#shop</h2>
            <p>Home . shop</p>
            <div className='container'>
                <div className='left_box'>
                    <div className='category'>
                        <div className='header'>
                            <h3>all categories</h3>
                        </div>
                        <div className='box'>
                            <ul>
                                <li onClick={() => handleCategoryClick()}>#All</li>
                                <li onClick={() => handleCategoryClick("tv")}>#tv</li>
                                <li onClick={() => handleCategoryClick("laptop")}>#laptop</li>
                                <li onClick={() => handleCategoryClick("smartwatch")}>#smart watch</li>
                                <li onClick={() => handleCategoryClick("headphone")}>#headphone</li>
                                <li onClick={() => handleCategoryClick("phone")}>#phone</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='right_box'>
                    <div className='banner'>
                        <div className='img_box'>
                            <img src='img/shop3.jpg' alt='' />   
                        </div> 
                    </div>
                    <div className='product_box'>
                        <h2>shop product</h2>
                        <div className='product_container'>
                            {shop.map((curElm) => (
                                <div className='box' key={curElm._id}>
                                    <div className='img_box'>
                                        <img src={curElm.img} alt={curElm.name} />
                                        <div className='icon'>
                                            <li onClick={() => handleWishlistClick(curElm)}>
                                                <div className={`icon_box ${isInWishlist(curElm._id) ? 'active' : ''}`}>
                                                    <FaHeart />
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                    <div className='detail'>
                                        <h3>{curElm.name}</h3>
                                        <p>${curElm.price}</p>
                                            <button  onClick={() => {
                                                addtocart(curElm);
                                                showMessage("Successfully added to cart!");
                                            }}>Add to cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
