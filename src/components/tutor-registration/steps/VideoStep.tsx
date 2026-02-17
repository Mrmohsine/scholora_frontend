"use client";

import { useState, useRef, useEffect } from "react";
import { RotateCcw, Play, X, Check } from "lucide-react";
import { tutorRegistrationApi } from "@/lib/tutor/tutorRegistration";
import Swal from "sweetalert2";

interface VideoStepProps {
  formData: {
    introVideo?: File | null;
    videoLink?: string;
    thumbnail?: File | null;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const VideoStep = ({ formData, onUpdate, onNext }: VideoStepProps) => {
  const [showMore, setShowMore] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoLink, setVideoLink] = useState(formData.videoLink || "");
  const [loading, setLoading] = useState(false);

  // NEW: State to safely manage the video preview URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Safely create and cleanup the video preview URL
  useEffect(() => {
    if (formData.introVideo) {
      const url = URL.createObjectURL(formData.introVideo);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); // Cleanup on unmount or change
    } else {
      setPreviewUrl(null);
    }
  }, [formData.introVideo]);

  // Attach stream to video element once it is actually in the DOM
  useEffect(() => {
    if (isRecording && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play().catch(() => {});
      };
    }
  }, [isRecording]);

  const validateVideo = () => {
    if (!formData.introVideo && !formData.videoLink?.trim()) {
      return "Please upload a video or provide a video link";
    }

    if (formData.videoLink) {
      const urlPattern = /^(https?:\/\/)/i;
      if (!urlPattern.test(formData.videoLink)) {
        return "Please enter a valid video URL";
      }
    }

    return true;
  };

  const handleVideoUpload = (file: File) => {
    if (file.size > 100 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File too large",
        text: "Video must be less than 100MB",
      });
      return;
    }
    onUpdate({ introVideo: file });
  };

  const handleThumbnailUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File too large",
        text: "Thumbnail must be less than 5MB",
      });
      return;
    }
    onUpdate({ thumbnail: file });
  };

  const handleVideoLinkChange = (link: string) => {
    setVideoLink(link);
    onUpdate({ videoLink: link });
  };

  const handleSaveDraft = async () => {
    const validation = validateVideo();
    if (validation !== true) {
      await Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: validation,
      });
      return;
    }

    const tutorId = localStorage.getItem("tutor_id");
    if (!tutorId) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please complete step 1 first.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await tutorRegistrationApi.saveVideoStep(
        parseInt(tutorId),
        formData,
      );

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Draft Saved!",
          text: "Your video has been saved",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to save video",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    const validation = validateVideo();
    if (validation !== true) {
      await Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: validation,
      });
      return;
    }

    const tutorId = localStorage.getItem("tutor_id");
    if (!tutorId) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please complete step 1 first.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await tutorRegistrationApi.saveVideoStep(
        parseInt(tutorId),
        formData,
      );

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Video saved successfully",
          confirmButtonText: "Continue",
          confirmButtonColor: "#2563eb",
          allowOutsideClick: false,
        });

        onNext();
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to save video",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      // Let the browser choose its native, supported format automatically!
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Use the mimeType the browser naturally selected
        const mimeType = mediaRecorder.mimeType || "video/webm";
        const blob = new Blob(chunksRef.current, { type: mimeType });

        // Create a unique filename based on the format
        const ext = mimeType.includes("mp4") ? "mp4" : "webm";
        const file = new File([blob], `recorded-video.${ext}`, {
          type: mimeType,
        });

        onUpdate({ introVideo: file });
        stopCamera();
      };

      // Collect data in chunks every half-second for better reliability
      mediaRecorder.start(500);
      setIsRecording(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Camera error",
        text: "Cannot access camera",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const doRequirements = [
    "Your video should be between 30 seconds and 2 minutes long",
    "Record in horizontal mode and at eye level",
    "Use good lighting and a neutral background",
    "Use a stable surface so that your video does not appear shaky",
    "Make sure your face and eyes are fully visible (except for religious reasons)",
    "Highlight your teaching experience and any relevant teaching certification(s)",
    "Greet your students warmly and invite them to book a lesson",
  ];

  const dontRequirements = [
    "Include your surname or any contact details",
    "Include logos or links",
    "Use slideshows or presentations",
    "Have any other people visible in your video",
  ];

  const additionalDonts = [
    "Use music or sound effects",
    "Film in portrait mode",
    "Record in poor lighting conditions",
    "Have distracting background noise",
    "Speak too fast or too slow",
    "Look away from the camera frequently",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Video introduction
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Video Upload */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Add a horizontal video of up to 2 minutes
            </h4>
            <p className="text-gray-600 mb-4">
              Introduce yourself to students in the same language as your
              written description. If you teach a different language, include a
              short sample.{" "}
              <a href="#" className="text-blue-600 underline">
                Learn more about video guidelines
              </a>
            </p>
          </div>

          {/* Video Preview/Upload Area */}
          <div className="bg-black rounded-xl overflow-hidden aspect-video relative">
            {isRecording ? (
              <video
                ref={videoRef}
                muted
                playsInline
                autoPlay
                controls={false}
                className="w-full h-full object-cover bg-black"
              />
            ) : previewUrl ? (
              // NEW: Using previewUrl here instead of URL.createObjectURL(formData.introVideo)
              <video
                src={previewUrl}
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
                  Camera Preview
                </div>
              </div>
            )}
          </div>

          {/* Upload Video Button */}
          <div className="flex justify-center space-x-4">
            <input
              type="file"
              accept="video/mp4,video/mov,video/avi"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleVideoUpload(file);
              }}
              className="hidden"
              id="video-upload"
              disabled={loading}
            />
            <label
              htmlFor="video-upload"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <span>Upload Video</span>
            </label>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={loading}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                isRecording
                  ? "bg-red-600 text-white hover:bg-red-700 border-red-600"
                  : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <RotateCcw className="w-4 h-4" />

              <span>{isRecording ? "Stop Recording" : "Record Video"}</span>
            </button>
          </div>

          {/* Video Link Option */}
          <div className="space-y-4">
            <p className="text-gray-700">
              Have a pre-recorded video on YouTube or Vimeo?{" "}
              <button className="text-blue-600 underline font-medium">
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
                disabled={loading}
              />
            </div>
          </div>

          {/* Thumbnail Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Add a thumbnail (optional)
            </h4>
            <p className="text-gray-600">
              Don't worry if you don't have a thumbnail ready, we'll use the
              preview above.{" "}
              <a href="#" className="text-blue-600 underline">
                Learn more about thumbnail guidelines
              </a>
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
              disabled={loading}
            />
            <label
              htmlFor="thumbnail-upload"
              className="inline-block bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {formData.thumbnail
                ? formData.thumbnail.name
                : "Upload thumbnail"}
            </label>

            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-600 font-medium"
            >
              {showMore ? "Show less" : "Show more"}
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

              {showMore &&
                additionalDonts.map((requirement, index) => (
                  <li
                    key={`additional-${index}`}
                    className="flex items-start space-x-3"
                  >
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

      {/* Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={loading}
          className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : "Save Draft"}
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={loading}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : "Continue →"}
        </button>
      </div>
    </div>
  );
};

export default VideoStep;
