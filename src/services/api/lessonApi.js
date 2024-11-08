// services/api/lessonApi.js

import { api } from './api';

export const fetchLessonsByModuleId = async (moduleId) => {
  const response = await api.get(`/lessons/get_lessons/${moduleId}/`);
  return response.data;
};

export const fetchLessonById = async (lessonId) => {
  const response = await api.get(`/lessons/${lessonId}/`);
  return response.data;
};

export const fetchLessonFiles = async (lessonId) => {
  const response = await api.get(`/lessons/${lessonId}/files/`);
  return response.data;
};

export const fetchLessonLinks = async (lessonId) => {
  const response = await api.get(`/lessons/${lessonId}/links/`);
  return response.data;
};

export const markLessonAsCompleted = async (lessonId) => {
  try {
      console.log('Attempting to mark lesson as completed:', lessonId);
      const response = await api.post(`progress/lessons/${lessonId}/complete/`);
      console.log('Response:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error marking lesson as completed:', error.response || error);
      throw error;
  }
};