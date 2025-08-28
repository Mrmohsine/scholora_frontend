'use client';
import React, { useState } from 'react';
import { Search, Users, Calendar } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TutorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tutors = [
    {
      id: 1,
      name: "Amira Bennaceur",
      rating: 4.9,
      subject: "Mathematics",
      tags: ["Algebra", "Calculus", "Geometry"],
      students: 95,
      experience: "10+ years",
      monthlyRate: 350,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Youssef El Mansouri",
      rating: 4.8,
      subject: "Physics",
      tags: ["Mechanics", "Electricity", "Thermodynamics"],
      students: 78,
      experience: "8+ years",
      monthlyRate: 350,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Salma Alaoui",
      rating: 5.0,
      subject: "Literature",
      tags: ["French", "Arabic", "Writing"],
      students: 124,
      experience: "12+ years",
      monthlyRate: 400,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const allTutors = [
    ...tutors,
    ...tutors.map(tutor => ({ ...tutor, id: tutor.id + 3 })),
    ...tutors.map(tutor => ({ ...tutor, id: tutor.id + 6 }))
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Tutors</h1>
          <p className="text-lg text-gray-600">Meet our experienced teaching professionals</p>
        </div>

        {/* Search and Filters - En ligne horizontale */}
        <div className="flex justify-center items-center gap-6 mb-16">
          <div className="relative w-80">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tutors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 bg-gray-50"
            />
          </div>
          <select className="px-6 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-600">
            <option>All Departments</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Literature</option>
          </select>
          <select className="px-6 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-600">
            <option>All Status</option>
            <option>Available</option>
            <option>Busy</option>
            <option>Offline</option>
          </select>
        </div>

        {/* Tutors Grid - 3x3 comme dans l'image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTutors.map((tutor, index) => (
            <div key={tutor.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Tutor Image */}
              <div className="relative">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-md">
                  <span className="text-yellow-400 text-sm mr-1">★</span>
                  <span className="text-sm font-bold text-gray-900">{tutor.rating}</span>
                </div>
              </div>

              {/* Tutor Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tutor.name}</h3>
                
                {/* Subject */}
                <div className="mb-4">
                  <span className="text-lg font-bold text-blue-600">{tutor.subject}</span>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {tutor.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium border border-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{tutor.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{tutor.experience}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-blue-600">
                    {tutor.monthlyRate} MAD/month
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TutorsPage;