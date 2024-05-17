//ProfileMenu.tsx
import React from 'react';
import SignOutButton from '../SignOutButton/SignOutButton';
import styles from './ProfileMenu.module.css';

const ProfileMenu: React.FC = () => {
    return (
        <div className={styles['profile-menu']}>
            <SignOutButton />
        </div>
    );
};

export default ProfileMenu;
