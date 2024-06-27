import React from "react";
import styles from './forgotPassword.module.css';
import axios from "axios";
import { useState } from "react";


const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/forgot-password', { email })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className={styles.container}>
            <form>
                <div className={styles.formGroup}>
                <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} className={styles.formElement}/>
                </div>
                <button type="submit" className={styles.submit} onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword;