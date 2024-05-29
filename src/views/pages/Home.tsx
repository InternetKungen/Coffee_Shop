import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import styles from './Home.module.css';

const Home: React.FC = () => {
    return (
        <div className={styles['home-container']}>
            <Slider />
            <div className={styles['overlay']}>
                <h2>Coffee Palace</h2>
                <h1>
                    Flavors to Remember, <br /> Moments to Share
                </h1>
                <button className={styles['product-button']}>
                    <Link to="/menu">Order Now</Link>
                </button>
            </div>
        </div>
    );
};

export default Home;
