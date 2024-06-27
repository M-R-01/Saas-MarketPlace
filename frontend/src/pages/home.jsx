import React from "react";
import styles from "./home.module.css";
import Navbar from "../components/navbar";
import ImageSlider from "../components/imageSlider";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useLocation } from 'react-router-dom';
import { useState } from'react';
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3000/login')
             .then((response) => {
                 setIsLoggedIn(response.data);
                 console.log(isLoggedIn);
             })
             .catch((error) => {
                 console.log(error);
             });

      axios.get('http://localhost:3000/products')
           .then(response => {
             console.log(response.data);
             setProducts(response.data);
             console.log(products);
           })
           .catch(error => {
             console.log(error);
           });
    })

    const location = useLocation();

    let user = '';
    let category = '';
    if (isLoggedIn) {
      user = location.state.id;
      category = location.state.category;
    }

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <div>
            <Navbar  user = {user} category={category} />
            <div className={styles.slider}>
                <ImageSlider />
            </div>
            <div className={styles.searchMenu}>
                <input className={styles.search} type="text" placeholder="Search for products" />
                <button className={styles.searchButton}>Search</button>
                <button className={styles.filterButton}>Filter</button>
            </div>
            <h2>Featured Products</h2>
            <Carousel responsive={responsive}>
                {products.map((product, index) => (
                <div className={styles.product}>
                <Link to={`/product/${product.ProductId}`}>
                <img className={styles.productImage} src={`http://localhost:3000/product-image/${product.ProductId}`} alt="Product Image" /></Link>
                <h3 className={styles.productTitle}>{product.ProductName}</h3>
                <p className={styles.productCategory}>in |<a href="/">{product.ProductCategory}</a></p>
                <p className={styles.productDescription}>
                {product.ProductSnippet}
                </p><p>
                Subscription:{product.ProductSubscription}
                </p>
                <h1 className={styles.productPrice}>${product.ProductPrice}</h1>
                </div>
                
                  
                ))}
            </Carousel>
        </div>
    );
}

export default Home;