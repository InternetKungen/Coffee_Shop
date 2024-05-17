import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../main';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import styles from './ProfileButton.module.css';
import { doc, getDoc } from 'firebase/firestore';

const ProfileButton: React.FC = () => {
    const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid, 'profile', 'profile');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userProfile = docSnap.data();
                    setFirstName(userProfile.firstName);
                } else {
                    console.log('No such document!');
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={styles.profileButton}>
            <button onClick={toggleMenu}>{firstName || user?.email}</button>
            {isMenuOpen && <ProfileMenu />}
        </div>
    );
};

export default ProfileButton;
