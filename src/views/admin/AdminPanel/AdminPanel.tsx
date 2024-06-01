// AdminPanel.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminPanel.module.css';
import TitleSection from '../../../components/TitleSection/TitleSection';

const AdminPanel: React.FC = () => {
    return (
        <div className={styles['admin-panel']}>
            <TitleSection title="Admin Panel" />
            <Link to="/admin-panel/profile-manager">
                <button>Profile Manager</button>
            </Link>
            <Link to="/admin-panel/product-manager">
                <button>Product Manager</button>
            </Link>
            <Link to="/admin-panel/order-manager">
                <button>Order Manager</button>
            </Link>
        </div>
    );
};

export default AdminPanel;
