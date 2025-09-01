// components/tutor-registration/steps/VideoStep.tsx
'use client';

import { useState } from 'react';
import { RotateCcw, Play, X, Check } from 'lucide-react';

interface VideoStepProps {
  formData: {
    introVideo?: File | null;
    videoLink?: string;
    thumbnail?: File | null;
  };
  onUpdate: (data: any) => void;
}

const VideoStep = ({ formData, onUpdate }: VideoStepProps) => {
  const [showMore, setShowMore] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoLink, setVideoLink] = useState(formData.videoLink || '');

  const handleVideoUpload = (file: File) => {
    onUpdate({ introVideo: file });
  };

  const handleThumbnailUpload = (file: File) => {
    onUpdate({ thumbnail: file });
  };

  const handleVideoLinkChange = (link: string) => {
    setVideoLink(link);
    onUpdate({ videoLink: link });
  };

  const doRequirements = [
    "Your video should be between 30 seconds and 2 minutes long",
    "Record in horizontal mode and at eye level",
    "Use good lighting and a neutral background",
    "Use a stable surface so that your video does not appear shaky",
    "Make sure your face and eyes are fully visible (except for religious reasons)",
    "Highlight your teaching experience and any relevant teaching certification(s)",
    "Greet your students warmly and invite them to book a lesson"
  ];

  const dontRequirements = [
    "Include your surname or any contact details",
    "Include logos or links",
    "Use slideshows or presentations",
    "Have any other people visible in your video"
  ];

  const additionalDonts = [
    "Use music or sound effects",
    "Film in portrait mode",
    "Record in poor lighting conditions",
    "Have distracting background noise",
    "Speak too fast or too slow",
    "Look away from the camera frequently"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Video introduction</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Video Upload */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Add a horizontal video of up to 2 minutes
            </h4>
            <p className="text-gray-600 mb-4">
              Introduce yourself to students in the same language as your written description. If you teach a different language, include a short sample.{' '}
              <a href="#" className="text-blue-600 underline">Learn more about video guidelines</a>
            </p>
          </div>

          {/* Video Preview/Upload Area */}
          <div className="bg-black rounded-xl overflow-hidden aspect-video relative">
            {formData.introVideo ? (
              <video 
                src={URL.createObjectURL(formData.introVideo)} 
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                <img 
                  src="/images/pic.jpg"
                  alt="Video preview"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="bg-white bg-opacity-20 rounded-full p-4 hover:bg-opacity-30 transition-all">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm">
                  Unmute
                </div>
              </div>
            )}
          </div>

          {/* Re-record Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsRecording(true)}
              className="flex items-center space-x-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Re-record</span>
            </button>
          </div>

          {/* Video Link Option */}
          <div className="space-y-4">
            <p className="text-gray-700">
              Have a pre-recorded video on YouTube or Vimeo?{' '}
              <button 
                onClick={() => {/* Toggle link input */}}
                className="text-blue-600 underline font-medium"
              >
                Insert link
              </button>
            </p>

            <div className="space-y-3">
              <input
                type="url"
                value={videoLink}
                onChange={(e) => handleVideoLinkChange(e.target.value)}
                placeholder="Paste your video URL here..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Thumbnail Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Add a thumbnail (optional)
            </h4>
            <p className="text-gray-600">
              Don't worry if you don't have a thumbnail ready, we'll use the preview above.{' '}
              <a href="#" className="text-blue-600 underline">Learn more about thumbnail guidelines</a>
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleThumbnailUpload(file);
              }}
              className="hidden"
              id="thumbnail-upload"
            />
            <label
              htmlFor="thumbnail-upload"
              className="inline-block bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Upload thumbnail
            </label>

            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-600 font-medium"
            >
              {showMore ? 'Show less' : 'Show more'}
            </button>
          </div>
        </div>

        {/* Right Column - Requirements */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              Video requirements
            </h4>
            <p className="text-gray-600 mb-6">
              Make sure your video meets the requirements to get approved
            </p>
          </div>

          {/* Do Requirements */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Check className="w-5 h-5 text-green-600" />
              <h5 className="font-semibold text-gray-900">Do</h5>
            </div>
            <ul className="space-y-3">
              {doRequirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don't Requirements */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <X className="w-5 h-5 text-red-600" />
              <h5 className="font-semibold text-gray-900">Don't</h5>
            </div>
            <ul className="space-y-3">
              {dontRequirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{requirement}</span>
                </li>
              ))}
              
              {showMore && additionalDonts.map((requirement, index) => (
                <li key={`additional-${index}`} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Tips */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h5 className="font-semibold text-blue-900 mb-2">Pro Tips:</h5>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Practice your introduction a few times before recording</li>
              <li>• Smile and maintain eye contact with the camera</li>
              <li>• Mention your teaching style and what makes you unique</li>
              <li>• End with a call-to-action to book a lesson</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoStep;