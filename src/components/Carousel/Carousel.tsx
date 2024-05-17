import React, { useState } from 'react';
import styles from './Carousel.module.css';
import images from '../../assets/Carousel-imgs/Carousel-imgs';

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
            <button
                onClick={prevSlide}
                className={`${styles['carousel-btn']} ${styles['carousel-btn-prev']}`}
            >
                &lt;
            </button>
            <img
                src={images[activeIndex]}
                alt={`Slide ${activeIndex}`}
                className={styles['carousel-img']}
            />
            <button
                onClick={nextSlide}
                className={`${styles['carousel-btn']} ${styles['carousel-btn-next']}`}
            >
                &gt;
            </button>
        </div>
    );
};

export default Carousel;
