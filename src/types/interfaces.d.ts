interface User {
    id: string;
    name?: string;
    email: string;
    avatar?: string;
    phone?: string;
    displayName: string;
}

interface Summary {
    id?: string;
    callId: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AuthResponse {
    token: string;
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
