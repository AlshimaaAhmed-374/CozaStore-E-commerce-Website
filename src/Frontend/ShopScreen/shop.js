import React from 'react'
import './shop.css';
import { FaHeart ,FaEye} from "react-icons/fa";
import { useWishlist } from '../WishlistContexttt';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Shop = ({ addtocart }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
   
    const [shop, setShop] = useState([]); // State to store products

    // Fetch products based on the category (if provided)
  // For specific category
const fetchProducts = async (category = 'all') => {
    const url = category === 'all' 
        ? 'http://localhost:5000/shop/all' 
        : `http://localhost:5000/shop?cat=${category}`;
    const response = await axios.get(url);
    setShop(response.data.data);  // Assuming 'data' holds the product array
};


    // Fetch products when the component mounts or category changes
    useEffect(() => {
        fetchProducts(); // Default fetch for all products on mount
    }, []);

    // Handle category click (filter products by category)
    const handleCategoryClick = (category) => {
        fetchProducts(category); // Fetch products based on category selection
    };

    const handleWishlistClick = (product) => {
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className='shop'> 
            <h2>#shop</h2>
            <p>Home . shop</p>
            <div className='containar'>
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
                                <li onClick={() => handleCategoryClick("watch")}>#watch</li>
                                <li onClick={() => handleCategoryClick("speaker")}>#speaker</li>
                                <li onClick={() => handleCategoryClick("electronics")}>#electronics</li>
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
                                        <img src={curElm.img} alt={curElm.Name} />
                                        <div className='icon'>
                                            <li 
                                                onClick={() => handleWishlistClick(curElm)}
                                                className={isInWishlist(curElm._id) ? 'active' : ''}
                                            >
                                                <FaHeart />
                                            </li>
                                            <li><FaEye /></li> 
                                        </div>
                                    </div>
                                    <div className='detail'>
                                        <h3>{curElm.Name}</h3>
                                        <p>${curElm.price}</p>
                                        <button onClick={() => addtocart(curElm)}>Add to cart</button>
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
