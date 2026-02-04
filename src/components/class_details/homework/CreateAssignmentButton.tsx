'use client';

import { Plus } from "lucide-react";

interface Props {
  onClick?: () => void;
}

export default function CreateAssignmentButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        w-full 
        bg-gradient-to-r from-gray-900 to-gray-800
        text-white 
        py-3 
        rounded-lg 
        flex items-center justify-center gap-2
        text-sm font-medium
        shadow
        hover:from-gray-800 hover:to-gray-700
        transition
      "
    >
      <Plus size={16} />
      Create Assignment
    </button>
  );
}
