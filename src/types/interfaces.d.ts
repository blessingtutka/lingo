interface User {
    id: string;
    name?: string;
    email: string;
    avatar?: string;
    phone?: string;
    contacts?: User[];
    token?: string;
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

type CallStatus = 'REQUESTING' | 'ONGOING' | 'MISSED' | 'REJECTED' | 'ENDED';

interface Call {
    id: string;
    startedAt: string;
    endedAt: string | null;
    status: CallStatus;
    peerId?: string;
    callerId: string;
    receiverId: string;
    isCaller?: boolean;
    summary?: {
        id: string;
        content: string;
    };
}
interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    status_code: number;
}
