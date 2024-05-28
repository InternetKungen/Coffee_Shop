// Favorites.tsx
import React from 'react';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import TitleSection from '../../components/TitleSection/TitleSection';

const Favorites: React.FC = () => {
    return (
        <div>
            <TitleSection title="Your Favorites" />
            <FavoritesList />
        </div>
    );
};

export default Favorites;
