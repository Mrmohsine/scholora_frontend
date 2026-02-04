import CreateAssignmentButton from "@/components/class_details/homework/CreateAssignmentButton";
import AssignmentCard from "@/components/class_details/homework/AssignmentCard";
import CompletedAssignmentCard from "@/components/class_details/homework/CompletedAssignmentCard";

export default function AssignmentsPage() {
  return (
    <div className="flex flex-col gap-10 pb-6">
        <CreateAssignmentButton />
        <AssignmentCard
        title="Essay: To Kill a Mockingbird Analysis"
        dueDate="Friday, May 26, 2023 · 11:59 PM"
        description="Write a 1000-word essay analyzing the themes of prejudice and moral growth in Harper Lee's 'To Kill a Mockingbird'. Include proper MLA citations and at least 3 scholarly sources."
        submitted={18}
        pending={6}
        />
        <CompletedAssignmentCard
        title="Shakespeare Vocabulary Quiz"
        dueDate="Wednesday, May 24, 2023 · 2:00 PM"
        description="Complete the vocabulary quiz covering Shakespearean terms and phrases from Acts I–III of Hamlet."
        completedCount={24}
        />
    </div>
  );
}
