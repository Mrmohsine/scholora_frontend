'use client';

import CreateAssignmentButton from "@/components/class_details/homework/CreateAssignmentButton";
import AssignmentCard from "@/components/class_details/homework/AssignmentCard";
import CompletedAssignmentCard from "@/components/class_details/homework/CompletedAssignmentCard";
import { useState } from "react";
import CreateAssignmentModal from "@/components/class_details/homework/CreateAssignmentModal";

export default function AssignmentsPage() {
   const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-10 pb-6">
       <CreateAssignmentButton onClick={() => setOpen(true)} />
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
        <CreateAssignmentModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
