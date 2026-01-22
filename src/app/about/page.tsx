"use client";

import React from 'react';
import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function About(){
    return(

        <div className="min-h-screen bg-gray-50" >
            <Header/>
            <div>
                 <h1 className="text-5xl text-centre font-bold text-gray-900 mx-62 mt-11 ">Empowering learners to <br/> 
                 achieve their dreams</h1>
                 <p className='text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed mt-6' >
                    our mission is simple: connect learners with exper educators, and help them <br />
                 go further than they though possible.
                 </p>
                 <Link
                      href="/"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm mx-24 mt-24">
                      Get Started Today
                 </Link>
                 
     { /* paraghraphe */}
    <div className="flex flex-col gap-6 mt-40 mx-60">
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
        How Scholora Powers Learnin
      </h2>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Expert Educators
        </h3>
        <p className="text-gray-900">
          Learn from experienced educators who are passionate about helping you
          succeed. Our tutors bring real-world expertise to every lesson.
        </p>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Personalized Learning
        </h3>
        <p className="text-gray-900">
          Every student is unique. Our platform adapts to your pace, style, and
          goals, creating a learning experience tailored just for you.
        </p>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Flexible &amp; Accessible
        </h3>
        <p className="text-gray-900">
          Learn anytime, anywhere. Our flexible scheduling and affordable pricing
          make quality education accessible to everyone.
        </p>
      </div>
      <span>
        <br />
        <br />
      </span>
      
       {/* stats */}
         <section className="bg-blue-600 py-20 mt-auto" >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          
          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
              10K+
            </h3>
            <p className="text-blue-100 text-lg">
              Active Learners
            </p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
              100+
            </h3>
            <p className="text-blue-100 text-lg">
              Expert Educators
            </p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
              20+
            </h3>
            <p className="text-blue-100 text-lg">
              Subjects
            </p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
              5
            </h3>
            <p className="text-blue-100 text-lg">
              Countries
            </p>
          </div>

        </div>
      </div>
    </section>


    </div>
    
     <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        The story behind Scholora
      </h2>

      <p className="text-gray-700 leading-relaxed space-y-4">
        <span className="block mb-2">
          Scholora was created from a problem I personally experienced.
        </span>

        <span className="block mb-4">
            Scholora was created from a problem I personally experienced.
          As a student, accessing evening support lessons often meant losing
          time, managing long commutes, and sacrificing balance. Years later,
          it became clear that this challenge remains common for many Moroccan
          students who need academic support but lack a solution adapted to
          their daily reality.
        </span>

        <span className="block mb-4">
          In Morocco, Swaya3 is deeply rooted in our culture. Parents prioritize
          supporting lessons because they see education as their children’s
          path to success and stability. However, while the value is strong,
          the system itself has not evolved.
        </span>

        <span className="block mb-4 font-medium">
          Scholora modernizes this heritage.
        </span>

        <span className="block mb-4">
          We provide a smart, structured learning support platform powered by
          technology and verified tutors—designed to improve student
          performance while giving parents clarity, trust, and peace of mind.
        </span>

        <span className="block ">
          Scholora is the evolution of Swaya3 for a new generation.
        </span>
      </p>
    </section>

     <section className="max-w-5xl mx-auto px-4 py-12">
      {/* Section Title */}
      <h2 className="text-3xl font-bold  mb-10 text-gray-900">
        Our Leadership Team
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Paragraph 1 */}
        <div className="text-center p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-1 text-gray-900">Unknown</h3>
          <p className="text-blue-600 font-medium mb-3">
            Co-Founder &amp; CEO
          </p>
          <p className="text-gray-900">
            Education innovator with 15+ years of experience in EdTech.
          </p>
        </div>

        {/* Paragraph 2 */}
        <div className="text-center p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-1 text-gray-900">Unknown</h3>
          <p className="text-blue-600 font-medium mb-3">
            Co-Founder &amp; CTO
          </p>
          <p className="text-gray-900">
            Tech leader passionate about building scalable learning platforms.
          </p>
        </div>

        {/* Paragraph 3 */}
        <div className="text-center p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-1 text-gray-900">Unknown</h3>
          <p className="text-blue-600 font-medium mb-3">
            VP of Education
          </p>
          <p className="text-gray-900">
            Educator at heart, dedicated to quality tutoring standards.
          </p>
        </div>

        {/* Paragraph 4 */}
        <div className="text-center p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-1 text-gray-900">Unknown</h3>
          <p className="text-blue-600 font-medium mb-3">
            VP of Growth
          </p>
          <p className="text-gray-900">
            Growth strategist focused on expanding access to quality education.
          </p>
        </div>
      </div>
    </section>
<br />
<br />
<br />
    <section className="max-w-5xl mx-auto px-4 py-12">
      {/* Section Title */}
      <h2 className="text-3xl font-bold  mb-10 text-gray-900">
        What We Value
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Paragraph 1 */}
        <div className="text-center p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-1 text-gray-900">Human Connection</h3>
          
          <p className="text-gray-900">
            Learning happens best through meaningful interactions between educators and learners.
          </p>
        </div>

        {/* Paragraph 2 */}
        <div className="text-center p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-1 text-gray-900">Excellence</h3>
          
          <p className="text-gray-900">
           We maintain the highest standards for our educators and learning outcomes.

          </p>
        </div>

        {/* Paragraph 3 */}
        <div className="text-center p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-1 text-gray-900">Accessibility</h3>
          
          <p className="text-gray-900">
           Quality education should be affordable and available to everyone, everywhere.
          </p>
        </div>

        {/* Paragraph 4 */}
        <div className="text-center p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-1 text-gray-900">Innovation</h3>
        
          <p className="text-gray-900">
            We continuously improve our platform to serve learners better.
          </p>
        </div>
      </div>
    </section>

     <section className="bg-blue-50 py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Join millions learning with Scholora
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Start your learning journey today and discover how personalized
          education can transform your future.
        </p>

        <Link href="/"
             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm">
             Start Learning Today
                 </Link>
      </div>
    </section>
            </div>
            <Footer></Footer>
            
        </div>

    );
}
