import React, { useState } from 'react';
import styles from './Carousel.module.css';
import images from '../../assets/Carousel-imgs/Carousel-imgs';
import leftArrow from '../../assets/img/left-arrow.png';
import rightArrow from '../../assets/img/right-arrow.png';


const Carousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className={styles.carousel}>
            <button onClick={prevSlide} className={`${styles['carousel-btn']} ${styles['carousel-btn-prev']}`}>
                <img src={leftArrow} alt="" />
            </button>

            <img src={images[activeIndex]} alt={`Slide ${activeIndex}`} className={styles['carousel-img']}/>

            <button onClick={nextSlide} className={`${styles['carousel-btn']} ${styles['carousel-btn-next']}`}>
                <img src={rightArrow} alt="" />
            </button>
        </div>
    );
};

export default Carousel;
