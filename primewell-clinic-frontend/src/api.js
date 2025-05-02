// src/api.js
import axios from 'axios';

// in Create-React-App: REACT_APP_API_URL
// in Vite: import.meta.env.VITE_API_URL
const BASE_URL =
  process.env.REACT_APP_API_URL ||
  process.env.VITE_API_URL ||
  'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  // you can also set headers.common['Authorization'] here, etc.
});

export default api;
