'use client';

import { useParams, usePathname } from "next/navigation";
import TopBar from "@/components/class_details/TopBar";
import Link from "next/link";
import { authService } from "@/lib/auth/authService";
import { useEffect, useState } from "react";

export default function ClassLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(authService.getUser());
  }, []);

  const tabs = ["lessons", "assignments", "people", "grades"];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar user={user} />

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 flex justify-center gap-8">
          {tabs.map(tab => {
            const isActive = pathname.endsWith(`/${tab}`);

            return (
              <Link
                key={tab}
                href={`/tutor-portal/classes/${id}/${tab}`}
                className={`py-3 text-sm font-medium relative ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "lessons" && "Lessons"}
                {tab === "assignments" && "Travaux et devoirs"}
                {tab === "people" && "Personnes"}
                {tab === "grades" && "Grades"}

                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-blue-600 rounded" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8">
        {children}
      </div>
    </div>
  );
}
