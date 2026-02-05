'use client';

import { Play, MoreHorizontal } from "lucide-react";

export default function RecordedLessonCard() {
  return (
    <div className="bg-[#F0F6FE] rounded-xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            MS
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Prof. Maria Smith</p>
            <p className="text-xs text-gray-500">Posted a video lesson · 1 day ago</p>
          </div>
        </div>

        <MoreHorizontal size={18} className="text-gray-500 cursor-pointer" />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-3">
        Introduction to Shakespearean Sonnets - Understanding the structure and themes of Shakespeare's most famous poems.
      </p>

      {/* Video */}
      <div className="mt-4 relative rounded-lg overflow-hidden bg-gradient-to-br from-indigo-700 to-purple-700 h-[40em] flex items-center justify-center">

        {/* Duration */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          45:32
        </div>

        {/* Play */}
        <div className="flex flex-col items-center text-white opacity-90">
          <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center">
            <Play size={28} />
          </div>
          <p className="text-xs mt-2 font-medium">
            Shakespearean Sonnets Explained
          </p>
          <p className="text-[11px] text-white/70">
            45 minutes · HD Quality
          </p>
        </div>
      </div>
    </div>
  );
}
