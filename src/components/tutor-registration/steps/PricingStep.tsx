'use client';

import { useState } from 'react';
import { Info, ChevronUp, Check } from 'lucide-react';
import { tutorRegistrationApi } from '@/lib/tutor/tutorRegistration';
import Swal from 'sweetalert2';

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
        <p className="text-center text-gray-500 text-sm mt-2">Price in USD only</p>
      </div>

      {/* Preply Commission Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <button
          onClick={() => setShowCommissionDetails(!showCommissionDetails)}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h4 className="text-lg font-semibold text-gray-900">Preply commission</h4>
          <ChevronUp className={`w-5 h-5 text-gray-500 transition-transform ${showCommissionDetails ? '' : 'rotate-180'}`} />
        </button>

        {showCommissionDetails && (
          <div className="space-y-4">
            <p className="text-gray-600">
              We use the funds for getting more students and for constant improvements of our learning platform
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  For every trial lesson with a new student Preply's commission is 100%
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  For all the subsequent lessons, Preply charges a percentage (18%-33%) of the hourly rate
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  The more hours you teach, the lower your rate of commission will be
                </span>
              </div>
            </div>

            {/* Commission Rate Table */}
            <div className="bg-white rounded-lg overflow-hidden mt-6">
              <div className="grid grid-cols-2 gap-0">
                <div className="bg-gray-100 px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">
                  Completed hours
                </div>
                <div className="bg-gray-100 px-4 py-3 font-semibold text-gray-900 border-b border-l border-gray-200">
                  Commission rate
                </div>
                
                {commissionRates.map((tier, index) => (
                  <>
                    <div key={`hours-${index}`} className={`px-4 py-3 text-gray-700 ${index < commissionRates.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      {tier.hours}
                    </div>
                    <div key={`rate-${index}`} className={`px-4 py-3 text-gray-900 font-semibold border-l border-gray-200 ${index < commissionRates.length - 1 ? 'border-b' : ''}`}>
                      {tier.rate}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Tips */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h5 className="font-semibold text-blue-900 mb-3">Pricing Tips:</h5>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Research competitor rates in your subject area</li>
          <li>• Consider your experience level and qualifications</li>
          <li>• You can adjust your price anytime after registration</li>
          <li>• Higher prices often attract more serious students</li>
          <li>• Start competitive and increase as you get positive reviews</li>
        </ul>
      </div>

      {/* Price Calculation Preview */}
      {formData.hourlyRate && (
        <div className="bg-green-50 rounded-xl p-6">
          <h5 className="font-semibold text-green-900 mb-3">Your Earnings Preview:</h5>
          <div className="space-y-2 text-sm text-green-800">
            <div className="flex justify-between">
              <span>Lesson price (50 min):</span>
              <span className="font-semibold">${formData.hourlyRate}</span>
            </div>
            <div className="flex justify-between">
              <span>Commission (33% for first 20 hours):</span>
              <span className="font-semibold">-${(parseFloat(formData.hourlyRate) * 0.33).toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-green-200 pt-2">
              <span className="font-semibold">You earn per lesson:</span>
              <span className="font-bold text-green-700">${(parseFloat(formData.hourlyRate) * 0.67).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

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