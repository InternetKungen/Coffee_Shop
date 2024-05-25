//till för att migrera från /users/{userId}/profile/profile -> users/{userId}
import React, { useEffect } from 'react';
import { db } from '../../../main';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

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

const ProfileMigrator: React.FC = () => {
    useEffect(() => {
        const migrateProfiles = async () => {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);

            for (const userDoc of usersSnapshot.docs) {
                console.log(`Migrating profile for user: ${userDoc.id}`);
                const oldProfileRef = doc(
                    db,
                    'users',
                    userDoc.id,
                    'profile',
                    'profile'
                );
                const oldProfileSnap = await getDoc(oldProfileRef);
                if (oldProfileSnap.exists()) {
                    const userData = oldProfileSnap.data() as Omit<
                        UserProfile,
                        'uid'
                    >;
                    console.log('User data:', userData);
                    const newProfileRef = doc(db, 'users', userDoc.id);
                    await setDoc(newProfileRef, {
                        uid: userDoc.id,
                        ...userData,
                    });
                    console.log(`Profile migrated for user: ${userDoc.id}`);
                } else {
                    console.log(`Profile not found for user: ${userDoc.id}`);
                }
            }
        };

        migrateProfiles();
    }, []);

    return (
        <div>
            <h1>Profile Migrator</h1>
            <p>Check the console for migration status.</p>
        </div>
    );
};

export default ProfileMigrator;
