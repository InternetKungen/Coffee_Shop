// Favorites.tsx
import React from 'react';
import FavoritesList from '../../components/FavoritesList/FavoritesList';

const Favorites: React.FC = () => {
    return (
        <div>
            <h2>Your Favorites</h2>
            <FavoritesList />
        </div>
    );
};

export default Favorites;
