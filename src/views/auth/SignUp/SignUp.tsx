// SignUp.tsx
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../main';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createUser = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('inloggad');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <>
            <label htmlFor="userEmail">Epost:</label>
            <input
                id="userEmail"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br></br>
            <label htmlFor="userPassword">Lösenord:</label>
            <input
                id="userPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br></br>

            <button onClick={createUser}>Sign Up</button>
        </>
    );
};

export default SignUp;
