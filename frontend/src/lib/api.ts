import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const endpoints = {
  auth: { login: '/auth/login' },
  products: '/products',
  caseStudies: '/casestudies',
  blog: '/blogposts',
  leads: '/leads',
  contact: '/contact',
  testimonials: '/testimonials',
  bookings: '/bookings',
  upload: '/upload',
  dashboard: '/dashboard/stats',
};
