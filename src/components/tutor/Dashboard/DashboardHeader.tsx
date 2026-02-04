// components/tutor/DashboardHeader.tsx
"use client";

import { useState } from "react";
import { Search, Bell, LogOut,Package,ChevronDown } from "lucide-react";
import { authService } from "@/lib/auth/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardHeaderProps {
  user?: {
    first_name: string;
    last_name: string;
    avatar?: string;
    email?: string;
  };
}

export default function TutorDashboardHeader({ user }: DashboardHeaderProps) {
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

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Greeting */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Good morning, {user?.first_name} {user?.last_name || "Dr. Johnson"}!
          </h1>
          <p className="text-gray-600 text-sm">
            You have{" "}
            <span className="text-blue-600 font-medium">3 classes</span>{" "}
            scheduled for today
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              autoComplete="off"
              name="app-search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
            />
          </div>
          {/* Pack  */}
          <div className="relative">
            <button
              onClick={() => setOpenPack((v) => !v)}
              className="
                h-10
                inline-flex items-center gap-2
                px-3 py-1.5
                rounded-lg
                border border-blue-200
                bg-blue-50
                text-blue-700 text-sm font-medium
                hover:bg-blue-100
                transition
              "
            >
              <Package className={`w-5 h-5`} />

              <span>Pro Pack</span>

              <span className="w-2 h-2 rounded-full bg-green-500" />

              <ChevronDown className="w-4 h-4" />
            </button>

            {openPack && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border z-50">
                {/* Header */}
                <div className="px-4 py-2 font-semibold text-sm text-black">
                  Your Pack
                </div>

                <div className="h-px bg-gray-200" />

                {/* Content */}
                <div className="px-4 py-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Current Plan</span>
                    <span className="font-semibold text-black">Pro Pack</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expires</span>
                    <span className="text-green-600 font-medium">
                      Mar 15, 2026
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-blue-600 rounded-full" />
                  </div>

                  <p className="text-xs text-gray-500">45 days remaining</p>
                </div>

                <div className="h-px bg-gray-200" />

                {/* Actions */}
                <div className="py-1">
                  <Link
                    href="/tutor-portal/packages"
                    onClick={() => setOpenPack(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm  text-black hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Package className={`w-5 h-5`} />
                    View Pack Details
                  </Link>

                  <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50">
                    Upgrade Pack
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">
                1
              </span>
            </button>
          </div>

          {/* Profile + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
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
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
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
                    href="/tutor-portal/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                  >
                    My profile
                  </Link>
                  <Link
                    href="/tutor-portal/settings"
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
