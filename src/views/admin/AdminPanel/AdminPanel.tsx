// AdminPanel.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminPanel.module.css';

const AdminPanel: React.FC = () => {
    return (
        <div className={styles['admin-panel']}>
            <h2>Admin Panel</h2>
            <Link to="/admin-panel/profile-manager">
                <button>Profile Manager</button>
            </Link>
            <Link to="/admin-panel/product-manager">
                <button>Product Manager</button>
            </Link>
        </div>
    );
};

export default AdminPanel;
