'use client';

interface Props {
  initials: string;
  name: string;
  email: string;
}

export default function TeacherCard({ initials, name, email }: Props) {
  return (
    <div className="bg-[#F0F6FE] rounded-xl px-6 py-8 space-y-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-6 text-black">Teacher</h3>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
          {initials}
        </div>

        <div>
          <p className="text-lg font-semibold text-black">
            {name}
          </p>
          <p className="text-sm text-gray-500">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
}