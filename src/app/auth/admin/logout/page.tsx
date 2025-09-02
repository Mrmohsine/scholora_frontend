'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../../../lib/auth/authService';

export default function LogoutPage() {
  const [status, setStatus] = useState<'logging-out' | 'success' | 'error'>('logging-out');
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await authService.logout();
        authService.clearAuth();
        
        // Nettoyage spécifique du token trouvé dans vos logs
        if (typeof window !== 'undefined') {
          localStorage.removeItem('scholora_access_token');
        }
        
        setStatus('success');
        
        // Redirection immédiate sans délai inutile
        window.location.href = '/auth/login';
        
      } catch (error) {
        console.error('Logout error:', error);
        setStatus('error');
        
        // Nettoyage forcé même en cas d'erreur
        authService.clearAuth();
        if (typeof window !== 'undefined') {
          localStorage.removeItem('scholora_access_token');
        }
        
        // Redirection même en cas d'erreur
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1000);
      }
    };

    performLogout();
  }, []);

  const getStatusMessage = () => {
    switch (status) {
      case 'logging-out':
        return 'Déconnexion en cours...';
      case 'success':
        return 'Déconnexion réussie';
      case 'error':
        return 'Déconnexion en cours...';
      default:
        return 'Déconnexion en cours...';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center">
            {status === 'error' ? (
              <div className="w-8 h-8 text-red-500">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Déconnexion
          </h2>
          
          <p className="text-gray-600">
            {getStatusMessage()}
          </p>
          
          {status === 'success' && (
            <p className="text-sm text-green-600 mt-2">
              Redirection vers la page de connexion...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}