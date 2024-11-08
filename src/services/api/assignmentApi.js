// services/api/assignmentApi.js

import { api } from './api';

export const fetchAssignmentsByCourseId = async (courseId) => {
  const response = await api.get(`/assignments/student/course/${courseId}/assignments/`);
  return response.data;
};

export const fetchAssignmentDetail = async (assignmentId) => {
  const response = await api.get(`/assignments/${assignmentId}/detail`);
  return response.data;
};
