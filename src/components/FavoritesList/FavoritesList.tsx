// FavoritesList.tsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../main';
import styles from './FavoritesList.module.css';
import { Product } from '../../interface/types';
import AddToFavoritesButton from '../AddToFavoritesButton/AddToFavoritesButton';
import { Link } from 'react-router-dom';

const FavoritesList: React.FC = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const user: any | null = auth.currentUser;
            if (!user) return;

            const userId = user.uid;
            const favoritesCollection = collection(
                db,
                `users/${userId}/favorites`
            );
            const favoritesSnapshot = await getDocs(favoritesCollection);
            const favoriteList: any = favoritesSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: data.id,
                    name: data.name,
                    price: Number(data.price),
                    description: data.description,
                    imageUrl: data.imageUrl,
                    category: data.category,
                };
            });
            setFavorites(favoriteList);
        };

        fetchFavorites();
    }, []);

    // Function to handle image error
    const handleImageError = (
        event: React.SyntheticEvent<HTMLImageElement>
    ) => {
        event.currentTarget.src = 'src/assets/product-img/placeholder.jpg';
    };

    return (
        <div className={styles['favorites-list-div']}>
            {favorites.length === 0 ? (
                <p>You got no favorites!</p>
            ) : (
                favorites.map((product) => (
                    <Link
                        to={`/products/${product.id}`}
                        key={product.id}
                        className={styles['favorites-list-item-link']}
                    >
                        <section
                            className={styles['favorites-list-item']}
                            key={product.id}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                        >
                            <div className={styles['favorite-icon-container']}>
                                <AddToFavoritesButton product={product} />
                            </div>
                            <h2>{product.name}</h2>
                            <img
                                src={`src/assets/product-img/${product.imageUrl}`}
                                alt={product.name}
                                onError={handleImageError}
                                className={styles['product-image']}
                            />
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <p>{product.description}</p>
                        </section>
                    </Link>
                ))
            )}
        </div>
    );
};

export default FavoritesList;
