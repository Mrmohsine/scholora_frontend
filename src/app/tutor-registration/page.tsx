'use client';

import { useState } from 'react';
import { ChevronDown, X, Plus, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ModernTutorForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    subject: '',
    languages: [{ language: '', level: '' }],
    phone: '',
    isOver18: false,
  });

  const steps = [
    { id: 1, name: 'About' },
    { id: 2, name: 'Photo' },
    { id: 3, name: 'Certification' },
    { id: 4, name: 'Education' },
    { id: 5, name: 'Description' },
    { id: 6, name: 'Video' },
    { id: 7, name: 'Availability' },
    { id: 8, name: 'Pricing' },
  ];

  const countries = [
    'Morocco', 'France', 'Spain', 'Germany', 'Italy', 'UK', 'USA', 'Canada',
    'Australia', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Egypt'
  ];

  const subjects = [
    'English', 'French', 'Spanish', 'German', 'Arabic', 'Chinese',
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'
  ];

  const languageOptions = [
    'English', 'French', 'Spanish', 'German', 'Arabic', 'Chinese',
    'Italian', 'Portuguese', 'Russian', 'Japanese', 'Korean'
  ];

  const levels = ['Native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1'];

  const nextStep = () => {
    if (currentStep < 8) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { language: '', level: '' }],
    });
  };

  const removeLanguage = (index) => {
    const newLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: newLanguages });
  };

  const updateLanguage = (index, field, value) => {
    const newLanguages = [...formData.languages];
    newLanguages[index][field] = value;
    setFormData({ ...formData, languages: newLanguages });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Create your tutor profile</h2>
            <div className="text-sm text-gray-500">
              {Math.round((currentStep / steps.length) * 100)}% complete
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                    step.id < currentStep 
                      ? 'bg-green-500 text-white' 
                      : step.id === currentStep 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }`}>
                    {step.id < currentStep ? <Check className="w-6 h-6" /> : step.id}
                  </div>
                  <span className={`text-xs mt-2 font-medium transition-colors ${
                    step.id === currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-gray-300 mx-4 mt-[-20px]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Step Content */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Tell us about yourself</h3>
                  <p className="text-gray-600 text-lg">
                    Let's start with the basics. This information will help students find and connect with you.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 group-focus-within:text-blue-600 transition-colors">
                      First name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Enter your first name"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 group-focus-within:text-blue-600 transition-colors">
                      Last name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-3 group-focus-within:text-blue-600 transition-colors">
                    Email address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900 placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Country */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 group-focus-within:text-blue-600 transition-colors">
                      Country *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                      >
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 group-focus-within:text-blue-600 transition-colors">
                      Main subject *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                      >
                        <option value="">Select subject to teach</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-3 group-focus-within:text-blue-600 transition-colors">
                    Languages you speak *
                  </label>
                  <div className="space-y-4">
                    {formData.languages.map((lang, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1 relative">
                          <select
                            value={lang.language}
                            onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                          >
                            <option value="">Select language</option>
                            {languageOptions.map((language) => (
                              <option key={language} value={language}>{language}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="w-32 relative">
                          <select
                            value={lang.level}
                            onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                          >
                            <option value="">Level</option>
                            {levels.map((level) => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        {formData.languages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLanguage(index)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addLanguage}
                      className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors hover:bg-blue-50 px-4 py-3 rounded-xl border-2 border-dashed border-blue-200 w-full justify-center"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add another language
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-3 group-focus-within:text-blue-600 transition-colors">
                    Phone number (optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900 placeholder-gray-400"
                    placeholder="+212 777 777 799"
                  />
                </div>

                {/* Age Confirmation */}
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <input
                    type="checkbox"
                    id="over18"
                    checked={formData.isOver18}
                    onChange={(e) => setFormData({ ...formData, isOver18: e.target.checked })}
                    className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                  />
                  <label htmlFor="over18" className="text-sm font-medium text-blue-900">
                    I confirm that I am 18 years or older and agree to the terms of service
                  </label>
                </div>
              </div>
            )}

            {/* Other steps placeholder */}
            {currentStep > 1 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">{steps[currentStep - 1].icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {steps[currentStep - 1].name}
                </h3>
                <p className="text-gray-600">
                  This step is coming soon. For now, you can navigate between steps.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentStep === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-3">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                  Save Draft
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep === 8}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentStep === 8
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                  }`}
                >
                  <span>{currentStep === 8 ? 'Complete' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
};

export default ModernTutorForm;