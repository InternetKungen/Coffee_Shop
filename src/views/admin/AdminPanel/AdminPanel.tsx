// AdminPanel.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
    return (
        <div>
            <h2>Admin Panel</h2>
            <Link to="/admin-panel/profile-manager">
                <button>Profile Manager</button>
            </Link>
        </div>
    );
};

export default AdminPanel;
