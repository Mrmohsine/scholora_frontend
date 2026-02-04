'use client';

import { Video, ExternalLink } from "lucide-react";

interface Props {
  title: string;
  dueDate: string;
  description: string;
  completedCount: number;
}

export default function CompletedAssignmentCard({
  title,
  dueDate,
  description,
  completedCount,
}: Props) {
  return (
    <div className="bg-[#F0F6FE] rounded-xl px-6 py-8 space-y-4 shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-black">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Due: {dueDate}
          </p>
        </div>

        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
          Completed
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
        {description}
      </p>

      {/* Linked Resource */}
      <div className="mt-4 bg-red-50 border border-red-100 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-600 text-white rounded flex items-center justify-center">
            <Video size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-red-700">
              Shakespearean Language Explained
            </p>
            <p className="text-xs text-red-500">
              Video tutorial on understanding Elizabethan English
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1 border border-red-200 text-red-700 text-sm px-3 py-1.5 rounded hover:bg-red-100">
          <ExternalLink size={14} />
          Watch Video
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span>
          {completedCount} students completed
        </span>

        <button className="border px-3 py-1.5 rounded text-sm hover:bg-gray-50">
          View Submissions
        </button>
      </div>
    </div>
  );
}
