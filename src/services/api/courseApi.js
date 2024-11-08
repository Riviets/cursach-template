// services/api/courseApi.js

import { api } from './api';

export const fetchCourses = async () => {
  const response = await api.get('/courses/');
  return response.data;
};

export const fetchCourseById = async (id) => {
  const response = await api.get(`/courses/${id}/`);
  return response.data;
};

export const fetchUserCourses = async (userId) => {
  const response = await api.get(`/enrollments/user-courses/${userId}/`);
  return response.data;
};

export const fetchModulesByCourseId = async (courseId) => {
  const response = await api.get(`/modules/get_modules/${courseId}/`);
  return response.data;
};
