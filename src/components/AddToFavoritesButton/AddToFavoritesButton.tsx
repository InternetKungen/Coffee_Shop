// AddToFavoritesButton.tsx
import React from 'react';
import { auth, db } from '../../main';
import { doc, setDoc } from 'firebase/firestore';
import { Product } from '../../interface/types';

interface AddToFavoritesButtonProps {
    product: Product;
}

const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({
    product,
}) => {
    const addToFavorites = async () => {
        const user: any | null = auth.currentUser;
        if (!user) {
            alert('Please log in to add favorites.');
            return;
        }
        const userId = user.uid;
        const productId = product.id;
        const favoriteProductRef = doc(
            db,
            `users/${userId}/favorites/${productId}`
        );

        const favoriteProductData = {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl,
            addedToList: new Date().toISOString(),
        };

        await setDoc(favoriteProductRef, favoriteProductData);
        alert(`${product.name} has been added to your favorites!`);
    };

    return <button onClick={addToFavorites}>Add to Favorites</button>;
};

export default AddToFavoritesButton;
