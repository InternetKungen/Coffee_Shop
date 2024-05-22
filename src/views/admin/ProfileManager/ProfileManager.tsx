// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';
// import { doc, setDoc } from 'firebase/firestore';

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

//     useEffect(() => {
//         if (isAdmin && !isLoading) {
//             const fetchUsers = async () => {
//                 const usersCollection = collection(db, 'users');
//                 const usersSnapshot = await getDocs(usersCollection);
//                 const usersList: UserProfile[] = [];

//                 usersSnapshot.forEach((doc) => {
//                     const userData = doc.data();
//                     usersList.push({
//                         uid: doc.id,
//                         ...userData,
//                         address: userData.address || {
//                             street: '',
//                             city: '',
//                             country: '',
//                             postalCode: '',
//                         },
//                     } as UserProfile);
//                 });

//                 setUsers(usersList);
//             };

//             fetchUsers();
//         }
//     }, [isAdmin, isLoading]);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (!isAdmin) {
//         return <div>Access denied.</div>;
//     }

//     return (
//         <div>
//             <h1>Profile Manager</h1>
//             <ul>
//                 {users.map((user) => (
//                     <li key={user.uid} onClick={() => setSelectedUser(user)}>
//                         {user.firstName} {user.lastName} - {user.email}
//                     </li>
//                 ))}
//             </ul>

//             {selectedUser && (
//                 <form>
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
//                         onClick={() => saveProfile(selectedUser)}
//                     >
//                         Save
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// };

// const saveProfile = async (user: UserProfile) => {
//     const userRef = doc(db, 'users', user.uid, 'profile', 'profile');
//     await setDoc(userRef, user);
//     alert('Profile updated successfully');
// };

// export default ProfileManager;

// # 2 -----------------------------------

// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';

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

//     useEffect(() => {
//         const fetchUsers = async () => {
//             if (isAdmin) {
//                 const usersCollection = collection(db, 'users');
//                 const usersSnapshot = await getDocs(usersCollection);
//                 const usersList: UserProfile[] = [];

//                 for (const userDoc of usersSnapshot.docs) {
//                     const profileRef = doc(
//                         db,
//                         'users',
//                         userDoc.id,
//                         'profile',
//                         'profile'
//                     );
//                     const profileSnap = await getDoc(profileRef);
//                     if (profileSnap.exists()) {
//                         const userData = profileSnap.data() as Omit<
//                             UserProfile,
//                             'uid'
//                         >;
//                         usersList.push({ uid: userDoc.id, ...userData });
//                     }
//                 }

//                 setUsers(usersList);
//             }
//         };

//         if (!isLoading) {
//             fetchUsers();
//         }
//     }, [isAdmin, isLoading]);

//     const handleSaveProfile = async (user: UserProfile) => {
//         const userRef = doc(db, 'users', user.uid, 'profile', 'profile');
//         await setDoc(userRef, user);
//         alert('Profile updated successfully');
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (!isAdmin) {
//         return <div>Access denied.</div>;
//     }

//     return (
//         <div>
//             <h1>Profile Manager</h1>
//             <ul>
//                 {users.map((user) => (
//                     <li key={user.uid} onClick={() => setSelectedUser(user)}>
//                         {user.firstName} {user.lastName} - {user.email}
//                     </li>
//                 ))}
//             </ul>

//             {selectedUser && (
//                 <form>
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
//                 </form>
//             )}
//         </div>
//     );
// };

// export default ProfileManager;

// #3 -----------------------------------
// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';

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

//     useEffect(() => {
//         const fetchUsers = async () => {
//             console.log('Fetching users...');
//             if (isAdmin) {
//                 try {
//                     const usersCollection = collection(db, 'users');
//                     const usersSnapshot = await getDocs(usersCollection);
//                     const usersList: UserProfile[] = [];

//                     for (const userDoc of usersSnapshot.docs) {
//                         const profileRef = doc(
//                             db,
//                             'users',
//                             userDoc.id,
//                             'profile',
//                             'profile'
//                         );
//                         const profileSnap = await getDoc(profileRef);
//                         if (profileSnap.exists()) {
//                             const userData = profileSnap.data() as Omit<
//                                 UserProfile,
//                                 'uid'
//                             >;
//                             console.log('User data:', userData);
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
//         };

//         if (!isLoading) {
//             fetchUsers();
//         } else {
//             console.log('Admin status is loading...');
//         }
//     }, [isAdmin, isLoading]);

//     const handleSaveProfile = async (user: UserProfile) => {
//         const userRef = doc(db, 'users', user.uid, 'profile', 'profile');
//         await setDoc(userRef, user);
//         alert('Profile updated successfully');
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (!isAdmin) {
//         return <div>Access denied.</div>;
//     }

//     return (
//         <div>
//             <h1>Profile Manager</h1>
//             <ul>
//                 {users.map((user) => (
//                     <li key={user.uid} onClick={() => setSelectedUser(user)}>
//                         {user.firstName} {user.lastName} - {user.email}
//                     </li>
//                 ))}
//             </ul>

//             {selectedUser && (
//                 <form>
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
//                 </form>
//             )}
//         </div>
//     );
// };

// export default ProfileManager;

//# 4 ----------------------------------------

// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';

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

//     useEffect(() => {
//         const fetchUsers = async () => {
//             console.log('Fetching users...');
//             if (isAdmin) {
//                 try {
//                     const usersCollection = collection(db, 'users');
//                     const usersSnapshot = await getDocs(usersCollection);
//                     const usersList: UserProfile[] = [];

//                     for (const userDoc of usersSnapshot.docs) {
//                         const profileRef = doc(
//                             db,
//                             'users',
//                             userDoc.id,
//                             'profile',
//                             'profile'
//                         );
//                         const profileSnap = await getDoc(profileRef);
//                         if (profileSnap.exists()) {
//                             const userData = profileSnap.data() as Omit<
//                                 UserProfile,
//                                 'uid'
//                             >;
//                             console.log('User data:', userData);
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
//         };

//         if (!isLoading) {
//             fetchUsers();
//         } else {
//             console.log('Admin status is loading...');
//         }
//     }, [isAdmin, isLoading]);

//     const handleSaveProfile = async (user: UserProfile) => {
//         const userRef = doc(db, 'users', user.uid, 'profile', 'profile');
//         await setDoc(userRef, user);
//         alert('Profile updated successfully');
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (!isAdmin) {
//         return <div>Access denied.</div>;
//     }

//     return (
//         <div>
//             <h1>Profile Manager</h1>
//             <ul>
//                 {users.map((user) => (
//                     <li key={user.uid} onClick={() => setSelectedUser(user)}>
//                         {user.firstName} {user.lastName} - {user.email}
//                     </li>
//                 ))}
//             </ul>

//             {selectedUser && (
//                 <form>
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
//                 </form>
//             )}
//         </div>
//     );
// };

// export default ProfileManager;

// # 5 ----------------------------------------

// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import {
//     collection,
//     getDocs,
//     doc,
//     getDoc,
//     setDoc,
//     DocumentSnapshot,
// } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';

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

//     useEffect(() => {
//         const fetchUsers = async () => {
//             console.log('Fetching users...');
//             if (isAdmin) {
//                 try {
//                     const usersCollection = collection(db, 'users');
//                     const usersSnapshot = await getDocs(usersCollection);
//                     const usersList: UserProfile[] = [];

//                     for (const userDoc of usersSnapshot.docs as DocumentSnapshot[]) {
//                         console.log(`Fetching profile for user: ${userDoc.id}`);
//                         if (userDoc.exists()) {
//                             const userData = userDoc.data() as Omit<
//                                 UserProfile,
//                                 'uid'
//                             >;
//                             console.log('User data:', userData);
//                             usersList.push({ uid: userDoc.id, ...userData });
//                         } else {
//                             console.log(
//                                 `Profile not found for user: ${userDoc.id}`
//                             );
//                         }
//                     }

//                     setUsers(usersList);
//                     console.log('Users fetched successfully:', usersList);
//                 } catch (error: unknown) {
//                     if (error instanceof Error) {
//                         console.error('Error fetching users:', error);
//                         console.error('Error details:', error.message);
//                     } else {
//                         console.error('An unknown error occurred:', error);
//                     }
//                 }
//             } else {
//                 console.log('User is not an admin.');
//             }
//         };

//         if (!isLoading) {
//             fetchUsers();
//         } else {
//             console.log('Admin status is loading...');
//         }
//     }, [isAdmin, isLoading]);

//     const handleSaveProfile = async (user: UserProfile) => {
//         const userRef = doc(db, 'users', user.uid, 'profile', 'profile');
//         await setDoc(userRef, user);
//         alert('Profile updated successfully');
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (!isAdmin) {
//         return <div>Access denied.</div>;
//     }

//     return (
//         <div>
//             <h1>Profile Manager</h1>
//             <ul>
//                 {users.map((user) => (
//                     <li key={user.uid} onClick={() => setSelectedUser(user)}>
//                         {user.firstName} {user.lastName} - {user.email}
//                     </li>
//                 ))}
//             </ul>

//             {selectedUser && (
//                 <form>
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
//                 </form>
//             )}
//         </div>
//     );
// };

// export default ProfileManager;

// # 6 ------------------------------------
// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';

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
//                         const profileRef = doc(
//                             db,
//                             'users',
//                             userDoc.id,
//                             'profile',
//                             'profile'
//                         );
//                         const profileSnap = await getDoc(profileRef);
//                         if (profileSnap.exists()) {
//                             const userData = profileSnap.data() as Omit<
//                                 UserProfile,
//                                 'uid'
//                             >;
//                             console.log('User data:', userData);
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
//         const userRef = doc(db, 'users', user.uid, 'profile', 'profile');
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
//         <div>
//             <h1>Profile Manager</h1>
//             <ul>
//                 {users.length > 0 ? (
//                     users.map((user) => (
//                         <li
//                             key={user.uid}
//                             onClick={() => setSelectedUser(user)}
//                         >
//                             {user.firstName} {user.lastName} - {user.email}
//                         </li>
//                     ))
//                 ) : (
//                     <li>No users found.</li>
//                 )}
//             </ul>

//             {selectedUser && (
//                 <form>
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
//                 </form>
//             )}
//         </div>
//     );
// };

// export default ProfileManager;

// # 7 ------------------------------
// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';

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
//                         const profileRef = doc(
//                             db,
//                             'users',
//                             userDoc.id,
//                             'profile',
//                             'profile'
//                         );
//                         const profileSnap = await getDoc(profileRef);
//                         if (profileSnap.exists()) {
//                             const userData = profileSnap.data() as Omit<
//                                 UserProfile,
//                                 'uid'
//                             >;
//                             console.log('User data:', userData);
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
//         const userRef = doc(db, 'users', user.uid, 'profile', 'profile');
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
//         <div>
//             <h1>Profile Manager</h1>
//             <ul>
//                 {users.length > 0 ? (
//                     users.map((user) => (
//                         <li
//                             key={user.uid}
//                             onClick={() => setSelectedUser(user)}
//                         >
//                             {user.firstName} {user.lastName} - {user.email}
//                         </li>
//                     ))
//                 ) : (
//                     <li>No users found.</li>
//                 )}
//             </ul>

//             {selectedUser && (
//                 <form>
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
//                 </form>
//             )}
//         </div>
//     );
// };

// export default ProfileManager;

//#8---------------------------------
// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';

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
//         let isMounted = true; // Lägg till denna rad
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
//                         const profileRef = doc(
//                             db,
//                             'users',
//                             userDoc.id,
//                             'profile',
//                             'profile'
//                         );
//                         const profileSnap = await getDoc(profileRef);
//                         if (profileSnap.exists()) {
//                             const userData = profileSnap.data() as Omit<
//                                 UserProfile,
//                                 'uid'
//                             >;
//                             console.log('User data:', userData);
//                             usersList.push({ uid: userDoc.id, ...userData });
//                         } else {
//                             console.log(
//                                 `Profile not found for user: ${userDoc.id}`
//                             );
//                         }
//                     }

//                     if (isMounted) {
//                         // Lägg till denna rad
//                         setUsers(usersList);
//                         console.log('Users fetched successfully:', usersList);
//                     }
//                 } catch (error) {
//                     console.error('Error fetching users:', error);
//                 }
//             } else {
//                 console.log('User is not an admin.');
//             }
//             if (isMounted) {
//                 // Lägg till denna rad
//                 setIsLoadingUsers(false);
//             }
//         };

//         if (!isLoading) {
//             fetchUsers();
//         } else {
//             console.log('Admin status is loading...');
//         }

//         return () => {
//             isMounted = false;
//         }; // Lägg till denna rad
//     }, [isAdmin, isLoading]);

//     const handleSaveProfile = async (user: UserProfile) => {
//         const userRef = doc(db, 'users', user.uid, 'profile', 'profile');
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
//         <div>
//             <h1>Profile Manager</h1>
//             <ul>
//                 {users.length > 0 ? (
//                     users.map((user) => (
//                         <li
//                             key={user.uid}
//                             onClick={() => setSelectedUser(user)}
//                         >
//                             {user.firstName} {user.lastName} - {user.email}
//                         </li>
//                     ))
//                 ) : (
//                     <li>No users found.</li>
//                 )}
//             </ul>

//             {selectedUser && (
//                 <form>
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
//                 </form>
//             )}
//         </div>
//     );
// };

// export default ProfileManager;
// # 9 -------------------------------------------

import React, { useEffect, useState } from 'react';
import { db } from '../../../main';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import useAdminStatus from '../../../hooks/useAdminStatus';

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

const ProfileManager: React.FC = () => {
    const { isAdmin, isLoading } = useAdminStatus();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    useEffect(() => {
        let isMounted = true; // Lägg till denna rad
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
                        const profileRef = doc(
                            db,
                            'users',
                            userDoc.id,
                            'profile',
                            'profile'
                        );
                        const profileSnap = await getDoc(profileRef);
                        if (profileSnap.exists()) {
                            const userData = profileSnap.data() as Omit<
                                UserProfile,
                                'uid'
                            >;
                            console.log('User data:', userData);
                            usersList.push({ uid: userDoc.id, ...userData });
                        } else {
                            console.log(
                                `Profile not found for user: ${userDoc.id}`
                            );
                        }
                    }

                    if (isMounted) {
                        // Lägg till denna rad
                        setUsers(usersList);
                        console.log('Users fetched successfully:', usersList);
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            } else {
                console.log('User is not an admin.');
            }
            if (isMounted) {
                // Lägg till denna rad
                setIsLoadingUsers(false);
            }
        };

        if (!isLoading) {
            fetchUsers();
        } else {
            console.log('Admin status is loading...');
        }

        return () => {
            isMounted = false;
        }; // Lägg till denna rad
    }, [isAdmin, isLoading]);

    const handleSaveProfile = async (user: UserProfile) => {
        const userRef = doc(db, 'users', user.uid, 'profile', 'profile');
        await setDoc(userRef, user);
        alert('Profile updated successfully');
    };

    if (isLoading || isLoadingUsers) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <div>Access denied.</div>;
    }

    return (
        <div>
            <h1>Profile Manager</h1>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li
                            key={user.uid}
                            onClick={() => setSelectedUser(user)}
                        >
                            {user.firstName} {user.lastName} - {user.email}
                        </li>
                    ))
                ) : (
                    <li>No users found.</li>
                )}
            </ul>

            {selectedUser && (
                <form>
                    <h2>Edit Profile</h2>
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={selectedUser.firstName}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    firstName: e.target.value,
                                })
                            }
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={selectedUser.lastName}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    lastName: e.target.value,
                                })
                            }
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            value={selectedUser.email}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    email: e.target.value,
                                })
                            }
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            value={selectedUser.phoneNumber}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    phoneNumber: e.target.value,
                                })
                            }
                        />
                    </label>
                    <label>
                        Street:
                        <input
                            type="text"
                            value={selectedUser.address.street}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    address: {
                                        ...selectedUser.address,
                                        street: e.target.value,
                                    },
                                })
                            }
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            value={selectedUser.address.city}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    address: {
                                        ...selectedUser.address,
                                        city: e.target.value,
                                    },
                                })
                            }
                        />
                    </label>
                    <label>
                        Country:
                        <input
                            type="text"
                            value={selectedUser.address.country}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    address: {
                                        ...selectedUser.address,
                                        country: e.target.value,
                                    },
                                })
                            }
                        />
                    </label>
                    <label>
                        Postal Code:
                        <input
                            type="text"
                            value={selectedUser.address.postalCode}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    address: {
                                        ...selectedUser.address,
                                        postalCode: e.target.value,
                                    },
                                })
                            }
                        />
                    </label>
                    <button
                        type="button"
                        onClick={() => handleSaveProfile(selectedUser)}
                    >
                        Save
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProfileManager;
