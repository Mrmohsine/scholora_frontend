// hooks/auth/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { authService } from '../../lib/auth/authService';
import { ROUTES } from '../../lib/auth/config';
import type { User, LoginRequest, AuthError } from '../../types/auth';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: AuthError | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(async (credentials: LoginRequest): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }

      if (!response.data.user.is_super_admin) {
        throw new Error('Accès refusé. Seuls les administrateurs peuvent accéder à ce portail.');
      }

      setUser(response.data.user);
      
      // Redirect to dashboard
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.DASHBOARD;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError({ message: errorMessage });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      await authService.logout();
      setUser(null);
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.LOGIN;
      }
    } catch (err) {
      console.error('Logout error:', err);
      // Even if logout fails, clear local state
      setUser(null);
      authService.clearAuth();
      
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.LOGIN;
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = () => {
      const isAuth = authService.isAuthenticated();
      const userData = authService.getUser();
      
      if (isAuth && userData) {
        setUser(userData);
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const isAuthenticated = !!user && authService.isAuthenticated();

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
    clearError,
  };
};