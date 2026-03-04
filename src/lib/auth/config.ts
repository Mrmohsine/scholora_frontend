// Configuration de base pour l'authentification
export const AUTH_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'auth_user',
  REFRESH_TOKEN_KEY: 'refresh_token',
  TOKEN_EXPIRY_KEY: 'token_expiry',
  
  // Durée de vie du token (en millisecondes)
  TOKEN_LIFETIME: 24 * 60 * 60 * 1000, // 24 heures
  
  // Temps avant expiration pour rafraîchir le token (en millisecondes)
  REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes
};


// Endpoints de l'API
export const API_ENDPOINTS = {
  // Authentification
  LOGIN: `/auth/login`,
  LOGOUT: `/auth/logout`,
  REGISTER: `/auth/register`,
  REFRESH: `/auth/refresh`,
  ME: `/auth/me`,
  FORGOT_PASSWORD: `/auth/forgot-password`,
  RESET_PASSWORD: `/auth/reset-password`,
  VERIFY_EMAIL: `/auth/verify-email`,
  
  // Dashboard
  ADMIN_DASHBOARD: `/admin/dashboard`,
  STUDENT_DASHBOARD: `/student/dashboard`,
  TUTOR_DASHBOARD: `/tutor/dashboard`,
  DASHBOARD_STATS: `/dashboard/stats`,
  
  // Utilisateurs
  USERS: `/users`,
  USER_PROFILE: `/users/profile`,
  ADMIN_USERS: `/admin/users`,
  ADMIN_ROLES: `/admin/roles`,
  
  // Autres endpoints
  STUDENTS: `/students`,
  TUTORS: `/tutors`,
  COURSES: `/courses`,
  CLASSES: `/classes`,
  USER_STATS: `/user-stats`,
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

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}