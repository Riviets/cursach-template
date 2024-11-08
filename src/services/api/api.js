// services/api/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Функція для отримання CSRF-токена
async function getCSRFToken() {
  const response = await axios.get(`${API_BASE_URL}/get-csrf-token/`, { withCredentials: true });
  return response.data.csrftoken;
}

// Додавання CSRF-токена до кожного запиту
api.interceptors.request.use(async (config) => {
  if (!config.headers['X-CSRFToken']) {
    const csrfToken = await getCSRFToken();
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, error => Promise.reject(error));

// Додавання токена авторизації
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Або отримуйте токен з Redux Store
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
