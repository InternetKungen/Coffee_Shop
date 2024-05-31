// SignIn.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../main';
import styles from './SignIn.module.css';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>(''); // error messages

    const navigate = useNavigate(); // hook for navigation

    const signInUser = async (e: any) => {
        e.preventDefault(); // Prevent default form submission
        // Checks that both input fields are filled
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Logged in');
                navigate('/menu'); // Redirect to /menu upon successful login
            })
            .catch((error) => {
                console.error('Error signing in:', (error as Error).message);
                setError('Invalid email or password'); // error message on failure
            });
    };

    // Function to handle key press events
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            signInUser(event);
        }
    };

    return (
        <section className={styles['sign-in-container']}>
            <h2>Sign In</h2>
            <section className={styles['sign-in-container__input-fields']}>
                <label htmlFor="userEmail">E-mail</label>
                <input
                    id="userEmail"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                ></input>

                <label htmlFor="userPassword">Password</label>
                <input
                    id="userPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                ></input>
            </section>
            {error && <p className={styles['error-message']}>{error}</p>}{' '}
            <button onClick={signInUser}>Sign In</button>
            <section className={styles['sign-in-container__info']}>
                <p>
                    Don't have an account?{' '}
                    <Link to="/sign-up">Create one here</Link>
                </p>
                <p>Forgot password? Press here</p>
            </section>
        </section>
    );
};

export default SignIn;
