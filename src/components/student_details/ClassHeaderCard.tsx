'use client';

interface Props {
  title: string;
  description: string;
  onEdit?: () => void;
}

export default function ClassHeaderCard({
  title,
  description,
  onEdit,
}: Props) {
  return (
    <div className="bg-blue-600 text-white rounded-xl px-8 py-6 flex justify-between items-center shadow">
      <div>
        <h2 className="text-2xl font-semibold">
          {title}
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}