"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Empowering learners to <br /> achieve their dreams
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Our mission is simple: connect learners with expert educators and
            help them go further than they thought possible.
          </p>

          <Link
            href="/"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How Scholora Powers Learning
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-3">Expert Educators</h3>
              <p className="text-gray-600">
                Learn from experienced educators who bring real-world expertise
                and passion to every lesson.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Personalized Learning
              </h3>
              <p className="text-gray-600">
                Our platform adapts to your pace, style, and goals to create a
                tailored learning experience.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Flexible & Accessible
              </h3>
              <p className="text-gray-600">
                Learn anytime, anywhere with flexible scheduling and affordable
                pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-blue-600 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <h3 className="text-4xl font-extrabold text-white">10K+</h3>
              <p className="text-blue-100 mt-2">Active Learners</p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-white">100+</h3>
              <p className="text-blue-100 mt-2">Expert Educators</p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-white">20+</h3>
              <p className="text-blue-100 mt-2">Subjects</p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-white">5</h3>
              <p className="text-blue-100 mt-2">Countries</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            The Story Behind Scholora
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Scholora was created from a problem personally experienced as a
              student: accessing evening support meant long commutes and lost
              time.
            </p>

            <p>
              In Morocco, “Swaya3” is deeply rooted in our culture. Parents
              prioritize supporting lessons, but the system hasn’t evolved to
              match modern needs.
            </p>

            <p className="font-medium">
              Scholora modernizes this heritage.
            </p>

            <p>
              We provide a smart, structured learning support platform powered
              by technology and verified tutors — designed to improve student
              performance while giving parents clarity and trust.
            </p>
          </div>
        </div>
      </section>

      
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Leadership Team
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {["CEO", "CTO", "VP of Education", "VP of Growth"].map(
              (role, i) => (
                <div
                  key={i}
                  className="text-center p-6 border rounded-lg bg-white"
                >
                  <h3 className="text-xl font-semibold mb-1 text-gray-600">Unknown</h3>
                  <p className="text-blue-600 font-medium mb-3">{role}</p>
                  <p className="text-gray-600">
                    Leadership focused on innovation and educational excellence.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
            What We Value
          </h2>

          <div className="grid sm:grid-cols-2 gap-8 text-gray-600">
            {[
              "Human Connection",
              "Excellence",
              "Accessibility",
              "Innovation",
            ].map((value, i) => (
              <div
                key={i}
                className="text-center p-6 border rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-3">{value}</h3>
                <p className="text-gray-600">
                  We are committed to delivering meaningful and impactful
                  learning experiences.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="bg-blue-50 py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Join thousands learning with Scholora
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Start your learning journey today and transform your future.
          </p>

          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Start Learning Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
