import { redirect } from "next/navigation";

export default function ClassIndex({ params }: { params: { id: string } }) {
  redirect(`/student-portal/classes/${params.id}/lessons`);
}
