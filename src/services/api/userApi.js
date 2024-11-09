// services/api/userApi.js

import { api } from './api';

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const login = async (username, password) => {
  const response = await api.post('/users/login/', { username, password });
  const data = response.data;
  localStorage.setItem('user', JSON.stringify(data));
  localStorage.setItem('token', data.token);
  return data;
};

export const register = async (userData) => {
  const response = await api.post('/users/register/', userData);
  return response.data;
};


export const getUserById = async (userId) => {
  try {
      const response = await api.get(`/users/student/${userId}/`);
      
      if (response.data) {
          // Оновлюємо дані в localStorage при кожному успішному запиті
          const currentUser = JSON.parse(localStorage.getItem('user'));
          localStorage.setItem('user', JSON.stringify({
              ...currentUser,
              ...response.data.data
          }));
      }
      
      return response.data;
  } catch (error) {
      console.error('Error in getUserById:', error);
      throw error;
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
      console.log('Updating profile with data:', userData);
      const response = await api.post(`/users/update-profile/${userId}/`, userData);
      console.log('Update response:', response);
      
      if (response.data) {
          // Оновлюємо дані користувача в localStorage
          const currentUser = JSON.parse(localStorage.getItem('user'));
          localStorage.setItem('user', JSON.stringify({
              ...currentUser,
              ...response.data
          }));
      }
      
      return response;
  } catch (error) {
      console.error('Error in updateUserProfile:', error);
      throw error;
  }
};

export const uploadProfileImage = async (userId, formData) => {
  try {
      const response = await api.post(`/users/upload-profile-image/${userId}/`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error in uploadProfileImage:', error);
      throw error;
  }
};

export const changePassword = async (oldPassword, newPassword, newPasswordConfirm) => {
  try {
      const response = await api.post('/users/change-password/', {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirm: newPasswordConfirm,
      });
      return response.data;
  } catch (error) {
      console.error('Error in changePassword:', error);
      throw error;
  }
};