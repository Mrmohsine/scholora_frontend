'use client';
import TeacherCard from "@/components/class_details/people/TeacherCard";
import StudentsCard from "@/components/class_details/people/StudentsCard";
import { authService } from "@/lib/auth/authService";
import { useEffect, useState } from "react";

export default function PeoplePage() {
  const students = [
    { initials: "AJ", name: "Alice Johnson", email: "alice.j@student.edu", status: "Active" },
    { initials: "BS", name: "Bob Smith", email: "bob.smith@student.edu", status: "Active" },
    { initials: "CD", name: "Carol Davis", email: "carol.d@student.edu", status: "Freeze" },
    { initials: "DW", name: "David Wilson", email: "david.w@student.edu", status: "Active" },
    { initials: "EB", name: "Emma Brown", email: "emma.b@student.edu", status: "Active" },
    { initials: "FM", name: "Frank Miller", email: "frank.m@student.edu", status: "Active" },
  ];
  const [user, setUser] = useState<any>(null);
  
    useEffect(() => {
      setUser(authService.getUser());
    }, []);
  return (
    <div className="space-y-6 max-w-6xl pb-8 gap-6 flex flex-col">

      <h2 className="text-lg font-semibold text-black mb-0">
        Class Members
      </h2>

      <TeacherCard
        initials={user ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}` : "JD"}
        name={user ? `${user.first_name} ${user.last_name}` : "John Doe"}
        email={user ? user.email : "john.doe@scholora.edu"}
      />

      <StudentsCard students={students} />
    </div>
  );
}