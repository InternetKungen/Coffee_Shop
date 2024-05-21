import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdminStatus from '../../hooks/useAdminStatus';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAdmin, isLoading } = useAdminStatus();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a proper loading indicator
    }

    if (!isAdmin) {
        console.log('Access denied. User is not an admin.');
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
