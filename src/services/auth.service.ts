import axios from '../axios';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post('auth/login', { email, password });

        if (response.data.status === 'error') {
            throw new Error(response.data.error.message);
        }

        return response.data.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            const serverError: ErrorResponse = error.response.data;
            throw new Error(serverError.error.message);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export const register = async (userData: any): Promise<AuthResponse> => {
    try {
        const response = await axios.post('auth/register', userData);

        if (response.data.status === 'error') {
            throw new Error(response.data.error.message);
        }

        return response.data.data;
    } catch (error: any) {
        throw new Error('An unexpected error occurred');
    }
};

export const getUserProfile = async (): Promise<User> => {
    try {
        const response = await axios.get('/auth/profile');
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error?.message || 'Failed to load user profile');
    }
};

export const updateProfile = async (updateData: any): Promise<User> => {
    try {
        const response = await axios.patch('/user/update', updateData);

        if (response.data.status === 'error') {
            throw new Error(response.data.error.message);
        }

        return response.data.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            const serverError: ErrorResponse = error.response.data;
            throw new Error(serverError.error.message);
        } else {
            throw new Error('An unexpected error occurred while updating profile');
        }
    }
};

export const changePassword = async (passwordData: any): Promise<void> => {
    try {
        const response = await axios.patch('/user/change-password', passwordData);

        if (response.data.status === 'error') {
            throw new Error(response.data.error.message);
        }

        return response.data.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            const serverError: ErrorResponse = error.response.data;
            throw new Error(serverError.error.message);
        } else {
            throw new Error('An unexpected error occurred while changing password');
        }
    }
};
