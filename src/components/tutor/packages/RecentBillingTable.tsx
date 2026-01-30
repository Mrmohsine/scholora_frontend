import { Download } from "lucide-react";

export default function RecentBillingTable() {
  const data = [
    {
      date: "Jan 15, 2026",
      description: "Pro Pack - Monthly",
      amount: "$79.00",
      status: "Paid",
    },
    {
      date: "Dec 15, 2025",
      description: "Pro Pack - Monthly",
      amount: "$79.00",
      status: "Paid",
    },
    {
      date: "Nov 15, 2025",
      description: "Pro Pack - Monthly",
      amount: "$79.00",
      status: "Paid",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Billing
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="text-left py-3 font-medium">Date</th>
              <th className="text-left py-3 font-medium">Description</th>
              <th className="text-left py-3 font-medium">Amount</th>
              <th className="text-left py-3 font-medium">Status</th>
              <th className="text-right py-3 font-medium">Invoice</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b last:border-b-0">
                <td className="py-6 text-gray-900">{row.date}</td>
                <td className="py-6 text-gray-700">{row.description}</td>
                <td className="py-6 text-gray-900">{row.amount}</td>
                <td className="py-6">
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    {row.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="flex items-center gap-1 text-blue-600 ml-auto hover:cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
