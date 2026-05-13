import axios from 'axios';
import { encryptData, decryptData } from '../utils/crypto';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const registerStudentApi = async (studentData: any) => {
  const encryptedPayload = encryptData(studentData);
  const response = await api.post('/register', { encryptedPayload });
  return response.data;
};

export const loginStudentApi = async (credentials: any) => {
  const encryptedPayload = encryptData(credentials);
  const response = await api.post('/login', { encryptedPayload });
  return response.data;
};

export const getStudentsApi = async () => {
  const response = await api.get('/students');
  // Decrypt each student's data
  return response.data.map((encryptedStudent: string) => decryptData(encryptedStudent));
};

export const updateStudentApi = async (id: string, studentData: any) => {
  const encryptedPayload = encryptData(studentData);
  const response = await api.put(`/student/${id}`, { encryptedPayload });
  return response.data;
};

export const deleteStudentApi = async (id: string) => {
  const response = await api.delete(`/student/${id}`);
  return response.data;
};

export default api;
