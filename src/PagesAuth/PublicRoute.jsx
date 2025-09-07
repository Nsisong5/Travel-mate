import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import LoadingSpinner from "./LoadingSpinner";

const PublicRoute = ({ children }) => {
  const { user, isInitialized } = useContext(AuthContext);

  // Wait for auth initialization
  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  // If already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is not authenticated, show public route
  return children;
};

export default PublicRoute;
