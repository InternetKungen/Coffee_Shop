// SignOut.tsx
import { signOut } from 'firebase/auth';
import { auth } from '../../../main';
import styles from './SignOut.module.css';

export const SignOut = () => {
    const signOutUser = async () => {
        signOut(auth)
            .then(() => {
                console.log('signed out');
            })
            .catch((error) => {
                console.log(error.message);
            });
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
