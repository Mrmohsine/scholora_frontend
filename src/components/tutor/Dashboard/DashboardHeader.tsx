// components/tutor/DashboardHeader.tsx
"use client";

import { useState } from "react";
import { Search, Bell, LogOut, Package, ChevronDown } from "lucide-react";
import { authService } from "@/lib/auth/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RenewPopup from "./RenewPopup";

interface DashboardHeaderProps {
  user?: {
    first_name: string;
    last_name: string;
    avatar?: string;
    email?: string;
    tutor?: {
      pack_subscribed_at: string;
      pack_expires_at: string;
      pricing_pack: {
        name: string;
        slug: string;
        price: string;
      };
    };
  };
}

export default function TutorDashboardHeader({ user }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [openPack, setOpenPack] = useState(false);
  const [showRenew, setShowRenew] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const pack = user?.tutor?.pricing_pack;
  const packSlug = pack?.slug;

  /* ---------- helpers ---------- */

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  const getDaysRemaining = () => {
    const expires = user?.tutor?.pack_expires_at;
    if (!expires) return null;

    const diff =
      new Date(expires).getTime() - new Date().getTime();

    return Math.max(
      0,
      Math.ceil(diff / (1000 * 60 * 60 * 24))
    );
  };

  const getPackProgress = () => {
    const start = user?.tutor?.pack_subscribed_at;
    const end = user?.tutor?.pack_expires_at;

    if (!start || !end) return 0;

    const total =
      new Date(end).getTime() -
      new Date(start).getTime();

    const elapsed =
      new Date().getTime() -
      new Date(start).getTime();

    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const daysRemaining = getDaysRemaining();

  /* ---------- pack state ---------- */

  const isFree = packSlug === "free";
  const nearExpiry =
    packSlug === "professional" &&
    daysRemaining !== null &&
    daysRemaining <= 7;

  /* ---------- logout ---------- */

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /* ---------- UI ---------- */

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">

        {/* Greeting */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Good morning, {user?.first_name}{" "}
            {user?.last_name || ""}
          </h1>

          <p className="text-gray-600 text-sm">
            You have{" "}
            <span className="text-blue-600 font-medium">
              3 classes
            </span>{" "}
            scheduled for today
          </p>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Pack dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenPack(v => !v)}
              className="h-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition"
            >
              <Package className="w-5 h-5" />
              <span>{pack?.name || "No Pack"}</span>
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <ChevronDown className="w-4 h-4" />
            </button>

            {openPack && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border z-50">

                <div className="px-4 py-2 font-semibold text-sm text-black">
                  Your Pack
                </div>

                <div className="h-px bg-gray-200" />

                <div className="px-4 py-3 space-y-2">

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Current Plan
                    </span>
                    <span className="font-semibold text-black">
                      {pack?.name || "No Pack"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Expires
                    </span>
                    <span className="text-green-600 font-medium">
                      {formatDate(
                        user?.tutor?.pack_expires_at
                      )}
                    </span>
                  </div>

                  {/* progress */}
                  <div className="h-2 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all"
                      style={{
                        width: `${getPackProgress()}%`,
                      }}
                    />
                  </div>

                  <p className="text-xs text-gray-500">
                    {daysRemaining !== null
                      ? `${daysRemaining} days remaining`
                      : "No active pack"}
                  </p>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="pt-2 ">

                  <Link
                    href="/tutor-portal/packages"
                    onClick={() => setOpenPack(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 text-black hover:rounded-b-xl"
                  >
                    <Package className="w-5 h-5" />
                    View Pack Details
                  </Link>

                  {/* CTA logic */}

                  {isFree && (
                    <button onClick={() => {
                      setShowRenew(true);
                      setMessage(`Hello support team,\n\nI would like to upgrade my subscription pack. Please let me know the next steps.\n\nThank you!`);
                    }}
                      className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                    >
                      Upgrade Pack
                    </button>
                  )}

                  {nearExpiry && (
                    <button onClick={() => {
                      setShowRenew(true);
                      setMessage(`Hello support team,\n\nI would like to renew my subscription pack. Please let me know the next steps.\n\nThank you!`);
                    }}
                      className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                    >
                      Renew Pack
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
            <RenewPopup
              open={showRenew}
              onClose={() => setShowRenew(false)}
              userEmail={user?.email}
              message={message}
            />

          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-5 h-5" />
          </button>

          {/* Profile dropdown */}
          <div className="relative">

            <button
              onClick={() => setOpen(v => !v)}
              className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm uppercase">
                  {user?.first_name?.[0] || "U"}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-50">

                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-black">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email}
                  </p>
                </div>

                <Link
                  href="/tutor-portal/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  My profile
                </Link>

                <Link
                  href="/tutor-portal/settings"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:rounded-b-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
