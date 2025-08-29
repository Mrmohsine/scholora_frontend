'use client';

import { useState } from 'react';
import { ChevronDown, X, Plus, Menu, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TutorRegistrationForm = () => {
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
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
    'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'China', 'France',
    'Germany', 'India', 'Italy', 'Japan', 'Morocco', 'Spain', 'UK', 'USA'
  ];

  const subjects = [
    'English', 'French', 'Spanish', 'German', 'Arabic', 'Chinese',
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'
  ];

  const languageOptions = [
    'English', 'French', 'Spanish', 'German', 'Arabic', 'Chinese',
    'Italian', 'Portuguese', 'Russian', 'Japanese', 'Korean', 'Albanian'
  ];

  const levels = ['Native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1'];

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

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <div className="py-12">
        {/* Progress Steps with arrows */}
        <div className="bg-white border-b py-6 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                    step.id === currentStep
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}>
                    {step.id}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    step.id === currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border">
            <div className="p-8 lg:p-12">
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">About</h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                  Start creating your public tutor profile. Your progress will be automatically saved.
                </p>
              </div>

              <div className="max-w-2xl space-y-8">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">First name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                    placeholder="Othman"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Last name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                    placeholder="Bouysfi"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                    placeholder="o.bouysfi@scholora.ma"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Country</label>
                  <div className="relative">
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white text-gray-900"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Subject you teach</label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white text-gray-900"
                    >
                      <option value="">Select subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Languages you speak</label>
                  <div className="space-y-4">
                    {formData.languages.map((lang, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-1 relative">
                          <select
                            value={lang.language}
                            onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white text-gray-900"
                          >
                            <option value="">Select language</option>
                            {languageOptions.map((language) => (
                              <option key={language} value={language}>{language}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        <div className="w-36 relative">
                          <select
                            value={lang.level}
                            onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white text-gray-900"
                          >
                            <option value="">Select level</option>
                            {levels.map((level) => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        {formData.languages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLanguage(index)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addLanguage}
                      className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors hover:bg-blue-50 px-3 py-2 rounded-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add another language
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Phone number (optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                    placeholder="+212 777 777 799"
                  />
                </div>

                {/* Age Confirmation */}
                <div className="flex items-center pt-2">
                  <input
                    type="checkbox"
                    id="over18"
                    checked={formData.isOver18}
                    onChange={(e) => setFormData({ ...formData, isOver18: e.target.checked })}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="over18" className="ml-3 text-sm font-medium text-gray-900">
                    I confirm I'm over 18
                  </label>
                </div>

                {/* Submit Button LEFT */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md"
                  >
                    Save and continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TutorRegistrationForm;
