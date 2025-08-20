'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../../lib/auth/authService';

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [message, setMessage] = useState('Déconnexion en cours...');
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        setIsLoggingOut(true);
        setMessage('Déconnexion en cours...');

        // Appeler la méthode logout du service
        await authService.logout();
        
        setMessage('Déconnexion réussie, redirection...');
        
        // Attendre un petit moment pour que l'utilisateur voie le message
        setTimeout(() => {
          // Rediriger vers la page de connexion
          router.push('/auth/login');
        }, 1000);

      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        setMessage('Erreur lors de la déconnexion, redirection...');
        
        // Même si l'API échoue, nettoyer localement et rediriger
        authService.clearAuth();
        
        setTimeout(() => {
          router.push('/auth/login');
        }, 1500);
      } finally {
        setIsLoggingOut(false);
      }
    };

    // Démarrer le processus de déconnexion
    performLogout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          {/* Spinner de chargement */}
          <div className="mx-auto mb-4 w-12 h-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          
          {/* Message de statut */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Déconnexion
          </h2>
          <p className="text-gray-600">
            {message}
          </p>
          
          {/* Barre de progression optionnelle */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: isLoggingOut ? '60%' : '100%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}