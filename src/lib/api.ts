import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://portfolio.rohanthapa.com.np',
    headers: {
        'Content-Type': 'application/json',
    },
});

// API response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // console.error('API Error:', error);
        return Promise.reject(error);
    }
);
