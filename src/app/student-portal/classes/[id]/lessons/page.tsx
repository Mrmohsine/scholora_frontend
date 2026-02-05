
import LiveSessionCard from "@/components/student_details/lessons/LiveSessionCard";
import RecordedLessonCard from "@/components/student_details/lessons/RecordedLessonCard";
import DocumentCard from "@/components/student_details/lessons/DocumentCard";
import AnnouncementCard from "@/components/student_details/lessons/AnnouncementCard";

export default function LessonsPage() {
  return (
    <div className="flex flex-col gap-10 pb-6">
      <LiveSessionCard />
      <RecordedLessonCard />
      <DocumentCard />
      <AnnouncementCard />
    </div>
  );
}
