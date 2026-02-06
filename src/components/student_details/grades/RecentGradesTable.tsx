'use client';

type GradeRow = {
  title: string;
  category: string;
  date: string;
  score: string;
  percent: string;
};

interface Props {
  rows: GradeRow[];
}

export default function RecentGradesTable({ rows }: Props) {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

      <div className="px-6 py-4 font-semibold text-lg text-black">
        Recent Grades
      </div>

      <table className="w-full text-sm">

        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left px-6 py-3">Assignment</th>
            <th className="text-left px-6 py-3">Category</th>
            <th className="text-left px-6 py-3">Date</th>
            <th className="text-right px-6 py-3">Grade</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">

              <td className="px-6 py-4 font-medium text-black">
                {r.title}
              </td>

              <td className="px-6 py-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-[#65758B]">
                  {r.category}
                </span>
              </td>

              <td className="px-6 py-4 text-gray-500">
                {r.date}
              </td>

              <td className="px-6 py-4 text-right font-semibold text-black">
                {r.score}
                <span className="text-gray-500 ml-1">
                  ({r.percent})
                </span>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}