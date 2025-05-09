import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram } from "react-icons/bi";
import { useWishlist } from "../WishlistContexttt";
import './profile.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [avatar, setAvatar] = useState(null);
    const [user, setUser] = useState({
        username: 'Aienkrekmanov',
        email: 'azkrekmanov@gmail.com',
        phone: '+359 123 456 789',
        address: '123 Main Street, Sofia, Bulgaria'
    });
    const handleSignOut = () => {
        // Add any sign-out logic here (clearing tokens, etc.)
        navigate('/login'); // Redirect to login page
    };
    const { wishlist, removeFromWishlist } = useWishlist();

    const [purchaseHistory] = useState([
        { id: 1, orderId: 'ORD123', date: '2023-05-15', total: 89.97, items: 3, status: 'Delivered' },
        { id: 2, orderId: 'ORD124', date: '2023-06-20', total: 129.99, items: 2, status: 'Shipped' },
    ]);

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="sidebar-menu">
                        <button 
                            className={activeTab === 'profile' ? 'active' : ''}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </button>
                        <button 
                            className={activeTab === 'wishlist' ? 'active' : ''}
                            onClick={() => setActiveTab('wishlist')}
                        >
                            Wishlist ({wishlist.length})
                        </button>
                        <button 
                            className={activeTab === 'history' ? 'active' : ''}
                            onClick={() => setActiveTab('history')}
                        >
                            Order History
                        </button>
                        <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
                    </div>
                </div>

                <div className="profile-content">
                    {activeTab === 'profile' && (
                        <div className="profile-info">
                            <h1>PROFILE</h1>
                            <div className="avatar-section">
                                <h2>Avatar picture</h2>
                                <div className="avatar-upload">
                                    {avatar ? (
                                        <img src={avatar} alt="User Avatar" className="avatar-preview" />
                                    ) : (
                                        <div className="avatar-placeholder">No Avatar</div>
                                    )}
                                    <input 
                                        type="file" 
                                        id="avatar-upload" 
                                        onChange={handleAvatarChange} 
                                        accept="image/*"
                                    />
                                    <label htmlFor="avatar-upload" className="upload-btn">
                                        Upload Picture
                                    </label>
                                </div>
                                <div className="social-connect">
                                    <button className="social-btn facebook"><BiLogoFacebook /> Add Facebook</button>
                                    <button className="social-btn twitter"><BiLogoTwitter /> Add Twitter</button>
                                    <button className="social-btn instagram"><BiLogoInstagram /> Add Instagram</button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Username:</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={user.username} 
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>E-mail:</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={user.email} 
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number:</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={user.phone} 
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div className="form-group">
                                <label>Shipping Address:</label>
                                <textarea 
                                    name="address" 
                                    value={user.address} 
                                    onChange={handleInputChange}
                                    placeholder="Enter your shipping address"
                                    rows="4"
                                />
                            </div>

                            <button className="update-btn">Update Information</button>
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
                                                <img src={product.img} alt={product.Name} />
                                            </div>
                                            <div className="product-info">
                                                <h3>{product.Name}</h3>
                                                <p>${product.price}</p>
                                            </div>
                                            <div className="product-actions">
                                                <button 
                                                    className="action-btn heart active"
                                                    onClick={() => removeFromWishlist(product.id)}
                                                >
                                                    <AiFillHeart />
                                                </button>
                                                <button className="action-btn cart">
                                                    <AiOutlineShoppingCart />
                                                </button>
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
                                {purchaseHistory.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Date</th>
                                                <th>Items</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {purchaseHistory.map(order => (
                                                <tr key={order.id}>
                                                    <td>{order.orderId}</td>
                                                    <td>{order.date}</td>
                                                    <td>{order.items}</td>
                                                    <td>${order.total}</td>
                                                    <td>{order.status}</td>
                                                    <td>
                                                        <button className="view-btn">View Details</button>
                                                    </td>
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