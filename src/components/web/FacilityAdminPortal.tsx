import React, { useState } from 'react';
import { CheckIcon, XIcon, WrenchIcon, ToggleLeftIcon, ToggleRightIcon, ClipboardCheckIcon, HomeIcon } from 'lucide-react';

interface Request {
  id: string;
  studentName: string;
  room: string;
  equipment: string[];
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface RoomStatus {
  id: string;
  name: string;
  floor: number;
  maintenance: boolean;
  lastChecked: string;
}

type TabType = 'requests' | 'rooms';

export function FacilityAdminPortal() {
  const [activeTab, setActiveTab] = useState<TabType>('requests');
  const [requestFilter, setRequestFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const [requests] = useState<Request[]>([
    {
      id: '1',
      studentName: 'John Doe',
      room: 'Room 304',
      equipment: ['Projector', 'Aircon'],
      date: 'Jan 24, 2026',
      time: '2:00 PM - 4:00 PM',
      status: 'pending',
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      room: 'Lab 102',
      equipment: ['TV', 'Aircon'],
      date: 'Jan 24, 2026',
      time: '10:00 AM - 12:00 PM',
      status: 'pending',
    },
    {
      id: '3',
      studentName: 'Pedro Garcia',
      room: 'Lecture Hall A',
      equipment: ['Projector', 'TV', 'Aircon'],
      date: 'Jan 23, 2026',
      time: '1:00 PM - 3:00 PM',
      status: 'approved',
    },
  ]);

  const [roomStatuses] = useState<RoomStatus[]>([
    { id: '1', name: 'Room 304', floor: 3, maintenance: false, lastChecked: '2 hours ago' },
    { id: '2', name: 'Lab 102', floor: 1, maintenance: false, lastChecked: '1 hour ago' },
    { id: '3', name: 'Lecture Hall A', floor: 2, maintenance: true, lastChecked: '30 mins ago' },
    { id: '4', name: 'Room 401', floor: 4, maintenance: false, lastChecked: '3 hours ago' },
  ]);

  const filteredRequests = requests.filter(req => req.status === requestFilter);

  const navItems = [
    { id: 'requests' as TabType, label: 'Equipment Requests', icon: ClipboardCheckIcon },
    { id: 'rooms' as TabType, label: 'Room Status', icon: HomeIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop Only */}
      <aside className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="text-4xl mb-2">🏛️</div>
          <h2 className="text-xl font-bold">Facility Admin</h2>
          <p className="text-sm text-white/80">Portal</p>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {navItems.find(item => item.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-gray-600">Manage requests and maintenance</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* EQUIPMENT REQUESTS TAB */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              {/* Filter Tabs */}
              <div className="flex gap-4">
                <button
                  onClick={() => setRequestFilter('pending')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    requestFilter === 'pending'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Pending Requests
                </button>
                <button
                  onClick={() => setRequestFilter('approved')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    requestFilter === 'approved'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => setRequestFilter('rejected')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    requestFilter === 'rejected'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Rejected
                </button>
              </div>

              {/* Requests List */}
              <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">No {requestFilter} requests found</p>
                  </div>
                ) : (
                  filteredRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{request.studentName}</h3>
                          <p className="text-sm text-gray-600">{request.room} • {request.date}</p>
                          <p className="text-sm text-gray-500">{request.time}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          request.status === 'approved' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {request.status}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Requested Equipment:</p>
                        <div className="flex flex-wrap gap-2">
                          {request.equipment.map((item, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => alert(`Approved request for ${request.studentName}`)}
                            className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <CheckIcon className="w-5 h-5" />
                            Approve
                          </button>
                          <button
                            onClick={() => alert(`Rejected request for ${request.studentName}`)}
                            className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <XIcon className="w-5 h-5" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ROOM STATUS TAB */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Room Maintenance Status</h2>
                <p className="text-gray-600">Toggle maintenance mode for rooms</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roomStatuses.map((room) => (
                  <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                        <p className="text-sm text-gray-500">Floor {room.floor}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        room.maintenance ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {room.maintenance ? 'Maintenance' : 'Operational'}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Last checked: {room.lastChecked}</p>
                    </div>

                    <button
                      onClick={() => alert(`Toggled maintenance mode for ${room.name}`)}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                        room.maintenance
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-yellow-600 text-white hover:bg-yellow-700'
                      }`}
                    >
                      {room.maintenance ? <ToggleRightIcon className="w-5 h-5" /> : <WrenchIcon className="w-5 h-5" />}
                      {room.maintenance ? 'Mark as Operational' : 'Mark for Maintenance'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
