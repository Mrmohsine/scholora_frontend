'use client';

import { FileText, Download, MoreHorizontal } from "lucide-react";

export default function DocumentCard() {
  return (
    <div className="bg-[#F0F6FE] rounded-xl px-6 py-8 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
            P
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Prof. David Lee</p>
            <p className="text-xs text-gray-500">Posted 2023-05-20</p>
          </div>
        </div>

        <MoreHorizontal size={18} className="text-gray-500 cursor-pointer" />
      </div>

      {/* Document */}
      <div className="mt-4 bg-gray-50 border rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-black">
              Quadratic Functions Document
            </p>
            <p className="text-xs text-gray-500">30 min read</p>
          </div>
        </div>

        <button className="flex items-center gap-2 border px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-black rounded-xl">
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );
}
