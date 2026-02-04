import React, { useState } from 'react';
import { LayoutDashboardIcon, UsersIcon, BuildingIcon, ClockIcon, CalendarIcon, SettingsIcon, TrendingUpIcon, ClipboardListIcon, AlertTriangleIcon, BellIcon, XIcon, CheckIcon } from 'lucide-react';

type AdminView = 'dashboard' | 'users' | 'facilities' | 'queues' | 'schedule' | 'settings';

export function SuperAdminDashboard() {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedUserType, setExpandedUserType] = useState<string | null>(null);
  const [expandedQueue, setExpandedQueue] = useState<string | null>(null);
  const [expandedFacilityIdx, setExpandedFacilityIdx] = useState<number | null>(null);
  const [expandedBookingIdx, setExpandedBookingIdx] = useState<number | null>(null);

  const sidebarItems = [
    { id: 'dashboard' as AdminView, label: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'users' as AdminView, label: 'User Management', icon: UsersIcon },
    { id: 'facilities' as AdminView, label: 'Facilities', icon: BuildingIcon },
    { id: 'queues' as AdminView, label: 'Queue Systems', icon: ClockIcon },
    { id: 'schedule' as AdminView, label: 'Schedules', icon: CalendarIcon },
    { id: 'settings' as AdminView, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop Only */}
      <aside className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Super Admin</h1>
          <p className="text-xs text-gray-500 mt-1">System Management</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              SA
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">System Admin</p>
              <p className="text-xs text-gray-500">admin@university.edu</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {sidebarItems.find(i => i.id === activeView)?.label}
              </h2>
              <p className="text-sm text-gray-500 mt-1">System-wide oversight and management</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BellIcon className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-8 top-20 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <XIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50">
                      <p className="font-medium text-gray-900 text-sm">New booking request</p>
                      <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 border-t">
                      <p className="font-medium text-gray-900 text-sm">System maintenance scheduled</p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 border-t">
                      <p className="font-medium text-gray-900 text-sm">Queue limit reached</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeView === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
                    <UsersIcon className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">8,456</p>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUpIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">+12% this month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Active Bookings</h3>
                    <CalendarIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">142</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Across all facilities</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Queue Tickets</h3>
                    <ClipboardListIcon className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">1,247</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Served today</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Facility Status</h3>
                    <BuildingIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">92%</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
              </div>

              {/* Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Trends</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Classrooms</span>
                        <span className="font-semibold text-gray-900">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Labs</span>
                        <span className="font-semibold text-gray-900">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Study Rooms</span>
                        <span className="font-semibold text-gray-900">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Function Halls</span>
                        <span className="font-semibold text-gray-900">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Queue Performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">ITSO</p>
                        <p className="text-sm text-gray-600">Avg. wait: 12 mins</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">124</p>
                        <p className="text-xs text-gray-500">served today</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Registrar</p>
                        <p className="text-sm text-gray-600">Avg. wait: 18 mins</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">156</p>
                        <p className="text-xs text-gray-500">served today</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Treasury</p>
                        <p className="text-sm text-gray-600">Avg. wait: 15 mins</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-600">98</p>
                        <p className="text-xs text-gray-500">served today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeView === 'users' && (
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">User Management</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage system users and permissions</p>
                  </div>
                  <button 
                    onClick={() => setShowAddUserModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    + Add User
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {['Students', 'Faculty', 'Staff', 'Admins'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setExpandedUserType(expandedUserType === type ? null : type)}
                      className="w-full flex justify-between items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{type}</p>
                        <p className="text-sm text-gray-500">Active users in this category</p>
                        {expandedUserType === type && (
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">Juan Dela Cruz</span>
                              <span className="text-xs text-gray-500">juan.delacruz@univ.edu</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">Maria Santos</span>
                              <span className="text-xs text-gray-500">maria.santos@univ.edu</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">Pedro Garcia</span>
                              <span className="text-xs text-gray-500">pedro.garcia@univ.edu</span>
                            </div>
                            <p className="text-xs text-gray-400 text-center pt-2">+ {type === 'Students' ? '7,231' : type === 'Faculty' ? '889' : type === 'Staff' ? '312' : '12'} more users</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {type === 'Students' ? '7,234' : type === 'Faculty' ? '892' : type === 'Staff' ? '315' : '15'}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">{expandedUserType === type ? 'Click to collapse' : 'Click to expand'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'facilities' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Total Facilities</h4>
                  <p className="text-3xl font-bold text-gray-900">124</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Available Now</h4>
                  <p className="text-3xl font-bold text-green-600">87</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Under Maintenance</h4>
                  <p className="text-3xl font-bold text-red-600">5</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Facility Directory</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { name: 'Main Building - Classrooms', count: 45, status: 'operational', rooms: ['Room 101', 'Room 102', 'Room 103', 'Room 104', '+ 41 more'] },
                      { name: 'Science Labs', count: 12, status: 'operational', rooms: ['Physics Lab A', 'Chemistry Lab B', 'Biology Lab C', '+ 9 more'] },
                      { name: 'Library Study Rooms', count: 8, status: 'operational', rooms: ['Study Room 1', 'Study Room 2', 'Study Room 3', '+ 5 more'] },
                      { name: 'Engineering Building', count: 28, status: 'operational', rooms: ['ENG-101', 'ENG-102', 'Workshop A', '+ 25 more'] },
                      { name: 'Gymnasium & Sports Complex', count: 6, status: 'maintenance', rooms: ['Main Court', 'Training Room', 'Fitness Center', '+ 3 more'] },
                      { name: 'Function Halls', count: 4, status: 'operational', rooms: ['Grand Hall', 'Conference Hall A', 'Conference Hall B', '+ 1 more'] },
                      { name: 'Conference Rooms', count: 15, status: 'operational', rooms: ['Conf A', 'Conf B', 'Conf C', '+ 12 more'] },
                      { name: 'Computer Labs', count: 6, status: 'operational', rooms: ['CompLab 1', 'CompLab 2', 'CompLab 3', '+ 3 more'] },
                    ].map((facility, idx) => (
                      <button
                        key={idx}
                        onClick={() => setExpandedFacilityIdx(expandedFacilityIdx === idx ? null : idx)}
                        className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{facility.name}</p>
                            <p className="text-sm text-gray-500">{facility.count} rooms/spaces</p>
                            {expandedFacilityIdx === idx && (
                              <div className="mt-4 space-y-2">
                                <p className="text-xs font-medium text-gray-700 mb-2">Rooms in this facility:</p>
                                {facility.rooms.map((room, roomIdx) => (
                                  <div key={roomIdx} className="flex justify-between items-center p-2 bg-white rounded text-sm">
                                    <span className="text-gray-900">{room}</span>
                                    {!room.includes('+') && (
                                      <span className="text-xs text-green-600">Available</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              facility.status === 'operational' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {facility.status === 'operational' ? 'Operational' : 'Maintenance'}
                            </span>
                            <span className="text-xs text-blue-600">
                              {expandedFacilityIdx === idx ? 'Click to collapse' : 'Click to expand'}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'queues' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Active Services</h4>
                  <p className="text-3xl font-bold text-gray-900">4</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Total Windows</h4>
                  <p className="text-3xl font-bold text-blue-600">12</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">In Queue Now</h4>
                  <p className="text-3xl font-bold text-blue-600">28</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Avg Wait Time</h4>
                  <p className="text-3xl font-bold text-green-600">15m</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Queue Services Overview</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { name: 'ITSO', icon: '💻', windows: 3, active: 8, served: 124, avgWait: '12 min', color: 'blue', windowList: ['Window 1: Active', 'Window 2: Active', 'Window 3: Idle'] },
                      { name: 'Treasury', icon: '💰', windows: 3, active: 6, served: 98, avgWait: '15 min', color: 'blue', windowList: ['Window 1: Active', 'Window 2: Active', 'Window 3: Active'] },
                      { name: 'Registrar', icon: '📝', windows: 4, active: 12, served: 156, avgWait: '18 min', color: 'green', windowList: ['Window 1: Active', 'Window 2: Active', 'Window 3: Active', 'Window 4: Idle'] },
                      { name: 'Admission', icon: '🎓', windows: 2, active: 2, served: 67, avgWait: '10 min', color: 'blue', windowList: ['Window 1: Active', 'Window 2: Active'] },
                    ].map((service, idx) => (
                      <button
                        key={idx}
                        onClick={() => setExpandedQueue(expandedQueue === service.name ? null : service.name)}
                        className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-12 h-12 bg-gradient-to-br from-${service.color}-500 to-${service.color}-600 rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
                              {service.icon}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900">{service.name}</p>
                              <p className="text-sm text-gray-500">{service.windows} windows • Avg wait: {service.avgWait}</p>
                              {expandedQueue === service.name && (
                                <div className="mt-4 space-y-2">
                                  <p className="text-xs font-medium text-gray-700 mb-2">Window Status:</p>
                                  {service.windowList.map((window, winIdx) => (
                                    <div key={winIdx} className="flex justify-between items-center p-2 bg-white rounded text-sm">
                                      <span className="text-gray-900">{window}</span>
                                      <span className={`text-xs ${
                                        window.includes('Active') ? 'text-green-600' : 'text-gray-500'
                                      }`}>
                                        {window.includes('Active') ? '● Online' : '○ Idle'}
                                      </span>
                                    </div>
                                  ))}
                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <p className="text-xs text-gray-600">Peak hours: 9:00 AM - 11:00 AM, 1:00 PM - 3:00 PM</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-6 ml-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-blue-600">{service.active}</p>
                              <p className="text-xs text-gray-500">In Queue</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-green-600">{service.served}</p>
                              <p className="text-xs text-gray-500">Served Today</p>
                            </div>
                            <span className="text-xs text-blue-600 whitespace-nowrap">
                              {expandedQueue === service.name ? 'Click to collapse' : 'Click to expand'}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'schedule' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Today's Bookings</h4>
                  <p className="text-3xl font-bold text-gray-900">142</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">This Week</h4>
                  <p className="text-3xl font-bold text-blue-600">847</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Pending Approvals</h4>
                  <p className="text-3xl font-bold text-blue-600">23</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Upcoming Reservations</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    View Calendar
                  </button>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { room: 'Room 301', user: 'Dr. Martinez', time: '9:00 AM - 11:00 AM', purpose: 'CS101 Lecture', status: 'confirmed', equipment: 'Projector, Whiteboard', attendees: '45 students' },
                      { room: 'Lab A2', user: 'Prof. Santos', time: '1:00 PM - 3:00 PM', purpose: 'Physics Experiment', status: 'confirmed', equipment: 'Lab equipment, Safety gear', attendees: '25 students' },
                      { room: 'Function Hall', user: 'Student Council', time: '3:00 PM - 6:00 PM', purpose: 'Orientation Event', status: 'pending', equipment: 'Sound system, Stage lighting', attendees: '200+ students' },
                      { room: 'Study Room 3', user: 'Juan Dela Cruz', time: '10:00 AM - 12:00 PM', purpose: 'Group Study', status: 'confirmed', equipment: 'Chairs, Tables', attendees: '6 students' },
                      { room: 'Conference Room B', user: 'Admin Office', time: '2:00 PM - 4:00 PM', purpose: 'Department Meeting', status: 'confirmed', equipment: 'Conference table, Video conferencing', attendees: '12 staff' },
                    ].map((booking, idx) => (
                      <button
                        key={idx}
                        onClick={() => setExpandedBookingIdx(expandedBookingIdx === idx ? null : idx)}
                        className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-bold text-gray-900">{booking.room}</p>
                            <p className="text-sm text-gray-600">{booking.user} • {booking.time}</p>
                            <p className="text-xs text-gray-500 mt-1">{booking.purpose}</p>
                            {expandedBookingIdx === idx && (
                              <div className="mt-4 space-y-2 pt-3 border-t border-gray-200">
                                <div className="flex items-start gap-2">
                                  <span className="text-xs font-medium text-gray-700 w-24">Equipment:</span>
                                  <span className="text-xs text-gray-600">{booking.equipment}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-xs font-medium text-gray-700 w-24">Attendees:</span>
                                  <span className="text-xs text-gray-600">{booking.attendees}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-xs font-medium text-gray-700 w-24">Booking ID:</span>
                                  <span className="text-xs text-gray-600">BKNG-{1000 + idx}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </span>
                            <span className="text-xs text-blue-600 whitespace-nowrap">
                              {expandedBookingIdx === idx ? 'Click to collapse' : 'Click to expand'}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">System Configuration</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage system-wide settings and parameters</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Booking Settings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Maximum Advance Booking</p>
                          <p className="text-sm text-gray-500">How far in advance can users book</p>
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg">
                          <option>7 days</option>
                          <option>14 days</option>
                          <option>30 days</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Booking Duration Limit</p>
                          <p className="text-sm text-gray-500">Maximum hours per booking</p>
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg">
                          <option>2 hours</option>
                          <option>4 hours</option>
                          <option>8 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Queue Settings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Ticket Validity Duration</p>
                          <p className="text-sm text-gray-500">Auto-expire tickets after</p>
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg">
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>2 hours</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Enable Virtual Queuing</p>
                          <p className="text-sm text-gray-500">Allow students to join queue remotely</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Notification Settings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-500">Send booking confirmations via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Send queue updates via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Save All Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAddUserModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Add New User</h3>
              <button onClick={() => setShowAddUserModal(false)}>
                <XIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Juan Dela Cruz" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="juan.delacruz@university.edu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Role</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Select Role...</option>
                  <option>Student</option>
                  <option>Faculty</option>
                  <option>Staff</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Computer Science" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-gray-700">Book Facilities</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-gray-700">Access Queue System</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-gray-700">View Reports</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowAddUserModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowAddUserModal(false);
                }} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}