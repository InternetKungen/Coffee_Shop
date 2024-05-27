// FavoritesList.tsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../main';
import styles from './FavoritesList.module.css';
import { Product } from '../../interface/types';
import AddToFavoritesButton from '../AddToFavoritesButton/AddToFavoritesButton';

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

    return (
        <div className={styles['favorites-list-div']}>
            {favorites.map((product) => (
                <section
                    className={styles['favorites-list-item']}
                    key={product.id}
                >
                    <h2>{product.name}</h2>
                    <img
                        src={`src/assets/product-img/${product.imageUrl}`}
                        alt={product.name}
                        className={styles['product-image']}
                    />
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <p>{product.description}</p>
                    <AddToFavoritesButton product={product} />
                </section>
            ))}
        </div>
    );
};

export default FavoritesList;
