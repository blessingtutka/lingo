interface User {
    id: string;
    name?: string;
    email: string;
    avatar?: string;
    phone?: string;
    contacts?: User[];
}

interface Summary {
    id?: string;
    callId: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AuthResponse {
    accessToken: string;
    user?: User;
}

interface ErrorResponse {
    status: string;
    error: {
        code: string;
        message: string;
    };
}

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    status_code: number;
}
