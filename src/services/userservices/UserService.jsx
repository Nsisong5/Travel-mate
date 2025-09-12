// services/userService.js
import api from '../api/axios';
import { AuthContext } from "../../AuthProvider"
import { useContext } from "react"


class UserService{
 
  // Get current user token from localStorage
  getAuthHeaders(){
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  // Get user profile
  async getUserProfile() {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await api.get('/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.detail || 'Failed to fetch profile');
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const myToken = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await api.patch('/user/profile', userData, {
        headers: {
          'Authorization': `Bearer ${myToken}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.detail || 'Failed to update profile');
    }
  }

  // Update specific profile fields
  async updateFullName(fullName) {
    return this.updateProfile({ full_name: fullName });
  }

  async updatePhone(phone) {
    return this.updateProfile({ phone });
  }

  async updateBio(bio) {
    return this.updateProfile({ bio });
  }

  async updateCountry(country) {
    return this.updateProfile({ country });
  }

  async updateAvatar(avatarUrl) {
    return this.updateProfile({ avatar_url: avatarUrl });
  }

  // Bulk update multiple fields
  async updateMultipleFields(fields) {
    const updateData = {};
    
    if (fields.fullName !== undefined) updateData.full_name = fields.fullName;
    if (fields.phone !== undefined) updateData.phone = fields.phone;
    if (fields.bio !== undefined) updateData.bio = fields.bio;
    if (fields.country !== undefined) updateData.country = fields.country;
    if (fields.avatarUrl !== undefined) updateData.avatar_url = fields.avatarUrl;
    
    return this.updateProfile(updateData);
  }

  // Change password (separate endpoint)
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.patch('/user/change-password', {
        current_password: currentPassword,
        new_password: newPassword
      }, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.detail || 'Failed to change password');
    }
  }

  // Delete user account
  async deleteAccount() {
    try {
      const response = await api.delete('/user/profile', {
        headers: this.getAuthHeaders()
      });
      // Clear token after successful deletion
      localStorage.removeItem('access_token');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to delete account');
    }
  }

  // Upload avatar (if you have file upload endpoint)
  async uploadAvatar(file) {
    const token = localStorage.getItem('access_token');   
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", 1); // later: get from context/auth

      const res = await api.post("user/upload-avatar/", formData, {
        headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "multipart/form-data" 
        },
      });

      setAvatarUrl(res.data.avatar_url);
    } catch (err) {
      console.error("Upload failed", err);
    }
  }

  // Delete avatar
  async deleteAvatar() {
    try {
      const response = await api.delete('/user/avatar', {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to delete avatar');
    }
  }
}

// Export a singleton instance
const userService = new UserService();
export default userService;