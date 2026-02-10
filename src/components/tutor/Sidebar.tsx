// components/tutor/Sidebar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  DollarSign,
  MessageCircle,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Package,
} from "lucide-react";
import { authService } from "@/lib/auth/authService";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

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

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", href: "/tutor-portal/dashboard", icon: LayoutDashboard },
  { name: "My Pack", href: "/tutor-portal/packages", icon: Package },
  { name: "My Classes", href: "/tutor-portal/classes", icon: BookOpen },
  { name: "Calendar", href: "/tutor-portal/calendar", icon: Calendar },
  { name: "Finance", href: "/tutor-portal/finance", icon: DollarSign },
  { name: "Messages", href: "/tutor-portal/messages", icon: MessageCircle },
  { name: "Students", href: "/tutor-portal/students", icon: Users },
  { name: "Stats", href: "/tutor-portal/stats", icon: BarChart3 },
  { name: "Settings", href: "/tutor-portal/settings", icon: Settings },
];

export default function TutorSidebar({ user }: DashboardHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const pack = user?.tutor?.pricing_pack;

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 max-h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center px-6 border-b border-gray-200 h-20">
        <Link href="/" className="flex items-center h-full">
          <Image
            src="/images/logos/logo_blue.png"
            alt="Scholora Logo"
            width={200}
            height={320}
            className="w-50 h-50 object-contain"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          const showBadge = item.name === "My Pack" && pack;

          const badgeStyles =
            pack?.slug === "professional"
              ? isActive
                ? "bg-white/20 text-white"
                : "bg-blue-100 text-blue-700"
              : isActive
              ? "bg-white/20 text-white"
              : "bg-gray-200 text-gray-700";

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-900 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <div className="flex items-center">
                <Icon
                  className={`w-5 h-5 mr-3 transition-transform duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-900 group-hover:text-blue-700 group-hover:scale-110"
                  }`}
                />
                {item.name}
              </div>

              {/* Pack badge */}
              {showBadge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeStyles}`}
                >
                  {pack.slug === "professional" ? "Pro" : "Free"}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          className="flex w-full items-center px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
