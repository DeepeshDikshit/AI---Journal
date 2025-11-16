import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add token to request headers if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const createJournal = (journalData) => API.post('/journal/create', journalData);
export const getJournals = (userId) => API.get(`/journal/${userId}`);
export const updateJournal = (id, journalData) => API.put(`/journal/${id}`, journalData);
export const deleteJournal = (id) => API.delete(`/journal/${id}`);