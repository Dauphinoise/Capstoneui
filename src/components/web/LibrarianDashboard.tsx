import React, { useState } from 'react';
import { BookOpenIcon, UsersIcon, ClockIcon, TrendingUpIcon, WifiIcon, MonitorIcon, PlusCircleIcon, EditIcon, TrashIcon, MenuIcon, XIcon, LayoutDashboardIcon, DoorClosedIcon } from 'lucide-react';

type TabType = 'overview' | 'rooms';

interface StudyRoom {
  id: string;
  name: string;
  minCapacity: number;
  maxCapacity: number;
  equipment: string[];
  status: 'available' | 'occupied' | 'reserved';
  currentSession?: {
    user: string;
    timeRemaining: string;
    startTime: string;
  };
  utilizationRate: number;
}

export function LibrarianDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showEditRoom, setShowEditRoom] = useState<StudyRoom | null>(null);

  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([
    {
      id: '1',
      name: 'Study Room 101',
      minCapacity: 1,
      maxCapacity: 1,
      equipment: ['Desk', 'Chair', 'Power Outlet'],
      status: 'occupied',
      currentSession: {
        user: 'Juan Dela Cruz',
        timeRemaining: '45 mins',
        startTime: '9:00 AM',
      },
      utilizationRate: 87,
    },
    {
      id: '2',
      name: 'Study Room 102',
      minCapacity: 2,
      maxCapacity: 2,
      equipment: ['Table', 'Chairs', 'Whiteboard', 'Power Outlets'],
      status: 'available',
      utilizationRate: 72,
    },
    {
      id: '3',
      name: 'Study Room 103',
      minCapacity: 4,
      maxCapacity: 4,
      equipment: ['Table', 'Chairs', 'TV Display', 'Whiteboard', 'WiFi'],
      status: 'occupied',
      currentSession: {
        user: 'Study Group - CS101',
        timeRemaining: '1hr 20mins',
        startTime: '8:30 AM',
      },
      utilizationRate: 94,
    },
    {
      id: '4',
      name: 'Study Room 104',
      minCapacity: 4,
      maxCapacity: 4,
      equipment: ['Table', 'Chairs', 'Whiteboard', 'Power Outlets'],
      status: 'reserved',
      utilizationRate: 68,
    },
    {
      id: '5',
      name: 'Study Room 105',
      minCapacity: 6,
      maxCapacity: 6,
      equipment: ['Conference Table', 'Chairs', 'TV Display', 'Whiteboard', 'WiFi'],
      status: 'available',
      utilizationRate: 81,
    },
    {
      id: '6',
      name: 'Study Room 106',
      minCapacity: 6,
      maxCapacity: 6,
      equipment: ['Table', 'Chairs', 'Projector', 'Whiteboard', 'WiFi'],
      status: 'occupied',
      currentSession: {
        user: 'Research Team - Biology',
        timeRemaining: '2hrs 15mins',
        startTime: '8:00 AM',
      },
      utilizationRate: 89,
    },
    {
      id: '7',
      name: 'Study Room 107',
      minCapacity: 8,
      maxCapacity: 8,
      equipment: ['Conference Table', 'Chairs', 'TV Display', 'Projector', 'WiFi'],
      status: 'available',
      utilizationRate: 75,
    },
    {
      id: '8',
      name: 'Study Room 108',
      minCapacity: 8,
      maxCapacity: 8,
      equipment: ['Table', 'Chairs', 'TV Display', 'WiFi'],
      status: 'occupied',
      currentSession: {
        user: 'Thesis Defense Prep',
        timeRemaining: '30 mins',
        startTime: '10:00 AM',
      },
      utilizationRate: 92,
    },
  ]);

  const totalRooms = studyRooms.length;
  const occupiedRooms = studyRooms.filter(r => r.status === 'occupied').length;
  const availableRooms = studyRooms.filter(r => r.status === 'available').length;
  const averageUtilization = Math.round(studyRooms.reduce((acc, r) => acc + r.utilizationRate, 0) / totalRooms);

  const handleAddRoom = () => {
    alert('New study room added successfully!');
    setShowAddRoom(false);
  };

  const handleEditRoom = () => {
    alert('Study room updated successfully!');
    setShowEditRoom(null);
  };

  const handleDeleteRoom = (roomId: string) => {
    if (confirm('Are you sure you want to delete this study room?')) {
      setStudyRooms(prev => prev.filter(r => r.id !== roomId));
      alert('Study room deleted!');
    }
  };

  const navItems = [
    { id: 'overview' as TabType, label: 'Overview', icon: LayoutDashboardIcon },
    { id: 'rooms' as TabType, label: 'Manage Rooms', icon: DoorClosedIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="text-4xl mb-2">📚</div>
          <h2 className="text-xl font-bold">Librarian</h2>
          <p className="text-sm text-white/80">Library Study Rooms</p>
        </div>
        
        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-start">
              <div>
                <div className="text-4xl mb-2">📚</div>
                <h2 className="text-xl font-bold">Librarian</h2>
                <p className="text-sm text-white/80">Library Study Rooms</p>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-white">
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-gray-600 hover:text-gray-900"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {navItems.find(item => item.id === activeTab)?.label}
                </h1>
                <p className="text-sm text-gray-600">Library Study Room Management</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpenIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-700">Total Rooms</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{totalRooms}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <UsersIcon className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-gray-700">Occupied</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{occupiedRooms}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <ClockIcon className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-700">Available</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{availableRooms}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUpIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-700">Avg Utilization</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{averageUtilization}%</p>
                </div>
              </div>

              {/* Room Status Grid */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Current Room Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studyRooms.map((room) => (
                    <div
                      key={room.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900">{room.name}</h4>
                          <p className="text-sm text-gray-500">Capacity: {room.minCapacity === room.maxCapacity ? room.maxCapacity : `${room.minCapacity}-${room.maxCapacity}`}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            room.status === 'available'
                              ? 'bg-green-100 text-green-700'
                              : room.status === 'occupied'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {room.status}
                        </span>
                      </div>

                      {room.currentSession && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-3">
                          <p className="text-xs text-blue-600 font-medium">Current Session</p>
                          <p className="text-sm font-semibold text-blue-900">{room.currentSession.user}</p>
                          <p className="text-xs text-blue-700">
                            Started: {room.currentSession.startTime} • {room.currentSession.timeRemaining} left
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Utilization</span>
                        <span className="font-bold text-gray-900">{room.utilizationRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${room.utilizationRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MANAGE ROOMS TAB */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Manage Study Rooms</h2>
                  <p className="text-gray-600">Add, edit, or remove study rooms</p>
                </div>
                <button
                  onClick={() => setShowAddRoom(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center gap-2"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Add Study Room</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Room Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Equipment</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Utilization</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studyRooms.map((room) => (
                      <tr key={room.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{room.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{room.minCapacity === room.maxCapacity ? room.maxCapacity : `${room.minCapacity}-${room.maxCapacity}`}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{room.equipment.length} items</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              room.status === 'available'
                                ? 'bg-green-100 text-green-700'
                                : room.status === 'occupied'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {room.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{room.utilizationRate}%</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowEditRoom(room)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <EditIcon className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteRoom(room.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <TrashIcon className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Room Modal */}
      {showAddRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Add New Study Room</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                <input
                  type="text"
                  placeholder="Study Room 109"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Capacity</label>
                  <input
                    type="number"
                    placeholder="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Capacity</label>
                  <input
                    type="number"
                    placeholder="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Table, Chairs, Whiteboard, WiFi"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddRoom(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRoom}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Room Modal */}
      {showEditRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Edit Study Room</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                <input
                  type="text"
                  defaultValue={showEditRoom.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Capacity</label>
                  <input
                    type="number"
                    defaultValue={showEditRoom.minCapacity}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Capacity</label>
                  <input
                    type="number"
                    defaultValue={showEditRoom.maxCapacity}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment (comma-separated)</label>
                <input
                  type="text"
                  defaultValue={showEditRoom.equipment.join(', ')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowEditRoom(null)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditRoom}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}