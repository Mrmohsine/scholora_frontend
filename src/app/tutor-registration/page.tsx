'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import all step components
import AboutStep from '@/components/tutor-registration/steps/AboutStep';
import PhotoStep from '@/components/tutor-registration/steps/PhotoStep';
import CertificationStep from '@/components/tutor-registration/steps/CertificationStep';
import EducationStep from '@/components/tutor-registration/steps/EducationStep';
import DescriptionStep from '@/components/tutor-registration/steps/DescriptionStep';
import VideoStep from '@/components/tutor-registration/steps/VideoStep';
import AvailabilityStep from '@/components/tutor-registration/steps/AvailabilityStep';
import PricingStep from '@/components/tutor-registration/steps/PricingStep';

export default function TutorRegistrationPage() {
 const [currentStep, setCurrentStep] = useState(1);
 const [formData, setFormData] = useState({
   // About step
   firstName: '',
   lastName: '',
   email: '',
   country: '',
   subject: '',
   languages: [{ language: '', level: '' }],
   phone: '',
   isOver18: false,
   // Photo step
   photo: null,
   // Certification step
   certifications: [],
   // Education step
   education: [],
   // Description step
   description: '',
   teachingStyle: '',
   // Video step
   introVideo: null,
   // Availability step
   availability: {},
   timezone: '',
   // Pricing step
   hourlyRate: '',
   currency: 'USD',
 });

 const steps = [
   { id: 1, name: 'About' },
   { id: 2, name: 'Photo' },
   { id: 3, name: 'Certification' },
   { id: 4, name: 'Education' },
   { id: 5, name: 'Description' },
   { id: 6, name: 'Video' },
   { id: 7, name: 'Availability' },
   { id: 8, name: 'Pricing' },
 ];

 const nextStep = () => {
   if (currentStep < steps.length) {
     setCurrentStep(currentStep + 1);
   }
 };

 const prevStep = () => {
   if (currentStep > 1) {
     setCurrentStep(currentStep - 1);
   }
 };

 const updateFormData = (data: any) => {
   setFormData(prev => ({ ...prev, ...data }));
 };

 const handleSaveDraft = () => {
   localStorage.setItem('tutorRegistrationDraft', JSON.stringify(formData));
   console.log('Draft saved:', formData);
 };

 const handleSubmit = () => {
   console.log('Final submission:', formData);
 };

 const renderCurrentStep = () => {
   switch (currentStep) {
     case 1:
       return <AboutStep formData={formData} onUpdate={updateFormData} onNext={nextStep} />;
     case 2:
       return <PhotoStep formData={formData} onUpdate={updateFormData} />;
     case 3:
       return <CertificationStep formData={formData} onUpdate={updateFormData} />;
     case 4:
       return <EducationStep formData={formData} onUpdate={updateFormData} />;
     case 5:
       return <DescriptionStep formData={formData} onUpdate={updateFormData} />;
     case 6:
       return <VideoStep formData={formData} onUpdate={updateFormData} />;
     case 7:
       return <AvailabilityStep formData={formData} onUpdate={updateFormData} />;
     case 8:
       return <PricingStep formData={formData} onUpdate={updateFormData} />;
     default:
       return <AboutStep formData={formData} onUpdate={updateFormData} onNext={nextStep} />;
   }
 };

 return (
   <div className="min-h-screen bg-gray-50">
     <Header />

     <div className="max-w-4xl mx-auto px-6 py-8">
       {/* Progress Indicator */}
       <div className="mb-8">
         <div className="flex items-center justify-between mb-4">
           <h2 className="text-2xl font-bold text-gray-900">Create your tutor profile</h2>
           <div className="text-sm text-gray-500">
             {Math.round((currentStep / steps.length) * 100)}% complete
           </div>
         </div>
         
         {/* Progress Bar */}
         <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
           <div 
             className="bg-blue-600 h-2 rounded-full transition-all duration-300"
             style={{ width: `${(currentStep / steps.length) * 100}%` }}
           ></div>
         </div>

         {/* Step Indicators */}
         <div className="flex items-center justify-between">
           {steps.map((step, index) => (
             <div key={step.id} className="flex items-center">
               <div className="flex flex-col items-center">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                   step.id < currentStep 
                     ? 'bg-green-500 text-white' 
                     : step.id === currentStep 
                     ? 'bg-blue-600 text-white shadow-lg' 
                     : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                 }`}>
                   {step.id < currentStep ? <Check className="w-6 h-6" /> : step.id}
                 </div>
                 <span className={`text-xs mt-2 font-medium transition-colors ${
                   step.id === currentStep ? 'text-blue-600' : 'text-gray-400'
                 }`}>
                   {step.name}
                 </span>
               </div>
               {index < steps.length - 1 && (
                 <ArrowRight className="w-5 h-5 text-gray-300 mx-4 mt-[-20px]" />
               )}
             </div>
           ))}
         </div>
       </div>

       {/* Form Card */}
       <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
         <div className="p-8 lg:p-12">
           {/* Dynamic Step Content */}
           {renderCurrentStep()}

           {/* Navigation - Hide for Step 1 since AboutStep has its own buttons */}
           {currentStep !== 1 && (
             <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
               <button
                 onClick={prevStep}
                 disabled={currentStep === 1}
                 className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                   currentStep === 1 
                     ? 'text-gray-400 cursor-not-allowed' 
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                 }`}
               >
                 <ArrowLeft className="w-4 h-4" />
                 <span>Previous</span>
               </button>

               <div className="flex space-x-3">
                 <button 
                   onClick={handleSaveDraft}
                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                 >
                   Save Draft
                 </button>
                 
                 {currentStep === steps.length ? (
                   <button
                     onClick={handleSubmit}
                     className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
                   >
                     <span>Submit Application</span>
                   </button>
                 ) : (
                   <button
                     onClick={nextStep}
                     className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                   >
                     <span>Continue</span>
                     <ArrowRight className="w-4 h-4" />
                   </button>
                 )}
               </div>
             </div>
           )}
         </div>
       </div>

       {/* Help Section */}
       <div className="mt-8 text-center">
         <p className="text-gray-600 mb-2">Need help with your registration?</p>
         <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
           Contact our support team
         </a>
       </div>
     </div>
     
     <Footer />
   </div>
 );
}