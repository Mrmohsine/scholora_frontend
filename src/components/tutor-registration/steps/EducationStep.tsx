// components/tutor-registration/steps/EducationStep.tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface EducationStepProps {
  formData: {
    education?: Array<{
      university: string;
      degree: string;
      degreeType: string;
      specialization: string;
      yearsFrom: string;
      yearsTo: string;
      diplomaFile?: File | null;
    }>;
    hasNoEducation?: boolean;
  };
  onUpdate: (data: any) => void;
}

const EducationStep = ({ formData, onUpdate }: EducationStepProps) => {
  const degreeTypes = [
    'Choose degree type...',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctoral Degree (PhD)',
    'Professional Degree',
    'Certificate Program',
    'Diploma',
    'Other'
  ];

  const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

  const addEducation = () => {
    const currentEducation = formData.education || [];
    onUpdate({
      education: [
        ...currentEducation,
        {
          university: '',
          degree: '',
          degreeType: '',
          specialization: '',
          yearsFrom: '',
          yearsTo: '',
          diplomaFile: null
        }
      ]
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const currentEducation = formData.education || [];
    const newEducation = [...currentEducation];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    onUpdate({ education: newEducation });
  };

  const handleDiplomaUpload = (index: number, file: File) => {
    const currentEducation = formData.education || [];
    const newEducation = [...currentEducation];
    newEducation[index] = {
      ...newEducation[index],
      diplomaFile: file
    };
    onUpdate({ education: newEducation });
  };

  const handleNoEducationChange = (checked: boolean) => {
    onUpdate({ 
      hasNoEducation: checked,
      education: checked ? [] : (formData.education || [])
    });
  };

  // Initialize with one education entry if none exist and not marked as no education
  if (!formData.education?.length && !formData.hasNoEducation) {
    addEducation();
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Education</h3>
        <p className="text-gray-600 text-lg">
          Tell students more about the higher education that you've completed or are working on
        </p>
      </div>

      {/* No Education Checkbox */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="noEducation"
          checked={formData.hasNoEducation || false}
          onChange={(e) => handleNoEducationChange(e.target.checked)}
          className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="noEducation" className="text-sm font-medium text-gray-900">
          I don't have a higher education degree
        </label>
      </div>

      {/* Education Forms */}
      {!formData.hasNoEducation && (
        <div className="space-y-6">
          {(formData.education || []).map((edu, index) => (
            <div key={index} className="space-y-6">
              {/* University */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  University
                </label>
                <input
                  type="text"
                  value={edu.university}
                  onChange={(e) => updateEducation(index, 'university', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-gray-900 placeholder-gray-400"
                  placeholder="E.g. Mount Royal University"
                />
              </div>

              {/* Degree */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Degree
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-gray-900 placeholder-gray-400"
                  placeholder="E.g. Bachelor's degree in the English Language"
                />
              </div>

              {/* Degree Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Degree type
                </label>
                <div className="relative">
                  <select
                    value={edu.degreeType}
                    onChange={(e) => updateEducation(index, 'degreeType', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                  >
                    {degreeTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Specialization
                </label>
                <input
                  type="text"
                  value={edu.specialization}
                  onChange={(e) => updateEducation(index, 'specialization', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-gray-900 placeholder-gray-400"
                  placeholder="E.g. Teaching English as a Foreign Language"
                />
              </div>

              {/* Years of study */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Years of study
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      value={edu.yearsFrom}
                      onChange={(e) => updateEducation(index, 'yearsFrom', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                    >
                      <option value="">Select</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select
                      value={edu.yearsTo}
                      onChange={(e) => updateEducation(index, 'yearsTo', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                    >
                      <option value="">Select</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Diploma Upload Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Get a "Diploma verified" badge</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Upload your diploma to boost your credibility! Our team will review it and add the badge to your profile. Once reviewed, your files will be deleted.
                </p>
                
                <p className="text-xs text-gray-500 mb-4">
                  JPG or PNG format, maximum size of 20MB.
                </p>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleDiplomaUpload(index, file);
                  }}
                  className="hidden"
                  id={`diploma-upload-${index}`}
                />
                <label
                  htmlFor={`diploma-upload-${index}`}
                  className="inline-block bg-white border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  Upload
                </label>
              </div>
            </div>
          ))}

          {/* Add Another Education Button */}
          <button
            onClick={addEducation}
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Add another education
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationStep;