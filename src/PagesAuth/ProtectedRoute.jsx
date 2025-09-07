
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { user, isInitialized } = useContext(AuthContext);
  const location = useLocation();

  // Wait for auth initialization
  if (!isInitialized) {
    return <div>Checking authentication...</div>;
  }

  // If not authenticated, redirect to login with return URL
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
