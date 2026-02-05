"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { authService } from "@/lib/auth/authService";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface TopBarProps {
  user?: {
    first_name: string;
    last_name: string;
    avatar?: string;
    email?: string;
  };
}
const classes = [
  {
    id: 1,
    subject: "Advanced Mathematics",
    grade: "11-12",
    time: "Mon, Wed, Fri - 9:00 AM",
    students: 24,
    status: "Active",
    iconColor: "bg-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    id: 2,
    subject: "Physics Fundamentals",
    grade: "10-11",
    time: "Tue, Thu - 2:00 PM",
    students: 18,
    status: "Active",
    iconColor: "bg-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: 3,
    subject: "Organic Chemistry",
    grade: "12",
    time: "Mon, Wed - 11:00 AM",
    students: 15,
    status: "Active",
    iconColor: "bg-purple-500",
    iconBg: "bg-purple-100",
  },
  {
    id: 4,
    subject: "Calculus Prep",
    grade: "11",
    time: "Thu - 3:00 PM",
    students: 12,
    status: "Active",
    iconColor: "bg-orange-500",
    iconBg: "bg-orange-100",
  },
  {
    id: 5,
    subject: "AP Physics",
    grade: "12",
    time: "Sat - 10:00 AM",
    students: 8,
    status: "Starting Soon",
    iconColor: "bg-teal-500",
    iconBg: "bg-teal-100",
  },
];
export default function TopBar({ user }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openPack, setOpenPack] = useState(false);
  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const { id } = useParams();
  const idString = Array.isArray(id) ? id[0] : id;
  const id_class = parseInt(idString || "1", 10) - 1;
  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link
            href="/tutor-portal/classes"
            className="text-xl text-gray-700 hover:text-black"
          >
              <ArrowLeft size={20} />
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-black">
              {classes[id_class]?.subject || "Class Details"}
            </h1>
            <span className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-700">
              Grade {classes[id_class]?.grade || "11-12"}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <input
            placeholder="Search..."
            className="border rounded-md px-3 py-1.5 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />

          {/* Avatar */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center"
            >
              {user?.avatar ? (
                <img src={user.avatar} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-medium uppercase">
                  {user?.first_name?.charAt(0) || "U"}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-50">
                <div className="px-4 py-3 border-b flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium uppercase">
                        {user?.first_name?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/tutor-portal/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                  >
                    My profile
                  </Link>
                  <Link
                    href="/tutor-portal/settings"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                  >
                    Settings
                  </Link>
                </div>

                <div className="border-t">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
