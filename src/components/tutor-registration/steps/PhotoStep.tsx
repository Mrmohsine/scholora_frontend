'use client';

import { useState } from 'react';
import { Upload, Check } from 'lucide-react';
import { tutorRegistrationApi } from '@/lib/tutor/tutorRegistration';
import Swal from 'sweetalert2';

interface PhotoStepProps {
  formData: {
    photo?: File | null;
    firstName?: string;
    lastName?: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const PhotoStep = ({ formData, onUpdate, onNext }: PhotoStepProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File too large',
          text: 'Photo must be less than 5MB'
        });
        return;
      }
      onUpdate({ photo: file });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File too large',
          text: 'Photo must be less than 5MB'
        });
        return;
      }
      onUpdate({ photo: file });
    }
  };

  const handleSaveDraft = async () => {
    if (!formData.photo) {
      await Swal.fire({
        icon: 'warning',
        title: 'No photo selected',
        text: 'Please upload a photo first'
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
      const response = await tutorRegistrationApi.savePhotoStep(parseInt(tutorId), formData.photo);
      
      if (response.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Draft Saved!',
          text: 'Your photo has been saved',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to save photo'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    console.log('1. Starting continue');
    
    if (!formData.photo) {
      await Swal.fire({
        icon: 'warning',
        title: 'No photo selected',
        text: 'Please upload a photo to continue'
      });
      return;
    }

    const tutorId = localStorage.getItem('tutor_id');
    console.log('2. Tutor ID:', tutorId);
    
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
      console.log('3. Calling API');
      const response = await tutorRegistrationApi.savePhotoStep(parseInt(tutorId), formData.photo);
      console.log('4. API Response:', response);
      
      if (response.success) {
        console.log('5. Showing success alert');
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Photo saved successfully',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#2563eb',
          allowOutsideClick: false
        });

        console.log('6. Calling onNext');
        onNext();
        console.log('7. onNext called');
      }
    } catch (error: any) {
      console.error('Error:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to save photo',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const photoRequirements = [
    "You should be facing forward",
    "Frame your head and shoulders", 
    "You should be centered and upright",
    "Your face and eyes should be visible (except for religious reasons)",
    "You should be the only person in the photo",
    "Use a color photo with high resolution and no filters",
    "Avoid logos or contact information"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Profile photo</h3>
        <p className="text-gray-600 text-lg">
          Choose a photo that will help learners get to know you.
        </p>
      </div>

      {/* Profile Preview */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0 overflow-hidden">
            {formData.photo ? (
              <img 
                src={URL.createObjectURL(formData.photo)} 
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src="/images/pic.jpg"
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 flex items-center">
              {formData.firstName || 'Mohen'} {formData.lastName?.[0] || 'N'}. 
              <span className="ml-2 text-sm">🇲🇦</span>
            </h4>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              📚 Teaches English lessons
            </p>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              💬 Speaks English (C1), Albanian (Native)
            </p>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-center">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload"
            disabled={loading}
          />
          <label
            htmlFor="photo-upload"
            className="inline-block bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Upload new photo
          </label>
        </div>
      </div>

      {/* Requirements Section */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-6 text-lg">What your photo needs</h4>
        
        {/* Example photos */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[1,2,3,4].map((i) => (
            <div key={i} className="relative">
              <img 
                src="/images/pic.jpg" 
                alt={`Example ${i}`}
                className="w-full h-16 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Requirements list */}
        <div className="space-y-3">
          {photoRequirements.map((requirement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{requirement}</span>
            </div>
          ))}
        </div>
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

export default PhotoStep;