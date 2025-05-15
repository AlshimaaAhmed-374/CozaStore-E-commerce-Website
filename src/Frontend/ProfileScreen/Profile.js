import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useWishlist } from "../WishlistContexttt";
import './profile.css';
import { Link, useNavigate } from "react-router-dom";

const Profile = ({ addtocart,onLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate('/');
    };
    const [message, setMessage] = useState("");
    const { wishlist,addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [activeTab, setActiveTab] = useState('profile');
    const [avatar, setAvatar] = useState(null);
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
        address: ''
    });
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [errorOrders, setErrorOrders] = useState(null);

    const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/users', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!res.ok) throw new Error('Failed to fetch user');
                const data = await res.json();
                setUser(data);
                if (data.avatar) setAvatar(data.avatar);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (activeTab === 'history') {
                try {
                    setLoadingOrders(true);
                    setErrorOrders(null);
                    const res = await fetch('http://localhost:5000/api/orders', {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (!res.ok) throw new Error('Failed to fetch orders');
                    
                    const data = await res.json();
                    setOrders(data.data);
                } catch (err) {
                    console.error("Error fetching orders:", err);
                    setErrorOrders(err.message);
                } finally {
                    setLoadingOrders(false);
                }
            }
        };
        
        fetchOrders();
    }, [activeTab]);

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async () => {
        try {
            const formData = { ...user };
            if (avatar) formData.avatar = avatar;

            const res = await fetch('http://localhost:5000/api/users/update-me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Update failed');
            alert("Profile updated successfully!");
            setUser(data.data);
            if (data.data.avatar) setAvatar(data.data.avatar);
        } catch (error) {
            console.error("Update failed:", error);
            alert(error.message);
        }
    };

    return (
        <div className="profile-page">
            {message && (
                <div className="message-popup">
                    {message}
                </div>
                )}
            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="sidebar-menu">
                        <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</button>
                        <button className={activeTab === 'wishlist' ? 'active' : ''} onClick={() => setActiveTab('wishlist')}>Wishlist ({wishlist.length})</button>
                        <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>Order History</button>
                        <button className="signout-btn" onClick={handleLogout}>Sign Out</button>
                    </div>
                </div>

                <div className="profile-content">
                    {activeTab === 'profile' && (
                        <div className="profile-info">
                            <h1>PROFILE</h1>
                            <div className="avatar-section">
                                <div className="avatar-upload">
                                    {avatar ? (
                                        <img src={avatar} alt="User Avatar" className="avatar-preview" />
                                    ) : (
                                        <div className="avatar-placeholder">No Avatar</div>
                                    )}
                                    <input type="file" id="avatar-upload" onChange={handleAvatarChange} accept="image/*" />
                                    <label htmlFor="avatar-upload" className="upload-btn">Upload Picture</label>
                                </div>
                                <div className="social-connect">
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Username:</label>
                                <input type="text" name="username" value={user.username} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>E-mail:</label>
                                <input type="email" name="email" value={user.email} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Phone Number:</label>
                                <input type="tel" name="phone" value={user.phone} onChange={handleInputChange} placeholder="Enter your phone number" />
                            </div>

                            <div className="form-group">
                                <label>Shipping Address:</label>
                                <textarea name="address" value={user.address} onChange={handleInputChange} placeholder="Enter your shipping address" rows="4" />
                            </div>

                            <button className="update-btn" onClick={handleUpdateProfile}>Update Information</button>
                        </div>
                    )}

                    {activeTab === 'wishlist' && (
                        <div className="wishlist-section">
                            <h1>WISHLIST ({wishlist.length})</h1>
                            <div className="wishlist-products">
                                {wishlist.length > 0 ? (
                                    wishlist.map(product => (
                                        <div className="wishlist-item" key={product.id}>
                                            <div className="product-image">
                                                <img src={product.img} alt={product.name} />
                                            </div>
                                            <div className="product-info">
                                                <h3>{product.name}</h3>
                                                <p>${product.price}</p>
                                            </div>
                                            <div className="product-actions">
                                                <button className="action-btn heart active" onClick={() => handleWishlistClick(product)}><AiFillHeart /></button>
                                                <button className="action-btn" onClick={() => {
                                                addtocart(product);
                                                showMessage("Successfully added to cart!");}}><AiOutlineShoppingCart /></button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-wishlist">
                                        <AiOutlineHeart className="empty-icon" />
                                        <p className="empty-message">Your wishlist is empty</p>
                                        <Link to="/shop" className="shop-link">Browse Products</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="history-section">
                            <h1>ORDER HISTORY</h1>
                            <div className="order-history">
                                {loadingOrders ? (
                                    <p className="loading-message">Loading orders...</p>
                                ) : errorOrders ? (
                                    <p className="error-message">Error: {errorOrders}</p>
                                ) : orders.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Items</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order._id}>
                                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                    <td>{order.products.length}</td>
                                                    <td>${order.totalAmount?.toFixed(2)}</td>
                                                    <td>{order.status || 'Processing'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="empty-message">You haven't made any purchases yet</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;