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

export const fetchCourseParticipants = async (courseId) => {
  const response = await api.get(`/course/${courseId}/participants/`);
  return response.data;
};

export const fetchUserDetails = async (userId, role) => {
  let endpoint = '';
  if (role === 'student') {
    endpoint = `/users/student/${userId}/`;
  } else if (role === 'teacher') {
    endpoint = `/users/teacher/${userId}/`;
  } else if (role === 'admin') {
    endpoint = `/users/admin/${userId}/`;
  }

  const response = await api.get(endpoint);
  return response.data.data; 
};


export const enrollInCourse = async (enrollmentData) => {
  const response = await api.post('/enrollments/enroll/', enrollmentData);
  return response.data;
};