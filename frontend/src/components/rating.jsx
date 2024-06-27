import React from "react";
import styles from './rating.module.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const Rating = ({id}) => {


    const productId = id;

    

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)
    
    useEffect(() => {
        axios.get(`http://localhost:3000/get-rating/${productId}`)
            .then(response => {
                setCurrentValue(response.data.ProductRating);
            })
            .catch(error => {
                console.log(error);
            });
    })


    const handleClick = value => {
        setCurrentValue(value);

        axios.post(`http://localhost:3000/rate-product/${productId}`, { productId: id, rating: value })
       .then(response => {
         console.log(response.data);
         console.log(response);
       })
       .catch(error => {
         console.log(error);
       });
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }


    return (
        <div style={styles.container}>
        <h2> Rating </h2>
        <div style={styles.stars}>
            {stars.map((_, index) => {
            return (
                <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                className={(hoverValue || currentValue) > index ? styles.color2 : styles.color1}
                style={{
                    marginRight: 10,
                    cursor: "pointer"
                }}
                />
            )
            })}
        </div>
        </div>
    );
}

export default Rating;