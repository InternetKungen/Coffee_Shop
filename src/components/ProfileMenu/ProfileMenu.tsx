// ProfileMenu.tsx
import { forwardRef } from 'react';
import SignOutButton from '../SignOutButton/SignOutButton';
import styles from './ProfileMenu.module.css';
import { Link } from 'react-router-dom';
import useAdminStatus from '../../hooks/useAdminStatus';

const ProfileMenu = forwardRef<HTMLDivElement>((props, ref) => {
    const { isAdmin, isLoading } = useAdminStatus();

    if (isLoading) {
        return <div className={styles['loading-screen']}>Loading...</div>;
    }

    return (
        <div className={styles['profile-menu']} ref={ref} {...props}>
            <ul>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
                <li>
                    <Link to="/favorites">Favorites</Link>
                </li>
                <li>
                    <Link to="/settings/order-history">Order History</Link>
                </li>
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
});

export default ProfileMenu;
