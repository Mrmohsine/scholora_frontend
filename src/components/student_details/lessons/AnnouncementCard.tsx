'use client';

import { MoreHorizontal, Heart, MessageCircle } from "lucide-react";

export default function AnnouncementCard() {
  return (
    <div className="bg-[#F0F6FE] rounded-xl px-6 py-8 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
            MS
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Prof. Maria Smith</p>
            <p className="text-xs text-gray-500">
              Posted an announcement · 1 day ago
            </p>
          </div>
        </div>

        <MoreHorizontal size={18} className="text-gray-500 cursor-pointer" />
      </div>

      {/* Content */}
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
        Reminder: Essay on <span className="font-medium">"To Kill a Mockingbird"</span> is due this Friday.
        Please make sure to include proper citations and follow MLA format.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
        <button className="flex items-center gap-2 hover:text-black">
          <Heart size={16} />
          Like
        </button>

        <button className="flex items-center gap-2 hover:text-black">
          <MessageCircle size={16} />
          Comment
        </button>
      </div>
    </div>
  );
}
