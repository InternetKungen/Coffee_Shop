// NavMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    return (
        <section>
            <p>Login</p>
            <Link to="/login">SignIn</Link>
        </section>
    );
};

export default Login;
