// lib/auth/authService.ts
import { AUTH_CONFIG, API_ENDPOINTS } from './config';
import type { LoginRequest, LoginResponse, DashboardResponse, User } from '../../types/auth';

class AuthService {
  private apiClient: typeof fetch;

  constructor() {
    this.apiClient = fetch;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${AUTH_CONFIG.API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await this.apiClient(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.makeRequest<LoginResponse>(
      API_ENDPOINTS.LOGIN,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );

    if (response.success && response.data.user.is_super_admin) {
      this.setToken(response.data.access_token);
      this.setUser(response.data.user);
    }

    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.makeRequest(API_ENDPOINTS.LOGOUT, { method: 'POST' });
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      this.clearAuth();
    }
  }

  async getDashboard(): Promise<DashboardResponse> {
    return this.makeRequest<DashboardResponse>(API_ENDPOINTS.ADMIN_DASHBOARD);
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.makeRequest<{ success: boolean; data: User }>(
      API_ENDPOINTS.ME
    );
    return response.data;
  }

  // Token management
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  }

  private setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token);
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  private setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(user));
  }

  clearAuth(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.USER_KEY);
    localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user?.is_super_admin);
  }
}

export const authService = new AuthService();