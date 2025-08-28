import React from 'react';
import { MessageSquare, Clock, CheckCircle, AlertCircle, Users, TrendingUp, TrendingDown, Star, Search, Filter, MoreHorizontal } from 'lucide-react';

const SupportDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Dashboard</h1>
            <p className="text-gray-600 text-sm">Customer support analytics and ticket management</p>
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
          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-green-600 text-sm flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.3% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border-2 border-blue-200">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">2.4h</p>
                <p className="text-green-600 text-sm flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  -12.5% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center border-2 border-green-200">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Resolution Rate</p>
                <p className="text-2xl font-bold text-gray-900">89.2%</p>
                <p className="text-green-600 text-sm flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +3.1% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border-2 border-orange-200">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Customer Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                <p className="text-green-600 text-sm flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +0.2 from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center border-2 border-purple-200">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Categories */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-blue-100 mb-8">
          <div className="p-6 border-b border-gray-100 bg-blue-50">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-blue-700">Support Ticket Categories</h3>
            </div>
            <p className="text-blue-600 text-sm mt-1">Most common support issues and their resolution rates</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Technical Issues</p>
                    <p className="text-sm text-gray-500">456 tickets</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '37%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">37%</span>
                  <span className="text-sm text-green-600 font-medium">92% resolved</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Payment Problems</p>
                    <p className="text-sm text-gray-500">289 tickets</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">23%</span>
                  <span className="text-sm text-green-600 font-medium">88% resolved</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Account Issues</p>
                    <p className="text-sm text-gray-500">234 tickets</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '19%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">19%</span>
                  <span className="text-sm text-green-600 font-medium">94% resolved</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Feature Requests</p>
                    <p className="text-sm text-gray-500">156 tickets</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">12%</span>
                  <span className="text-sm text-orange-600 font-medium">76% resolved</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">5</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">General Inquiries</p>
                    <p className="text-sm text-gray-500">112 tickets</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '9%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">9%</span>
                  <span className="text-sm text-green-600 font-medium">98% resolved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Response Time Trends */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-green-100">
            <div className="p-6 border-b border-gray-100 bg-green-50">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-700">Response Time Trends</h3>
              </div>
              <p className="text-green-600 text-sm mt-1">Average response times over last 6 weeks</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {[
                  { week: 'Week 1', time: '3.2h', improvement: '-5%' },
                  { week: 'Week 2', time: '2.8h', improvement: '-12%' },
                  { week: 'Week 3', time: '3.1h', improvement: '+11%' },
                  { week: 'Week 4', time: '2.4h', improvement: '-23%' },
                  { week: 'Week 5', time: '2.6h', improvement: '+8%' },
                  { week: 'Week 6', time: '2.2h', improvement: '-15%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{item.week}</span>
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-bold text-gray-900">{item.time}</div>
                      <span className={`text-sm font-medium ${item.improvement.startsWith('-') ? 'text-green-600' : 'text-red-600'}`}>
                        {item.improvement}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">Target Response Time</p>
                  <p className="text-xl font-bold text-green-600">&lt; 2 hours</p>
                  <p className="text-sm text-green-600">Goal achievement: 78%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Performance */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-purple-100">
            <div className="p-6 border-b border-gray-100 bg-purple-50">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-purple-700">Top Performing Agents</h3>
              </div>
              <p className="text-purple-600 text-sm mt-1">Agent performance by tickets resolved</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'Sarah Johnson', resolved: '156', rating: '4.9', efficiency: '94%' },
                  { name: 'Mike Chen', resolved: '142', rating: '4.8', efficiency: '91%' },
                  { name: 'Emma Wilson', resolved: '138', rating: '4.7', efficiency: '89%' },
                  { name: 'Alex Rodriguez', resolved: '124', rating: '4.8', efficiency: '87%' },
                  { name: 'Lisa Park', resolved: '119', rating: '4.9', efficiency: '92%' }
                ].map((agent, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        index === 0 ? 'bg-yellow-100 border border-yellow-300' : 
                        index === 1 ? 'bg-gray-100 border border-gray-300' : 
                        index === 2 ? 'bg-orange-100 border border-orange-300' : 
                        'bg-blue-100 border border-blue-300'
                      }`}>
                        <span className={`font-semibold text-sm ${
                          index === 0 ? 'text-yellow-600' : 
                          index === 1 ? 'text-gray-600' : 
                          index === 2 ? 'text-orange-600' : 
                          'text-blue-600'
                        }`}>
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{agent.name}</p>
                        <p className="text-sm text-gray-500">{agent.resolved} tickets resolved</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-semibold text-gray-900">{agent.rating}</span>
                      </div>
                      <p className="text-sm text-green-600">{agent.efficiency} efficiency</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-orange-100 mb-8">
          <div className="p-6 border-b border-gray-100 bg-orange-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                <h3 className="text-lg font-semibold text-orange-700">Recent Support Tickets</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search tickets..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">#TK-2024-001</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">John Smith</p>
                      <p className="text-sm text-gray-500">john@example.com</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Login issues with tutoring platform</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Technical</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">High</span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Sarah Johnson</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">2 hours ago</td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">#TK-2024-002</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">Maria Garcia</p>
                      <p className="text-sm text-gray-500">maria@example.com</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Payment not processing correctly</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Payment</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">Medium</span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Mike Chen</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Resolved</span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">4 hours ago</td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">#TK-2024-003</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">David Lee</p>
                      <p className="text-sm text-gray-500">david@example.com</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Request for new math tutor feature</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Feature</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Low</span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Emma Wilson</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Open</span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">1 day ago</td>
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
      </div>
    </div>
  );
};

export default SupportDashboard;