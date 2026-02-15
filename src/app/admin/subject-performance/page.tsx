import React from 'react';
import { TrendingUp, TrendingDown, Clock, BarChart3, Calendar, Users } from 'lucide-react';

const SubjectPerformance = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Subject Performance</h1>
            <p className="text-gray-600 text-sm">Monitor subject popularity and session analytics</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">2,456</p>
                <p className="text-green-600 text-sm flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +6.2% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border-2 border-blue-200">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Average Duration</p>
                <p className="text-2xl font-bold text-gray-900">52 min</p>
                <p className="text-green-600 text-sm flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +4.5% from last month
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
                <p className="text-gray-600 text-sm mb-1">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
                <p className="text-green-600 text-sm flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +1.2% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border-2 border-orange-200">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Cancellation Rate</p>
                <p className="text-2xl font-bold text-gray-900">5.8%</p>
                <p className="text-red-600 text-sm flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  -0.8% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center border-2 border-red-200">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Popular Session Categories */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-blue-100 mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Popular Session Categories</h3>
            </div>
            <p className="text-gray-600 text-sm mt-1">Most frequently booked subjects by student enrollment</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Mathematics</p>
                    <p className="text-sm text-gray-500">1247 students</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">28%</span>
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Science</p>
                    <p className="text-sm text-gray-500">965 students</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '22%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">22%</span>
                  <span className="text-sm text-green-600 font-medium">+8%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">English</p>
                    <p className="text-sm text-gray-500">743 students</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '17%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">17%</span>
                  <span className="text-sm text-green-600 font-medium">+10%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Physics</p>
                    <p className="text-sm text-gray-500">654 students</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">15%</span>
                  <span className="text-sm text-green-600 font-medium">+4%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">5</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Chemistry</p>
                    <p className="text-sm text-gray-500">432 students</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">10%</span>
                  <span className="text-sm text-green-600 font-medium">+18%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 border border-blue-200">
                    <span className="text-blue-600 font-semibold text-sm">6</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Biology</p>
                    <p className="text-sm text-gray-500">356 students</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-40">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">8%</span>
                  <span className="text-sm text-green-600 font-medium">+22%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Weekly Session Trends */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-blue-100">
            <div className="p-6 border-b border-gray-100 bg-blue-50">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-700">Weekly Session Trends</h3>
              </div>
              <p className="text-blue-600 text-sm mt-1">Sessions completed and completion rates</p>
              <select className="mt-2 px-3 py-1 text-sm border border-blue-300 rounded-md bg-white text-blue-700">
                <option>Last 6 weeks</option>
              </select>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-8">
                {/* Left side - Weekly Performance */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-6">Weekly Performance</h4>
                  <div className="space-y-6">
                    {[
                      { week: 'Week 1', sessions: '1847', rate: '93.2%', width: '93%' },
                      { week: 'Week 2', sessions: '2134', rate: '94.1%', width: '94%' },
                      { week: 'Week 3', sessions: '1923', rate: '92.8%', width: '93%' },
                      { week: 'Week 4', sessions: '2267', rate: '95.3%', width: '95%' },
                      { week: 'Week 5', sessions: '2089', rate: '94.7%', width: '95%' },
                      { week: 'Week 6', sessions: '2345', rate: '93.9%', width: '94%' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">{item.week}</span>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">{item.sessions}</div>
                            <div className="text-xs text-gray-500">SESSIONS</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: item.width }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-green-600">{item.rate}</span>
                          <span className="text-xs text-gray-500">COMPLETED</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Summary Statistics */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-6">Summary Statistics</h4>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700">Average Completion Rate</p>
                      <p className="text-3xl font-bold text-green-600">94.0%</p>
                      <p className="text-sm text-green-600">↑ 2.3% from last period</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">Total Sessions</p>
                      <p className="text-2xl font-bold text-blue-600">12,599</p>
                      <p className="text-sm text-blue-600">↑ 8.7% from last period</p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-700">Best Performing Week</p>
                      <p className="text-xl font-bold text-purple-600">Week 4</p>
                      <p className="text-sm text-purple-600">95.3% completion rate</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-700">Growth Trend</p>
                      <p className="text-xl font-bold text-orange-600">+15.2%</p>
                      <p className="text-sm text-orange-600">Sessions vs previous 6 weeks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Session Duration Distribution */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-blue-100">
            <div className="p-6 border-b border-gray-100 bg-blue-50">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-700">Session Duration Distribution</h3>
              </div>
              <p className="text-blue-600 text-sm mt-1">Breakdown of session lengths</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {[
                  { range: '15-30 min', count: '4567', percent: '16%', width: '16%' },
                  { range: '30-45 min', count: '8234', percent: '29%', width: '29%' },
                  { range: '45-60 min', count: '9876', percent: '35%', width: '35%' },
                  { range: '60-75 min', count: '4321', percent: '15%', width: '15%' },
                  { range: '75-90 min', count: '1431', percent: '5%', width: '5%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center w-32">
                      <div className="w-4 h-4 bg-gray-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">{item.range}</span>
                    </div>
                    <div className="flex-1 mx-6">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                          <div 
                            className="bg-gray-800 h-2 rounded-full" 
                            style={{ width: item.width }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right w-16">
                      <div className="text-lg font-bold text-gray-900">{item.count}</div>
                      <div className="text-sm text-gray-500">({item.percent})</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">Most Common Duration</p>
                <p className="text-2xl font-bold text-blue-600">45-60 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Peak Session Times */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-orange-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Peak Session Times</h3>
            </div>
            <p className="text-gray-600 text-sm mt-1">Session activity heatmap by day and time</p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-8 gap-2 text-xs">
                <div className="text-gray-600 font-medium"></div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center text-gray-600 font-medium py-2">{day}</div>
                ))}
                
                {['8 AM', '9 AM', '1 PM', '3 PM', '6 PM', '9 PM'].map((time, timeIndex) => (
                  <React.Fragment key={time}>
                    <div className="text-gray-600 font-medium py-3 text-right pr-2">{time}</div>
                    {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => {
                      const values = [
                        [52, 48, 51, 46, 54, 45, 38],
                        [247, 187, 154, 178, 187, 89, 67],
                        [382, 357, 398, 412, 387, 265, 198],
                        [345, 367, 398, 378, 356, 234, 189],
                        [468, 478, 445, 467, 432, 345, 267],
                        [234, 298, 223, 245, 189, 167, 145]
                      ];
                      const value = values[timeIndex][dayIndex];
                      let bgColor = 'bg-blue-100';
                      if (value > 400) bgColor = 'bg-blue-600';
                      else if (value > 300) bgColor = 'bg-blue-500';
                      else if (value > 200) bgColor = 'bg-blue-400';
                      else if (value > 100) bgColor = 'bg-blue-300';
                      else if (value > 50) bgColor = 'bg-blue-200';

                      return (
                        <div key={dayIndex} className={`${bgColor} rounded p-3 text-center text-white font-medium border border-blue-200`}>
                          {value}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-500">Lower activity</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-100 rounded border border-blue-200"></div>
                  <div className="w-3 h-3 bg-blue-200 rounded border border-blue-200"></div>
                  <div className="w-3 h-3 bg-blue-300 rounded border border-blue-200"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded border border-blue-200"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded border border-blue-200"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded border border-blue-200"></div>
                </div>
                <span className="text-xs text-gray-500">Higher activity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPerformance;