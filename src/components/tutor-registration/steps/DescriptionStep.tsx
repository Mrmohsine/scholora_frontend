'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { tutorRegistrationApi } from '@/lib/tutor/tutorRegistration';
import Swal from 'sweetalert2';

interface DescriptionStepProps {
  formData: {
    description?: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const DescriptionStep = ({ formData, onUpdate, onNext }: DescriptionStepProps) => {
  const [description, setDescription] = useState(formData.description || '');
  const [loading, setLoading] = useState(false);

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    onUpdate({ description: value });
  };

  const maxLength = 400;
  const currentLength = description.length;

  const guidelines = [
    {
      title: "1. Introduce yourself",
      completed: description.length > 50
    },
    {
      title: "2. Teaching experience", 
      completed: description.toLowerCase().includes('teach') || description.toLowerCase().includes('experience')
    },
    {
      title: "3. Motivate potential students",
      completed: description.length > 100
    },
    {
      title: "4. Write a catchy headline",
      completed: description.length > 20 && description.includes('!')
    }
  ];

  const handleSaveDraft = async () => {
    if (!description.trim()) {
      await Swal.fire({
        icon: 'warning',
        title: 'No description',
        text: 'Please write a description first'
      });
      return;
    }

    const tutorId = localStorage.getItem('tutor_id');
    if (!tutorId) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please complete step 1 first.'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await tutorRegistrationApi.saveDescriptionStep(parseInt(tutorId), description);
      
      if (response.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Draft Saved!',
          text: 'Your description has been saved',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to save description'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!description.trim()) {
      await Swal.fire({
        icon: 'warning',
        title: 'No description',
        text: 'Please write a description to continue'
      });
      return;
    }

    if (description.length < 50) {
      await Swal.fire({
        icon: 'warning',
        title: 'Description too short',
        text: 'Please write at least 50 characters'
      });
      return;
    }

    const tutorId = localStorage.getItem('tutor_id');
    if (!tutorId) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please complete step 1 first.'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await tutorRegistrationApi.saveDescriptionStep(parseInt(tutorId), description);
      
      if (response.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Description saved successfully',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#2563eb',
          allowOutsideClick: false
        });

        onNext();
      }
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to save description',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Profile description</h3>
        <p className="text-gray-600 text-lg">
          This info will go on your public profile. Write it in the language you'll be teaching and make sure to follow our{' '}
          <a href="#" className="text-blue-600 underline">guidelines</a> to{' '}
          <a href="#" className="text-blue-600 underline">get approved</a>
        </p>
      </div>

      {/* Description Textarea */}
      <div className="space-y-4">
        <textarea
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          maxLength={maxLength}
          rows={8}
          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900 placeholder-gray-400 resize-none"
          placeholder="Write your profile description here... Tell students about yourself, your teaching experience, and what makes you a great tutor!"
          disabled={loading}
        />
        
        {/* Character Counter */}
        <div className="flex justify-between items-center text-sm">
          <span className={`${currentLength > maxLength * 0.9 ? 'text-orange-600' : 'text-blue-600'}`}>
            {currentLength} / {maxLength}
          </span>
        </div>
      </div>

      {/* Guidelines Checklist */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="space-y-4">
          {guidelines.map((guideline, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                guideline.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {guideline.completed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <span className={`font-medium ${
                guideline.completed ? 'text-green-700' : 'text-gray-700'
              }`}>
                {guideline.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-3">Tips for a great profile description:</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Start with a friendly greeting and introduce yourself</li>
          <li>• Mention your teaching experience and qualifications</li>
          <li>• Describe your teaching style and approach</li>
          <li>• Explain what students can expect from your lessons</li>
          <li>• Add a personal touch - hobbies, interests, or fun facts</li>
          <li>• End with an encouraging call-to-action</li>
        </ul>
      </div>

      {/* Buttons */}
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

export default DescriptionStep;