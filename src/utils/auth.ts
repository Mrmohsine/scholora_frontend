const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Fonction pour récupérer le token
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Fonction pour sauvegarder le token
export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Fonction pour supprimer le token
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Fonction de logout
export const logout = async (): Promise<void> => {
  const token = getToken();
  
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  // Supprimer le token dans tous les cas
  removeToken();
  
  // Rediriger vers la page d'accueil
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = (): boolean => {
  return !!getToken();
};