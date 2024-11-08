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
