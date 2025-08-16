'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, GraduationCap, AlertCircle } from 'lucide-react';

// Types
interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  roles: string[];
  is_super_admin: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: User;
  };
}

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Auth Service
class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('scholora_access_token', token);
    }
  }

  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('scholora_user', JSON.stringify(user));
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('scholora_access_token');
    }
    return null;
  }

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('scholora_user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user?.is_super_admin);
  }
}

const authService = new AuthService();

// Hook useAuth
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const clearError = () => setError('');

  const login = async (credentials: LoginRequest): Promise<void> => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(credentials);

      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }

      if (!response.data.user.is_super_admin) {
        throw new Error('Accès refusé. Seuls les administrateurs peuvent accéder à ce portail.');
      }

      authService.setToken(response.data.access_token);
      authService.setUser(response.data.user);
      setUser(response.data.user);
      
      // Redirect to dashboard
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/dashboard';
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const isAuth = authService.isAuthenticated();
    const userData = authService.getUser();
    
    if (isAuth && userData) {
      setUser(userData);
      // Redirect if already authenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/dashboard';
      }
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    clearError,
    isAuthenticated: !!user && authService.isAuthenticated(),
  };
};

// Main Component
const LoginPage: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }

    if (!formData.password) {
      errors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    try {
      await login(formData);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleInputChange = (field: keyof LoginRequest, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    if (error) {
      clearError();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Scholora</h1>
          <p className="text-gray-600 font-medium mb-1">Administrative Portal</p>
          
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Secure Access
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 backdrop-blur-sm border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your administrative dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                    validationErrors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'
                  }`}
                  placeholder="admin@scholora.com"
                  autoComplete="email"
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-12 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                    validationErrors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Enter your secure password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 Scholora Educational Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="hover:text-gray-700 transition-colors focus:outline-none focus:underline">
              Privacy Policy
            </button>
            <span>•</span>
            <button className="hover:text-gray-700 transition-colors focus:outline-none focus:underline">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;