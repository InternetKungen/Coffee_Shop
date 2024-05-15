// SignOut.tsx
import { signOut } from 'firebase/auth';
import { auth } from '../../../main';

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
            <button onClick={signOutUser}>Sign out</button>
        </>
    );
};

export default SignOut;
