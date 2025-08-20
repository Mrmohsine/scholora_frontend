// lib/auth/authService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  // Méthodes existantes...
  
  async logout(): Promise<void> {
    const token = this.getToken();
    
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.warn('Logout request failed, but continuing with local cleanup');
        }
      } catch (error) {
        console.error('Logout API error:', error);
        // Continue avec le nettoyage local même si l'API échoue
      }
    }
    
    // Nettoyer le stockage local
    this.clearAuth();
  }

  async getCurrentUser(): Promise<any> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('No token available');
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearAuth();
        throw new Error('Token expired');
      }
      throw new Error('Failed to get user info');
    }

    const userData = await response.json();
    
    // Sauvegarder les données utilisateur
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.userKey, JSON.stringify(userData));
    }
    
    return userData;
  }

  async refreshToken(): Promise<void> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('No token available');
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      this.clearAuth();
      throw new Error('Token refresh failed');
    }

    const result = await response.json();
    this.setToken(result.access_token);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getUser(): any {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(this.userKey);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();