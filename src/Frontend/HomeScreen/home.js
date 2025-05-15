import React, { useEffect, useState } from "react";
import './home.css';
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiFillHeart } from "react-icons/ai";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube } from "react-icons/bi";
import { useWishlist } from '../WishlistContexttt';
import { FaAccessibleIcon, FaHeart, FaRegHeart } from "react-icons/fa";
import axios from 'axios';
import { FiHeart } from "react-icons/fi";

const Home = ({ addtocart,userId  }) => {
    const [newProduct, setNewProduct] = useState([]);
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [topProduct, setTopProduct] = useState([]);
    const [trendingProduct, setTrendingProduct] = useState([]);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 5000); // hide after 3 seconds
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/home/all');
            const data = response.data.data;
            // Ensure data is an array
            if (Array.isArray(data)) {
                setNewProduct(data.filter(x => x.type === 'new'));
                setFeaturedProduct(data.filter(x => x.type === 'featured'));
                setTopProduct(data.filter(x => x.type === 'top'));
                setTrendingProduct(data);
            } else {
                console.error('Fetched data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const fetchFilteredProducts = async (type) => {
        try {
            const response = await axios.get(`http://localhost:5000/home?type=${type}`);
            const data = response.data.data;
            // Ensure data is an array
            if (Array.isArray(data)) {
                setTrendingProduct(data);
            } else {
                console.error(`${type} products data is not an array`);
            }
        } catch (error) {
            console.error(`Error fetching ${type} products:`, error);
        }
    };
    const filterCate = (type) => {
        fetchFilteredProducts(type);
    };

    const allTrendingProduct = () => {
        fetchProducts();
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
        
        <div className="home">
            {message && (
                <div className="message-popup">
                    {message}
                </div>
                )}
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
                                <h2 onClick={allTrendingProduct}>Trending Products</h2>
                            </div>
                            <div className="cate">
                                <h3 onClick={() => filterCate('new')}>New</h3>
                                <h3 onClick={() => filterCate('featured')}>Featured</h3>
                                <h3 onClick={() => filterCate('top')}>Top Selling</h3>
                            </div>
                        </div>
                        <div className="products">
                            <div className="container">
                                {trendingProduct.map((curElm, index) => (
                                    <div className="box" key={index}>
                                        <div className="img_box">
                                            <img src={curElm.img} alt={curElm.name} />
                                            <div className="icon">
                                                <div className={`icon_box ${isInWishlist(curElm._id) ? 'active' : ''}`} onClick={() => handleWishlistClick(curElm)}>
                                                <FiHeart />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <h3>{curElm.name}</h3>
                                            <p>${curElm.price}</p>
                                            <button className="btn" onClick={() => {
                                                addtocart(curElm);
                                                showMessage("Successfully added to cart!");
                                            }}>Add to cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="right_box">
                        <div className="right_container">
                            <div className="testimonial">
                                <div className="head">
                                    <h3>Our Testimonial</h3>
                                </div>
                                <div className="detail">
                                    <div className="img_box">
                                        <img src='img/qq' alt='testimonial' />
                                    </div>
                                    <div className="info">
                                        <h3>Stephan</h3>
                                        <h4>Web Designer</h4>
                                        <p>Duis faucibus enim vitae nunc</p>
                                    </div>
                                </div>
                            </div>

                            <div className="newletters">
                                <div className="head">
                                    <h3>Newsletter</h3>
                                </div>
                                <div className="form">
                                    <p>Join our mailing list</p>
                                    <input type='email' placeholder="E-mail" autoComplete="off" />
                                    <button>Subscribe</button>
                                    <div className="icon_box">
                                        <div className="icon"><BiLogoFacebook /></div>
                                        <div className="icon"><BiLogoTwitter /></div>
                                        <div className="icon"><BiLogoInstagram /></div>
                                        <div className="icon"><BiLogoYoutube /></div>
                                    </div>
                                </div>
                            </div>
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
                        {newProduct.map((curElm, index) => (
                            <div className="productbox" key={index}>
                                <div className="img-box">
                                    <img src={curElm.img} alt={curElm.name} />
                                </div>
                                <div className="detail">
                                    <h3>{curElm.name}</h3>
                                    <p>${curElm.price}</p>
                                    <div className="icon">
                                        <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="box">
                        <div className="header">
                            <h2>Featured Product</h2>
                        </div>
                        {featuredProduct.map((curElm, index) => (
                            <div className="productbox" key={index}>
                                <div className="img-box">
                                    <img src={curElm.img} alt={curElm.name} />
                                </div>
                                <div className="detail">
                                    <h3>{curElm.name}</h3>
                                    <p>${curElm.price}</p>
                                    <div className="icon">
                                        <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="box">
                        <div className="header">
                            <h2>Top Product</h2>
                        </div>
                        {topProduct.map((curElm, index) => (
                            <div className="productbox" key={index}>
                                <div className="img-box">
                                    <img src={curElm.img} alt={curElm.name} />
                                </div>
                                <div className="detail">
                                    <h3>{curElm.name}</h3>
                                    <p>${curElm.price}</p>
                                    <div className="icon">
                                        <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
