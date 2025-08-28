'use client';
import React, { useState } from 'react';
import { Play, Star, Users, Clock, Award, MessageCircle, Calendar, Shield, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TutorDetailPage = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const tutor = {
    name: "John Doe",
    subjects: "Mathematics, Physics, and Computer Science Tutor",
    rating: 4.8,
    reviews: 127,
    verified: true,
    monthlyRate: 160,
    experience: "12 years",
    studentsCount: "1000+",
    responseTime: "1hr",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  };

  const schedule = {
    Monday: "08:00 AM",
    Tuesday: "10:00 AM", 
    Wednesday: "02:00 PM",
    Thursday: "04:00 PM"
  };

  const achievements = [
    { year: 2019, title: "Started teaching career", description: "Began as a freelance mathematics teacher" },
    { year: 2020, title: "Published first educational book", description: "Advanced Maths For Innovative Teaching Methods" },
    { year: 2021, title: "Won Teacher of the Year award", description: "Recognized for outstanding contributions to education" },
    { year: 2023, title: "Reached 1000 students milestone", description: "Successfully reached over 1000 students online and offline" }
  ];

  const testimonials = [
    { name: "Sarah Johnson", rating: 5, text: "John is an exceptional teacher. His methods are innovative and effective." },
    { name: "Michael Chen", rating: 5, text: "Great teaching style and very patient. Highly recommend!" },
    { name: "Emma Davis", rating: 5, text: "Learned so much in just a few sessions. Professional and friendly." }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Tutor Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-start space-x-4">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{tutor.name}</h1>
                  <p className="text-gray-600 mb-2">{tutor.subjects}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="font-semibold text-gray-900">{tutor.rating}</span>
                      <span className="text-gray-600 ml-1">({tutor.reviews} reviews)</span>
                    </div>
                    {tutor.verified && (
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600 text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Introduction */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Video Introduction</h2>
              <div className="relative bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <button className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-shadow">
                  <Play className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900 font-medium">Watch Introduction</span>
                </button>
              </div>
            </div>

            {/* About the Teacher */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About the Teacher</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                John is an experienced educator with over 12 years of experience in teaching mathematics, 
                physics, and computer science. He holds a Ph.D. in Applied Mathematics from MIT and has 
                been recognized for his innovative teaching methods. John's goal is to make learning 
                accessible and enjoyable for students of all levels.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="font-bold text-gray-900">{tutor.studentsCount}</div>
                  <div className="text-sm text-gray-600">Active Tutors</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="font-bold text-gray-900">{tutor.responseTime}</div>
                  <div className="text-sm text-gray-600">Avg. Response</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="font-bold text-gray-900">Monthly Plan</div>
                  <div className="text-sm text-gray-600">Flexible Plan</div>
                </div>
              </div>
            </div>

            {/* Teaching Journey */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Teaching Journey</h2>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">{achievement.year}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Testimonials */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Student Testimonials</h2>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-gray-900 mr-2">{testimonial.name}</span>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            {/* Monthly Subscription */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Monthly Subscription</h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600">${tutor.monthlyRate}</div>
                <div className="text-gray-600">per month</div>
                <div className="text-sm text-gray-500">Billed monthly, cancel anytime</div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Your Weekly Schedule</h4>
                <div className="space-y-2">
                  {Object.entries(schedule).map(([day, time]) => (
                    <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{day}</span>
                      <span className="text-blue-600 font-medium">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600">Weekly session included</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600">Free weekly schedule</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600">Cancel anytime</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
                Subscribe monthly
              </button>
              <p className="text-center text-xs text-gray-500">Recurring. 30 days</p>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600">Online sessions available</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600">24/7 messaging support</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600">Continuous progress tracking</span>
                </div>
              </div>
            </div>

            {/* Ratings & Reviews */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ratings & Reviews</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-gray-900 mr-2">4.6</span>
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="text-gray-600">(127 reviews)</span>
              </div>
              <div className="space-y-2">
                {[
                  { stars: 5, percentage: 70 },
                  { stars: 4, percentage: 20 },
                  { stars: 3, percentage: 6 },
                  { stars: 2, percentage: 2 },
                  { stars: 1, percentage: 2 }
                ].map((rating, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 w-2">{rating.stars}</span>
                    <span className="text-yellow-400">★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{rating.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TutorDetailPage;