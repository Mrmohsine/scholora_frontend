'use client';

import { ChevronDown, X, Plus } from 'lucide-react';

interface AboutStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    subject: string;
    languages: { language: string; level: string; }[];
    phone: string;
    isOver18: boolean;
  };
  onUpdate: (data: any) => void;
}

const AboutStep = ({ formData, onUpdate }: AboutStepProps) => {
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

  const addLanguage = () => {
    onUpdate({
      languages: [...formData.languages, { language: '', level: '' }]
    });
  };

  const removeLanguage = (index: number) => {
    const newLanguages = formData.languages.filter((_, i) => i !== index);
    onUpdate({ languages: newLanguages });
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const newLanguages = [...formData.languages];
    newLanguages[index][field] = value;
    onUpdate({ languages: newLanguages });
  };

  return (
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
            onChange={(e) => onUpdate({ firstName: e.target.value })}
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
            onChange={(e) => onUpdate({ lastName: e.target.value })}
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
          onChange={(e) => onUpdate({ email: e.target.value })}
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
              onChange={(e) => onUpdate({ country: e.target.value })}
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
              onChange={(e) => onUpdate({ subject: e.target.value })}
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
          onChange={(e) => onUpdate({ phone: e.target.value })}
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
          onChange={(e) => onUpdate({ isOver18: e.target.checked })}
          className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
        />
        <label htmlFor="over18" className="text-sm font-medium text-blue-900">
          I confirm that I am 18 years or older and agree to the terms of service
        </label>
      </div>
    </div>
  );
};

export default AboutStep;