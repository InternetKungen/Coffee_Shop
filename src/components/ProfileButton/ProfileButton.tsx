// ProfileButton.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../main';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import styles from './ProfileButton.module.css';
import { doc, getDoc } from 'firebase/firestore';
import profileImg from './../../assets/img/user.png';

const ProfileButton: React.FC = () => {
    const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
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

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        const handleScroll = () => {
            setIsMenuOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={styles['profile-button']}>
            <button onClick={toggleMenu}>
                <img src={profileImg} alt="Profile Icon" />
                <span>{firstName || user?.email}</span>
            </button>
            {isMenuOpen && <ProfileMenu ref={menuRef} />}
        </div>
    );
};

export default ProfileButton;
