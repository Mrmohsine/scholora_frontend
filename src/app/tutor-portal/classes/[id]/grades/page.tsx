'use client';

import { Download, Settings } from "lucide-react";

export default function GradesPage() {
  const assignments = [
    { name: "Essay Analysis", pts: 100 },
    { name: "Vocab Quiz", pts: 50 },
    { name: "Hamlet Discussion", pts: 25 },
    { name: "Poetry Project", pts: 75 },
    { name: "Final Exam", pts: 200 },
  ];

  const students = [
    {
      initials: "WE",
      name: "William Emerson",
      grades: [92, 45, 23, 68, 185],
    },
    {
      initials: "AJ",
      name: "Alice Johnson",
      grades: [88, 48, 25, 72, 192],
    },
    {
      initials: "BS",
      name: "Bob Smith",
      grades: [null, 42, 20, null, null],
    },
    {
      initials: "CD",
      name: "Carol Davis",
      grades: [95, 50, 25, 75, 198],
    },
    {
      initials: "DW",
      name: "David Wilson",
      grades: [78, 38, 22, 65, 170],
    },
    {
      initials: "EB",
      name: "Emma Brown",
      grades: [90, 47, 24, 70, 188],
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto text-black">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Gradebook</h2>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-200  px-3 py-2 rounded">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 border  border-gray-200 px-3 py-2 rounded">
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 ">
            <th className="text-left px-6 py-4">Student</th>
            {assignments.map((a, i) => (
              <th key={i} className="text-center px-6 py-4">
                <div className="font-medium">{a.name}</div>
                <div className="text-xs text-gray-500">{a.pts} pts</div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={i} className="border-b border-gray-200  last:border-none">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                    {s.initials}
                  </div>
                  <span className="font-medium">{s.name}</span>
                </div>
              </td>

              {s.grades.map((g, j) => (
                <td key={j} className="text-center px-6 py-4 font-medium text-blue-600">
                  {g !== null ? g : "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}