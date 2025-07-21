import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocaleStorage';
import { getUserProfile } from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';

interface UserContextType {
    user: User | null;
    getUser: () => User | null;
    removeToken: () => void;
    setToken: (newToken: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children?: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [token, setToken] = useLocalStorage('token');
    const [user, setUser] = useState<User | null>(null);

    const removeToken = () => {
        setToken(null);
        setUser(null);
    };

    const isTokenExpired = (token: string | null): boolean => {
        if (!token) return true;
        try {
            const decoded: any = jwtDecode(token);
            const now = Date.now() / 1000;
            return decoded.exp && decoded.exp < now;
        } catch {
            return true;
        }
    };

    const fetchUser = useCallback(async () => {
        if (token && !isTokenExpired(token)) {
            try {
                const userProfile = await getUserProfile();
                setUser({ ...userProfile, token });
            } catch {
                removeToken();
            }
        } else {
            removeToken();
        }
    }, [token]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const contextValue = {
        user,
        getUser: () => user,
        removeToken,
        setToken,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserProvider;
