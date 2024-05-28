import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Settings.module.css';
import TitleSection from '../../../components/TitleSection/TitleSection';

const Settings: React.FC = () => {
    return (
        <div className={styles.settings}>
            <TitleSection title="Settings" />
            <Link to="/settings/user-profile">
                <button>Profile Settings</button>
            </Link>
            <Link to="/settings/order-history">
                <button>Order History</button>
            </Link>
            <Link to="/settings/change-password">
                <button>Change Password</button>
            </Link>
        </div>
    );
};

export default Settings;
