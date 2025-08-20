// Configuration de base pour l'authentification
export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'auth_user',
  REFRESH_TOKEN_KEY: 'refresh_token',
  TOKEN_EXPIRY_KEY: 'token_expiry',
  
  // Durée de vie du token (en millisecondes)
  TOKEN_LIFETIME: 24 * 60 * 60 * 1000, // 24 heures
  
  // Temps avant expiration pour rafraîchir le token (en millisecondes)
  REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes
};

// URL de base de l'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Endpoints de l'API
export const API_ENDPOINTS = {
  // Authentification
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  ME: `${API_BASE_URL}/auth/me`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
  
  // Dashboard
  DASHBOARD: `${API_BASE_URL}/dashboard`,
  DASHBOARD_STATS: `${API_BASE_URL}/dashboard/stats`,
  
  // Utilisateurs
  USERS: `${API_BASE_URL}/users`,
  USER_PROFILE: `${API_BASE_URL}/users/profile`,
  
  // Autres endpoints que vous pourriez avoir
  STUDENTS: `${API_BASE_URL}/students`,
  TEACHERS: `${API_BASE_URL}/teachers`,
  COURSES: `${API_BASE_URL}/courses`,
  CLASSES: `${API_BASE_URL}/classes`,
};

// Configuration des headers par défaut
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Configuration des timeouts
export const REQUEST_CONFIG = {
  TIMEOUT: 10000, // 10 secondes
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 seconde
};

// Messages d'erreur personnalisés
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre connexion internet.',
  UNAUTHORIZED: 'Session expirée. Veuillez vous reconnecter.',
  FORBIDDEN: 'Accès refusé. Vous n\'avez pas les permissions nécessaires.',
  NOT_FOUND: 'Ressource non trouvée.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  VALIDATION_ERROR: 'Données invalides. Vérifiez vos informations.',
  TOKEN_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter.',
  INVALID_CREDENTIALS: 'Email ou mot de passe incorrect.',
};