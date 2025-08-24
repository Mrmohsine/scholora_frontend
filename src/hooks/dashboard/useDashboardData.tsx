// hooks/dashboard/useDashboardData.tsx
'use client';

import { useState, useEffect } from 'react';

interface DashboardData {
  stats: {
    monthlyRevenue: {
      amount: string;
      change: string;
      trend: 'up' | 'down';
    };
    totalUsers: {
      count: string;
      online: string;
    };
    sessionsThisMonth: {
      count: string;
      live: string;
    };
    totalTutors: {
      count: string;
      verified: string;
    };
  };
  revenue: {
    chartData: Array<{
      month: string;
      value: number;
    }>;
    platformFees: string;
    tutorEarnings: string;
  };
  subjects: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  activities: Array<{
    id: string;
    type: 'signup' | 'session' | 'payment' | 'application';
    title: string;
    subtitle: string;
    time: string;
    icon: string;
  }>;
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simuler un chargement puis utiliser les données statiques directement
    const loadStaticData = () => {
      setLoading(true);
      setError(null);

      // Simulation d'un délai de chargement
      setTimeout(() => {
        setData({
          stats: {
            monthlyRevenue: {
              amount: '$189K',
              change: '+12.4%',
              trend: 'up'
            },
            totalUsers: {
              count: '1,520',
              online: '647 online'
            },
            sessionsThisMonth: {
              count: '3,040',
              live: '47 live'
            },
            totalTutors: {
              count: '275',
              verified: '251 verified'
            }
          },
          revenue: {
            chartData: [
              { month: 'Jan', value: 60 },
              { month: 'Feb', value: 80 },
              { month: 'Mar', value: 120 },
              { month: 'Apr', value: 140 },
              { month: 'May', value: 160 },
              { month: 'Jun', value: 240 },
            ],
            platformFees: '$28.4K',
            tutorEarnings: '$160.6K'
          },
          subjects: [
            { name: 'Math', value: 1200, color: '#8B5CF6' },
            { name: 'Science', value: 800, color: '#10B981' },
            { name: 'English', value: 600, color: '#F59E0B' },
            { name: 'History', value: 400, color: '#EF4444' },
          ],
          activities: [
            {
              id: '1',
              type: 'signup',
              title: 'New student signup',
              subtitle: 'Sarah Johnson joined Mathematics',
              time: '2m ago',
              icon: '👤'
            },
            {
              id: '2',
              type: 'session',
              title: 'Live session started',
              subtitle: 'Physics tutoring with Dr. Smith',
              time: '5m ago',
              icon: '▶️'
            },
            {
              id: '3',
              type: 'payment',
              title: 'Payment received',
              subtitle: '$45.00 for Chemistry session',
              time: '8m ago',
              icon: '💲'
            },
            {
              id: '4',
              type: 'application',
              title: 'New tutor application',
              subtitle: 'Michael Chen - English Literature',
              time: '12m ago',
              icon: '👤'
            }
          ]
        });
        setLoading(false);
      }, 800); // Simulation de 800ms de chargement
    };

    loadStaticData();
  }, []);

  const refetch = () => {
    // Pour la version statique, on peut juste recharger les mêmes données
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return {
    data,
    loading,
    error,
    refetch
  };
}

// Hook pour des statistiques spécifiques
export function useStats() {
  const { data, loading, error } = useDashboardData();
  
  return {
    stats: data?.stats,
    loading,
    error
  };
}

// Hook pour les données de revenus
export function useRevenueData() {
  const { data, loading, error } = useDashboardData();
  
  return {
    revenue: data?.revenue,
    loading,
    error
  };
}