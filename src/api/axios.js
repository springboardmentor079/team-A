import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    console.log('✅ Axios response:', response);
    return response;
  },
  (error) => {
    console.error('❌ Axios error:', error);
    console.error('Error response:', error.response);
    return Promise.reject(error);
  }
);

export default instance;
