// Main.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../views/pages/Home';
import About from '../../views/pages/About';
import Menu from '../../views/pages/Menu';
import SignIn from '../../views/auth/SignIn/SignIn';
import SignUp from '../../views/auth/SignUp/SignUp';
import SignOut from '../../views/auth/SignOut/SignOut';

// Import ProductListPage
import ProductListPage from '../../views/pages/ProductListPage';

import './Main.module.css';

const Main: React.FC = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-out" element={<SignOut />} />
                <Route path="/products" element={<ProductListPage />} />
            </Routes>
        </main>
    );
};

export default Main;
