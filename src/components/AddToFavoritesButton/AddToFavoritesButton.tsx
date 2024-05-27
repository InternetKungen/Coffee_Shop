// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../../main';
// import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
// import { Product } from '../../interface/types';
// import favoritesIcon from '../../assets/icons/heart-light.png';
// import favoritesIconFilled from '../../assets/icons/heart-light-filled.png';
// import styles from './AddToFavorites.module.css';

// interface AddToFavoritesButtonProps {
//     product: Product;
// }

// const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({
//     product,
// }) => {
//     const [isFavorite, setIsFavorite] = useState<boolean>(false);

//     useEffect(() => {
//         const checkIfFavorite = async () => {
//             const user: any | null = auth.currentUser;
//             if (!user) return;

//             const userId = user.uid;
//             const productId = product.id;
//             const favoriteProductRef = doc(
//                 db,
//                 `users/${userId}/favorites/${productId}`
//             );
//             const docSnapshot = await getDoc(favoriteProductRef);
//             setIsFavorite(docSnapshot.exists());
//         };

//         checkIfFavorite();
//     }, [product.id]);

//     const addToFavorites = async () => {
//         const user: any | null = auth.currentUser;
//         if (!user) {
//             alert('Please log in to add favorites.');
//             return;
//         }
//         const userId = user.uid;
//         const productId = product.id;
//         const favoriteProductRef = doc(
//             db,
//             `users/${userId}/favorites/${productId}`
//         );

//         const favoriteProductData = {
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             description: product.description,
//             imageUrl: product.imageUrl,
//             addedToList: new Date().toISOString(),
//         };

//         await setDoc(favoriteProductRef, favoriteProductData);
//         setIsFavorite(true);
//         alert(`${product.name} has been added to your favorites!`);
//     };

//     const removeFromFavorites = async () => {
//         const user: any | null = auth.currentUser;
//         if (!user) {
//             alert('Please log in to remove favorites.');
//             return;
//         }
//         const userId = user.uid;
//         const productId = product.id;
//         const favoriteProductRef = doc(
//             db,
//             `users/${userId}/favorites/${productId}`
//         );

//         await deleteDoc(favoriteProductRef);
//         setIsFavorite(false);
//         alert(`${product.name} has been removed from your favorites!`);
//     };

//     return (
//         <button
//             onClick={isFavorite ? removeFromFavorites : addToFavorites}
//             className={styles['favorites-button']}
//         >
//             <img
//                 src={isFavorite ? favoritesIconFilled : favoritesIcon}
//                 alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
//                 className={styles['favorites-icon']}
//             />
//         </button>
//     );
// };

// export default AddToFavoritesButton;

// AddToFavoritesButton.tsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../main';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { Product } from '../../interface/types';
import favoritesIcon from '../../assets/icons/heart-light.png';
import favoritesIconFilled from '../../assets/icons/heart-light-filled.png';
import NotificationPopUp from '../NotificationPopUp/NotificationPopUp';
import styles from './AddToFavoritesButton.module.css';

interface AddToFavoritesButtonProps {
    product: Product;
}

const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({
    product,
}) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        const checkIfFavorite = async () => {
            const user: any | null = auth.currentUser;
            if (!user) return;

            const userId = user.uid;
            const productId = product.id;
            const favoriteProductRef = doc(
                db,
                `users/${userId}/favorites/${productId}`
            );
            const docSnapshot = await getDoc(favoriteProductRef);
            setIsFavorite(docSnapshot.exists());
        };

        checkIfFavorite();
    }, [product.id]);

    const addToFavorites = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();
        const user: any | null = auth.currentUser;
        if (!user) {
            setNotification('Please log in to add favorites.');
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
        setIsFavorite(true);
        setNotification(`${product.name} has been added to your favorites!`);
    };

    const removeFromFavorites = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();
        const user: any | null = auth.currentUser;
        if (!user) {
            setNotification('Please log in to remove favorites.');
            return;
        }
        const userId = user.uid;
        const productId = product.id;
        const favoriteProductRef = doc(
            db,
            `users/${userId}/favorites/${productId}`
        );

        await deleteDoc(favoriteProductRef);
        setIsFavorite(false);
        setNotification(
            `${product.name} has been removed from your favorites!`
        );
    };

    return (
        <>
            {notification && (
                <NotificationPopUp
                    message={notification}
                    onClose={() => setNotification(null)}
                />
            )}
            <button
                onClick={isFavorite ? removeFromFavorites : addToFavorites}
                className={styles['favorites-button']}
            >
                <img
                    src={isFavorite ? favoritesIconFilled : favoritesIcon}
                    alt={
                        isFavorite
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                    }
                    className={styles['favorites-icon']}
                />
            </button>
        </>
    );
};

export default AddToFavoritesButton;
