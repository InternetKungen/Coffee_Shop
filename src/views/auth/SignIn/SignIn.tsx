// SignIn.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../main';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css';
// import TitleSection from '../../../components/TitleSection/TitleSection';
import { Link } from 'react-router-dom';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signInUser = async (e: any) => {
        e.preventDefault(); // Prevent default form submission
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Logged in');
                navigate('/menu'); // Redirect to /menu upon successful login
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <section className={styles['sign-in-container']}>
            <h2>Sign In</h2>
            {/* <TitleSection title="Sign In" /> */}
            <form
                onSubmit={signInUser}
                className={styles['sign-in-container__input-fields']}
            >
                <label htmlFor="userEmail">E-mail</label>
                <input
                    id="userEmail"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="userPassword">Password</label>
                <input
                    id="userPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Sign In</button>
            </form>
            <section className={styles['sign-in-container__info']}>
                <p>
                    Don't have an account?{' '}
                    <Link to="/sign-up">Create one here</Link>
                </p>
                <p>
                    Forgot password? <Link to="/sign-up">Press here</Link>
                </p>
            </section>
        </section>
    );
};

export default SignIn;
