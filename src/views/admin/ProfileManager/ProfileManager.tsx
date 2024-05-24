// //ProfileManager.tsx
// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';
// import styles from './ProfileManager.module.css';

// interface UserProfile {
//     uid: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     profilePicture: string;
//     phoneNumber: string;
//     address: {
//         street: string;
//         city: string;
//         country: string;
//         postalCode: string;
//     };
// }

// const ProfileManager: React.FC = () => {
//     const { isAdmin, isLoading } = useAdminStatus();
//     const [users, setUsers] = useState<UserProfile[]>([]);
//     const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
//     const [isLoadingUsers, setIsLoadingUsers] = useState(false);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             console.log('Fetching users...');
//             setIsLoadingUsers(true);
//             if (isAdmin) {
//                 try {
//                     const usersCollection = collection(db, 'users');
//                     const usersSnapshot = await getDocs(usersCollection);
//                     const usersList: UserProfile[] = [];

//                     for (const userDoc of usersSnapshot.docs) {
//                         console.log(`Fetching profile for user: ${userDoc.id}`);
//                         const profileRef = doc(db, 'users', userDoc.id);
//                         const profileSnap = await getDoc(profileRef);
//                         if (profileSnap.exists()) {
//                             const userData = profileSnap.data() as Omit<
//                                 UserProfile,
//                                 'uid'
//                             >;
//                             // console.log('User data:', userData);
//                             usersList.push({ uid: userDoc.id, ...userData });
//                         } else {
//                             console.log(
//                                 `Profile not found for user: ${userDoc.id}`
//                             );
//                         }
//                     }

//                     setUsers(usersList);
//                     console.log('Users fetched successfully:', usersList);
//                 } catch (error) {
//                     console.error('Error fetching users:', error);
//                 }
//             } else {
//                 console.log('User is not an admin.');
//             }
//             setIsLoadingUsers(false);
//         };

//         if (!isLoading) {
//             fetchUsers();
//         } else {
//             console.log('Admin status is loading...');
//         }
//     }, [isAdmin, isLoading]);

//     const handleSaveProfile = async (user: UserProfile) => {
//         const userRef = doc(db, 'users', user.uid);
//         await setDoc(userRef, user);
//         alert('Profile updated successfully');
//     };

//     const handleAddToAdmins = async (user: UserProfile) => {
//         const adminRef = doc(db, 'admins', user.uid);
//         await setDoc(adminRef, { uid: user.uid });
//         alert('User added to admins successfully');
//     };

//     if (isLoading || isLoadingUsers) {
//         return <div>Loading...</div>;
//     }

//     if (!isAdmin) {
//         return <div>Access denied.</div>;
//     }

//     return (
//         <div className={styles['profile-manager-wrapper']}>
//             <h1>Profile Manager</h1>
//             <section className={styles['profile-list-container']}>
//                 <h3>Select User From List:</h3>
//                 <ul className={styles['profile-list']}>
//                     {users.length > 0 ? (
//                         users.map((user) => (
//                             <li
//                                 key={user.uid}
//                                 onClick={() => setSelectedUser(user)}
//                             >
//                                 {user.firstName} {user.lastName} - {user.email}
//                             </li>
//                         ))
//                     ) : (
//                         <li>No users found.</li>
//                     )}
//                 </ul>
//             </section>

//             {selectedUser && (
//                 <form className={styles['edit-profile-form']}>
//                     <h2>Edit Profile</h2>
//                     <label>
//                         First Name:
//                         <input
//                             type="text"
//                             value={selectedUser.firstName}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     firstName: e.target.value,
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Last Name:
//                         <input
//                             type="text"
//                             value={selectedUser.lastName}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     lastName: e.target.value,
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Email:
//                         <input
//                             type="text"
//                             value={selectedUser.email}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     email: e.target.value,
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Phone Number:
//                         <input
//                             type="text"
//                             value={selectedUser.phoneNumber}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     phoneNumber: e.target.value,
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Street:
//                         <input
//                             type="text"
//                             value={selectedUser.address.street}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     address: {
//                                         ...selectedUser.address,
//                                         street: e.target.value,
//                                     },
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         City:
//                         <input
//                             type="text"
//                             value={selectedUser.address.city}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     address: {
//                                         ...selectedUser.address,
//                                         city: e.target.value,
//                                     },
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Country:
//                         <input
//                             type="text"
//                             value={selectedUser.address.country}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     address: {
//                                         ...selectedUser.address,
//                                         country: e.target.value,
//                                     },
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Postal Code:
//                         <input
//                             type="text"
//                             value={selectedUser.address.postalCode}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     address: {
//                                         ...selectedUser.address,
//                                         postalCode: e.target.value,
//                                     },
//                                 })
//                             }
//                         />
//                     </label>
//                     <button
//                         type="button"
//                         onClick={() => handleSaveProfile(selectedUser)}
//                     >
//                         Save
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => handleAddToAdmins(selectedUser)}
//                     >
//                         Add to Admins
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default ProfileManager;

// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import {
//     collection,
//     getDocs,
//     doc,
//     getDoc,
//     setDoc,
//     deleteDoc,
// } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';
// import useIsUserAdmin from '../../../hooks/useIsUserAdmin';
// import styles from './ProfileManager.module.css';

// interface UserProfile {
//     uid: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     profilePicture: string;
//     phoneNumber: string;
//     address: {
//         street: string;
//         city: string;
//         country: string;
//         postalCode: string;
//     };
// }

// const ProfileManager: React.FC = () => {
//     const { isAdmin, isLoading } = useAdminStatus();
//     const [users, setUsers] = useState<UserProfile[]>([]);
//     const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
//     const [isLoadingUsers, setIsLoadingUsers] = useState(false);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             console.log('Fetching users...');
//             setIsLoadingUsers(true);
//             if (isAdmin) {
//                 try {
//                     const usersCollection = collection(db, 'users');
//                     const usersSnapshot = await getDocs(usersCollection);
//                     const usersList: UserProfile[] = [];

//                     for (const userDoc of usersSnapshot.docs) {
//                         console.log(`Fetching profile for user: ${userDoc.id}`);
//                         const profileRef = doc(db, 'users', userDoc.id);
//                         const profileSnap = await getDoc(profileRef);
//                         if (profileSnap.exists()) {
//                             const userData = profileSnap.data() as Omit<
//                                 UserProfile,
//                                 'uid'
//                             >;
//                             usersList.push({ uid: userDoc.id, ...userData });
//                         } else {
//                             console.log(
//                                 `Profile not found for user: ${userDoc.id}`
//                             );
//                         }
//                     }

//                     setUsers(usersList);
//                     console.log('Users fetched successfully:', usersList);
//                 } catch (error) {
//                     console.error('Error fetching users:', error);
//                 }
//             } else {
//                 console.log('User is not an admin.');
//             }
//             setIsLoadingUsers(false);
//         };

//         if (!isLoading) {
//             fetchUsers();
//         } else {
//             console.log('Admin status is loading...');
//         }
//     }, [isAdmin, isLoading]);

//     const handleSaveProfile = async (user: UserProfile) => {
//         const userRef = doc(db, 'users', user.uid);
//         await setDoc(userRef, user);
//         alert('Profile updated successfully');
//     };

//     if (isLoading || isLoadingUsers) {
//         return <div>Loading...</div>;
//     }

//     if (!isAdmin) {
//         return <div>Access denied.</div>;
//     }

//     return (
//         <div className={styles['profile-manager-wrapper']}>
//             <h1>Profile Manager</h1>
//             <section className={styles['profile-list-container']}>
//                 <h3>Select User From List:</h3>
//                 <ul className={styles['profile-list']}>
//                     {users.length > 0 ? (
//                         users.map((user) => (
//                             <li
//                                 key={user.uid}
//                                 onClick={() => setSelectedUser(user)}
//                             >
//                                 {user.firstName} {user.lastName} - {user.email}
//                             </li>
//                         ))
//                     ) : (
//                         <li>No users found.</li>
//                     )}
//                 </ul>
//             </section>

//             {selectedUser && (
//                 <form className={styles['edit-profile-form']}>
//                     <h2>Edit Profile</h2>
//                     <label>
//                         First Name:
//                         <input
//                             type="text"
//                             value={selectedUser.firstName}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     firstName: e.target.value,
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Last Name:
//                         <input
//                             type="text"
//                             value={selectedUser.lastName}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     lastName: e.target.value,
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Email:
//                         <input
//                             type="text"
//                             value={selectedUser.email}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     email: e.target.value,
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Phone Number:
//                         <input
//                             type="text"
//                             value={selectedUser.phoneNumber}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     phoneNumber: e.target.value,
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Street:
//                         <input
//                             type="text"
//                             value={selectedUser.address.street}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     address: {
//                                         ...selectedUser.address,
//                                         street: e.target.value,
//                                     },
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         City:
//                         <input
//                             type="text"
//                             value={selectedUser.address.city}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     address: {
//                                         ...selectedUser.address,
//                                         city: e.target.value,
//                                     },
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Country:
//                         <input
//                             type="text"
//                             value={selectedUser.address.country}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     address: {
//                                         ...selectedUser.address,
//                                         country: e.target.value,
//                                     },
//                                 })
//                             }
//                         />
//                     </label>
//                     <label>
//                         Postal Code:
//                         <input
//                             type="text"
//                             value={selectedUser.address.postalCode}
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser,
//                                     address: {
//                                         ...selectedUser.address,
//                                         postalCode: e.target.value,
//                                     },
//                                 })
//                             }
//                         />
//                     </label>
//                     <AdminCheckbox user={selectedUser} />
//                     <button
//                         type="button"
//                         onClick={() => handleSaveProfile(selectedUser)}
//                     >
//                         Save
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// };

// interface AdminCheckboxProps {
//     user: UserProfile;
// }

// const AdminCheckbox: React.FC<AdminCheckboxProps> = ({ user }) => {
//     const { isUserAdmin, isLoading, error } = useIsUserAdmin(user.uid);

//     const handleAdminStatusChange = async (isAdmin: boolean) => {
//         const adminRef = doc(db, 'admins', user.uid);
//         try {
//             if (isAdmin) {
//                 await setDoc(adminRef, { uid: user.uid });
//                 alert('User added to admins successfully');
//             } else {
//                 await deleteDoc(adminRef);
//                 alert('User removed from admins successfully');
//             }
//         } catch (error: any) {
//             console.error('Error updating admin status:', error);
//             alert('Error updating admin status: ' + error.message);
//         }
//     };

//     const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newAdminStatus = e.target.checked;
//         await handleAdminStatusChange(newAdminStatus);
//     };

//     if (isLoading) {
//         return <div>Loading admin status...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <label className={styles['admin-checkbox']}>
//             Admin:
//             <input
//                 type="checkbox"
//                 checked={isUserAdmin}
//                 onChange={handleChange}
//             />
//         </label>
//     );
// };

// export default ProfileManager;
// src/components/ProfileManager.tsx

// // --------------------------------------------------
// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';
// import AdminCheckbox from '../../../components/admin/AdminCheckbox/AdminCheckbox';
// import styles from './ProfileManager.module.css';

// interface UserProfile {
//     uid: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     profilePicture: string;
//     phoneNumber: string;
//     address: {
//         street: string;
//         city: string;
//         country: string;
//         postalCode: string;
//     };
// }

// const ProfileManager: React.FC = () => {
//     const { isAdmin, isLoading } = useAdminStatus();
//     const [users, setUsers] = useState<UserProfile[]>([]);
//     const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
//     const [isLoadingUsers, setIsLoadingUsers] = useState(false);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             console.log('Fetching users...');
//             setIsLoadingUsers(true);
//             if (isAdmin) {
//                 try {
//                     const usersCollection = collection(db, 'users');
//                     const usersSnapshot = await getDocs(usersCollection);
//                     const usersList: UserProfile[] = [];

//                     for (const userDoc of usersSnapshot.docs) {
//                         console.log(`Fetching profile for user: ${userDoc.id}`);
//                         const profileRef = doc(db, 'users', userDoc.id);
//                         const profileSnap = await getDoc(profileRef);
//                         if (profileSnap.exists()) {
//                             const userData = profileSnap.data() as Omit<
//                                 UserProfile,
//                                 'uid'
//                             >;
//                             usersList.push({ uid: userDoc.id, ...userData });
//                         } else {
//                             console.log(
//                                 `Profile not found for user: ${userDoc.id}`
//                             );
//                         }
//                     }

//                     setUsers(usersList);
//                     console.log('Users fetched successfully:', usersList);
//                 } catch (error) {
//                     console.error('Error fetching users:', error);
//                 }
//             } else {
//                 console.log('User is not an admin.');
//             }
//             setIsLoadingUsers(false);
//         };

//         if (!isLoading) {
//             fetchUsers();
//         } else {
//             console.log('Admin status is loading...');
//         }
//     }, [isAdmin, isLoading]);

//     const handleSaveProfile = async (user: UserProfile) => {
//         const userRef = doc(db, 'users', user.uid);
//         await setDoc(userRef, user);
//         alert('Profile updated successfully');
//     };

//     if (isLoading || isLoadingUsers) {
//         return <div>Loading...</div>;
//     }

//     if (!isAdmin) {
//         return <div>Access denied.</div>;
//     }

//     return (
//         <div className={styles['profile-manager-wrapper']}>
//             <h2>Profile Manager</h2>

//             <div className={styles['profile-manager']}>
//                 <section className={styles['profile-list-container']}>
//                     <h3>Select User From List:</h3>
//                     <ul className={styles['profile-list']}>
//                         {users.length > 0 ? (
//                             users.map((user) => (
//                                 <li
//                                     key={user.uid}
//                                     onClick={() => setSelectedUser(user)}
//                                     className={
//                                         selectedUser?.uid === user.uid
//                                             ? styles['selected']
//                                             : ''
//                                     }
//                                 >
//                                     {user.firstName} {user.lastName} -{' '}
//                                     {user.email}
//                                 </li>
//                             ))
//                         ) : (
//                             <li>No users found.</li>
//                         )}
//                     </ul>
//                 </section>

//                 {selectedUser && (
//                     <form className={styles['edit-profile-form']}>
//                         <h2>Edit Profile</h2>
//                         <label>
//                             First Name:
//                             <input
//                                 type="text"
//                                 value={selectedUser.firstName}
//                                 onChange={(e) =>
//                                     setSelectedUser({
//                                         ...selectedUser,
//                                         firstName: e.target.value,
//                                     })
//                                 }
//                             />
//                         </label>
//                         <label>
//                             Last Name:
//                             <input
//                                 type="text"
//                                 value={selectedUser.lastName}
//                                 onChange={(e) =>
//                                     setSelectedUser({
//                                         ...selectedUser,
//                                         lastName: e.target.value,
//                                     })
//                                 }
//                             />
//                         </label>
//                         <label>
//                             Email:
//                             <input
//                                 type="text"
//                                 value={selectedUser.email}
//                                 onChange={(e) =>
//                                     setSelectedUser({
//                                         ...selectedUser,
//                                         email: e.target.value,
//                                     })
//                                 }
//                             />
//                         </label>
//                         <label>
//                             Phone Number:
//                             <input
//                                 type="text"
//                                 value={selectedUser.phoneNumber}
//                                 onChange={(e) =>
//                                     setSelectedUser({
//                                         ...selectedUser,
//                                         phoneNumber: e.target.value,
//                                     })
//                                 }
//                             />
//                         </label>
//                         <label>
//                             Street:
//                             <input
//                                 type="text"
//                                 value={selectedUser.address.street}
//                                 onChange={(e) =>
//                                     setSelectedUser({
//                                         ...selectedUser,
//                                         address: {
//                                             ...selectedUser.address,
//                                             street: e.target.value,
//                                         },
//                                     })
//                                 }
//                             />
//                         </label>
//                         <label>
//                             City:
//                             <input
//                                 type="text"
//                                 value={selectedUser.address.city}
//                                 onChange={(e) =>
//                                     setSelectedUser({
//                                         ...selectedUser,
//                                         address: {
//                                             ...selectedUser.address,
//                                             city: e.target.value,
//                                         },
//                                     })
//                                 }
//                             />
//                         </label>
//                         <label>
//                             Country:
//                             <input
//                                 type="text"
//                                 value={selectedUser.address.country}
//                                 onChange={(e) =>
//                                     setSelectedUser({
//                                         ...selectedUser,
//                                         address: {
//                                             ...selectedUser.address,
//                                             country: e.target.value,
//                                         },
//                                     })
//                                 }
//                             />
//                         </label>
//                         <label>
//                             Postal Code:
//                             <input
//                                 type="text"
//                                 value={selectedUser.address.postalCode}
//                                 onChange={(e) =>
//                                     setSelectedUser({
//                                         ...selectedUser,
//                                         address: {
//                                             ...selectedUser.address,
//                                             postalCode: e.target.value,
//                                         },
//                                     })
//                                 }
//                             />
//                         </label>
//                         <AdminCheckbox user={selectedUser} />
//                         <button
//                             type="button"
//                             onClick={() => handleSaveProfile(selectedUser)}
//                         >
//                             Save
//                         </button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProfileManager;

// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';
// import AdminCheckbox from '../../../components/admin/AdminCheckbox/AdminCheckbox';
// import styles from './ProfileManager.module.css';

// interface UserProfile {
//     uid: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     profilePicture: string;
//     phoneNumber: string;
//     address: {
//         street: string;
//         city: string;
//         country: string;
//         postalCode: string;
//     };
// }

// const defaultUserProfile: UserProfile = {
//     uid: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     profilePicture: '',
//     phoneNumber: '',
//     address: {
//         street: '',
//         city: '',
//         country: '',
//         postalCode: '',
//     },
// };

// const ProfileManager: React.FC = () => {
//     const { isAdmin, isLoading } = useAdminStatus();
//     const [users, setUsers] = useState<UserProfile[]>([]);
//     const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
//     const [isLoadingUsers, setIsLoadingUsers] = useState(false);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             console.log('Fetching users...');
//             setIsLoadingUsers(true);
//             if (isAdmin) {
//                 try {
//                     const usersCollection = collection(db, 'users');
//                     const usersSnapshot = await getDocs(usersCollection);
//                     const usersList: UserProfile[] = [];

//                     for (const userDoc of usersSnapshot.docs) {
//                         console.log(`Fetching profile for user: ${userDoc.id}`);
//                         const profileRef = doc(db, 'users', userDoc.id);
//                         const profileSnap = await getDoc(profileRef);
//                         if (profileSnap.exists()) {
//                             const userData = profileSnap.data() as Omit<
//                                 UserProfile,
//                                 'uid'
//                             >;
//                             usersList.push({ uid: userDoc.id, ...userData });
//                         } else {
//                             console.log(
//                                 `Profile not found for user: ${userDoc.id}`
//                             );
//                         }
//                     }

//                     setUsers(usersList);
//                     console.log('Users fetched successfully:', usersList);
//                 } catch (error) {
//                     console.error('Error fetching users:', error);
//                 }
//             } else {
//                 console.log('User is not an admin.');
//             }
//             setIsLoadingUsers(false);
//         };

//         if (!isLoading) {
//             fetchUsers();
//         } else {
//             console.log('Admin status is loading...');
//         }
//     }, [isAdmin, isLoading]);

//     const handleSaveProfile = async (user: UserProfile) => {
//         const userRef = doc(db, 'users', user.uid);
//         await setDoc(userRef, user);
//         alert('Profile updated successfully');
//     };

//     const handleClearSelection = () => {
//         setSelectedUser(null);
//     };

//     if (isLoading || isLoadingUsers) {
//         return <div>Loading...</div>;
//     }

//     if (!isAdmin) {
//         return <div>Access denied.</div>;
//     }

//     return (
//         <div className={styles['profile-manager-wrapper']}>
//             <h2>Profile Manager</h2>

//             <div className={styles['profile-manager']}>
//                 <section className={styles['profile-list-container']}>
//                     <h3>Select User From List:</h3>
//                     <ul className={styles['profile-list']}>
//                         {users.length > 0 ? (
//                             users.map((user) => (
//                                 <li
//                                     key={user.uid}
//                                     onClick={() => setSelectedUser(user)}
//                                     className={
//                                         selectedUser?.uid === user.uid
//                                             ? styles['selected']
//                                             : ''
//                                     }
//                                 >
//                                     {user.firstName} {user.lastName} -{' '}
//                                     {user.email}
//                                 </li>
//                             ))
//                         ) : (
//                             <li>No users found.</li>
//                         )}
//                     </ul>
//                     <button onClick={handleClearSelection}>
//                         Create New Profile
//                     </button>
//                 </section>

//                 <form className={styles['edit-profile-form']}>
//                     <h2>{selectedUser ? 'Edit Profile' : 'Create Profile'}</h2>
//                     <label>
//                         First Name:
//                         <input
//                             type="text"
//                             value={
//                                 selectedUser
//                                     ? selectedUser.firstName
//                                     : defaultUserProfile.firstName
//                             }
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser!,
//                                     firstName: e.target.value,
//                                 } as UserProfile)
//                             }
//                         />
//                     </label>
//                     <label>
//                         Last Name:
//                         <input
//                             type="text"
//                             value={
//                                 selectedUser
//                                     ? selectedUser.lastName
//                                     : defaultUserProfile.lastName
//                             }
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser!,
//                                     lastName: e.target.value,
//                                 } as UserProfile)
//                             }
//                         />
//                     </label>
//                     <label>
//                         Email:
//                         <input
//                             type="text"
//                             value={
//                                 selectedUser
//                                     ? selectedUser.email
//                                     : defaultUserProfile.email
//                             }
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser!,
//                                     email: e.target.value,
//                                 } as UserProfile)
//                             }
//                         />
//                     </label>
//                     <label>
//                         Phone Number:
//                         <input
//                             type="text"
//                             value={
//                                 selectedUser
//                                     ? selectedUser.phoneNumber
//                                     : defaultUserProfile.phoneNumber
//                             }
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser!,
//                                     phoneNumber: e.target.value,
//                                 } as UserProfile)
//                             }
//                         />
//                     </label>
//                     <label>
//                         Street:
//                         <input
//                             type="text"
//                             value={
//                                 selectedUser
//                                     ? selectedUser.address.street
//                                     : defaultUserProfile.address.street
//                             }
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser!,
//                                     address: {
//                                         ...selectedUser!.address,
//                                         street: e.target.value,
//                                     },
//                                 } as UserProfile)
//                             }
//                         />
//                     </label>
//                     <label>
//                         City:
//                         <input
//                             type="text"
//                             value={
//                                 selectedUser
//                                     ? selectedUser.address.city
//                                     : defaultUserProfile.address.city
//                             }
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser!,
//                                     address: {
//                                         ...selectedUser!.address,
//                                         city: e.target.value,
//                                     },
//                                 } as UserProfile)
//                             }
//                         />
//                     </label>
//                     <label>
//                         Country:
//                         <input
//                             type="text"
//                             value={
//                                 selectedUser
//                                     ? selectedUser.address.country
//                                     : defaultUserProfile.address.country
//                             }
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser!,
//                                     address: {
//                                         ...selectedUser!.address,
//                                         country: e.target.value,
//                                     },
//                                 } as UserProfile)
//                             }
//                         />
//                     </label>
//                     <label>
//                         Postal Code:
//                         <input
//                             type="text"
//                             value={
//                                 selectedUser
//                                     ? selectedUser.address.postalCode
//                                     : defaultUserProfile.address.postalCode
//                             }
//                             onChange={(e) =>
//                                 setSelectedUser({
//                                     ...selectedUser!,
//                                     address: {
//                                         ...selectedUser!.address,
//                                         postalCode: e.target.value,
//                                     },
//                                 } as UserProfile)
//                             }
//                         />
//                     </label>
//                     <AdminCheckbox user={selectedUser || defaultUserProfile} />
//                     <button
//                         type="button"
//                         onClick={() =>
//                             handleSaveProfile(
//                                 selectedUser || defaultUserProfile
//                             )
//                         }
//                     >
//                         Save
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ProfileManager;
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
