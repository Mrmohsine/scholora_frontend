'use client';
import Link from 'next/link'
import { Star, Users, BookOpen, Award, Play } from 'lucide-react'
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { API_URL } from '@/lib/config';

export default function HomePage() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

   const [timeLeft, setTimeLeft] = useState({
     days: 0,
     hours: 0,
     minutes: 0,
     seconds: 0
   });

   useEffect(() => {
     const calculateTimeLeft = () => {
       const targetDate = new Date('2025-11-07T00:00:00');
       const now = new Date();
       const difference = targetDate.getTime() - now.getTime();

       if (difference > 0) {
         return {
           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
           minutes: Math.floor((difference / 1000 / 60) % 60),
           seconds: Math.floor((difference / 1000) % 60)
         };
       }
       return { days: 0, hours: 0, minutes: 0, seconds: 0 };
     };

     setTimeLeft(calculateTimeLeft());

     const timer = setInterval(() => {
       setTimeLeft(calculateTimeLeft());
     }, 1000);

     return () => clearInterval(timer);
   }, []);

   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentTestimonialSlide((prev) => (prev + 1) % 6);
     }, 4000);

     return () => clearInterval(interval);
   }, []);


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
      setError("");

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletters`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        console.log('Response:', data); // DEBUG

        if (res.ok) {
          setMessage("Email added successfully!");
          setEmail("");
        } else {
          // Check plusieurs formats possibles
          const errorMsg = data.message || data.error || '';
          const emailError = data.errors?.email?.[0] || '';
          
          if (errorMsg.toLowerCase().includes('already') || 
              errorMsg.toLowerCase().includes('taken') ||
              errorMsg.toLowerCase().includes('existe') ||
              emailError.toLowerCase().includes('already') ||
              emailError.toLowerCase().includes('taken')) {
            setError("This email is already subscribed!");
          } else {
            setError(errorMsg || emailError || "Error occurred");
          }
        }
      } catch (error) {
        console.error(error);
        setError("Connection error");
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                🇲🇦 Inspired by the Swaye3 generation
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              🌙 Born in the Glow of <span className="text-blue-500">Moroccan</span> Evenings.
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              What began as evening lessons in every Moroccan   
                                   neighborhood now thrives online. Scholora connects students 
                                   with expert tutors who understand our culture, struggles, and 
                                   dreams. This is Morocco’s new way to learn — smarter, prouder, 
                                   and limitless.

            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 items-center">
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50">
                  {loading ? 'Sending...' : 'Join The GenScholora'}
                </button>
              </form>
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-gray-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre email"
                    required
                    disabled={loading}
                    className="border border-gray-300 text-gray-700 font-medium px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[220px] text-sm"
                  />
                </div>
                {message && <p className="mt-3 text-sm text-green-400 font-medium">{message}</p>}
                {error && <p className="mt-3 text-sm text-red-400 font-medium">{error}</p>}
              </form>
            </div>

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
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">Primary</div>
                <div className="text-sm text-gray-600">6y → 11y</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">Middle School</div>
                <div className="text-sm text-gray-600">12y → 14y</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">High School</div>
                <div className="text-sm text-gray-600">15y → 17y</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">University</div>
                <div className="text-sm text-gray-600">18y → (adult)</div>
              </div>
            </div>
           
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-blue-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
        ⚡ Simple Process
      </div>
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
        Start Learning in <span className="text-blue-600">3 Steps</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        From signup to your first session in minutes. We make quality education accessible to everyone.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
      <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -z-10"></div>
      
      <div className="relative group">
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-lg">
              01
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Choose Your Academic</h3>
        </div>
      </div>
      
      <div className="relative group">
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600 text-lg">
              02
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Match with a Tutor</h3>
        </div>
      </div>
      
      <div className="relative group">
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600 text-lg">
              03
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center  mb-4">Access Your E-class</h3>
        </div>
      </div>
    </div>
  </div>
</section>

      <section id="tutors" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                Coming Soon
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Morocco’s Premier Tutors</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're assembling an extraordinary team of educators, innovators, and subject matter experts. Their identities will be revealed when we launch - but their expertise is already legendary.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
             <Link href="/tutors">
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border-4 border-purple-400 flex items-center justify-center relative">
                    <span className="text-2xl text-gray-400">?</span>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Physics Tutor</h3>
                <div className="text-sm text-gray-600 mb-1"><b>Level:</b> 2BAC</div>
                <div className="text-sm text-blue-600 font-medium mb-4">PhD Research</div>
                
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
             </Link>
             <Link href="/tutors">
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border-4 border-cyan-400 flex items-center justify-center relative">
                    <span className="text-2xl text-gray-400">?</span>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Information Technology Tutor</h3>
                <div className="text-sm text-gray-600 mb-1"><b>Level:</b> University Preparation</div>
                <div className="text-sm text-blue-600 font-medium mb-4">ENSET Professor</div>
                
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
             </Link>
             <Link href="/tutors">
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border-4 border-pink-400 flex items-center justify-center relative">
                    <span className="text-2xl text-gray-400">?</span>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Economics Tutor</h3>
                <div className="text-sm text-gray-600 mb-1"><b>Level: </b>2BAC</div>
                <div className="text-sm text-blue-600 font-medium mb-4">ENCG Master Commerce International</div>
                
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
             </Link>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">47+ More Experts</div>
            <p className="text-sm text-gray-600 mb-2">We're onboarding world-class educators across every subject imaginable.</p>
            <p className="text-sm text-gray-600">Their profiles unlock when we launch.</p>
          </div>
        </div>
      </section>

      <section id="success-stories" className="py-16 bg-gray-50">
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
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ 
                  transform: `translateX(-${(currentTestimonialSlide * 100) / 3}%)`,
                }}
              >
                {[
                    {
                      quote: "Vous êtes le meilleur Monsieur, grâce à vous j'ai repris goût au développement",
                      name: "Student",
                      role: "Computer Science",
                      color: "bg-red-500"

                    },
                    {
                      quote: "J'ai eu un 20/20 en économie générale grâce à...",
                      name: "Student",
                      role: "2BAC Student Economy",
                      color: "bg-orange-500"
                    },
                    {
                      quote: "Je confirme 20 / 20 en contrôle continu et national grâce à Dieu et prof ....",
                      name: "Student",
                      role: "2BAC Physic",
                      color: "bg-blue-500"
                    },
                    {
                      quote: "Vous êtes le meilleur Monsieur, grâce à vous j'ai repris goût au développement",
                      name: "Student",
                      role: "Computer Science",
                      color: "bg-red-500"

                    },
                    {
                      quote: "J'ai eu un 20/20 en économie générale grâce à...",
                      name: "Student",
                      role: "2BAC Student Economy",
                      color: "bg-orange-500"
                    },
                    {
                      quote: "Je confirme 20 / 20 en contrôle continu et national grâce à Dieu et prof ....",
                      name: "Student",
                      role: "2BAC Physic",
                      color: "bg-blue-500"
                    },
                ].map((testimonial, index) => (
                  <div key={index} className="w-1/3 flex-shrink-0 px-4">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start mb-4">
                        <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                          <span className="text-white font-bold">?</span>
                        </div>
                        <div>
                          <blockquote className="text-sm text-gray-700 italic mb-2">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="text-xs font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-xs text-gray-500">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonialSlide 
                      ? 'bg-orange-600 scale-125' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-2">"These are just whispers. Wait until you see what they can actually do."</p>
            <p className="text-sm font-medium text-blue-600">Pre-expert profiles unlock at launch</p>
          </div>
        </div>
      </section>

      <section id="subjects" className="py-16 bg-gray-50">
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
              { subject: 'Primary Curriculum', count: 'Coming Soon'},
              { subject: 'Preparatory Curriculum', count: 'Coming Soon' },
              { subject: 'Secondary Curriculum', count: 'Coming Soon' },
              { subject: 'University Curriculum', count: 'Coming Soon' },
              { subject: 'Language Learning Curriculum', count: 'Coming Soon' },
              { subject: 'Programming Curriculum', count: 'Coming Soon'},
              { subject: 'SAT, IELTS,TOEFL,TCF Preparation Curriculum', count: 'Coming Soon' },
              { subject: 'Personal Development Curriculum', count: 'Coming Soon' },
              { subject: 'Entrepreneurship & Innovation Curriculum', count: 'Coming Soon' },

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

      <section id="newsletter" className="py-16">
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
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 whitespace-nowrap disabled:opacity-50">
                  {loading ? 'Sending...' : 'Subscribe'}
                </button>
              </div>
                {message && <p className="mt-3 text-sm text-green-400 font-medium">{message}</p>}
                {error && <p className="mt-3 text-sm text-red-400 font-medium">{error}</p>}
            </form>

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