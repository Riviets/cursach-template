// services/api/paymentsApi.js

import { api } from './api';

export const fetchPaymentHistory = async (userId) => {
    const response = await api.get(`/payments/history/${userId}/`, {
    });
    return response.data;
  };
  