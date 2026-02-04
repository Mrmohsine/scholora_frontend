'use client';

import { Video, Upload } from "lucide-react";

interface Props {
  onStartLive?: () => void;
  onUpload?: () => void;
}

export default function ClassActionButtons({
  onStartLive,
  onUpload,
}: Props) {
  return (
    <>
    {/* Action Buttons */}
    <div className=" flex gap-4">
      <button className="flex-1 bg-gray-900 text-white py-3 rounded-lg flex items-center justify-center gap-2 shadow">
        <Video size={18} />
        <span className="text-sm font-medium">Start Live Session</span>
      </button>

      <button className="flex-1 bg-white border py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 text-black">
        <Upload size={18} />
        <span className="text-sm font-medium">Upload Video / Lesson</span>
      </button>
    </div>
    </>
  );
}
    