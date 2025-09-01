// components/tutor-registration/steps/DescriptionStep.tsx
'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

interface DescriptionStepProps {
  formData: {
    description?: string;
  };
  onUpdate: (data: any) => void;
}

const DescriptionStep = ({ formData, onUpdate }: DescriptionStepProps) => {
  const [description, setDescription] = useState(formData.description || '');

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    onUpdate({ description: value });
  };

  const maxLength = 400;
  const currentLength = description.length;

  const guidelines = [
    {
      title: "1. Introduce yourself",
      completed: description.length > 50 // Simple check - can be made more sophisticated
    },
    {
      title: "2. Teaching experience", 
      completed: description.toLowerCase().includes('teach') || description.toLowerCase().includes('experience')
    },
    {
      title: "3. Motivate potential students",
      completed: description.length > 100 // Simple check
    },
    {
      title: "4. Write a catchy headline",
      completed: description.length > 20 && description.includes('!')
    }
  ];

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
    </div>
  );
};

export default DescriptionStep;