// Main.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../views/pages/Home';
import About from '../../views/pages/About';
import SignIn from '../../views/auth/SignIn';

const Main: React.FC = () => {
    return (
        <main>
            <h1>Main</h1>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path='/login' element={<SignIn />} />
            </Routes>
        </main>
    );
};

export default Main;
