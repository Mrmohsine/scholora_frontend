// components/dashboard/RevenueChart.tsx
'use client';

import { useState, useEffect } from 'react';

interface RevenueChartProps {
  data?: {
    revenue?: Array<{ month: string; value: number }>;
  };
}

export default function RevenueChart({ data }: RevenueChartProps) {
  // Données par défaut pour le graphique
  const defaultData = [
    { month: 'Jan', value: 60, x: 10 },
    { month: 'Feb', value: 85, x: 80 },
    { month: 'Mar', value: 120, x: 150 },
    { month: 'Apr', value: 140, x: 220 },
    { month: 'May', value: 170, x: 290 },
    { month: 'Jun', value: 189, x: 360 }
  ];

  const chartData = data?.revenue || defaultData;
  const maxValue = Math.max(...chartData.map(d => d.value));
  const minValue = Math.min(...chartData.map(d => d.value));
  
  // Créer les points du graphique
  const createPath = () => {
    return chartData.map((point, index) => {
      const x = (index / (chartData.length - 1)) * 340 + 20; // 340 = largeur - marges
      const y = 200 - ((point.value - minValue) / (maxValue - minValue)) * 160; // 160 = hauteur du graphique
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const createGradientPath = () => {
    const path = createPath();
    const lastPoint = chartData[chartData.length - 1];
    const lastX = ((chartData.length - 1) / (chartData.length - 1)) * 340 + 20;
    return `${path} L ${lastX} 200 L 20 200 Z`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Revenue Trends</h3>
        <p className="text-sm text-gray-500">6-month growth trajectory</p>
      </div>

      <div className="relative">
        {/* Axe Y - Labels des valeurs */}
        <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500">
          <span>$240K</span>
          <span>$180K</span>
          <span>$120K</span>
          <span>$60K</span>
          <span>$0K</span>
        </div>

        {/* Graphique SVG */}
        <div className="ml-12">
          <svg width="360" height="200" className="overflow-visible">
            {/* Grille de fond */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
              </linearGradient>
            </defs>
            
            {/* Lignes de grille horizontales */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line 
                key={i}
                x1="20" 
                y1={40 + (i * 40)} 
                x2="360" 
                y2={40 + (i * 40)}
                stroke="#F3F4F6" 
                strokeWidth="1"
              />
            ))}

            {/* Zone sous la courbe */}
            <path
              d={createGradientPath()}
              fill="url(#areaGradient)"
            />

            {/* Ligne principale */}
            <path
              d={createPath()}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Points sur la courbe */}
            {chartData.map((point, index) => {
              const x = (index / (chartData.length - 1)) * 340 + 20;
              const y = 200 - ((point.value - minValue) / (maxValue - minValue)) * 160;
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#3B82F6"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  {/* Tooltip au hover */}
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="transparent"
                    className="cursor-pointer hover:fill-blue-50"
                  >
                    <title>${point.value}K - {point.month}</title>
                  </circle>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Labels des mois (Axe X) */}
        <div className="ml-12 mt-4 flex justify-between text-xs text-gray-500">
          {chartData.map((point, index) => (
            <span key={index} className="text-center">
              {point.month}
            </span>
          ))}
        </div>
      </div>

      {/* Métriques en bas */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Growth Rate: <span className="text-green-600 font-semibold">+12.4%</span>
        </div>
        <div className="text-sm text-gray-500">
          Jan: <span className="font-semibold">$60K</span> → Jun: <span className="font-semibold">$189K</span>
        </div>
      </div>
    </div>
  );
}