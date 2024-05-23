// //UserProfile.tsx
// import { useState, useEffect } from 'react';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { auth, db } from '../../../main';
// import styles from './UserProfile.module.css';

// export interface UserProfile {
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

// export const UserProfile = () => {
//     const [profile, setProfile] = useState<UserProfile>({
//         firstName: '',
//         lastName: '',
//         email: '',
//         profilePicture: '',
//         phoneNumber: '',
//         address: {
//             street: '',
//             city: '',
//             country: '',
//             postalCode: '',
//         },
//     });

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const user = auth.currentUser;

//             if (!user) {
//                 console.log('Error not signed in');
//                 return;
//             }

//             const docRef = doc(db, 'users', user.uid, 'profile', 'profile');
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 const userProfile = docSnap.data() as UserProfile;
//                 setProfile(userProfile);
//             } else {
//                 console.log('No profile found!');
//             }
//         };

//         fetchUserProfile();
//     }, []);

//     const handleSave = async () => {
//         const user = auth.currentUser;

//         if (!user) {
//             console.log('Error not signed in');
//             return;
//         }

//         try {
//             const docRef = doc(db, 'users', user.uid, 'profile', 'profile');
//             await setDoc(docRef, profile);
//             console.log('Profile saved');
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setProfile((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setProfile((prevState) => ({
//             ...prevState,
//             address: {
//                 ...prevState.address,
//                 [name]: value,
//             },
//         }));
//     };

//     return (
//         <>
//             <section className={styles['user-profile-form-container']}>
//                 <form>
//                     <label>
//                         First Name:
//                         <input
//                             type="text"
//                             name="firstName"
//                             value={profile.firstName}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>
//                         Last Name:
//                         <input
//                             type="text"
//                             name="lastName"
//                             value={profile.lastName}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>
//                         E-mail:
//                         <input
//                             type="email"
//                             name="email"
//                             value={profile.email}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>
//                         Profile Picture:
//                         <input
//                             type="text"
//                             name="profilePicture"
//                             value={profile.profilePicture}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>
//                         Phone Number:
//                         <input
//                             type="tel"
//                             name="phoneNumber"
//                             value={profile.phoneNumber}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>
//                         Street:
//                         <input
//                             type="text"
//                             name="street"
//                             value={profile.address.street}
//                             onChange={handleAddressChange}
//                         />
//                     </label>
//                     <label>
//                         City:
//                         <input
//                             type="text"
//                             name="city"
//                             value={profile.address.city}
//                             onChange={handleAddressChange}
//                         />
//                     </label>
//                     <label>
//                         Country:
//                         <input
//                             type="text"
//                             name="country"
//                             value={profile.address.country}
//                             onChange={handleAddressChange}
//                         />
//                     </label>
//                     <label>
//                         Postal Code:
//                         <input
//                             type="text"
//                             name="postalCode"
//                             value={profile.address.postalCode}
//                             onChange={handleAddressChange}
//                         />
//                     </label>
//                 </form>
//                 <button onClick={handleSave}>Save</button>
//             </section>
//         </>
//     );
// };

// export default UserProfile;
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../main';
import styles from './UserProfile.module.css';

export interface UserProfile {
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

export const UserProfile = () => {
    const [profile, setProfile] = useState<UserProfile>({
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
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;

            if (!user) {
                console.log('Error not signed in');
                return;
            }

            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userProfile = docSnap.data() as UserProfile;
                setProfile(userProfile);
            } else {
                console.log('No profile found!');
            }
        };

        fetchUserProfile();
    }, []);

    const handleSave = async () => {
        const user = auth.currentUser;

        if (!user) {
            console.log('Error not signed in');
            return;
        }

        try {
            const docRef = doc(db, 'users', user.uid);
            await setDoc(docRef, profile);
            console.log('Profile saved');
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value,
            },
        }));
    };

    return (
        <>
            <section className={styles['user-profile-form-container']}>
                <form>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        E-mail:
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Profile Picture:
                        <input
                            type="text"
                            name="profilePicture"
                            value={profile.profilePicture}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Street:
                        <input
                            type="text"
                            name="street"
                            value={profile.address.street}
                            onChange={handleAddressChange}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={profile.address.city}
                            onChange={handleAddressChange}
                        />
                    </label>
                    <label>
                        Country:
                        <input
                            type="text"
                            name="country"
                            value={profile.address.country}
                            onChange={handleAddressChange}
                        />
                    </label>
                    <label>
                        Postal Code:
                        <input
                            type="text"
                            name="postalCode"
                            value={profile.address.postalCode}
                            onChange={handleAddressChange}
                        />
                    </label>
                </form>
                <button onClick={handleSave}>Save</button>
            </section>
        </>
    );
};

export default UserProfile;
