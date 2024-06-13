// components/Main/Main.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../views/pages/Home';
import About from '../../views/pages/About';
import Menu from '../../views/pages/Menu';
import SignIn from '../../views/auth/SignIn/SignIn';
import SignUp from '../../views/auth/SignUp/SignUp';
import SignOut from '../../views/auth/SignOut/SignOut';
import ProductListPage from '../../views/pages/ProductListPage';
import ProductPage from '../../views/pages/ProductPage';
import './Main.module.css';
import Settings from '../../views/settings/Settings/Settings';
import UserProfile from '../../views/settings/UserProfile/UserProfile';
import ChangePassword from '../../views/settings/ChangePassword/ChangePassword';
import AdminPanel from '../../views/admin/AdminPanel/AdminPanel';
import ProtectedRoute from '../ProtectedRoutes/ProtectedRoutes';
import ProfileManager from '../../views/admin/ProfileManager/ProfileManager';
import ProductManager from '../../views/admin/ProductManager/ProductManager';

import Cart from '../Cart/Cart';
import OrderPage from '../../views/pages/OrderPage';
import OrderSuccessPage from '../../views/pages/OrderSuccessPage';

import OrderHistoryPage from '../../views/pages/OrderHistoryPage';
import Favorites from '../../views/pages/Favorites';
import OrderManager from '../../views/admin/OrderManager/OrderManager';

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
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/cart" element={<Cart />} />
                {/* Other routes */}
                <Route path="/order" element={<OrderPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route
                    path="/settings/order-history"
                    element={<OrderHistoryPage />}
                />
                <Route
                    path="/settings/user-profile"
                    element={<UserProfile />}
                />
                <Route
                    path="/settings/change-password"
                    element={<ChangePassword />}
                />
                <Route
                    path="/admin-panel"
                    element={
                        <ProtectedRoute>
                            <AdminPanel />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-panel/profile-manager"
                    element={
                        <ProtectedRoute>
                            <ProfileManager />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-panel/product-manager"
                    element={
                        <ProtectedRoute>
                            <ProductManager />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-panel/order-manager"
                    element={
                        <ProtectedRoute>
                            <OrderManager />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </main>
    );
};

export default Main;
