import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Settings,
  LogOut,
  BarChart3,
  Bell,
  Shield
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      window.location.href = '/admin/login';
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (!parsedUser.is_super_admin) {
      window.location.href = '/admin/login';
      return;
    }

    setUser(parsedUser);
    fetchDashboardData(token);
  }, []);

  const fetchDashboardData = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <div className=\"min-h-screen bg-gray-50 flex items-center justify-center\">
        <div className=\"animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600\"></div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gray-50\">
      {/* Header */}
      <header className=\"bg-white shadow-sm border-b border-gray-200\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"flex justify-between items-center h-16\">
            {/* Logo & Title */}
            <div className=\"flex items-center\">
              <div className=\"w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3\">
                <GraduationCap className=\"w-5 h-5 text-white\" />
              </div>
              <h1 className=\"text-xl font-semibold text-gray-900\">Scholora Admin</h1>
            </div>

            {/* User Menu */}
            <div className=\"flex items-center space-x-4\">
              <div className=\"flex items-center space-x-2\">
                <Shield className=\"w-5 h-5 text-green-500\" />
                <span className=\"text-sm text-gray-700\">Bonjour, {user?.first_name}</span>
              </div>
              <button
                onClick={handleLogout}
                className=\"flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors\"
              >
                <LogOut className=\"w-4 h-4\" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className=\"max-w-7xl mx-auto py-6 sm:px-6 lg:px-8\">
        <div className=\"px-4 py-6 sm:px-0\">
          {/* Welcome Section */}
          <div className=\"mb-8\">
            <h2 className=\"text-3xl font-bold text-gray-900 mb-2\">Dashboard Administrateur</h2>
            <p className=\"text-gray-600\">Vue d'ensemble de la plateforme Scholora</p>
          </div>

          {/* Stats Cards */}
          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8\">
            <div className=\"bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow\">
              <div className=\"flex items-center justify-between\">
                <div>
                  <p className=\"text-sm font-medium text-gray-500\">Total Utilisateurs</p>
                  <p className=\"text-3xl font-bold text-gray-900\">{stats?.total_users || 0}</p>
                </div>
                <div className=\"w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center\">
                  <Users className=\"w-6 h-6 text-blue-600\" />
                </div>
              </div>
            </div>

            <div className=\"bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow\">
              <div className=\"flex items-center justify-between\">
                <div>
                  <p className=\"text-sm font-medium text-gray-500\">Utilisateurs Actifs</p>
                  <p className=\"text-3xl font-bold text-green-600\">{stats?.active_users || 0}</p>
                </div>
                <div className=\"w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center\">
                  <Shield className=\"w-6 h-6 text-green-600\" />
                </div>
              </div>
            </div>

            <div className=\"bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow\">
              <div className=\"flex items-center justify-between\">
                <div>
                  <p className=\"text-sm font-medium text-gray-500\">Total Rôles</p>
                  <p className=\"text-3xl font-bold text-purple-600\">{stats?.total_roles || 0}</p>
                </div>
                <div className=\"w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center\">
                  <Settings className=\"w-6 h-6 text-purple-600\" />
                </div>
              </div>
            </div>

            <div className=\"bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow\">
              <div className=\"flex items-center justify-between\">
                <div>
                  <p className=\"text-sm font-medium text-gray-500\">Connexions Récentes</p>
                  <p className=\"text-3xl font-bold text-orange-600\">{stats?.recent_logins || 0}</p>
                </div>
                <div className=\"w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center\">
                  <BarChart3 className=\"w-6 h-6 text-orange-600\" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">
            <div className=\"bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow\">
              <div className=\"flex items-center mb-4\">
                <Users className=\"w-8 h-8 text-blue-600 mr-3\" />
                <h3 className=\"text-lg font-semibold text-gray-900\">Gestion Utilisateurs</h3>
              </div>
              <p className=\"text-gray-600 mb-4\">Gérer les comptes utilisateurs, rôles et permissions</p>
              <button className=\"w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors\">
                Accéder
              </button>
            </div>

            <div className=\"bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow\">
              <div className=\"flex items-center mb-4\">
                <BookOpen className=\"w-8 h-8 text-green-600 mr-3\" />
                <h3 className=\"text-lg font-semibold text-gray-900\">Gestion Cours</h3>
              </div>
              <p className=\"text-gray-600 mb-4\">Créer et gérer les cours de la plateforme</p>
              <button className=\"w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors\">
                Accéder
              </button>
            </div>

            <div className=\"bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow\">
              <div className=\"flex items-center mb-4\">
                <Settings className=\"w-8 h-8 text-purple-600 mr-3\" />
                <h3 className=\"text-lg font-semibold text-gray-900\">Paramètres Système</h3>
              </div>
              <p className=\"text-gray-600 mb-4\">Configuration générale de la plateforme</p>
              <button className=\"w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors\">
                Accéder
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className=\"mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6\">
            <h3 className=\"text-lg font-semibold text-gray-900 mb-4\">Informations Utilisateur</h3>
            <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
              <div>
                <p className=\"text-sm font-medium text-gray-500\">Nom Complet</p>
                <p className=\"text-gray-900\">{user?.full_name}</p>
              </div>
              <div>
                <p className=\"text-sm font-medium text-gray-500\">Email</p>
                <p className=\"text-gray-900\">{user?.email}</p>
              </div>
              <div>
                <p className=\"text-sm font-medium text-gray-500\">Rôle</p>
                <div className=\"flex items-center\">
                  <span className=\"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800\">
                    Super Administrateur
                  </span>
                </div>
              </div>
              <div>
                <p className=\"text-sm font-medium text-gray-500\">Statut</p>
                <div className=\"flex items-center\">
                  <div className=\"w-2 h-2 bg-green-500 rounded-full mr-2\"></div>
                  <span className=\"text-green-700 text-sm\">Actif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;