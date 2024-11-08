// services/api/materialsApi.js

import { api } from './api';

export const fetchMaterials = async () => {
  const response = await api.get('/materials/');
  return response.data;
};

export const fetchMaterialById = async (materialId) => {
  const response = await api.get(`/materials/${materialId}/`);
  return response.data;
};
