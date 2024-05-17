//ProfileMenu.tsx
import React from 'react';
import SignOutButton from '../SignOutButton/SignOutButton';
import styles from './ProfileMenu.module.css';
import { Link } from 'react-router-dom';
import useAdminStatus from '../../hooks/useAdminStatus';

const ProfileMenu: React.FC = () => {
    const isAdmin = useAdminStatus();

    return (
        <div className={styles['profile-menu']}>
            <ul>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
                {isAdmin && (
                    <li>
                        <Link to="/admin-panel">Admin Panel</Link>
                    </li>
                )}
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </div>
    );
};

export default ProfileMenu;
