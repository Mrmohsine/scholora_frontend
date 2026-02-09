// lib/auth/authService.ts
import { AUTH_CONFIG, API_ENDPOINTS } from './config';
import type { LoginRequest, LoginResponse, DashboardResponse, User } from '../../types/auth';

class AuthService {
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
     const response = await fetch(url, config);

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

  if (response.success) {
    // save token first (before fetching profile) to ensure authenticated request for profile data
    this.setToken(response.data.access_token);

    // fetch full backend profile (includes tutor + pricing) to enrich frontend user data
    const fullUser = await this.getCurrentUser();

    // store enriched user data in localStorage for app-wide access
    this.setUser(fullUser);
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
  async updateProfile(data: {
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    address?: string;
  }) {
    const response = await this.makeRequest<{ success: boolean; data: User }>(
      "/auth/profile",
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    // Keep localStorage in sync with backend truth
    if (response.success) {
      this.setUser(response.data);
    }

    return response.data;
  }
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
   return !!(token && user);
 }

 getUserRole(): string | null {
   const user = this.getUser();
   if (!user || !user.roles || user.roles.length === 0) return null;
   
   if (user.roles.includes('super_admin')) return 'super_admin';
   if (user.roles.includes('tutor')) return 'tutor';
   if (user.roles.includes('student')) return 'student';
   
   return user.roles[0];
 }

 getRedirectPath(): string {
   const role = this.getUserRole();
   
   switch (role) {
     case 'super_admin':
       return '/admin/dashboard';
     case 'tutor':
       return '/tutor-portal/dashboard';
     case 'student':
       return '/student-portal/dashboard';
     default:
       return '/';
   }
 }
}

export const authService = new AuthService();