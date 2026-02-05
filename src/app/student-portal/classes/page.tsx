"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import StudentSidebar from "@/components/student/Sidebar";
import StudentDashboardHeader from "@/components/student/Dashboard/DashboardHeader";
import { authService } from "@/lib/auth/authService";
import Link from "next/dist/client/link";

function StudentClassesContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const classes = [
    {
      id: 1,
      subject: "Physics Fundamentals",
      grade: "10-11",
      time: "Tue, Thu - 2:00 PM",
      students: 18,
      status: "Active",
      borderColor: "border-t-green-500",
      iconBg: "bg-green-100",
      icon: "⚛️",
    },
    {
      id: 2,
      subject: "Advanced Mathematics",
      grade: "11-12",
      time: "Mon, Wed, Fri - 9:00 AM",
      students: 24,
      status: "Active",
      borderColor: "border-t-blue-500",
      iconBg: "bg-blue-100",
      icon: "📐",
    },
    {
      id: 3,
      subject: "Organic Chemistry",
      grade: "12",
      time: "Mon, Wed - 11:00 AM",
      students: 15,
      status: "Active",
      borderColor: "border-t-purple-500",
      iconBg: "bg-purple-100",
      icon: "🧪",
    },
    {
      id: 4,
      subject: "Calculus Prep",
      grade: "11",
      time: "Fri - 3:00 PM",
      students: 12,
      status: "Active",
      borderColor: "border-t-orange-500",
      iconBg: "bg-orange-100",
      icon: "∫",
    },
    {
      id: 5,
      subject: "AP Physics",
      grade: "12",
      time: "Sat - 10:00 AM",
      students: 8,
      status: "Starting Soon",
      borderColor: "border-t-teal-500",
      iconBg: "bg-teal-100",
      icon: "⚛️",
    },
  ];

  useEffect(() => {
    const userData = authService.getUser();
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <StudentDashboardHeader user={user} />

        {/* Classes Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
              <p className="text-gray-500 mt-1">
                Manage all your classes and schedules
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <span>+</span>
              <span>Join Class</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search classes..."
                className="w-full bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-900"
              />
            </div>
            <select className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-600">
              <option>All Subjects</option>
            </select>
            <select className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-600">
              <option>All Status</option>
            </select>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className={`bg-white rounded-lg border border-gray-200 ${cls.borderColor} border-t-4`}
              >
                {/* Card Content */}
                <div className="p-6">
                  {/* Icon */}
                  <div
                    className={`${cls.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <span className="text-xl text-black font-semibold">
                      {cls.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {cls.subject}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Grade {cls.grade}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📅</span>
                      <span>{cls.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">👥</span>
                      <span>{cls.students} students</span>
                    </div>
                  </div>

                  {/* Status and Button */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cls.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {cls.status}
                    </span>
                  </div>
                </div>

                {/* Enter Class Button */}
                <div className="px-6 pb-6">
                  <Link href={`/student-portal/classes/${cls.id}/lessons`}>
                    <button className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
                      Enter Class
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function StudentClassesPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentClassesContent />
    </ProtectedRoute>
  );
}
