import { useUser } from '@/providers/user.provider';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from '../axios';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { getUser, removeToken } = useUser();
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        axios.interceptors.request.use((config) => {
            if (user?.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
            return config;
        });

        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    removeToken();
                    navigate('/');
                }

                if (error.response.status === 403) {
                    true;
                    navigate('/');
                }

                return Promise.reject(error);
            },
        );
    }, [user, removeToken]);

    if (!user || !user.token) {
        navigate('/');
        toast.warning('You are not logged in');
        return null;
    }

    return children;
};
