import React, { useEffect } from "react";
import { useState } from "react";
import styles from './navbar.module.css';
import { Link } from'react-router-dom';   
import axios from 'axios';
import { useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;  

const Navbar = ({user,category}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/login')
             .then((response) => {
                 setIsLoggedIn(response.data);
                 console.log(isLoggedIn);
             })
             .catch((error) => {
                 console.log(error);
             });
    })


    return (
        <nav className={styles.navbar}>
            <h1 className={styles.link}><a className={styles.a} href="/">WebName</a></h1>
            <ul className={styles.navLinks}>
                <li className={styles.navElement}><a className={styles.a} href="/">Apps</a></li>
                <li className={styles.navElement}><a className={styles.a} href="/about">AI</a></li>
                <li className={styles.navElement}><a className={styles.a} href="/products">UI/UX</a></li>
                <li className={styles.navElement}>
                    {   
                        category === 'Seller'? 
                        <Link to={`/my-products/${user}`}><a className={styles.a}>My Products</a>
                        </Link>  : <a className={styles.a} href="/my-product">My Purchases</a>
                    }
                </li>
                <li className={styles.navElement}>
                    {   
                        category === 'Seller'?
                        <Link to={`/new-product/${user}`}><a className={styles.a}>Create new Product</a>
                        </Link> 
                         : ''
                    }
                </li>
            </ul>
            {isLoggedIn ? <button className={styles.loginButton}>
                Logout
                </button> : 
                <Link to="/login">
            <button className={styles.loginButton}>
                Login
                </button>
            </Link>}
            
        </nav>
    );
}

export default Navbar;