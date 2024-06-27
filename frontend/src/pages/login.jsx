import React, { useEffect } from "react";
import styles from './login.module.css';
import { Link } from'react-router-dom';
import { useState } from'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);

        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        const data = {
            email: email,
            password: password
        }

        axios.post('http://localhost:3000/login', data)
                .then(response => {
                    console.log(response);
                    if (response.data.message ==='successful') {
                        navigate('/', {state: {id: email, category: response.data.type} });
                    }

                    else {
                        alert('Invalid email or password');
                    }     
                })
                .catch((error) => {
                    console.log(error);
                    alert('Failed to login');
                });

        return;
    }

    return (
        <div className={styles.container}>
            <h1>Login</h1>
            <form>
                <div className={styles.formGroup2}>
                    <input className={styles.formElement} type="text" placeholder="Email" onChange={(e) => (setEmail(e.target.value))}/>
                </div>
                <div className={styles.formGroup2}>
                    <input className={styles.formElement} type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))}/>
                </div>
                <div className={styles.formGroup}>
                    <Link to='/forgot-password'><p className={styles.forgot}>Forgot Password? Click Here..</p></Link>
                    <Link to='/signup'><p className={styles.signup}>Don't have an account? Register..</p></Link> 
                </div>                               
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}

export default Login;