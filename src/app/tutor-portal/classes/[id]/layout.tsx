'use client';

import { useParams, usePathname } from "next/navigation";
import TopBar from "@/components/class_details/TopBar";
import Link from "next/link";
import { authService } from "@/lib/auth/authService";
import { useEffect, useState } from "react";
import ClassHeaderCard from "@/components/class_details/ClassHeaderCard";

export default function ClassLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(authService.getUser());
  }, []);

  const tabs = ["lessons", "assignments", "people", "grades"];
   const classes = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      grade: '11-12',
      time: 'Mon, Wed, Fri - 9:00 AM',
      students: 24,
      status: 'Active',
      iconColor: 'bg-blue-500',
      iconBg: 'bg-blue-100'
    },
    {
      id: 2,
      subject: 'Physics Fundamentals',
      grade: '10-11',
      time: 'Tue, Thu - 2:00 PM',
      students: 18,
      status: 'Active',
      iconColor: 'bg-green-500',
      iconBg: 'bg-green-100'
    },
    {
      id: 3,
      subject: 'Organic Chemistry',
      grade: '12',
      time: 'Mon, Wed - 11:00 AM',
      students: 15,
      status: 'Active',
      iconColor: 'bg-purple-500',
      iconBg: 'bg-purple-100'
    },
    {
      id: 4,
      subject: 'Calculus Prep',
      grade: '11',
      time: 'Thu - 3:00 PM',
      students: 12,
      status: 'Active',
      iconColor: 'bg-orange-500',
      iconBg: 'bg-orange-100'
    },
    {
      id: 5,
      subject: 'AP Physics',
      grade: '12',
      time: 'Sat - 10:00 AM',
      students: 8,
      status: 'Starting Soon',
      iconColor: 'bg-teal-500',
      iconBg: 'bg-teal-100'
    }
  ];
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
      {/* BLUE HEADER GOES HERE */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <ClassHeaderCard
          title={classes[id as unknown as number - 1].subject}
          description={`${classes[id as unknown as number - 1].grade} • ${classes[id as unknown as number - 1].time} • ${classes[id as unknown as number - 1].students} students`}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        {children}
      </div>
    </div>
  );
}
