'use client';

import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { tutorRegistrationApi } from '@/lib/tutor/tutorRegistration';
import Swal from 'sweetalert2';

interface TimeSlot {
  from: string;
  to: string;
}

interface AvailabilityStepProps {
  formData: {
    timezone?: string;
    availability?: {
      [key: string]: TimeSlot[];
    };
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const AvailabilityStep = ({ formData, onUpdate, onNext }: AvailabilityStepProps) => {
  const [loading, setLoading] = useState(false);

  const timezones = [
    'GMT-12 (GMT-12) - Baker Island',
    'GMT-11 (GMT-11) - American Samoa',
    'GMT-10 (GMT-10) - Hawaii',
    'GMT-9 (GMT-9) - Alaska',
    'GMT-8 (GMT-8) - Pacific Time',
    'GMT-7 (GMT-7) - Mountain Time',
    'GMT-6 (GMT-6) - Central Time',
    'GMT-5 (GMT-5) - Eastern Time',
    'GMT-4 (GMT-4) - Atlantic Time',
    'GMT-3 (GMT-3) - Argentina',
    'GMT-2 (GMT-2) - South Georgia',
    'GMT-1 (GMT-1) - Azores',
    'GMT+0 (GMT+0) - London',
    'GMT+1 (GMT+1) - Central Europe',
    'GMT+2 (GMT+2) - Eastern Europe',
    'GMT+3 (GMT+3) - Moscow',
    'GMT+4 (GMT+4) - UAE',
    'GMT+5 (GMT+5) - Pakistan',
    'GMT+6 (GMT+6) - Bangladesh',
    'GMT+7 (GMT+7) - Thailand',
    'GMT+8 (GMT+8) - China',
    'GMT+9 (GMT+9) - Japan',
    'GMT+10 (GMT+10) - Australia East',
    'GMT+11 (GMT+11) - Solomon Islands',
    'GMT+12 (GMT+12) - New Zealand'
  ];

  const timeOptions = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const defaultAvailability = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };

  const availability = formData.availability || defaultAvailability;

  const updateTimezone = (timezone: string) => {
    onUpdate({ timezone });
  };

  const updateTimeSlot = (day: string, slotIndex: number, field: 'from' | 'to', value: string) => {
    const newAvailability = { ...availability };
    newAvailability[day][slotIndex][field] = value;
    onUpdate({ availability: newAvailability });
  };

  const addTimeSlot = (day: string) => {
    const newAvailability = { ...availability };
    newAvailability[day] = [...newAvailability[day], { from: '', to: '' }];
    onUpdate({ availability: newAvailability });
  };

  const toggleDay = (day: string, enabled: boolean) => {
    const newAvailability = { ...availability };
    if (enabled) {
      newAvailability[day] = [{ from: '', to: '' }];
    } else {
      newAvailability[day] = [];
    }
    onUpdate({ availability: newAvailability });
  };

  const isDayEnabled = (day: string) => {
    return availability[day] && availability[day].length > 0;
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
      const response = await tutorRegistrationApi.saveAvailabilityStep(parseInt(tutorId), formData);
      
      if (response.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Draft Saved!',
          text: 'Your availability has been saved',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to save availability'
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

    // Vérifier si au moins un slot valide existe
    const hasValidSlots = Object.values(availability).some((slots: any) => 
      slots && slots.length > 0 && slots.some((slot: any) => slot.from && slot.to)
    );

    if (!hasValidSlots) {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'No availability set',
        text: 'Do you want to continue without setting your availability? You can set it later.',
        showCancelButton: true,
        confirmButtonText: 'Continue',
        cancelButtonText: 'Go back',
        confirmButtonColor: '#2563eb'
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    setLoading(true);
    try {
      const response = await tutorRegistrationApi.saveAvailabilityStep(parseInt(tutorId), formData);
      
      if (response.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Availability saved successfully',
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
        text: error.response?.data?.message || 'Failed to save availability',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Availability</h3>
      </div>

      {/* Timezone Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900">Set your timezone</h4>
        <p className="text-gray-600">
          A correct timezone is essential to coordinate lessons with international students.
        </p>
        
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Choose your timezone • <span className="text-gray-500 font-normal">Optional</span>
          </label>
          <div className="relative">
            <select
              value={formData.timezone || ''}
              onChange={(e) => updateTimezone(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
              disabled={loading}
            >
              <option value="">GMT+1 (GMT+1) - Africa, Casablanca</option>
              {timezones.map((timezone) => (
                <option key={timezone} value={timezone}>{timezone}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Set your availability</h4>
          <p className="text-gray-600 mb-4">
            Availability shows your preferred teaching hours. Students can book lessons on these days.
          </p>
          
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">You can update your availability anytime</p>
                <p>
                  Most students book lessons between 17:00 and 19:00 (evening hours). Add more time slots during these hours to scale your income.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Days Schedule */}
        <div className="space-y-6">
          {daysOfWeek.map((day) => (
            <div key={day} className="space-y-4">
              {/* Day Header */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={day}
                  checked={isDayEnabled(day)}
                  onChange={(e) => toggleDay(day, e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={loading}
                />
                <label htmlFor={day} className="text-lg font-semibold text-gray-900">
                  {day}
                </label>
              </div>

              {/* Time Slots */}
              {isDayEnabled(day) && (
                <div className="ml-8 space-y-3">
                  {availability[day].map((slot: TimeSlot, slotIndex: number) => (
                    <div key={slotIndex} className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600 w-8">From</span>
                      <div className="relative">
                        <select
                          value={slot.from}
                          onChange={(e) => updateTimeSlot(day, slotIndex, 'from', e.target.value)}
                          className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                          disabled={loading}
                        >
                          <option value="">09:00</option>
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                      </div>

                      <span className="text-sm text-gray-600">To</span>
                      <div className="relative">
                        <select
                          value={slot.to}
                          onChange={(e) => updateTimeSlot(day, slotIndex, 'to', e.target.value)}
                          className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none appearance-none bg-white text-gray-900"
                          disabled={loading}
                        >
                          <option value="">17:00</option>
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => addTimeSlot(day)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors disabled:opacity-50"
                    disabled={loading}
                  >
                    Add another timeslot
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-green-50 rounded-xl p-6">
        <h5 className="font-semibold text-green-900 mb-3">Availability Tips:</h5>
        <ul className="space-y-2 text-sm text-green-800">
          <li>• Peak hours are typically 17:00-19:00 in your timezone</li>
          <li>• Weekend availability often attracts more bookings</li>
          <li>• Consider different time zones of your target students</li>
          <li>• You can always update your schedule later</li>
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

export default AvailabilityStep;