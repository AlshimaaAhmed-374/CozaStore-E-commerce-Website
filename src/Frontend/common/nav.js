import React from "react";
import { Link } from 'react-router-dom';
import { MdLocalShipping } from "react-icons/md";
import './nav.css';
import { AiOutlineSearch } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { CiLogout, CiUser } from "react-icons/ci";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = ({search,setSearch,searchproduct}) => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    return (
        <>
            <div className="header">
                <div className="top_header">
                    <div className="icon">
                        <MdLocalShipping />
                    </div>
                    <div className="info">
                        <p>Free Shipping When Shipping up to $1000</p>
                    </div>
                </div>

                <div className="mid_header">
                    <div className="logo">
                        <img src="img/Logo.png" alt="logo" />
                    </div>
                    <div className="search_box">
                        <input type="text" value={search} placeholder="Search" onChange={(e)=>setSearch(e.target.value)} />
                        <button onClick={searchproduct}><AiOutlineSearch /></button>
                    </div>
                    {
                        isAuthenticated ?
                        <div className="user">
                            <div className="icon">
                                <CiLogout />
                            </div>    
                            <div className="btn">
                                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
                            </div>
                        </div>
                        :
                        <div className="user">
                            <div className="icon">
                                <FiLogIn />
                            </div>    
                            <div className="btn">
                                <button onClick={() => loginWithRedirect()}>Login</button>
                            </div>
                        </div>
                    }
                </div>

                <div className="last_header">
                    <div className="user-profile">
                        {
                            isAuthenticated ?
                            <>
                                <div className="icon">
                                    <CiUser />
                                </div>
                                <div className="info">
                                    <h2>{user.name}</h2>
                                    <p>{user.email}</p>
                                </div>
                            </>
                            :
                            <>
                                <div className="icon">
                                    <CiUser />
                                </div>
                                <div className="info">
                                    <p>Please Login</p>
                                </div>
                            </>
                        }
                    </div>

                    <div className="nav">
                        <ul>
                            <li><Link to='/' className='link'>Home</Link></li>
                            <li><Link to='/shop' className='link'>Shop</Link></li>
                            <li><Link to='/cart' className='link'>Cart</Link></li>
                            <li><Link to='/about-page' className='link'>About</Link></li>
                            <li><Link to='/contact-page' className='link'>Contact</Link></li>
                            <li><Link to='/profile-page' className='link'>
                            Profile 
                            </Link></li>
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
