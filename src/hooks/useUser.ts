import { useEffect, useState } from 'react';
import { User } from '../constants/types';

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = async () => {
        await localStorage.removeItem('user');
        setUser(null);
    };

    return { user, logout };
};
