import React from "react";
import styles from './product.module.css';
import Rating from '../components/rating';
import { useParams } from'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:3000/product/${id}`)
       .then(response => {
         setProduct(response.data);
       })
       .catch(error => {
         console.log(error);
       });
    }, [id]); // Add the 'id' dependency to the useEffect hook


    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <p>{product?.ProductCategory}</p>
                <div className={styles.image}>
                    <img className={styles.productImage} src={`http://localhost:3000/product-image/${id}`} alt="Product Image" />
                </div>
                <p>{product?.ProductDescription}</p>
                <div className={styles.image}>
                    <img className={styles.productImage} src={`http://localhost:3000/product-image/${id}`} alt="Product Image" />
                </div>
                <p>{product?.ProductDescription}</p>
                
            </div>
            <div className={styles.productInfo}>
                <div className={styles.imageDiv}>
                    <img className={styles.productImage} src={`http://localhost:3000/product-image/${id}`} alt="Product Image" />
                </div>
                <h3 className={styles.productTitle}>{product?.ProductName}</h3>
                <p className={styles.productDescription}>{product?.ProductSnippet}</p>
                <Rating id={id} />
                <h1 className={styles.productPrice}>$99.99</h1>
            </div>
        </div>
    )
}

export default Product;