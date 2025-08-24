// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import StatsCards from '../../components/dashboard/StatsCards';
import { useDashboardData } from '../../hooks/dashboard/useDashboardData';

export default function DashboardPage() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-700">
          <h3 className="text-lg font-medium">Erreur de chargement</h3>
          <p className="mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header avec status */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Platform Overview</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
              All Systems Operational
            </span>
          </div>
          <p className="text-gray-600">Complete real-time insights and performance metrics for Scholora</p>
        </div>
        
        <div className="text-right">
          <p 
            className="text-sm text-gray-500" 
            style={{ color: "black", fontWeight: 500, fontFamily: "system-ui" }}
          >
            Wednesday, August 20, 2025
          </p>

          <p className="text-xs text-gray-400">Last updated: just now</p>
        </div>
      </div>

      {/* Executive Summary */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
          <h2 className="text-xl font-semibold text-gray-900">Executive Summary</h2>
        </div>
        
        <StatsCards data={data?.stats} />
      </div>

      {/* Financial Performance */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-1 h-6 bg-green-600 rounded-full"></div>
          <h2 className="text-xl font-semibold text-gray-900">Financial Performance</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Revenue Chart temporaire */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Revenue Trends</h3>
                <p className="text-sm text-gray-500">6-month growth trajectory</p>
              </div>

              <div className="h-64 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-blue-700 font-medium">Revenue Chart</p>
                  <p className="text-blue-600 text-sm">Growth: +12.4%</p>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Jan: $60K</span>
                <span className="text-gray-500">Jun: $189K</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Platform Fees</h3>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">$28.4K</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Tutor Earnings</h3>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">$160.6K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Analytics et Live Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900">Learning Analytics</h2>
          </div>
          
          {/* Subject Distribution temporaire */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Subject Distribution</h3>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Math', value: 1200, color: '#8B5CF6', percentage: 100 },
                { name: 'Science', value: 800, color: '#10B981', percentage: 67 },
                { name: 'English', value: 600, color: '#F59E0B', percentage: 50 },
                { name: 'History', value: 400, color: '#EF4444', percentage: 33 }
              ].map((subject, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: subject.color }}
                  ></div>
                  
                  <div className="w-16 text-sm font-medium text-gray-700">
                    {subject.name}
                  </div>
                  
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        backgroundColor: subject.color,
                        width: `${subject.percentage}%`
                      }}
                    ></div>
                  </div>
                  
                  <div className="w-12 text-right text-sm font-semibold text-gray-900">
                    {subject.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Total Sessions</span>
                <span className="text-lg font-bold text-gray-900">3,000</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1 h-6 bg-green-600 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900">Live Activities</h2>
          </div>
          
          {/* Live Activities temporaire */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Real-time Events</h3>
            </div>

            <div className="space-y-4">
              {[
                { 
                  title: 'New student signup', 
                  subtitle: 'Sarah Johnson joined Mathematics', 
                  time: '2m ago',
                  color: 'bg-blue-100 text-blue-600'
                },
                { 
                  title: 'Live session started', 
                  subtitle: 'Physics tutoring with Dr. Smith', 
                  time: '5m ago',
                  color: 'bg-green-100 text-green-600'
                },
                { 
                  title: 'Payment received', 
                  subtitle: '$45.00 for Chemistry session', 
                  time: '8m ago',
                  color: 'bg-emerald-100 text-emerald-600'
                },
                { 
                  title: 'New tutor application', 
                  subtitle: 'Michael Chen - English Literature', 
                  time: '12m ago',
                  color: 'bg-purple-100 text-purple-600'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
                    <div className="w-4 h-4">
                      {index === 0 && <svg fill="currentColor" viewBox="0 0 20 20"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" /></svg>}
                      {index === 1 && <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>}
                      {index === 2 && <svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>}
                      {index === 3 && <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd" /></svg>}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {activity.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all activities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}