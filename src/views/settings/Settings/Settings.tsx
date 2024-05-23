import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Settings.module.css';

const Settings: React.FC = () => {
    return (
        <div className={styles.settings}>
            <h2>Settings</h2>
            <Link to="/settings/user-profile">
                <button>Profile Settings</button>
            </Link>
            <Link to="/settings/change-password">
                <button>Change Password</button>
            </Link>
        </div>
    );
};

export default Settings;
