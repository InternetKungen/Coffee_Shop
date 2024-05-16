// UserProfile.tsx
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../main';

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

    const handleSave = async () => {
        const user = auth.currentUser;

        if (!user) {
            console.log('Error not signed in');
            return;
        }

        try {
            await addDoc(collection(db, 'users', user.uid, 'profile'), profile);
            setProfile({
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

    return (
        <>
            {/* Rendera formulär för att fylla i profilinformation här */}
            <form>
                <label>
                    Förnamn:
                    <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Efternamn:
                    <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Profilbild:
                    <input
                        type="text"
                        name="profilePicture"
                        value={profile.profilePicture}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Telefonnummer:
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Gata:
                    <input
                        type="text"
                        name="street"
                        value={profile.address.street}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Stad:
                    <input
                        type="text"
                        name="city"
                        value={profile.address.city}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Land:
                    <input
                        type="text"
                        name="country"
                        value={profile.address.country}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Postnummer:
                    <input
                        type="text"
                        name="postalCode"
                        value={profile.address.postalCode}
                        onChange={handleChange}
                    />
                </label>
            </form>
            <button onClick={handleSave}>Save</button>
        </>
    );
};

export default UserProfile;
