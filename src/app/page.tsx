'use client';
import Link from 'next/link'
import Image from 'next/image'
import { Star, Users, BookOpen, Award, ChevronRight, Play, User, Calendar, Clock } from 'lucide-react'
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [currentSlide, setCurrentSlide] = useState(0);
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");
   const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

   // Countdown Timer State
   const [timeLeft, setTimeLeft] = useState({
     days: 89,
     hours: 14,
     minutes: 27,
     seconds: 26
   });

   // Auto-scroll effect pour Success Stories
   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentSlide((prev) => (prev + 1) % 9);
     }, 3000);

     return () => clearInterval(interval);
   }, []);

   // Countdown Timer Effect
   useEffect(() => {
     const timer = setInterval(() => {
       setTimeLeft(prevTime => {
         let { days, hours, minutes, seconds } = prevTime;
         
         if (seconds > 0) {
           seconds--;
         } else if (minutes > 0) {
           minutes--;
           seconds = 59;
         } else if (hours > 0) {
           hours--;
           minutes = 59;
           seconds = 59;
         } else if (days > 0) {
           days--;
           hours = 23;
           minutes = 59;
           seconds = 59;
         }
         
         return { days, hours, minutes, seconds };
       });
     }, 1000);

     return () => clearInterval(timer);
   }, []);

    const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/newsletters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage("Subscribed successfully!");
        setEmail("");
      } else {
        const data = await res.json();
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Network error.");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* Countdown Timer Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                ⚡ Neural Networks Activating ⚡
              </h3>
              <p className="text-base text-gray-600">
                Until the learning revolution begins
              </p>
            </div>
            
            <div className="flex justify-center gap-3 mb-8">
              <div className="bg-gray-900 text-white rounded-lg px-4 py-3 min-w-[80px] text-center">
                <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="text-xs uppercase text-gray-300">DAYS</div>
              </div>
              
              <div className="bg-gray-900 text-white rounded-lg px-4 py-3 min-w-[80px] text-center">
                <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs uppercase text-gray-300">HOURS</div>
              </div>
              
              <div className="bg-gray-900 text-white rounded-lg px-4 py-3 min-w-[80px] text-center">
                <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs uppercase text-gray-300">MIN</div>
              </div>
              
              <div className="bg-gray-900 text-white rounded-lg px-4 py-3 min-w-[80px] text-center">
                <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs uppercase text-gray-300">SEC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                🚀 Revolutionary Learning Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Where <span className="text-blue-500">Learning</span> Meets Possibility
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with world-class tutors across Morocco. Personalized learning experiences that adapt to your pace, schedule, and goals. Join thousands of successful learners who are already transforming their futures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 items-center">
              <Link href="/auth/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200">
                Get Early Access
              </Link>
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-gray-600" />
                <input 
                  type="email" 
                  placeholder="Entrez votre email" 
                  className="border border-gray-300 text-gray-700 font-medium px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[220px] text-sm"
                />
              </div>
            </div>

            {/* Modal for Video Demo */}
            {isModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} 
                onClick={() => setIsModalOpen(false)} 
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold"
                >
                  ✕
                </button>
                <div
                  className="bg-transparent rounded-lg p-6 w-full relative"
                  style={{ maxWidth: "75%" }} 
                  onClick={(e) => e.stopPropagation()} 
                >
                  <video controls autoPlay className="w-full h-auto rounded-lg">
                    <source src={videoUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas la balise vidéo.
                  </video>
                </div>
              </div>
            )}
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">1,500+</div>
                <div className="text-sm text-gray-600">Students</div>
                <div className="text-xs text-gray-500">Online Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">25k+</div>
                <div className="text-sm text-gray-600">Courses</div>
                <div className="text-xs text-gray-500">Available courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-xs text-gray-500">Success rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
                <div className="text-sm text-gray-600">Years</div>
                <div className="text-xs text-gray-500">Expert experience</div>
              </div>
            </div>

            {/* Additional Stats Row */}
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto mb-16">
              <div className="bg-blue-100 rounded-lg p-4 text-center">
                <div className="text-blue-600 text-2xl font-bold">3166</div>
                <div className="text-xs text-gray-600">Mind Being Replaced</div>
              </div>
              <div className="bg-purple-100 rounded-lg p-4 text-center">
                <div className="text-purple-600 text-2xl font-bold">150</div>
                <div className="text-xs text-gray-600">Mental Rewarding Testing</div>
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

      {/* Meet our world-class experts */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                Coming Soon
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet our world-class experts</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're assembling an extraordinary team of educators, innovators, and subject matter experts. Their identities will be revealed when we launch - but their expertise is already legendary.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Expert 1 - AI & Machine Learning */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border-4 border-purple-400 flex items-center justify-center relative">
                  <span className="text-2xl text-gray-400">?</span>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI & Machine Learning Expert</h3>
              <div className="text-sm text-gray-600 mb-1">15+ years experience</div>
              <div className="text-sm text-blue-600 font-medium mb-4">Former Google AI Researcher</div>
              
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-1 text-sm text-gray-600">(5.0)</span>
              </div>
              
              <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-500 bg-gray-50 text-sm">
                <span className="mr-2">🔒</span>
                Reveal Identity
                <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">Soon</span>
              </button>
            </div>

            {/* Expert 2 - Advanced Mathematics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border-4 border-cyan-400 flex items-center justify-center relative">
                  <span className="text-2xl text-gray-400">?</span>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">Advanced Mathematics Expert</h3>
              <div className="text-sm text-gray-600 mb-1">12+ years experience</div>
              <div className="text-sm text-blue-600 font-medium mb-4">MIT Mathematics Professor</div>
              
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-1 text-sm text-gray-600">(4.9)</span>
              </div>
              
              <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-500 bg-gray-50 text-sm">
                <span className="mr-2">🔒</span>
                Reveal Identity
                <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">Soon</span>
              </button>
            </div>

            {/* Expert 3 - Language Mastery */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border-4 border-pink-400 flex items-center justify-center relative">
                  <span className="text-2xl text-gray-400">?</span>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">Language Mastery Expert</h3>
              <div className="text-sm text-gray-600 mb-1">20+ years experience</div>
              <div className="text-sm text-blue-600 font-medium mb-4">Polyglot & UN Translator</div>
              
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-1 text-sm text-gray-600">(5.0)</span>
              </div>
              
              <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-500 bg-gray-50 text-sm">
                <span className="mr-2">🔒</span>
                Reveal Identity
                <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">Soon</span>
              </button>
            </div>
          </div>

          {/* 47+ More Experts */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">47+ More Experts</div>
            <p className="text-sm text-gray-600 mb-2">We're onboarding world-class educators across every subject imaginable.</p>
            <p className="text-sm text-gray-600">Their profiles unlock when we launch.</p>
          </div>
        </div>
      </section>

      {/* Whispers about our experts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                What People Are Saying
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Whispers about our experts</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Word travels fast in academic circles. Here's what industry leaders are quietly saying about the team we're assembling.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Row 1 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">?</span>
                </div>
                <div>
                  <blockquote className="text-sm text-gray-700 italic mb-2">
                    "I heard they recruited someone from OpenAI at a crazy level. Absolutely brilliant."
                  </blockquote>
                  <div className="text-xs font-semibold text-gray-900">Industry Insider</div>
                  <div className="text-xs text-gray-500">Former Yahoo/Google</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">?</span>
                </div>
                <div>
                  <blockquote className="text-sm text-gray-700 italic mb-2">
                    "The mathematics expert they recruited? Former MIT that recruited us."
                  </blockquote>
                  <div className="text-xs font-semibold text-gray-900">Academic Colleague</div>
                  <div className="text-xs text-gray-500">XYZ Academy</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">?</span>
                </div>
                <div>
                  <blockquote className="text-sm text-gray-700 italic mb-2">
                    "Their language specialist speaks 12 languages fluently. We've never seen anything like it."
                  </blockquote>
                  <div className="text-xs font-semibold text-gray-900">Industry Insider</div>
                  <div className="text-xs text-gray-500">UN Translation</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">?</span>
                </div>
                <div>
                  <blockquote className="text-sm text-gray-700 italic mb-2">
                    "The physics expert they recruited? Former NASA. That's all I can say publicly."
                  </blockquote>
                  <div className="text-xs font-semibold text-gray-900">Academic Colleague</div>
                  <div className="text-xs text-gray-500">Research Institution</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">?</span>
                </div>
                <div>
                  <blockquote className="text-sm text-gray-700 italic mb-2">
                    "Their computer science expert? Solved. His platform and big top-level colleagues."
                  </blockquote>
                  <div className="text-xs font-semibold text-gray-900">Valley Insider</div>
                  <div className="text-xs text-gray-500">Big Tech Senior</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold">?</span>
                </div>
                <div>
                  <blockquote className="text-sm text-gray-700 italic mb-2">
                    "I've been in education for 30 years. This team they're building is unprecedented."
                  </blockquote>
                  <div className="text-xs font-semibold text-gray-900">Veteran Educator</div>
                  <div className="text-xs text-gray-500">Harvard Business</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">"These are just whispers. Wait until you see what they can actually do."</p>
            <p className="text-sm font-medium text-blue-600">Pre-expert profiles unlock at launch</p>
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="rounded-3xl p-8" style={{ backgroundColor: '#0066ab' }}>
            <div className="text-center mb-12">
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm border border-white/30">
                  Platform Preview
                </span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Something Revolutionary is Coming</h2>
              <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
                We're crafting an AI-powered learning experience that will redefine education. Get ready for personalized tutoring like never before.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gray-100 px-6 py-4 flex items-center">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="bg-white rounded-lg px-4 py-2 flex-1 text-gray-400 text-sm">
                    scholora.ma/learning-dashboard
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-4 gap-6 mb-12">
                    <div className="bg-blue-100 rounded-2xl p-8 h-32">
                      <div className="w-full h-full bg-blue-200 rounded-xl"></div>
                    </div>
                    <div className="bg-green-100 rounded-2xl p-8 h-32">
                      <div className="w-full h-full bg-green-200 rounded-xl"></div>
                    </div>
                    <div className="bg-purple-100 rounded-2xl p-8 h-32">
                      <div className="w-full h-full bg-purple-200 rounded-xl"></div>
                    </div>
                    <div className="bg-orange-100 rounded-2xl p-8 h-32">
                      <div className="w-full h-full bg-orange-200 rounded-xl"></div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What students will be learning */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                Coming Soon
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What students will be learning</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're building something extraordinary. Here's a glimpse of the subjects and experiences that will be available when we launch.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { subject: 'English tutors', count: '1000+ tutors', icon: '🇺🇸' },
              { subject: 'Spanish tutors', count: '900+ tutors', icon: '🇪🇸' },
              { subject: 'French tutors', count: '800+ tutors', icon: '🇫🇷' },
              { subject: 'German tutors', count: '700+ tutors', icon: '🇩🇪' },
              { subject: 'Italian tutors', count: '600+ tutors', icon: '🇮🇹' },
              { subject: 'Chinese tutors', count: '500+ tutors', icon: '🇨🇳' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <span className="font-medium text-gray-900">{item.subject}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {item.count}
                </div>
              </div>
            ))}
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
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ 
                  transform: `translateX(-${(currentSlide * 100) / 3}%)`,
                }}
              >
                {[
                  {
                    name: "Oumaima, Casablanca",
                    subject: "Baccalauréat • Math",
                    quote: "My tutor helped me master calculus concepts I struggled with for months. I scored 18/20 in my finals!",
                    avatar: "👩‍🎓",
                    bgColor: "bg-blue-100"
                  },
                  {
                    name: "Karim, Rabat",
                    subject: "IELTS • English",
                    quote: "I achieved a band 7.5 on IELTS after 8 weeks. The personalized plan made all the difference.",
                    avatar: "👨‍🎓",
                    bgColor: "bg-green-100"
                  },
                  {
                    name: "Nisrine, Marrakech",
                    subject: "French • Literature",
                    quote: "We focused on writing structure and analysis. My essay grades improved from 12 to 17/20.",
                    avatar: "👩‍💻",
                    bgColor: "bg-purple-100"
                  },
                  {
                    name: "Ahmed, Fes",
                    subject: "Physics • Bac",
                    quote: "The interactive sessions helped me understand complex physics concepts. Got 19/20 in physics!",
                    avatar: "👨‍🔬",
                    bgColor: "bg-orange-100"
                  },
                  {
                    name: "Fatima, Meknes",
                    subject: "Spanish • Language",
                    quote: "From beginner to conversational in 6 months. Now I'm confident speaking Spanish fluently.",
                    avatar: "👩‍🎨",
                    bgColor: "bg-pink-100"
                  },
                  {
                    name: "Youssef, Tangier",
                    subject: "Economics • University",
                    quote: "Preparation for my economics exam was perfect. I passed with distinction thanks to my tutor.",
                    avatar: "👨‍💼",
                    bgColor: "bg-indigo-100"
                  },
                  {
                    name: "Salma, Agadir",
                    subject: "Chemistry • Medical School",
                    quote: "Organic chemistry became clear with my tutor's explanations. Aced my medical school entrance exam!",
                    avatar: "👩‍⚕️",
                    bgColor: "bg-teal-100"
                  },
                  {
                    name: "Hamza, Oujda",
                    subject: "Programming • Computer Science",
                    quote: "Learning Python and algorithms was challenging until I found the right tutor. Now I'm coding confidently!",
                    avatar: "👨‍💻",
                    bgColor: "bg-yellow-100"
                  },
                  {
                    name: "Zineb, Kenitra",
                    subject: "German • Language Certification",
                    quote: "Achieved B2 level in German in just 8 months. My tutor's systematic approach was incredibly effective.",
                    avatar: "👩‍🏫",
                    bgColor: "bg-red-100"
                  }
                ].map((story, index) => (
                  <div key={index} className="w-1/3 flex-shrink-0 px-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 ${story.bgColor} rounded-full flex items-center justify-center mr-4`}>
                          <span className="text-2xl">{story.avatar}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{story.name}</h4>
                          <p className="text-gray-600 text-sm">{story.subject}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        "{story.quote}"
                      </p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-8 text-center shadow-xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                Stay up to date
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Get updates from Scholora</h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Stay in the loop about the latest expert opportunities and announcements.
            </p>
            
            <div className="max-w-md mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
                />
                <button 
                  onClick={handleSubscribe}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              {message && (
                <p className="mt-3 text-sm text-white">
                  {message}
                </p>
              )}
            </div>
            
            <p className="text-blue-200 text-sm">
              By subscribing to our newsletter, Terms & Privacy
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}