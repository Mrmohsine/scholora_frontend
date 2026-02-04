'use client';

import { FileText, ExternalLink } from "lucide-react";

interface Props {
  title: string;
  dueDate: string;
  description: string;
  submitted: number;
  pending: number;
}

export default function AssignmentCard({
  title,
  dueDate,
  description,
  submitted,
  pending,
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

        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
          Due Soon
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
        {description}
      </p>

      {/* Resource */}
      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 text-white rounded flex items-center justify-center">
            <FileText size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700">
              Essay Writing Guidelines
            </p>
            <p className="text-xs text-blue-500">
              Google Slides presentation with MLA format examples
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1 border border-blue-200 text-blue-700 text-sm px-3 py-1.5 rounded hover:bg-blue-100">
          <ExternalLink size={14} />
          Open Slides
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span>
          {submitted} students submitted · {pending} pending
        </span>

        <button className="border px-3 py-1.5 rounded text-sm hover:bg-gray-50">
          View Submissions
        </button>
      </div>
    </div>
  );
}
