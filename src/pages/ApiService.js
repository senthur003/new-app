// src/apiService.js
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the bearer token
apiService.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Define the API methods
const get = async (url, params) => {
  try {
    const response = await apiService.get(url, { params });
    return response;
  } catch (error) {
    handleError(error);
  }
};

const post = async (url, data) => {
  try {
    const response = await apiService.post(url, data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

const put = async (url, data) => {
  try {
    const response = await apiService.put(url, data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

const patch = async (url, data) => {
  try {
    const response = await apiService.patch(url, data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

const remove = async (url) => {
  try {
    const response = await apiService.delete(url);
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Handle errors
const handleError = (error) => {
  console.error('API call failed. ', error);
  throw error;
};

export { get, post, put, patch, remove };
