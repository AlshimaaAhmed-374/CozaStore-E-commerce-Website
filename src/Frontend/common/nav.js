import React from "react";
import { Link } from 'react-router-dom';
import { MdLocalShipping } from "react-icons/md";
import './nav.css';
import { CiLogout } from "react-icons/ci";

const Nav = ({onLogout}) => {
        const handleLogoutClick = () => {
        onLogout(); // trigger logout logic passed from parent
    };
    return (
        <>
            <div className="header">
                <div className="top_header">
                </div>

                <div className="mid_header">
                    <div className="logo">
                        <img src='logo-01.png' alt="logo" />
                    </div>
                    <div className="search_box">
                    </div>
                        <div className="user">
                            <div className="icon">
                                <CiLogout />
                            </div>    
                            <div className="btn">
                                <button onClick={() => handleLogoutClick()}>Logout</button>
                            </div>
                        </div>
                </div>
                <div className="last_header">
                    <div className="user-profile">
                    </div>

                    <div className="nav">
                        <ul>
                            <li><Link to='/' className='link'>Home</Link></li>
                            <li><Link to='/shop' className='link'>Shop</Link></li>
                            <li><Link to='/cart' className='link'>Cart</Link></li>
                            <li><Link to='/about-page' className='link'>About</Link></li>
                            <li><Link to='/contact-page' className='link'>Contact</Link></li>
                            <li><Link to='/profile-page' className='link'>Profile </Link></li>
                        </ul>
                    </div>

                    <div className="offer">
                        <p>flat 10% over all iPhone</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;