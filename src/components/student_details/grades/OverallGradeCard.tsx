'use client';

import { Award, TrendingUp } from "lucide-react";

interface Props {
  percent: number;
  delta?: number;
  assignments: number;
}

export default function OverallGradeCard({
  percent,
  delta = 0,
  assignments,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <div className="flex justify-between items-center mb-4">

        <div>
          <h2 className="text-lg font-semibold text-black">
            Overall Grade
          </h2>

          <p className="text-sm text-gray-500">
            Based on {assignments} assignments
          </p>
        </div>

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Award className="text-green-600" size={22} />
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold text-black">
              {percent}%
            </p>

            {delta !== 0 && (
              <p className="text-sm text-green-600 flex items-center gap-1 justify-end">
                <TrendingUp size={14} />
                +{delta}% from last week
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600"
          style={{ width: `${percent}%` }}
        />
      </div>

    </div>
  );
}