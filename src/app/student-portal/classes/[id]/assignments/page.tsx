import AssignmentCard from "@/components/student_details/homework/AssignmentCard";

export default function AssignmentsPage() {
  return (
    <div className="space-y-4">

      <AssignmentCard
        title="Essay on Shakespeare's Hamlet"
        due="Feb 5, 2026"
        status="pending"
      />

      <AssignmentCard
        title="Quadratic Equations Practice Set"
        due="Feb 3, 2026"
        status="submitted"
      />

      <AssignmentCard
        title="Literature Analysis: Sonnets"
        due="Jan 30, 2026"
        status="graded"
      />

      <AssignmentCard
        title="Poetry Writing Assignment"
        due="Jan 28, 2026"
        status="late"
      />

    </div>
  );
}