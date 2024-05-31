// // SignUp.tsx
// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../../main';
// import styles from './SignUp.module.css';
// import { setDoc, doc } from 'firebase/firestore';
// import { UserProfile } from '../../settings/UserProfile/UserProfile';

// export const SignUp = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [checkPassword, setCheckPassword] = useState('');

//     const createUser = async () => {
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // Skapa en referens till platsen i databasen
//                 const docRef = doc(
//                     db,
//                     'users',
//                     userCredential.user.uid,
//                     'profile',
//                     'profile'
//                 );

//                 // Skapa ett objekt med användarinformation
//                 const userProfile: UserProfile = {
//                     firstName: firstName,
//                     lastName: lastName,
//                     email: email,
//                     profilePicture: '',
//                     phoneNumber: '',
//                     address: {
//                         street: '',
//                         city: '',
//                         country: '',
//                         postalCode: '',
//                     },
//                 };

//                 // Skriv in användarinformation till databasen
//                 setDoc(docRef, userProfile)
//                     .then(() => {
//                         console.log('Användarinformation sparad');
//                     })
//                     .catch((error) => {
//                         console.error(
//                             'Fel vid sparande av användarinformation:',
//                             error
//                         );
//                     });

//                 console.log('inloggad');
//             })
//             .catch((error) => {
//                 console.log(error.message);
//             });
//     };

//     return (
//         <>
//             <section className={styles['sign-up-container']}>
//                 <h2>Create Account</h2>
//                 <section className={styles['sign-up-container__input-fields']}>
//                     <label htmlFor="firstName">First name</label>
//                     <input
//                         id="firstName"
//                         type="text"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                     ></input>
//                     <br></br>
//                     <label htmlFor="lastName">Last name</label>
//                     <input
//                         id="lastName"
//                         type="text"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                     ></input>
//                     <br></br>
//                     <label htmlFor="userEmail">E-mail</label>
//                     <input
//                         id="userEmail"
//                         type="text"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     ></input>
//                     <br></br>
//                     <label htmlFor="userPassword">Password</label>
//                     <input
//                         id="userPassword"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     ></input>
//                     <label htmlFor="checkPassword">Repeat password</label>
//                     <input
//                         id="checkPassword"
//                         type="password"
//                         value={checkPassword}
//                         onChange={(e) => setCheckPassword(e.target.value)}
//                     ></input>
//                 </section>
//                 <br></br>

//                 <button onClick={createUser}>Sign Up</button>
//             </section>
//         </>
//     );
// };

// export default SignUp;

//MED uid: I UserProfile--------------

// SignUp.tsx
// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../../main';
// import styles from './SignUp.module.css';
// import { setDoc, doc } from 'firebase/firestore';

// interface UserProfile {
//     uid: string;
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

// export const SignUp = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [checkPassword, setCheckPassword] = useState('');

//     const createUser = async () => {
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // Skapa en referens till platsen i databasen
//                 const docRef = doc(
//                     db,
//                     'users',
//                     userCredential.user.uid,
//                     'profile',
//                     'profile'
//                 );

//                 // Skapa ett objekt med användarinformation
//                 const userProfile: UserProfile = {
//                     uid: userCredential.user.uid,
//                     firstName: firstName,
//                     lastName: lastName,
//                     email: email,
//                     profilePicture: '',
//                     phoneNumber: '',
//                     address: {
//                         street: '',
//                         city: '',
//                         country: '',
//                         postalCode: '',
//                     },
//                 };

//                 // Skriv in användarinformation till databasen
//                 setDoc(docRef, userProfile)
//                     .then(() => {
//                         console.log('Användarinformation sparad');
//                     })
//                     .catch((error) => {
//                         console.error(
//                             'Fel vid sparande av användarinformation:',
//                             error
//                         );
//                     });

//                 console.log('inloggad');
//             })
//             .catch((error) => {
//                 console.log(error.message);
//             });
//     };

//     return (
//         <>
//             <section className={styles['sign-up-container']}>
//                 <h2>Create Account</h2>
//                 <section className={styles['sign-up-container__input-fields']}>
//                     <label htmlFor="firstName">First name</label>
//                     <input
//                         id="firstName"
//                         type="text"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                     ></input>
//                     <br></br>
//                     <label htmlFor="lastName">Last name</label>
//                     <input
//                         id="lastName"
//                         type="text"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                     ></input>
//                     <br></br>
//                     <label htmlFor="userEmail">E-mail</label>
//                     <input
//                         id="userEmail"
//                         type="text"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     ></input>
//                     <br></br>
//                     <label htmlFor="userPassword">Password</label>
//                     <input
//                         id="userPassword"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     ></input>
//                     <label htmlFor="checkPassword">Repeat password</label>
//                     <input
//                         id="checkPassword"
//                         type="password"
//                         value={checkPassword}
//                         onChange={(e) => setCheckPassword(e.target.value)}
//                     ></input>
//                 </section>
//                 <br></br>

//                 <button onClick={createUser}>Sign Up</button>
//             </section>
//         </>
//     );
// };

// export default SignUp;

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../main';
import styles from './SignUp.module.css';
import { setDoc, doc } from 'firebase/firestore';

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

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [error, setError] = useState<string>(''); // error messages
    const [success, setSuccess] = useState<string>(''); // success message

    const createUser = async () => {
        // Checks that all input fields are filled
        if (!email || !password || !checkPassword || !firstName || !lastName) {
            setError('All fields are required');
            return;
        }
        // Checks if passwords match
        if (password !== checkPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        setSuccess(''); // clear previous success message

        try {
            // Trying to create a new user with the provided email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Create a reference to the location in the database where the user information will be stored
            const docRef = doc(db, 'users', userCredential.user.uid);

            // Creating an object with the user's information
            const userProfile: UserProfile = {
                uid: userCredential.user.uid,
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

            // Write the user's information to the database
            try {
                await setDoc(docRef, userProfile);
                console.log('User information saved successfully');
                setSuccess('You have successfully registered and logged in!');
            } catch (dbError) {
                // If an error occurs while writing to the database, log the error and set an error message
                console.error('Error saving user information:', dbError);
                setError('Error saving user information');
            }

            console.log('User signed up successfully');
        } catch (authError) {
            // If an error occurs during user creation, log the error and set an error message
            console.error('Error during user creation:', authError);
            setError((authError as Error).message);
        }
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

                    <label htmlFor="lastName">Last name</label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    ></input>

                    <label htmlFor="userEmail">E-mail</label>
                    <input
                        id="userEmail"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>

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
                {success && <p className={styles['success-message']}>{success}</p>}
                {error && <p className={styles['error-message']}>{error}</p>}
                <button onClick={createUser}>Sign Up</button>
            </section>
        </>
    );
};

export default SignUp;
