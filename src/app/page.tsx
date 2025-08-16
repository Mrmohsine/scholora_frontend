'use client';
import Link from 'next/link'
import Image from 'next/image'
import { Star, Users, BookOpen, Award, ChevronRight, Play, User, Calendar, Clock } from 'lucide-react'
import { useState } from 'react';


export default function HomePage() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">                
                <div className="flex items-center mr-3">
                <Image
                  src="/images/logos/logo_blue.png"
                  alt="Scholora Logo"
                  width={200}   
                  height={320}
                  className="rounded-lg"
                />
              </div>
              </Link>
              <div className="hidden md:block ml-12">
                <div className="flex items-baseline space-x-8">
                  <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    How it works
                  </a>
                  <a href="#tutors" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    Featured Tutors
                  </a>
                  <a href="#success-stories" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    Success Stories
                  </a>
                  <a href="#subjects" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    Subjects
                  </a>
                  <a href="#newsletter" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    Stay in the loop
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Log in
              </Link>
              <Link href="/auth/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm">
                Get a Tutor
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                🎓 Revolutionizing Education in Morocco
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
              Where <span className="text-blue-600 relative">
                Learning Meets
                <svg className="absolute -bottom-3 left-0 w-full h-4 text-blue-200 opacity-60" viewBox="0 0 300 12" fill="currentColor">
                  <path d="M0,8 Q150,0 300,8 L300,12 L0,12 Z"/>
                </svg>
              </span><br />
              <span className="text-gray-900">Possibility</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Connect with verified tutors across Morocco. Personalized learning experiences that 
              adapt to your pace, schedule, and goals. Join thousands of successful students.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Link href="/auth/register" className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Find Your Tutor
              </Link>
              <button 
               onClick={() => setIsModalOpen(true)}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg font-semibold px-10 py-4 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-105">
                <Play className="w-5 h-5 mr-3 fill-current" />
                Watch Demo
              </button>
              
            </div>

            {/* Modal for Video Demo */}
            {isModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{ backgroundColor: "rgba(102, 98, 98, 0.53)" }} 
                onClick={() => setIsModalOpen(false)} 
              >
                {/* Bouton de fermeture */}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                  >
                    ✕
                  </button>
                <div
                  className="bg-transparent rounded-lg p-6 w-full relative"
                  style={{ maxWidth: "75%" }} 
                  onClick={(e) => e.stopPropagation()} 
                >
                  

                  {/* Vidéo */}
                  <video controls autoPlay  className="w-full h-auto rounded-lg">
                    <source src={videoUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas la balise vidéo.
                  </video>
                </div>
              </div>
            )}
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3 tracking-tight">1,500+</div>
                <div className="text-gray-600 font-medium text-lg">Verified Tutors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3 tracking-tight">25k+</div>
                <div className="text-gray-600 font-medium text-lg">Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3 tracking-tight">98%</div>
                <div className="text-gray-600 font-medium text-lg">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3 tracking-tight">50+</div>
                <div className="text-gray-600 font-medium text-lg">Subjects</div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 lg:p-12 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl">
                {/* Browser Bar */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">Scholora Drive</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <div className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wide">My Stats</div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 font-medium">Sessions</span>
                          <span className="text-gray-900 font-bold text-lg">24</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 font-medium">Hours</span>
                          <span className="text-gray-900 font-bold text-lg">48h</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 font-medium">Progress</span>
                          <div className="flex items-center">
                            <span className="text-gray-900 font-bold text-lg mr-3">85%</span>
                            <div className="w-16 h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div className="w-14 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <div className="text-3xl font-bold text-blue-600 mb-2">5.0</div>
                        <div className="text-gray-600 font-medium mb-2">Average Rating</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <div className="text-3xl font-bold text-green-600 mb-2">6.5/9</div>
                        <div className="text-gray-600 font-medium mb-1">IELTS Score</div>
                        <div className="text-xs text-green-600 font-semibold">+1.5 improvement</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                      <div className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Next Session</div>
                      <div className="text-xl font-bold text-gray-900 mb-2">Mathematics with Amira</div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="font-medium">Tomorrow, 2:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">How it works</h2>
            <h3 className="text-3xl font-semibold text-gray-700 mb-6">3 simple steps to start learning</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Set up your goals, get matched to a verified tutor, and start learning with a tailored plan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tell us your goals</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Share your subject, level, and schedule preferences with our team.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get matched</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We recommend the best tutors based on your specific learning needs.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Start learning</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Begin your sessions and track your progress towards your objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team - Featured Tutors */}
      <section id="tutors" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">Our team</h2>
            <h3 className="text-3xl font-semibold text-gray-700 mb-6">Meet our top-rated tutors</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get to know some of our best tutors carefully curated from various Moroccan universities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Tutor 1 - Amira Bennaceur */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              {/* Photo réelle */}
              <div className="mb-6">
                <div className="w-full h-64 rounded-xl mb-4 overflow-hidden">
                  <img 
                    src="/images/tutors/pic.jpg" 
                    alt="Amira Bennaceur - Mathematics Tutor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Amira Bennaceur</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="text-gray-600 font-semibold">4.9</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-blue-600 font-bold text-xl mb-4">Mathematics</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Algebra</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Calculus</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Geometry</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 font-medium mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>95 students</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>12+ years</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl text-blue-600">200 MAD/hour</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  View Profile
                </button>
              </div>
            </div>
            {/* Tutor 2 - Youssef El Mansouri */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              {/* Photo réelle */}
              <div className="mb-6">
                <div className="w-full h-64 rounded-xl mb-4 overflow-hidden">
                  <img 
                    src="/images/tutors/pic.jpg" 
                    alt="Amira Bennaceur - Mathematics Tutor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Youssef El Mansouri</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="text-gray-600 font-semibold">4.8</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-blue-600 font-bold text-xl mb-4">Physics</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Mechanics</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Electricity</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 font-medium mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>78 students</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>8+ years</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl text-blue-600">180 MAD/hour</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  View Profile
                </button>
              </div>
            </div>

            {/* Tutor 3 - Salma Alaoui */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              {/* Photo réelle */}
              <div className="mb-6">
                <div className="w-full h-64 rounded-xl mb-4 overflow-hidden">
                  <img 
                    src="/images/tutors/pic.jpg" 
                    alt="Amira Bennaceur - Mathematics Tutor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Salma Alaoui</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="text-gray-600 font-semibold">5.0</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-blue-600 font-bold text-xl mb-4">Literature</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">French</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Arabic</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Writing</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 font-medium mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>124 students</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>12+ years</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl text-blue-600">220 MAD/hour</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link href="/public/tutors-list" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105">
              Browse all tutors
            </Link>
          </div>
        </div>
      </section>

      {/* What students are learning now */}
      <section id="subjects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">What students are learning now</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { subject: 'English tutors', count: '33,602 teachers', icon: '🇬🇧' },
              { subject: 'Spanish tutors', count: '10,056 teachers', icon: '🇪🇸' },
              { subject: 'French tutors', count: '3,714 teachers', icon: '🇫🇷' },
              { subject: 'German tutors', count: '1,518 teachers', icon: '🇩🇪' },
              { subject: 'Italian tutors', count: '2,542 teachers', icon: '🇮🇹' },
              { subject: 'Chinese tutors', count: '5,253 teachers', icon: '🇨🇳' },
              { subject: 'Arabic tutors', count: '3,651 teachers', icon: '🇲🇦' },
              { subject: 'Japanese tutors', count: '2,902 teachers', icon: '🇯🇵' },
              { subject: 'Portuguese tutors', count: '1,635 teachers', icon: '🇵🇹' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer group">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{item.icon}</span>
                  <span className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{item.subject}</span>
                </div>
                <div className="flex items-center text-gray-600 group-hover:text-blue-600 transition-colors">
                  <span className="font-medium mr-3">{item.count}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="text-blue-600 hover:text-blue-700 font-bold text-lg transition-colors">Show more</button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">Success Stories</h2>
            <h3 className="text-3xl font-semibold text-gray-700 mb-6">Real results from real students</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1 - Oumaima */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">👩‍🎓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Oumaima, Casablanca</h4>
                  <p className="text-gray-600 text-sm">Baccalauréat • Math</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                "My tutor helped me master calculus concepts I struggled with for months. I scored 18/20 in my finals!"
              </p>
              
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            {/* Story 2 - Karim */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">👨‍🎓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Karim, Rabat</h4>
                  <p className="text-gray-600 text-sm">IELTS • English</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                "I achieved a band 7.5 on IELTS after 8 weeks. The personalized plan made all the difference."
              </p>
              
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            {/* Story 3 - Nisrine */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">👩‍💻</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Nisrine, Marrakech</h4>
                  <p className="text-gray-600 text-sm">French • Literature</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                "We focused on writing structure and analysis. My essay grades improved from 12 to 17/20."
              </p>
              
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                Stay up to date
              </span>
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">Get updates from Scholora</h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
              Stay in the loop about the latest expert opportunities and announcements.
            </p>
            
            <div className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="your email address" 
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 text-white placeholder-blue-200 border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-white/30 backdrop-blur-sm font-medium"
                />
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            
            <p className="text-blue-200 text-sm">
              By subscribing to our newsletter, Terms & Privacy
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold text-white">Scholora</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Connecting students across Morocco with expert tutors for academic excellence.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-6 text-lg">Explore</h3>
              <ul className="space-y-3">
                <li><a href="#tutors" className="text-gray-400 hover:text-white transition-colors font-medium">Featured Tutors</a></li>
                <li><a href="#subjects" className="text-gray-400 hover:text-white transition-colors font-medium">Popular Subjects</a></li>
                <li><a href="#success-stories" className="text-gray-400 hover:text-white transition-colors font-medium">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-6 text-lg">Company</h3>
              <ul className="space-y-3">
                <li><a href="/public/about" className="text-gray-400 hover:text-white transition-colors font-medium">About</a></li>
                <li><a href="/public/contact" className="text-gray-400 hover:text-white transition-colors font-medium">Contact</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors font-medium">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-6 text-lg">Legal</h3>
              <ul className="space-y-3">
                <li><a href="/legal/terms" className="text-gray-400 hover:text-white transition-colors font-medium">Terms</a></li>
                <li><a href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors font-medium">Privacy</a></li>
                <li><a href="/legal/cookies" className="text-gray-400 hover:text-white transition-colors font-medium">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-gray-400 font-medium">© 2025 Scholora. All rights reserved. Made with in Morocco</p>
          </div>
        </div>
      </footer>
    </div>
  )
  
}