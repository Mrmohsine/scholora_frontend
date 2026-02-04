import { redirect } from "next/navigation";

export default function ClassIndex({ params }: { params: { id: string } }) {
  redirect(`/tutor-portal/classes/${params.id}/lessons`);
}
