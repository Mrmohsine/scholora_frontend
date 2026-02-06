'use client';

import { MessageCircle } from "lucide-react";

type Classmate = {
  initials: string;
  name: string;
  online: boolean;
};

interface Props {
  classmates: Classmate[];
}

export default function ClassmatesList({ classmates }: Props) {
  const onlineCount = classmates.filter(c => c.online).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-black">
          Classmates
        </h2>

        <span className="text-sm text-gray-500">
          {onlineCount} online
        </span>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {classmates.map((mate, i) => (
          <ClassmateCard key={i} {...mate} />
        ))}
      </div>

    </div>
  );
}

function ClassmateCard({
  initials,
  name,
  online,
}: Classmate) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm flex justify-between items-center hover:shadow transition">

      {/* Left */}
      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
          {initials}
        </div>

        <div>
          <p className="font-medium text-black">
            {name}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                online ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            {online ? "Online" : "Offline"}
          </div>
        </div>

      </div>

      {/* Chat icon */}
      <button className="text-gray-400 hover:text-black transition">
        <MessageCircle size={20} />
      </button>

    </div>
  );
}