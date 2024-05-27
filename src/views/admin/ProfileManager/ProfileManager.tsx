//ProfileManager.tsx
import React, { useEffect, useState } from 'react';
import { db } from '../../../main';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import useAdminStatus from '../../../hooks/useAdminStatus';
import AdminCheckbox from '../../../components/admin/AdminCheckbox/AdminCheckbox';
import styles from './ProfileManager.module.css';

interface UserProfile {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    address: {
        street: string;
        city: string;
        country: string;
        postalCode: string;
    };
}

const defaultUserProfile: UserProfile = {
    uid: '',
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: '',
    phoneNumber: '',
    address: {
        street: '',
        city: '',
        country: '',
        postalCode: '',
    },
};

const ProfileManager: React.FC = () => {
    const { isAdmin, isLoading } = useAdminStatus();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            console.log('Fetching users...');
            setIsLoadingUsers(true);
            if (isAdmin) {
                try {
                    const usersCollection = collection(db, 'users');
                    const usersSnapshot = await getDocs(usersCollection);
                    const usersList: UserProfile[] = [];

                    for (const userDoc of usersSnapshot.docs) {
                        console.log(`Fetching profile for user: ${userDoc.id}`);
                        const profileRef = doc(db, 'users', userDoc.id);
                        const profileSnap = await getDoc(profileRef);
                        if (profileSnap.exists()) {
                            const userData = profileSnap.data() as Omit<
                                UserProfile,
                                'uid'
                            >;
                            usersList.push({ uid: userDoc.id, ...userData });
                        } else {
                            console.log(
                                `Profile not found for user: ${userDoc.id}`
                            );
                        }
                    }

                    setUsers(usersList);
                    console.log('Users fetched successfully:', usersList);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            } else {
                console.log('User is not an admin.');
            }
            setIsLoadingUsers(false);
        };

        if (!isLoading) {
            fetchUsers();
        } else {
            console.log('Admin status is loading...');
        }
    }, [isAdmin, isLoading]);

    const handleSaveProfile = async (user: UserProfile) => {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, user);
        alert('Profile updated successfully');
    };

    // const handleClearSelection = () => {
    //     setSelectedUser(null);
    // };

    const isDefaultProfile = !selectedUser;

    if (isLoading || isLoadingUsers) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <div>Access denied.</div>;
    }

    return (
        <div className={styles['profile-manager-wrapper']}>
            <h2>Profile Manager</h2>

            <div className={styles['profile-manager']}>
                <section className={styles['profile-list-container']}>
                    <h3>Select User From List:</h3>
                    <ul className={styles['profile-list']}>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <li
                                    key={user.uid}
                                    onClick={() => setSelectedUser(user)}
                                    className={
                                        selectedUser?.uid === user.uid
                                            ? styles['selected']
                                            : ''
                                    }
                                >
                                    {user.firstName} {user.lastName} -{' '}
                                    {user.email}
                                </li>
                            ))
                        ) : (
                            <li>No users found.</li>
                        )}
                    </ul>
                </section>

                <form
                    className={`${styles['edit-profile-form']} ${
                        isDefaultProfile ? styles['disabled-form'] : ''
                    }`}
                >
                    <h2>
                        {selectedUser ? 'Edit Profile' : 'Select a Profile'}
                    </h2>
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={
                                selectedUser
                                    ? selectedUser.firstName
                                    : defaultUserProfile.firstName
                            }
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser!,
                                    firstName: e.target.value,
                                } as UserProfile)
                            }
                            disabled={isDefaultProfile}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={
                                selectedUser
                                    ? selectedUser.lastName
                                    : defaultUserProfile.lastName
                            }
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser!,
                                    lastName: e.target.value,
                                } as UserProfile)
                            }
                            disabled={isDefaultProfile}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            value={
                                selectedUser
                                    ? selectedUser.email
                                    : defaultUserProfile.email
                            }
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser!,
                                    email: e.target.value,
                                } as UserProfile)
                            }
                            disabled={isDefaultProfile}
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            value={
                                selectedUser
                                    ? selectedUser.phoneNumber
                                    : defaultUserProfile.phoneNumber
                            }
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser!,
                                    phoneNumber: e.target.value,
                                } as UserProfile)
                            }
                            disabled={isDefaultProfile}
                        />
                    </label>
                    <label>
                        Street:
                        <input
                            type="text"
                            value={
                                selectedUser
                                    ? selectedUser.address.street
                                    : defaultUserProfile.address.street
                            }
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser!,
                                    address: {
                                        ...selectedUser!.address,
                                        street: e.target.value,
                                    },
                                } as UserProfile)
                            }
                            disabled={isDefaultProfile}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            value={
                                selectedUser
                                    ? selectedUser.address.city
                                    : defaultUserProfile.address.city
                            }
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser!,
                                    address: {
                                        ...selectedUser!.address,
                                        city: e.target.value,
                                    },
                                } as UserProfile)
                            }
                            disabled={isDefaultProfile}
                        />
                    </label>
                    <label>
                        Country:
                        <input
                            type="text"
                            value={
                                selectedUser
                                    ? selectedUser.address.country
                                    : defaultUserProfile.address.country
                            }
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser!,
                                    address: {
                                        ...selectedUser!.address,
                                        country: e.target.value,
                                    },
                                } as UserProfile)
                            }
                            disabled={isDefaultProfile}
                        />
                    </label>
                    <label>
                        Postal Code:
                        <input
                            type="text"
                            value={
                                selectedUser
                                    ? selectedUser.address.postalCode
                                    : defaultUserProfile.address.postalCode
                            }
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser!,
                                    address: {
                                        ...selectedUser!.address,
                                        postalCode: e.target.value,
                                    },
                                } as UserProfile)
                            }
                            disabled={isDefaultProfile}
                        />
                    </label>
                    <AdminCheckbox user={selectedUser || defaultUserProfile} />
                    <button
                        type="button"
                        onClick={() =>
                            handleSaveProfile(
                                selectedUser || defaultUserProfile
                            )
                        }
                        disabled={isDefaultProfile}
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileManager;
