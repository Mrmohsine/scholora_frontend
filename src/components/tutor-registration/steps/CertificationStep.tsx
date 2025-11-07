'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Trash2, Info } from 'lucide-react';
import { tutorRegistrationApi } from '@/lib/tutor/tutorRegistration';
import Swal from 'sweetalert2';

interface CertificationStepProps {
  formData: {
    certifications?: Array<{
      subject: string;
      certification: string;
      yearsFrom: string;
      yearsTo: string;
      file?: File | null;
    }>;
    hasNoCertificate?: boolean;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const CertificationStep = ({ formData, onUpdate, onNext }: CertificationStepProps) => {
  const [loading, setLoading] = useState(false);

  const subjects = [
    'English', 'French', 'Spanish', 'German', 'Arabic', 'Chinese',
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'
  ];

  const certifications = [
    'Select verified certificate',
    'TEFL/TESOL Certificate',
    'CELTA Certificate',
    'DELTA Certificate',
    'Bachelor\'s Degree in Education',
    'Master\'s Degree in Education',
    'Teaching License',
    'Other Professional Certificate'
  ];

  const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

  // Initialize with one certificate if none exist - DANS useEffect
  useEffect(() => {
    if (!formData.certifications?.length && !formData.hasNoCertificate) {
      onUpdate({
        certifications: [{
          subject: '',
          certification: '',
          yearsFrom: '',
          yearsTo: '',
          file: null
        }]
      });
    }
  }, []); // Run once on mount

  const addCertificate = () => {
    const currentCertifications = formData.certifications || [];
    onUpdate({
      certifications: [
        ...currentCertifications,
        {
          subject: '',
          certification: '',
          yearsFrom: '',
          yearsTo: '',
          file: null
        }
      ]
    });
  };

  const removeCertificate = (index: number) => {
    const currentCertifications = formData.certifications || [];
    const newCertifications = currentCertifications.filter((_, i) => i !== index);
    onUpdate({ certifications: newCertifications });
  };

  const updateCertificate = (index: number, field: string, value: string) => {
    const currentCertifications = formData.certifications || [];
    const newCertifications = [...currentCertifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [field]: value
    };
    onUpdate({ certifications: newCertifications });
  };

  const handleFileUpload = (index: number, file: File) => {
    const currentCertifications = formData.certifications || [];
    const newCertifications = [...currentCertifications];
    newCertifications[index] = {
      ...newCertifications[index],
      file: file
    };
    onUpdate({ certifications: newCertifications });
  };

  const handleNoCertificateChange = (checked: boolean) => {
    onUpdate({ 
      hasNoCertificate: checked,
      certifications: checked ? [] : (formData.certifications || [])
    });
  };

  const handleSaveDraft = async () => {
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
      const response = await tutorRegistrationApi.saveCertificationStep(parseInt(tutorId), formData);
      
      if (response.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Draft Saved!',
          text: 'Your certifications have been saved',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to save certifications'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
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
      const response = await tutorRegistrationApi.saveCertificationStep(parseInt(tutorId), formData);
      
      if (response.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Certifications saved successfully',
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
        text: error.response?.data?.message || 'Failed to save certifications',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Teaching certification</h3>
        <p className="text-gray-600 text-lg">
          Do you have teaching certificates? If so, describe them to enhance your profile credibility and get more students.
        </p>
      </div>

      {/* No Certificate Checkbox */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="noCertificate"
          checked={formData.hasNoCertificate || false}
          onChange={(e) => handleNoCertificateChange(e.target.checked)}
          className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          disabled={loading}
        />
        <label htmlFor="noCertificate" className="text-sm font-medium text-gray-900">
          I don't have a teaching certificate
        </label>
      </div>

      {/* Certificate Forms */}
      {!formData.hasNoCertificate && (
        <div className="space-y-6">
          {(formData.certifications || []).map((cert, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 space-y-6 relative">
              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Subject • <span className="text-gray-500 font-normal">Optional</span>
                </label>
                <div className="relative">
                  <select
                    value={cert.subject}
                    onChange={(e) => updateCertificate(index, 'subject', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                    disabled={loading}
                  >
                    <option value="">English</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {formData.certifications && formData.certifications.length > 1 && (
                <button
                  onClick={() => removeCertificate(index)}
                  className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {/* Certification */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Certification • <span className="text-gray-500 font-normal">Optional</span>
                </label>
                <div className="relative">
                  <select
                    value={cert.certification}
                    onChange={(e) => updateCertificate(index, 'certification', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                    disabled={loading}
                  >
                    {certifications.map((certification) => (
                      <option key={certification} value={certification}>{certification}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Write the name exactly as it appears on your certificate
                </p>
              </div>

              {/* Not on list checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={`notOnList-${index}`}
                  className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={loading}
                />
                <label htmlFor={`notOnList-${index}`} className="text-sm text-gray-700">
                  My certificate is not on the list
                </label>
              </div>

              {/* Years of study */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Years of study
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      value={cert.yearsFrom}
                      onChange={(e) => updateCertificate(index, 'yearsFrom', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                      disabled={loading}
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
                      value={cert.yearsTo}
                      onChange={(e) => updateCertificate(index, 'yearsTo', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                      disabled={loading}
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

              {/* Upload Section */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Upload your certificate</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Our team will manually review your submission
                </p>
                
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(index, file);
                  }}
                  className="hidden"
                  id={`certificate-upload-${index}`}
                  disabled={loading}
                />
                <label
                  htmlFor={`certificate-upload-${index}`}
                  className="block w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 cursor-pointer transition-colors text-center"
                >
                  {cert.file ? cert.file.name : 'Upload'}
                </label>

                <div className="flex items-start space-x-3 mt-4 p-3 bg-blue-100 rounded-lg">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Only authentic documents will be accepted.</p>
                    <p>Any false information can result in the disapproval or suspension of your account.</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  JPG or PNG format, maximum size of 20MB.
                </p>
              </div>
            </div>
          ))}

          {/* Add Another Certificate Button */}
          <button
            onClick={addCertificate}
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Add another certificate
          </button>
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

export default CertificationStep;