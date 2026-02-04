import ClassActionButtons from "@/components/class_details/lessons/ClassActionButtons";
import LiveSessionCard from "@/components/class_details/lessons/LiveSessionCard";
import RecordedLessonCard from "@/components/class_details/lessons/RecordedLessonCard";
import DocumentCard from "@/components/class_details/lessons/DocumentCard";
import AnnouncementCard from "@/components/class_details/lessons/AnnouncementCard";

export default function LessonsPage() {
  return (
    <div className="flex flex-col gap-10 pb-6">
      <ClassActionButtons />
      <LiveSessionCard />
      <RecordedLessonCard />
      <DocumentCard />
      <AnnouncementCard />
    </div>
  );
}
