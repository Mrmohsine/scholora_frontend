'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const BecomeTutorPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    "What kind of tutors does Scholora look for?",
    "What subject can I teach?", 
    "How do I become an online tutor at Scholora?",
    "How can I get my profile approved quickly?",
    "Why should I teach on Scholora?",
    "What computer equipment do I need to teach on Scholora?",
    "Is it free to create a tutor profile on Scholora?",
    "How much can I earn on Scholora?"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Make a living by teaching the largest community of learners worldwide
              </h1>
              
              {/* Steps */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Sign up</h3>
                    <p className="text-gray-600 text-lg">to create your tutor profile</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Get approved</h3>
                    <p className="text-gray-600 text-lg">by our team in 3 business days</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Start earning</h3>
                    <p className="text-gray-600 text-lg">by teaching students all over the world</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg">
                Create a tutor profile now
              </button>
            </div>
            
            {/* Right Image */}
            <div className="relative">
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="relative">
                  <Image
                    src="/images/main-asset.ba45c80b.jpg"
                    alt="Happy tutor with laptop"
                    width={600}
                    height={500}
                    className="rounded-xl"
                  />
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Set your own rate</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Choose your hourly rate and change it anytime. On average, English tutors charge $15-25 per hour
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Teach anytime, anywhere</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Decide when and how many hours you want to teach. No minimum time commitment or fixed schedule. Be your own boss!
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Grow professionally</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Once you sign up and complete your application, you can be approved and start teaching in as little as three days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Community Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Teach students from over 180 countries
              </h2>
              <p className="text-gray-600 text-xl leading-relaxed">
                Scholora tutors teach 800,000+ students globally. Join us and you'll have everything you need to teach successfully.
              </p>
              
              <div className="space-y-4">
                {[
                  "Steady stream of new students",
                  "Smart calendar", 
                  "Interactive classroom",
                  "Convenient payment methods",
                  "Professional development webinars",
                  "Supportive tutor community"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg">
                Create a tutor profile now
              </button>
            </div>
            
            {/* Right Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Image
                    src="images/benefits-asset.407a9786.jpg"
                    alt="Online tutoring session"
                    width={280}
                    height={200}
                    className="rounded-xl shadow-lg"
                  />
                  <Image
                    src="images/edut-1.jpg"
                    alt="Student learning"
                    width={280}
                    height={200}
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <div className="mt-8">
                  <Image
                    src="images/edut-2.jpg"
                    alt="Tutor teaching"
                    width={280}
                    height={300}
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-3xl p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <blockquote className="text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-8">
                  "Scholora allowed me to make a living without leaving home!"
                </blockquote>
                <div className="space-y-2 mb-8">
                  <p className="text-xl font-semibold text-gray-900">Krista A.</p>
                  <p className="text-gray-600 text-lg">English tutor</p>
                </div>
                <button className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg">
                  Create a tutor profile now
                </button>
              </div>
              
              <div className="order-1 lg:order-2">
                <Image
                  src="/images/quote-asset.1c5d720d.jpg"
                  alt="Krista A. - English tutor"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-xl mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Frequently asked questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((question, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900">{question}</span>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-500 transform transition-transform flex-shrink-0 ml-4 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6 text-gray-600 text-lg">
                    <p>This is where the answer content would appear for the selected FAQ item.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 text-gray-600 text-lg">
            <p>
              Have more questions?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                Check our Help center
              </a>{' '}
              or{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                contact our support team
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-gradient-to-r from-teal-400 to-blue-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-12 lg:p-16">
                <Image
                  src="/images/cta-asset.41dddb34.jpg"
                  alt="Get paid to teach online"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="bg-teal-400 p-12 lg:p-16 h-full flex flex-col justify-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
                  Get paid to teach online
                </h2>
                <p className="text-black/80 text-xl mb-8 leading-relaxed">
                  Connect with thousands of learners around the world and teach from your living room
                </p>
                <button className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg inline-block">
                  Create a tutor profile now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BecomeTutorPage;