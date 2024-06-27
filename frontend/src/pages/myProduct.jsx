import React from "react";
import styles from './myProducts.module.css';
import {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

const MyProducts = () => {

    const { user } = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/my-products/${user}`)
       .then(response => {
         setProducts(response.data);
       })
       .catch(error => {
         console.log(error);
       });
    }, []);

    return (
    <div>
        {products.map((product, index) => (
            <div className={styles.productContainer} key={product.id}>
                <Link to={`/product/${product.ProductId}`}><img className={styles.productImage} src={`http://localhost:3000/product-image/${product.ProductId}`} alt="Product Image" /></Link>                
                <div className={styles.productContent}>
                    <h1 className={styles.productName}>{product.ProductName}</h1>
                    <p>{product.ProductDescription}</p>
                    <p>Price: ${product.ProductPrice}</p>
                    <p>Subscription: {product.ProductSubscription}</p>
                </div>
            </div>
        ))}
        
    </div>    
    )
}

export default MyProducts;