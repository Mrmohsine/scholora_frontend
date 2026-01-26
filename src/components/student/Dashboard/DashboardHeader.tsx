// components/student/DashboardHeader.tsx
"use client";

import { useState } from "react";
import { Search, Bell, LogOut } from "lucide-react";
import { authService } from "@/lib/auth/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/utils/auth";

interface DashboardHeaderProps {
  user?: {
    first_name: string;
    last_name: string;
    avatar?: string;
    email?: string;
  };
}

export default function StudentDashboardHeader({ user }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Center Section - Search */}
        <div className="flex-1 flex justify">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              autoComplete="off"
              name="app-search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-900"
            />
          </div>
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">
              1
            </span>
          </button>

          {/* Profile + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-medium uppercase">
                  {user?.first_name?.charAt(0) || "U"}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border z-50">
                <div className="px-4 py-3 border-b flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center mb-2">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-medium uppercase">
                        {user?.first_name?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1 flex-col">
                    <p className="text-sm font-semibold text-black">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/student-portal/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                  >
                    My profile
                  </Link>
                  <Link
                    href="/student-portal/settings"
                    onClick={() => setOpen(false)}
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
    </header>
  );
}
