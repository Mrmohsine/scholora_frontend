'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, X, Plus } from 'lucide-react';
import { tutorRegistrationApi } from '@/lib/tutor/tutorRegistration';
import Swal from 'sweetalert2';

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
  onNext: () => void;
}

const AboutStep = ({ formData, onUpdate, onNext }: AboutStepProps) => {
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('tutor_draft_email');
    if (savedEmail) {
      loadDraft(savedEmail);
    }
  }, []);

  const loadDraft = async (email: string) => {
    try {
      const response = await tutorRegistrationApi.getDraft(email);
      if (response.success) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (formData.languages.length === 0 || !formData.languages[0].language) {
      newErrors.languages = 'At least one language is required';
    }
    if (!formData.isOver18) newErrors.isOver18 = 'You must be 18 years or older';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const aboutData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        subject: formData.subject,
        phone: formData.phone,
        isOver18: formData.isOver18
      };

      const response = await tutorRegistrationApi.saveAboutStep(aboutData);
      
      if (response.success) {
        localStorage.setItem('tutor_draft_email', formData.email);
        localStorage.setItem('tutor_id', response.data.id);
        
        await Swal.fire({
          icon: 'success',
          title: 'Draft Saved!',
          text: 'Your progress has been saved',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.errors?.email?.[0] || 'Failed to save draft';
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (loading) return;

    if (!validateForm()) {
      await Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill all required fields correctly',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    setLoading(true);
    try {
      const aboutData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        subject: formData.subject,
        phone: formData.phone,
        isOver18: formData.isOver18
      };

      const response = await tutorRegistrationApi.saveAboutStep(aboutData);
      
      if (response.success) {
        localStorage.setItem('tutor_draft_email', formData.email);
        localStorage.setItem('tutor_id', response.data.id);
        
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Profile information saved successfully',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#2563eb',
          allowOutsideClick: false
        });

        setLoading(false);
        onNext();
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || error.response?.data?.errors?.email?.[0] || 'Failed to save';
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const countries = ['Morocco', 'France', 'Spain', 'Germany', 'Italy', 'UK', 'USA', 'Canada'];
  const subjects = ['English', 'French', 'Spanish', 'Mathematics', 'Physics', 'Chemistry'];
  const languageOptions = ['English', 'French', 'Spanish', 'German', 'Arabic', 'Chinese'];
  const levels = ['Native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1'];

  const addLanguage = () => {
    onUpdate({ languages: [...formData.languages, { language: '', level: '' }] });
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
        <div className="group">
          <label className="block text-sm font-semibold text-gray-900 mb-3">First name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 outline-none transition-all ${
              errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="Enter your first name"
            disabled={loading}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div className="group">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Last name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 outline-none transition-all ${
              errors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="Enter your last name"
            disabled={loading}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Email address *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 outline-none transition-all ${
            errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
          }`}
          placeholder="your.email@example.com"
          disabled={loading}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Country *</label>
          <div className="relative">
            <select
              value={formData.country}
              onChange={(e) => onUpdate({ country: e.target.value })}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 outline-none appearance-none ${
                errors.country ? 'border-red-500' : 'border-gray-200'
              }`}
              disabled={loading}
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        <div className="group">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Main subject *</label>
          <div className="relative">
            <select
              value={formData.subject}
              onChange={(e) => onUpdate({ subject: e.target.value })}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 outline-none appearance-none ${
                errors.subject ? 'border-red-500' : 'border-gray-200'
              }`}
              disabled={loading}
            >
              <option value="">Select subject to teach</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Languages you speak *</label>
        <div className="space-y-4">
          {formData.languages.map((lang, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex-1 relative">
                <select
                  value={lang.language}
                  onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none appearance-none"
                  disabled={loading}
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none appearance-none"
                  disabled={loading}
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
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            onClick={addLanguage} 
            className="flex items-center text-blue-600 font-semibold px-4 py-3 rounded-xl border-2 border-dashed border-blue-200 w-full justify-center hover:bg-blue-50 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            <Plus className="w-4 h-4 mr-2" /> Add another language
          </button>
        </div>
        {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Phone number (optional)</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onUpdate({ phone: e.target.value })}
          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 outline-none"
          placeholder="+212 777 777 799"
          disabled={loading}
        />
      </div>

      <div className={`flex items-start space-x-3 p-4 rounded-xl border ${
        errors.isOver18 ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
      }`}>
        <input
          type="checkbox"
          id="over18"
          checked={formData.isOver18}
          onChange={(e) => onUpdate({ isOver18: e.target.checked })}
          className="w-5 h-5 text-blue-600 border-2 rounded focus:ring-2 mt-0.5"
          disabled={loading}
        />
        <label htmlFor="over18" className="text-sm font-medium text-gray-900">
          I confirm that I am 18 years or older and agree to the terms of service
        </label>
      </div>
      {errors.isOver18 && <p className="text-red-500 text-sm">{errors.isOver18}</p>}

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={loading}
          className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving...' : 'Save Draft'}
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={loading}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving...' : 'Continue →'}
        </button>
      </div>
    </div>
  );
};

export default AboutStep;