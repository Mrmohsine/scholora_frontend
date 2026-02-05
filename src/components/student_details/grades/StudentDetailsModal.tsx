'use client';

import { X, FileText, Eye, Download } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  student: any;
  onClose: () => void;
}

StudentDetailsModal({
  open,
  student,
  onClose,
}: Props) {
  if (!open || !student) return null;

  const [score, setScore] = useState(92);

  function getLetterGrade(value: number) {
    if (value >= 95) return "A+";
    if (value >= 90) return "A-";
    if (value >= 80) return "B";
    if (value >= 70) return "C";
    if (value >= 60) return "D";
    return "F";
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black">

      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 relative">

        {/* Close */}
        <button
          className="absolute right-5 top-5 text-gray-500"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-green-100 text-blue-600 flex items-center justify-center font-semibold">
            {student.initials}
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              {student.name}
            </h3>
            <p className="text-gray-500">
              Overall Grade: 88%
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6 ">
          <Stat label="Average" value="87.5%" color="text-green-600"/>
          <Stat label="Completed" value="12" color="text-blue-600" />
          <Stat label="Missing" value="2" color="text-red-600" />
          <Stat label="Late" value="1" color="text-yellow-600" />
        </div>

        {/* Assignment card */}
        <div className="bg-[#f5f9ff]  border border-gray-100 shadow-sm rounded-lg p-5">

          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-medium text-base">
                Essay: To Kill a Mockingbird Analysis
              </p>

              <div className="flex gap-2 mt-2">
                <span className="text-xs border border-gray-300 px-2 py-1 rounded">
                  Essay
                </span>

                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Completed
                </span>
              </div>
            </div>

            <div className="text-right space-y-1">
              <p className="text-blue-600 font-semibold text-lg">
                {getLetterGrade(score)}
              </p>

              <div className="flex items-center gap-2 justify-end">
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-16 border rounded px-2 py-1 text-sm text-right"
                />
                <span className="text-sm text-gray-500">/100</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-1">
            Due: May 26, 2023
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Submitted: May 25, 2023 11:45 PM
          </p>

          {/* File row with icons */}
          <div className="flex justify-between items-center bg-gray-100 rounded px-3 py-2 mb-4">

            <div className="flex items-center gap-2 text-sm">
              <FileText size={18} className="text-blue-600" />
              <span>
                essay:_to_kill_a_mockingbird_analysis.docx
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm">

              <button className="flex items-center gap-2 text-blue-600 hover:underline">
                <Eye size={18} />
                Open
              </button>

              <button className="flex items-center gap-2 text-green-600 hover:underline">
                <Download size={18} />
                Download
              </button>

            </div>

          </div>
          
        </div>

      </div>
    </div>
  );
}

function Stat({ label, value, color }: any) {
  return (
    <div className="bg-[#f5f9ff] rounded-lg p-4 text-center">
      <p className={`text-xl font-semibold ${color}`}>
        {value}
      </p>
      <p className="text-sm text-gray-500">
        {label}
      </p>
    </div>
  );
}
