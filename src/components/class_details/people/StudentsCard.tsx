'use client';

import { MoreHorizontal } from "lucide-react";

interface Student {
  initials: string;
  name: string;
  email: string;
  status: "Active" | "Freeze";
}

interface Props {
  students: Student[];
}

export default function StudentsCard({ students }: Props) {
  return (
    <div className="bg-[#F0F6FE] rounded-xl px-6 py-8 space-y-4 shadow-sm ">
      <h3 className="text-sm font-semibold mb-4 text-black">
        Students ({students.length})
      </h3>

      <div className="space-y-3 ">
        {students.map((s, i) => (
          <StudentRow key={i} {...s} />
        ))}
      </div>
    </div>
  );
}

function StudentRow({
  initials,
  name,
  email,
  status,
}: Student) {
  return (
    <div className="flex items-center justify-between bg-[#F0F6FE]  border rounded-lg px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-medium">
          {initials}
        </div>

        <div>
          <p className="text-sm font-medium text-black">
            {name}
          </p>
          <p className="text-xs text-gray-500">
            {email}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs px-3 py-1 rounded ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {status}
        </span>

        <MoreHorizontal
          size={16}
          className="text-gray-500 cursor-pointer"
        />
      </div>
    </div>
  );
}