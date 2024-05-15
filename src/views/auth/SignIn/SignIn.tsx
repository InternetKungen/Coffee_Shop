// SignIn.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../main';
import styles from './SignIn.module.css';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInUser = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('inloggad');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <>
            <section className={styles['sign-in-container']}>
                <h2>Sign In</h2>
                <section className={styles['sign-in-container__input-fields']}>
                    <label htmlFor="userEmail">E-mail</label>
                    <input
                        id="userEmail"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <br></br>
                    <label htmlFor="userPassword">Password</label>
                    <input
                        id="userPassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </section>
                <br></br>

                <button onClick={signInUser}>Sign In</button>

                <section className={styles['sign-in-container__info']}>
                    <p>Don't have an account? Create one here</p>
                    <p>Forgot password? Press here</p>
                </section>
            </section>
        </>
    );
};

export default SignIn;
