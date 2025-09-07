
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import LoadingSpinner from './LoadingSpinner';

const AuthGuard = ({ children }) => {
  const { isLoading } = useContext(AuthContext);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  
  return children;
};

export default AuthGuard;


