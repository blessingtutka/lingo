import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string | null = null) {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? storedValue : initialValue;
    });

    useEffect(() => {
        if (state === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, state);
        }
    }, [key, state]);

    return [state, setState] as const;
}

export default useLocalStorage;
