import React from "react";
import styles from './imageSlider.module.css'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

const ImageSlider = ({ slides }) => {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <Carousel responsive={responsive}>
                    <div className={styles.ad}>
                        <img className={styles.adImage} src="src\assets\react.svg" alt="Advertisement" />
                    </div>
                    <div className={styles.ad}>
                        <img className={styles.adImage} src="src\assets\react.svg" alt="Advertisement" />
                    </div>
                    <div className={styles.ad}>
                        <img className={styles.adImage} src="src\assets\react.svg" alt="Advertisement" />
                    </div>
                    <div className={styles.ad}>
                        <img className={styles.adImage} src="src\assets\react.svg" alt="Advertisement" />
                    </div>
        </Carousel>
    );
}

export default ImageSlider;