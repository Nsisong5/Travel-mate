// hooks/useUser.js
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../userservices/userService';
import { AuthContext } from '../AuthProvider';

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser, logout } = useContext(AuthContext); // Get setUser to update auth context
  const navigate = useNavigate();

  // Helper function to handle common error cases
  const handleError = (err) => {
    if (err.message.includes('Session expired')) {
      logout();
      navigate('/login');
    }
    setError(err.message);
    setLoading(false);
  };

  // Update profile and sync with AuthContext
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await userService.updateProfile(userData);
      setUser(updatedUser); // Update user in AuthContext
      setLoading(false);
      return updatedUser;
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  // Update multiple fields at once
  const updateMultipleFields = async (fields) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await userService.updateMultipleFields(fields);
      setUser(updatedUser); // Update user in AuthContext
      setLoading(false);
      return updatedUser;
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  // Update specific fields
  const updateFullName = async (fullName) => {
    return updateProfile({ full_name: fullName });
  };

  const updatePhone = async (phone) => {
    return updateProfile({ phone });
  };

  const updateBio = async (bio) => {
    return updateProfile({ bio });
  };

  const updateCountry = async (country) => {
    return updateProfile({ country });
  };

  const updateAvatar = async (avatarUrl) => {
    return updateProfile({ avatar_url: avatarUrl });
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      await userService.changePassword(currentPassword, newPassword);
      setLoading(false);
      return true;
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  // Delete account
  const deleteAccount = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await userService.deleteAccount();
      logout(); // This will clear user state and redirect
      setLoading(false);
      return true;
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  // Upload avatar with file
  const uploadAvatar = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await userService.uploadAvatar(file);
      // Update user avatar in context
      setUser(prev => ({ ...prev, avatar_url: result.avatar_url }));
      setLoading(false);
      return result;
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  // Refresh user data
  const refreshProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await userService.getUserProfile();
      setUser(userData); // Update user in AuthContext
      setLoading(false);
      return userData;
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  return {
    // State
    loading,
    error,
    
    // Profile operations
    updateProfile,
    updateMultipleFields,
    updateFullName,
    updatePhone,
    updateBio,
    updateCountry,
    updateAvatar,
    refreshProfile,
    
    // Account operations
    changePassword,
    deleteAccount,
    uploadAvatar,
    
    // Utilities
    clearError: () => setError(null),
  };
};