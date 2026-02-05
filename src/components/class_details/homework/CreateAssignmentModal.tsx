"use client";

import {
  X,
  Upload,
  FileText,
  Video,
  Plus,
  Link2,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface ResourceButtonProps {
  icon: React.ReactNode;
  label: string;
}

export default function CreateAssignmentModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center text-black ">
      <div className="bg-[#f5f9ff] w-full max-w-2xl max-h-[85vh] rounded-xl shadow-xl border border-[#D1D5DC] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Create New Assignment</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Title */}
          <div>
            <label className="text-sm font-medium ">Assignment Title</label>
            <input
              className="w-full mt-2 border border-[#D1D5DC] rounded-lg px-4 py-2"
              placeholder="Enter assignment title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">
              Description & Instructions
            </label>
            <textarea
              className="w-full mt-2 border border-[#D1D5DC] rounded-lg px-4 py-3 h-32 resize-none"
              placeholder="Provide detailed instructions..."
            />
          </div>

          {/* Resources */}
          <div>
            <label className="text-sm font-medium">Attach Resources</label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <ResourceButton icon={<Upload size={16} />} label="Joindre" />
              <ResourceButton icon={<FileText size={16} />} label="Drive" />
              <ResourceButton icon={<Video size={16} />} label="YouTube" />
              <ResourceButton icon={<Plus size={16} />} label="Créer" />
              <ResourceButton icon={<Upload size={16} />} label="Importer" />
              <ResourceButton icon={<Link2 size={16} />} label="Lien" />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-medium">Due Date</label>
            <div className="relative mt-2">
              <input
                type="datetime-local"
                className="w-full border border-[#D1D5DC] rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Points */}
          <div>
            <label className="text-sm font-medium">Points</label>
            <input
              type="number"
              defaultValue={100}
              className="w-full mt-2 border border-[#D1D5DC] rounded-lg px-4 py-2"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#D1D5DC] rounded-lg"
          >
            Cancel
          </button>
          <button className="px-5 py-2 bg-blue-900 text-white rounded-lg flex items-center gap-2">
            <Plus size={16} />
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

function ResourceButton({ icon, label }: ResourceButtonProps) {
  return (
    <button className="border border-[#D1D5DC] rounded-lg py-3 flex flex-col items-center gap-2 hover:bg-white">
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}
