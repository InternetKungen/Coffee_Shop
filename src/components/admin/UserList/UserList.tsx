import React, { useEffect, useState } from 'react';
import { db } from '../../../main';
import { collection, getDocs } from 'firebase/firestore';
import useAdminStatus from '../../../hooks/useAdminStatus';

interface UserProfile {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
}

const UserList: React.FC = () => {
    const { isAdmin, isLoading: isAdminLoading } = useAdminStatus();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoadingUsers(true);
            try {
                const usersCollection = collection(db, 'users');
                const usersSnapshot = await getDocs(usersCollection);
                const usersList: UserProfile[] = [];

                console.log(usersSnapshot);

                usersSnapshot.forEach((userDoc) => {
                    const userData = userDoc.data() as UserProfile;
                    usersList.push({ ...userData, uid: userDoc.id });
                });

                setUsers(usersList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            setIsLoadingUsers(false);
        };

        if (!isAdminLoading && isAdmin) {
            fetchUsers();
        }
    }, [isAdmin, isAdminLoading]);

    if (isAdminLoading || isLoadingUsers) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <div>Access denied.</div>;
    }

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.uid}>
                            {user.firstName} {user.lastName} - {user.email}
                        </li>
                    ))
                ) : (
                    <li>No users found.</li>
                )}
            </ul>
        </div>
    );
};

export default UserList;
