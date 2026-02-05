'use client';

import { Play, Camera, MessageCircle, MoreHorizontal, Upload, Video } from "lucide-react";

export default function LiveSessionCard() {
  return (
    <>
    <div className="bg-[#F0F6FE] rounded-xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Prof. John Doe</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-red-600 font-medium">LIVE NOW</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full" />
              <span className="text-gray-500">24 viewers</span>
            </div>
          </div>
        </div>

        <MoreHorizontal size={18} className="text-gray-500 cursor-pointer" />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-3">
        Join our live discussion on Shakespeare's Hamlet! We'll be analyzing key themes and characters.
      </p>

      {/* Video */}
      <div className="mt-4 relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 h-[40em] flex items-center justify-center ">

        {/* LIVE badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">LIVE</span>
          <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
            24 viewers
          </span>
        </div>

        {/* Play */}
        <div className="flex flex-col items-center text-white opacity-80">
          <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center">
            <Play size={28} />
          </div>
          <p className="text-xs mt-2">Click to join live session</p>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <button className="bg-black/60 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1">
            <Camera size={14} />
            Camera
          </button>
          <button className="bg-black/60 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1">
            <MessageCircle size={14} />
            Chat
          </button>
        </div>

        <div className="absolute bottom-3 right-3 text-xs text-gray-300">
          Started 2 hours ago
        </div>
      </div>
    </div>
    </>
  );
}
