import OverallGradeCard from "@/components/student_details/grades/OverallGradeCard";
import RecentGradesTable from "@/components/student_details/grades/RecentGradesTable";

export default function GradesPage() {

  const rows = [
    {
      title: "Literature Analysis: Sonnets",
      category: "Essay",
      date: "Jan 30, 2026",
      score: "85/100",
      percent: "85%",
    },
    {
      title: "Midterm Exam",
      category: "Exam",
      date: "Jan 25, 2026",
      score: "92/100",
      percent: "92%",
    },
    {
      title: "Group Presentation",
      category: "Presentation",
      date: "Jan 20, 2026",
      score: "88/100",
      percent: "88%",
    },
    {
      title: "Weekly Quiz #3",
      category: "Quiz",
      date: "Jan 15, 2026",
      score: "18/20",
      percent: "90%",
    },
    {
      title: "Reading Response",
      category: "Assignment",
      date: "Jan 10, 2026",
      score: "45/50",
      percent: "90%",
    },
  ];

  return (
    <div className="space-y-6">

      <OverallGradeCard
        percent={89}
        delta={2}
        assignments={5}
      />

      <RecentGradesTable rows={rows} />

    </div>
  );
}