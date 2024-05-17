//ProfileMenu.tsx
import React from 'react';
import SignOutButton from '../SignOutButton/SignOutButton';
import styles from './ProfileMenu.module.css';
import { Link } from 'react-router-dom';

const ProfileMenu: React.FC = () => {
    return (
        <div className={styles['profile-menu']}>
            <ul>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </div>
    );
};

export default ProfileMenu;
