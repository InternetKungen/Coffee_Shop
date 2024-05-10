// NavMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    return (
        <section>
            <Link to="/login">Login</Link>
        </section>
    );
};

export default Login;
