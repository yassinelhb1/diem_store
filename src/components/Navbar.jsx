import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.JPG";

import { auth } from '../configuration/config';
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart';
import './styles.css';
import Icon from "react-icons-kit";



export const Navbar = ({ user,totaProducts }) => {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');  
        });
    };
    

    return (
        <div className="Navbar">
            <div className="leftside">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className="top-right-links">
                {!user && <>
                    <div><Link className="navlink" to="singup">SIGN UP</Link></div>
                    <div><Link className="navlink a" to="login">LOG IN</Link></div>
                    
                </>}
                {user && <>
                    <div><Link className="navlink" to="/">{user}</Link></div>
                    <div className="cart-menu-btn">
                        <Link className="navlink" to="/cart">
                         <Icon icon={shoppingCart} size={20}></Icon>
                        </Link>
                       <span className="cart-indicator">{totaProducts}</span>
                    </div>
                    {user && (
                     <button className="btn btn-danger "onClick={handleLogout}>Logout</button>
                       )}

                </>}
            </div>
        </div>
    );
};
