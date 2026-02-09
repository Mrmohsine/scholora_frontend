'use client';

import { useState } from 'react';
import { Info, ChevronUp, Check } from 'lucide-react';
import { tutorRegistrationApi } from '@/lib/tutor/tutorRegistration';
import Swal from 'sweetalert2';
import UpgradePackPage from '@/components/tutor/packages/UpgradePackPage';

interface PricingStepProps {
  formData: {
    hourlyRate?: string;
  };
  onUpdate: (data: any) => void;
  onSubmit: () => void;
}

const PricingStep = ({ formData, onUpdate, onSubmit }: PricingStepProps) => {
  const [showCommissionDetails, setShowCommissionDetails] = useState(true);
  const [loading, setLoading] = useState(false);

  const commissionRates = [
    { hours: '0 - 20 hours', rate: '33%' },
    { hours: '21 - 50 hours', rate: '28%' },
    { hours: '51 - 200 hours', rate: '25%' },
    { hours: '201 - 400 hours', rate: '22%' },
    { hours: '400+ hours', rate: '18%' }
  ];

  const handlePriceChange = (value: string) => {
    onUpdate({ hourlyRate: value });
  };

  const handleSaveDraft = async () => {
    if (!formData.hourlyRate || parseFloat(formData.hourlyRate) < 1) {
      await Swal.fire({
        icon: 'warning',
        title: 'No price set',
        text: 'Please set your hourly rate first'
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
      const response = await tutorRegistrationApi.savePricingStep(parseInt(tutorId), formData.hourlyRate);
      
      if (response.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Draft Saved!',
          text: 'Your pricing has been saved',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to save pricing'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProfile = async () => {
    if (!formData.hourlyRate || parseFloat(formData.hourlyRate) < 1) {
      await Swal.fire({
        icon: 'warning',
        title: 'No price set',
        text: 'Please set your hourly rate to submit'
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
      // Save pricing first
      await tutorRegistrationApi.savePricingStep(parseInt(tutorId), formData.hourlyRate);
      
      // Then submit profile
      const response = await tutorRegistrationApi.submitProfile(parseInt(tutorId));
      
      if (response.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Application Submitted!',
          html: `
            <p>Your tutor profile has been submitted for review.</p>
            <p class="mt-2">Our team will review your application and get back to you soon.</p>
          `,
          confirmButtonText: 'Done',
          confirmButtonColor: '#10b981'
        });

        onSubmit();
      }
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to submit application',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const currentPackSlug = null;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Set your 50 minute lesson price</h3>
      </div>

      {/* Price Input */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="number"
            value={formData.hourlyRate || ''}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="w-full px-4 py-4 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900"
            placeholder="35"
            min="1"
            max="200"
            disabled={loading}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Info className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-2">Price in MAD only</p>
      </div>

      {/* Commission Details */}
      <UpgradePackPage title={false} currentPackSlug={currentPackSlug}/>

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
          onClick={handleSubmitProfile}
          disabled={loading}
          className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
};

export default PricingStep;