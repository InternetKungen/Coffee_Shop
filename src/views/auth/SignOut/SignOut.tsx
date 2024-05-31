// SignOut.tsx
import { signOut } from 'firebase/auth';
import { auth } from '../../../main';
import styles from './SignOut.module.css';
import { useNavigate } from 'react-router-dom';

const SignOut: React.FC = () => {
    const navigate = useNavigate(); // hook for navigation

    const signOutUser = async () => {
        try {
            await signOut(auth); // signs the user out
            console.log('signed out');
            navigate('/'); // redirects to the Home page after successful sign out
        } catch (error) {
            console.error('Error signing out:', (error as Error).message);
        }
    };

    return (
        <>
            <button onClick={signOutUser} className={styles['sign-out-btn']}>
                Sign out
            </button>
        </>
    );
};

export default SignOut;
