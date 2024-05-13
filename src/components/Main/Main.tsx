// Main.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../views/pages/Home';
import About from '../../views/pages/About';
import SignIn from '../../views/auth/SignIn';
import Menu from '../../views/pages/Menu';

const Main: React.FC = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<SignIn />} />
            </Routes>
        </main>
    );
};

export default Main;
