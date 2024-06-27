import React from "react";
import styles from './newProduct.module.css';
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewProduct = () => {

    const { user } = useParams();

    // Add state variables for form inputs here
    const [productId, setProductId] = useState(0);
    const [productSeller, setProductSeller] = useState('');
    const [productName, setProductName] = useState('');
    const [productSnippet, setProductSnippet] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productFile, setProductFile] = useState(null);
    const [productSubscription, setProductSubscription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('productName', productName);
        data.append('productSnippet', productSnippet);
        data.append('productDescription', productDescription);
        data.append('productPrice', productPrice);
        data.append('productCategory', productCategory);
        data.append('productImage', productImage);
        data.append('productSubscription', productSubscription);

        const fileData = new FormData();
        
        
        axios.post('http://localhost:3000/new-product', data)
        .then(response => {
            console.log(response.data);
            if (response.data.message === 'Product uploaded successfully') {
                const id = response.data.productId;
                setProductSeller(user);
                setProductId(id);
                fileData.append('productId', productId+1);
                fileData.append('productSeller', productSeller);
                fileData.append('productFile', productFile);

                axios.post('http://localhost:3000/upload-product-file', fileData)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                        });
                    }
                    });
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <h1>New Product</h1>
                <form encType="multipart/form-data">
                    <label className={styles.label}>Product Name:</label>
                    <input className={styles.productName} type="text" name="productName" onChange={(e) => (setProductName(e.target.value))} required />

                    <label className={styles.label}>Product Snippet:</label>
                    <textarea className={styles.snippet} name="productDescription" onChange={(e) => (setProductSnippet(e.target.value))} required />

                    <label className={styles.label}>Product Description:</label>
                    <textarea className={styles.description} name="productLongDescription" onChange={(e) => (setProductDescription(e.target.value))} required />
                    
                    <div>
                        <label className={styles.label}>Product Price:</label>
                        <input className={styles.productInfo} type="number" name="productPrice" onChange={(e) => (setProductPrice(e.target.value))} required />

                        <label className={styles.label}>Product Category:</label>
                        <input className={styles.productInfo} type="text" name="productCategory" onChange={(e) => (setProductCategory(e.target.value))} required />

                        <label className={styles.label}>Product Subscription:</label>
                        <input className={styles.productInfo} type="text" onChange={(e) => (setProductSubscription(e.target.value))} name="productSubscription" />
                    </div>
                    

                    <label className={styles.label}>Product Image:</label>
                    <input type="file" name="productImage" onChange={(e) => (setProductImage(e.target.files[0]))} required />
                    
                    

                    <label className={styles.label}>Product File:</label>
                    <input type="file" name="productFile" onChange={(e) => (setProductFile(e.target.files[0]))} required />
                    

                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default NewProduct;