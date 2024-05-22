// AdminPanel.tsx
import React from 'react';
import ProfileManager from '../ProfileManager/ProfileManager';
import UserList from '../../../components/admin/UserList/UserList';

const AdminPanel: React.FC = () => {
    return (
        <div>
            <h2>Admin Panel</h2>
            <ProfileManager />
            <UserList />
        </div>
    );
};

export default AdminPanel;
