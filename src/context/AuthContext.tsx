import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Load user from local storage on mount
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            try {
                setUser(JSON.parse(userInfo));
            } catch (error) {
                console.error('Failed to parse user info', error);
                localStorage.removeItem('userInfo');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('userInfo', JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.name}!`);
        navigate('/');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const isAuthenticated = !!user;

    // Protect routes
    useEffect(() => {
        const publicRoutes = ['/login', '/signup', '/404'];
        const isPublicRoute = publicRoutes.includes(location.pathname);

        if (!isLoading && !user && !isPublicRoute) {
            navigate('/login');
        }

        // Redirect to dashboard if logged in and trying to access auth pages
        if (!isLoading && user && (location.pathname === '/login' || location.pathname === '/signup')) {
            navigate('/');
        }
    }, [user, isLoading, location.pathname, navigate]);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
