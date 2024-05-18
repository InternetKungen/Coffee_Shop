// SignUp.tsx
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../main';
import styles from './SignUp.module.css';
import { setDoc, doc } from 'firebase/firestore';
import { UserProfile } from '../../settings/UserProfile/UserProfile';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const createUser = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Skapa en referens till platsen i databasen
                const docRef = doc(
                    db,
                    'users',
                    userCredential.user.uid,
                    'profile',
                    'profile'
                );

                // Skapa ett objekt med användarinformation
                const userProfile: UserProfile = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    profilePicture: '',
                    phoneNumber: '',
                    address: {
                        street: '',
                        city: '',
                        country: '',
                        postalCode: '',
                    },
                };

                // Skriv in användarinformation till databasen
                setDoc(docRef, userProfile)
                    .then(() => {
                        console.log('Användarinformation sparad');
                    })
                    .catch((error) => {
                        console.error(
                            'Fel vid sparande av användarinformation:',
                            error
                        );
                    });

                console.log('inloggad');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <>
            <section className={styles['sign-up-container']}>
                <h2>Create Account</h2>
                <section className={styles['sign-up-container__input-fields']}>
                    <label htmlFor="firstName">First name</label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                    <br></br>
                    <label htmlFor="lastName">Last name</label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    ></input>
                    <br></br>
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
                    <label htmlFor="checkPassword">Repeat password</label>
                    <input
                        id="checkPassword"
                        type="password"
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                    ></input>
                </section>
                <br></br>

                <button onClick={createUser}>Sign Up</button>
            </section>
        </>
    );
};

export default SignUp;
