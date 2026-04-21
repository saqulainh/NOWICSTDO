import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'NowicAdmin@2026';
const STORAGE_KEY = 'nowic_admin_auth';

export function AdminAuthProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setAdmin(JSON.parse(saved));
            } catch { /* ignore */ }
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            const session = { username, loggedInAt: Date.now() };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
            setAdmin(session);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout, isLoggedIn: !!admin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAdminAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAdminAuth must be inside AdminAuthProvider');
    return ctx;
}
