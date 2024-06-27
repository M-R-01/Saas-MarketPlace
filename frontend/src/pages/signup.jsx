import React from 'react';
import styles from './signup.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [name, setName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [mobile, setMobile] = useState(0);
    const [password, setPassword] = useState(' ');
    const [type, setType] = useState(' ');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        if (mobile.toString().length!== 10) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        const data = {
            name: name,
            email: email,
            mobile: mobile,
            password: password,
            type: type,
        }

        axios.post('http://localhost:3000/signup', data)
             .then((response) => {
                console.log(response);
                navigate('/login');
             })
            .catch((error) => {
             console.log(error);
             });[]
    }

    return (
        <div className={styles.container}>
        <h2>Welcome!</h2>
        <form>
            <div className={styles.formGroup}>
                <label className={styles.label} for="username">Name:</label>
                <input className={styles.username} type="text" id="username" name="username" onChange={(e) => (setName(e.target.value))} required />
            </div>
            <div className={styles.formGroup2}>
                <label className={styles.label} for="email">Email:</label>
                <input className={styles.formElement} type="email" id="email" name="email" onChange={(e) => (setEmail(e.target.value))} required />
            </div>
            <div className={styles.formGroup2}>
                <label className={styles.label} for="mobile-number">Mobile Number:</label>
                <input className={styles.formElement} type="tel" id="mobile-number" name="mobile-number" pattern="[0-9]{10}" onChange={(e) => (setMobile(e.target.value))} required />
            </div>
            <div className={styles.formGroup2}>
                <label className={styles.label} for="password">Set Password:</label>
                <input className={styles.formElement} type="password" id="password" name="password" onChange={(e) => (setPassword(e.target.value))} required />
            </div>
            <div className={styles.formGroup2}>
                <label className={styles.label} for="confirm-password">Confirm Password:</label>
                <input className={styles.formElement} type="password" id="confirm-password" name="confirm-password" required />
            </div>
            <div className={styles.formGroup2}>
                    <label htmlFor="user-type">Are you a:</label>
                    <label className={styles.label} htmlFor="buyer">
                        <input
                            type="radio"
                            id="buyer"
                            name="user-type"
                            value="buyer"
                            checked={type === 'Buyer'}
                            onChange={() => setType('Buyer')}
                        />
                        Buyer
                    </label>
                    <label className={styles.label} htmlFor="seller">
                        <input
                            type="radio"
                            id="seller"
                            name="user-type"
                            value="seller"
                            checked={type === 'Seller'}
                            onChange={() => setType('Seller')}
                        />
                        Seller
                    </label>
                </div>
            <input type="submit" value="Sign Up" onClick={handleSubmit} />            
        </form>
    </div>
        
    )
}

export default Signup;