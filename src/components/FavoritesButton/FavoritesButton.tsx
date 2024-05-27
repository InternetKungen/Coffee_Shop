// FavoritesButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FavoritesButton.module.css';
import favoritesIcon from '../../assets/icons/heart.png';

const FavoritesButton: React.FC = () => {
    return (
        <section className={styles['favorites-button-container']}>
            <Link to="/favorites">
                <button>
                    <img src={favoritesIcon} alt="favorites-icon" />
                </button>
            </Link>
        </section>
    );
};

export default FavoritesButton;
