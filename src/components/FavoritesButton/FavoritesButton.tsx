// FavoritesButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FavoritesButton.module.css';
import favoritesIcon from '../../assets/icons/heart.png';

const FavoritesButton: React.FC = () => {
    return (
        <section className={styles['favorites-button-container']}>
            <Link to="/favorites">
                <img src={favoritesIcon} alt="favorites-icon" />
            </Link>
        </section>
    );
};

export default FavoritesButton;
