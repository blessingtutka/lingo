import axios from 'axios';
// import history from './utils/history.ts';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//             localStorage.removeItem('token');
//             history.push('/');
//         }
//         throw error;
//     },
// );

export default instance;
