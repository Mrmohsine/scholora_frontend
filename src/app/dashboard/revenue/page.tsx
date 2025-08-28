import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, Calendar, MoreHorizontal, Search, Filter } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Revenue Management</h1>
            <p className="text-gray-600 text-sm">Comprehensive financial analytics and revenue tracking</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              📅 Last 30 Days
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              📊 Export
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$47,250</p>
                <p className="text-green-600 text-sm flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% vs last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Avg Revenue Per User</p>
                <p className="text-2xl font-bold text-gray-900">$18.50</p>
                <p className="text-green-600 text-sm flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.2% vs last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Revenue Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900">15.8%</p>
                <p className="text-red-600 text-sm flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  -2.1% vs last month
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Tutor Payouts (COGS)</p>
                <p className="text-2xl font-bold text-gray-900">$25,744</p>
                <p className="text-green-600 text-sm flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +9.4% vs last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Monthly Revenue Trend */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue Trend</h3>
            </div>
            <div className="flex items-end space-x-2 h-64">
              <div className="flex flex-col items-center">
                <div className="w-8 h-12 bg-blue-300 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Jan</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-16 bg-blue-400 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Feb</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-20 bg-blue-400 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Mar</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-24 bg-blue-500 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Apr</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-32 bg-blue-500 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">May</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-36 bg-blue-600 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Jun</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-40 bg-blue-600 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Jul</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-36 bg-blue-600 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Aug</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-40 bg-blue-700 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Sep</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-44 bg-blue-700 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Oct</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-48 bg-blue-800 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Nov</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-40 bg-blue-600 rounded-t mb-2"></div>
                <span className="text-xs text-gray-600">Dec</span>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-4">
              <span>Peak: $52,400 (Nov)</span>
              <span>Average: $41,200</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Visa</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">45.2%</div>
                  <div className="text-xs text-gray-500">$21,357</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Mastercard</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">32.8%</div>
                  <div className="text-xs text-gray-500">$15,498</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-600 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">American Express</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">15.4%</div>
                  <div className="text-xs text-gray-500">$7,279</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">PayPal</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">6.6%</div>
                  <div className="text-xs text-gray-500">$3,116</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              </div>
              <button className="text-blue-600 text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs font-semibold">S</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Student Payment</p>
                    <p className="text-xs text-gray-500">Alice Johnson • 2 min ago</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">+$120.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-red-600 text-xs font-semibold">T</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tutor Payout</p>
                    <p className="text-xs text-gray-500">Dr. Smith • 5 min ago</p>
                  </div>
                </div>
                <span className="text-red-600 font-semibold">-$96.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs font-semibold">S</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Student Payment</p>
                    <p className="text-xs text-gray-500">Bob Smith • 12 min ago</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">+$90.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-xs font-semibold">P</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Platform Fee</p>
                    <p className="text-xs text-gray-500">System • 16 min ago</p>
                  </div>
                </div>
                <span className="text-blue-600 font-semibold">+$24.00</span>
              </div>
            </div>
          </div>

          {/* Top Performing Tutors */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Tutors</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">DW</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Dr. Wilson</p>
                    <p className="text-sm text-gray-500">31 students • 198 sessions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">$3,168</p>
                  <p className="text-sm text-green-600">+15.2%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">DS</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Dr. Smith</p>
                    <p className="text-sm text-gray-500">24 students • 156 sessions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">$2,496</p>
                  <p className="text-sm text-green-600">+12.8%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">PD</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Prof. Davis</p>
                    <p className="text-sm text-gray-500">18 students • 124 sessions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">$1,984</p>
                  <p className="text-sm text-green-600">+8.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Monthly Payments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Student Monthly Payments</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search payments..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Payment Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Payment Method</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tutor</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold text-sm">AJ</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Alice Johnson</p>
                        <p className="text-sm text-gray-500">alice@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Jan 15, 2024</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">$120.00</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-700">Visa •••• 4532</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Dr. Smith</td>
                  <td className="px-6 py-4 text-gray-900">Math, Physics</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-semibold text-sm">BS</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Bob Smith</p>
                        <p className="text-sm text-gray-500">bob@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Jan 14, 2024</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">$90.00</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-700">Mastercard •••• 5678</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Prof. Davis</td>
                  <td className="px-6 py-4 text-gray-900">Chemistry</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-orange-600 font-semibold text-sm">CD</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Carol Davis</p>
                        <p className="text-sm text-gray-500">carol@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Jan 13, 2024</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">$150.00</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-700">American Express •••• 9012</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Dr. Wilson</td>
                  <td className="px-6 py-4 text-gray-900">Math, English</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tutor Payouts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Tutor Payouts (COGS)</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search tutors..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tutor</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Students</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sessions</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Gross Revenue</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Platform Fee (20%)</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Net Payout</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Payout Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold text-sm">DS</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Dr. Smith</p>
                        <p className="text-sm text-gray-500">Math, Physics</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">24</td>
                  <td className="px-6 py-4 text-gray-900">156</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">$3,120.00</td>
                  <td className="px-6 py-4 text-red-600 font-semibold">-$624.00</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">$2,496.00</td>
                  <td className="px-6 py-4 text-gray-900">Jan 31, 2024</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-semibold text-sm">PD</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Prof. Davis</p>
                        <p className="text-sm text-gray-500">Chemistry, Biology</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">18</td>
                  <td className="px-6 py-4 text-gray-900">124</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">$2,480.00</td>
                  <td className="px-6 py-4 text-red-600 font-semibold">-$496.00</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">$1,984.00</td>
                  <td className="px-6 py-4 text-gray-900">Feb 28, 2024</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 font-semibold text-sm">DW</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Dr. Wilson</p>
                        <p className="text-sm text-gray-500">English, Literature</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">31</td>
                  <td className="px-6 py-4 text-gray-900">198</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">$3,960.00</td>
                  <td className="px-6 py-4 text-red-600 font-semibold">-$792.00</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">$3,168.00</td>
                  <td className="px-6 py-4 text-gray-900">Mar 31, 2024</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;