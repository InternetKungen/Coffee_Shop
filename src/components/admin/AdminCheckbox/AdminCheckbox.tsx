// // src/components/admin/AdminCheckbox.tsx
import React, { useEffect, useState } from 'react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../main';
import useIsUserAdmin from '../../../hooks/useIsUserAdmin';
import styles from './AdminCheckbox.module.css';
import NotificationPopUp from '../../NotificationPopUp/NotificationPopUp';

interface AdminCheckboxProps {
    user: {
        uid: string;
    };
}

const AdminCheckbox: React.FC<AdminCheckboxProps> = ({ user }) => {
    const { isUserAdmin, isLoading, error } = useIsUserAdmin(user.uid);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoading && !error) {
            setIsAdmin(isUserAdmin);
        }
    }, [isLoading, isUserAdmin, error]);

    const handleAdminStatusChange = async (newAdminStatus: boolean) => {
        const adminRef = doc(db, 'admins', user.uid);
        try {
            if (newAdminStatus) {
                await setDoc(adminRef, { uid: user.uid });
                setNotification('User added to admins successfully');
            } else {
                await deleteDoc(adminRef);
                setNotification('User removed from admins successfully');
            }
        } catch (error: any) {
            console.error('Error updating admin status:', error);
            setNotification('Error updating admin status: ' + error.message);
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAdminStatus = e.target.checked;
        setIsAdmin(newAdminStatus); // Update local state immediately
        await handleAdminStatusChange(newAdminStatus);
    };

    if (isLoading) {
        return <div>Loading admin status...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <label className={styles['admin-checkbox']}>
            Admin:
            {notification && (
                <NotificationPopUp
                    message={notification}
                    onClose={() => setNotification(null)}
                />
            )}
            <input type="checkbox" checked={isAdmin} onChange={handleChange} />
        </label>
    );
};

export default AdminCheckbox;
