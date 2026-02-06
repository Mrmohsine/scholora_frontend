import ClassmatesList from "@/components/student_details/people/ClassmatesList";

export default function PeoplePage() {
  const classmates = [
    { initials: "EW", name: "Emma Wilson", online: true },
    { initials: "JC", name: "James Chen", online: true },
    { initials: "SR", name: "Sofia Rodriguez", online: false },
    { initials: "LJ", name: "Liam Johnson", online: true },
    { initials: "OB", name: "Olivia Brown", online: false },
    { initials: "ND", name: "Noah Davis", online: true },
    { initials: "AM", name: "Ava Martinez", online: false },
    { initials: "WG", name: "William Garcia", online: true },
  ];

  return (
    <ClassmatesList classmates={classmates} />
  );
}