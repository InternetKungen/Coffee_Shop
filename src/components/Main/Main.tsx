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
import Settings from '../../views/dashboard/Settings/Settings';
import UserProfile from '../../views/dashboard/UserProfile/UserProfile';
import ChangePassword from '../../views/dashboard/ChangePassword/ChangePassword';

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
                <Route path="/settings" element={<Settings />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
        </main>
    );
};

export default Main;
