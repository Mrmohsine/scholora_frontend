

'use client';

import { FileText, Download, Upload, Clock, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "pending" | "submitted" | "graded" | "late";

interface Props {
  title: string;
  due: string;
  status: Status;
  grade?: string;
  onDownload?: () => void;
  onUpload?: () => void;
}

export default function AssignmentCard({
  title,
  due,
  status,
  grade,
  onDownload,
  onUpload,
}: Props) {
  return (
    <div className="bg-white border rounded-xl px-6 py-5 shadow-sm flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
          <FileText size={22} className="text-blue-600" />
        </div>

        <div>
          <p className="font-semibold text-black text-lg">
            {title}
          </p>
          <p className="text-sm text-gray-500">
            Due: {due}
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {status === "pending" && (
          <StatusBadge
            icon={<Clock size={14} />}
            label="Pending"
            className="bg-yellow-100 text-yellow-700"
          />
        )}

        {status === "submitted" && (
          <StatusBadge
            icon={<CheckCircle2 size={14} />}
            label="Submitted"
            className="bg-green-100 text-green-700"
          />
        )}

        {status === "graded" && (
          <>
            <StatusBadge
              icon={<CheckCircle2 size={14} />}
              label="Graded"
              className="bg-blue-100 text-blue-700"
            />
          </>
        )}

        {status === "late" && (
          <StatusBadge
            icon={<AlertCircle size={14} />}
            label="Late"
            className="bg-red-100 text-red-700"
          />
        )}

        <button
          onClick={onDownload}
          className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-black rounded-lg hover:bg-gray-50"
        >
          <Download size={16} />
          Download
        </button>

        {status === "pending" && (
          <button
            onClick={onUpload}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Upload size={16} />
            Upload
          </button>
        )}

      </div>
    </div>
  );
}

function StatusBadge({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className: string;
}) {
  return (
    <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${className}`}>
      {icon}
      {label}
    </span>
  );
}