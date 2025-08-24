// lib/dashboard/api.ts
import { authService } from '../auth/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class DashboardAPI {
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = authService.getToken();
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401) {
        // Token expiré, rediriger vers login
        authService.clearAuth();
        window.location.href = '/auth/login';
        throw new Error('Session expirée');
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
    }

    return response.json();
  }

  // Récupérer vue d'ensemble du dashboard
  async getOverview() {
    return this.request('/dashboard/overview');
  }

  // Récupérer statistiques
  async getStats() {
    return this.request('/dashboard/stats');
  }

  // Récupérer données de revenus
  async getRevenue(period: '7d' | '30d' | '90d' | '1y' = '30d') {
    return this.request(`/dashboard/revenue?period=${period}`);
  }

  // Récupérer activités en temps réel
  async getLiveActivities() {
    return this.request('/dashboard/activities/live');
  }

  // Récupérer distribution des matières
  async getSubjectDistribution() {
    return this.request('/dashboard/subjects/distribution');
  }

  // Récupérer liste des étudiants
  async getStudents(page: number = 1, limit: number = 10, search?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });
    return this.request(`/dashboard/students?${params}`);
  }

  // Récupérer liste des tuteurs
  async getTutors(page: number = 1, limit: number = 10, search?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });
    return this.request(`/dashboard/tutors?${params}`);
  }

  // Récupérer demandes de vérification
  async getVerificationRequests() {
    return this.request('/dashboard/verification/requests');
  }

  // Approuver/rejeter vérification
  async updateVerification(tutorId: string, status: 'approved' | 'rejected', reason?: string) {
    return this.request(`/dashboard/verification/${tutorId}`, {
      method: 'PUT',
      body: JSON.stringify({ status, reason }),
    });
  }

  // Récupérer performances par matière
  async getSubjectPerformance() {
    return this.request('/dashboard/subjects/performance');
  }

  // Récupérer analytics avancées
  async getAnalytics(type: 'users' | 'revenue' | 'sessions' | 'performance') {
    return this.request(`/dashboard/analytics/${type}`);
  }

  // Récupérer tickets de support
  async getSupportTickets(status?: 'open' | 'closed' | 'pending') {
    const params = status ? `?status=${status}` : '';
    return this.request(`/dashboard/support/tickets${params}`);
  }

  // Mettre à jour ticket de support
  async updateSupportTicket(ticketId: string, status: string, response?: string) {
    return this.request(`/dashboard/support/tickets/${ticketId}`, {
      method: 'PUT',
      body: JSON.stringify({ status, response }),
    });
  }

  // Récupérer paramètres système
  async getSettings() {
    return this.request('/dashboard/settings');
  }

  // Mettre à jour paramètres
  async updateSettings(settings: Record<string, any>) {
    return this.request('/dashboard/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Exporter données
  async exportData(type: 'students' | 'tutors' | 'revenue' | 'sessions', format: 'csv' | 'xlsx' = 'csv') {
    const response = await fetch(`${API_BASE_URL}/dashboard/export/${type}?format=${format}`, {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'export');
    }

    return response.blob();
  }

  // Recherche globale
  async globalSearch(query: string) {
    return this.request(`/dashboard/search?q=${encodeURIComponent(query)}`);
  }
}

export const dashboardApi = new DashboardAPI();