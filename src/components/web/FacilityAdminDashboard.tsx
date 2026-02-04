import React, { useState } from 'react';
import { BuildingIcon, XIcon, UsersIcon, WrenchIcon, ClipboardCheckIcon, PlusCircleIcon, EditIcon, CheckCircleIcon, XCircleIcon, LayoutDashboardIcon, CheckSquareIcon, DoorOpenIcon } from 'lucide-react';

type FacilityType = 'all' | 'classroom' | 'lab' | 'gym' | 'hall';
type TabType = 'dashboard' | 'approvals' | 'rooms';

interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  minCapacity: number;
  maxCapacity: number;
  status: 'available' | 'occupied' | 'maintenance';
  equipment: string[];
  currentBooking?: {
    user: string;
    timeSlot: string;
  };
}

interface EquipmentRequest {
  id: string;
  studentName: string;
  roomName: string;
  date: string;
  time: string;
  equipment: string[];
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  userType: 'student' | 'faculty';
}

export function FacilityAdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [activeType, setActiveType] = useState<FacilityType>('all');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showEditRoom, setShowEditRoom] = useState<Facility | null>(null);

  const [equipmentRequests, setEquipmentRequests] = useState<EquipmentRequest[]>([
    {
      id: '1',
      studentName: 'Juan Dela Cruz',
      roomName: 'Room 304',
      date: 'Jan 25, 2024',
      time: '2:00 PM - 4:00 PM',
      equipment: ['Projector', 'Microphone', 'Speakers'],
      purpose: 'Group presentation for CS-201',
      status: 'pending',
      userType: 'student',
    },
    {
      id: '2',
      studentName: 'Maria Santos',
      roomName: 'Function Hall A',
      date: 'Jan 26, 2024',
      time: '9:00 AM - 12:00 PM',
      equipment: ['Stage', 'Sound System', 'Lighting'],
      purpose: 'Student organization seminar',
      status: 'pending',
      userType: 'student',
    },
    {
      id: '3',
      studentName: 'Prof. Garcia',
      roomName: 'Computer Lab 2',
      date: 'Jan 25, 2024',
      time: '10:00 AM - 12:00 PM',
      equipment: ['35 Computers', 'Projector'],
      purpose: 'Programming class',
      status: 'approved',
      userType: 'faculty',
    },
  ]);

  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: '1',
      name: 'Room 304',
      type: 'classroom',
      minCapacity: 20,
      maxCapacity: 50,
      status: 'occupied',
      equipment: ['Projector', 'Aircon', 'Whiteboard'],
      currentBooking: { user: 'Prof. Santos - CS-101', timeSlot: '9:00 AM - 11:00 AM' },
      todaySchedule: [
        { time: '9:00 AM - 11:00 AM', user: 'Prof. Santos - CS-101' },
        { time: '1:00 PM - 3:00 PM', user: 'Prof. Garcia - MATH-201' },
      ],
    },
    {
      id: '2',
      name: 'Computer Lab 1',
      type: 'lab',
      minCapacity: 20,
      maxCapacity: 50,
      status: 'available',
      equipment: ['35 Computers', 'Projector', 'Aircon'],
      todaySchedule: [
        { time: '10:00 AM - 12:00 PM', user: 'Prof. Reyes - IT-102' },
      ],
    },
    {
      id: '3',
      name: 'Main Gymnasium',
      type: 'gym',
      minCapacity: 100,
      maxCapacity: 600,
      status: 'available',
      equipment: ['Sound System', 'Basketball Court', 'Bleachers'],
      todaySchedule: [
        { time: '3:00 PM - 5:00 PM', user: 'PE Class - Athletics' },
      ],
    },
    {
      id: '4',
      name: 'Function Hall A',
      type: 'hall',
      minCapacity: 100,
      maxCapacity: 300,
      status: 'maintenance',
      equipment: ['Stage', 'Sound System', 'Lighting', 'Aircon'],
      todaySchedule: [],
    },
    {
      id: '5',
      name: 'Room 305',
      type: 'classroom',
      minCapacity: 20,
      maxCapacity: 40,
      status: 'available',
      equipment: ['Projector', 'Aircon', 'TV'],
      todaySchedule: [],
    },
  ]);

  const handleApprove = (requestId: string) => {
    setEquipmentRequests(prev =>
      prev.map(req => req.id === requestId ? { ...req, status: 'approved' as const } : req)
    );
    alert('Equipment request approved! Student will be notified.');
  };

  const handleReject = (requestId: string) => {
    setEquipmentRequests(prev =>
      prev.map(req => req.id === requestId ? { ...req, status: 'rejected' as const } : req)
    );
    alert('Equipment request rejected. Student will be notified.');
  };

  const handleToggleMaintenance = (facilityId: string) => {
    setFacilities(prev =>
      prev.map(fac =>
        fac.id === facilityId
          ? { ...fac, status: fac.status === 'maintenance' ? 'available' : 'maintenance' }
          : fac
      )
    );
  };

  const handleAddRoom = () => {
    alert('New room added successfully!');
    setShowAddRoom(false);
  };

  const handleEditRoom = () => {
    alert('Facility updated successfully!');
    setShowEditRoom(null);
  };

  const filteredFacilities = activeType === 'all'
    ? facilities
    : facilities.filter(f => f.type === activeType);

  const pendingRequests = equipmentRequests.filter(req => req.status === 'pending');

  const navItems = [
    { id: 'dashboard' as TabType, label: 'Facilities Dashboard', icon: LayoutDashboardIcon },
    { id: 'approvals' as TabType, label: 'Equipment Approvals', icon: CheckSquareIcon, badge: pendingRequests.length },
    { id: 'rooms' as TabType, label: 'Manage Rooms', icon: DoorOpenIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="text-4xl mb-2">🏛️</div>
          <h2 className="text-xl font-bold">Facility Admin</h2>
          <p className="text-sm text-white/80">Facilities & Equipment</p>
        </div>
        
        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {navItems.find(item => item.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-gray-600">University Facilities Management</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* FACILITIES DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Filter Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveType('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  All Facilities
                </button>
                <button
                  onClick={() => setActiveType('classroom')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeType === 'classroom'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Classrooms
                </button>
                <button
                  onClick={() => setActiveType('lab')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeType === 'lab'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Laboratories
                </button>
                <button
                  onClick={() => setActiveType('gym')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeType === 'gym'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Gyms
                </button>
                <button
                  onClick={() => setActiveType('hall')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeType === 'hall'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Halls
                </button>
              </div>

              {/* Facilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFacilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{facility.name}</h3>
                        <p className="text-sm text-gray-500">Min: {facility.minCapacity} | Max: {facility.maxCapacity}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          facility.status === 'available'
                            ? 'bg-green-100 text-green-700'
                            : facility.status === 'occupied'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {facility.status}
                      </span>
                    </div>

                    {facility.currentBooking && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <p className="text-xs text-blue-600 font-medium mb-1">Currently Occupied</p>
                        <p className="text-sm font-semibold text-blue-900">{facility.currentBooking.user}</p>
                        <p className="text-xs text-blue-700">{facility.currentBooking.timeSlot}</p>
                      </div>
                    )}

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Equipment</p>
                      <div className="flex flex-wrap gap-1">
                        {facility.equipment.map((item, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleMaintenance(facility.id)}
                      className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                        facility.status === 'maintenance'
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-yellow-600 text-white hover:bg-yellow-700'
                      }`}
                    >
                      {facility.status === 'maintenance' ? '✓ Mark as Available' : '🔧 Mark Under Maintenance'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EQUIPMENT APPROVALS TAB */}
          {activeTab === 'approvals' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Equipment Requests</h2>
                <p className="text-gray-600">Approve or reject student equipment requests (Faculty requests are auto-approved)</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-blue-900 mb-2">ℹ️ Approval Logic</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Students with equipment</strong> → Requires your approval</li>
                  <li>• <strong>Students without equipment</strong> → Auto-approved instantly</li>
                  <li>• <strong>Faculty with/without equipment</strong> → Auto-approved instantly (no approval needed)</li>
                </ul>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <CheckCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
                  <p className="text-gray-600">No pending equipment requests at the moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {equipmentRequests.map((request) => (
                    <div
                      key={request.id}
                      className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
                        request.status === 'pending'
                          ? 'border-yellow-300'
                          : request.status === 'approved'
                          ? 'border-green-300'
                          : 'border-red-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{request.studentName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              request.userType === 'faculty'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {request.userType === 'faculty' ? '👨‍🏫 Faculty' : '🎓 Student'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{request.roomName} • {request.date} • {request.time}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            request.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : request.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {request.status === 'pending' ? '⏳ Pending' : request.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
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

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Purpose:</p>
                        <p className="text-sm text-gray-600">{request.purpose}</p>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                            Approve Request
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <XCircleIcon className="w-5 h-5" />
                            Reject Request
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MANAGE ROOMS TAB */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Manage Rooms</h2>
                  <p className="text-gray-600">Add new facilities or edit existing ones</p>
                </div>
                <button
                  onClick={() => setShowAddRoom(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center gap-2"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  Add New Room
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Room Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Min/Max Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Equipment</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {facilities.map((facility) => (
                      <tr key={facility.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{facility.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">{facility.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{facility.minCapacity}-{facility.maxCapacity}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{facility.equipment.length} items</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            facility.status === 'available' ? 'bg-green-100 text-green-700' :
                            facility.status === 'occupied' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {facility.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowEditRoom(facility)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edit room"
                            >
                              <EditIcon className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleToggleMaintenance(facility.id)}
                              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                facility.status === 'maintenance'
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              }`}
                              title={facility.status === 'maintenance' ? 'Mark as available' : 'Mark under maintenance'}
                            >
                              {facility.status === 'maintenance' ? '✓ Available' : '🔧 Maintenance'}
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
            <h3 className="text-xl font-bold mb-4">Add New Room/Facility</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                <input
                  type="text"
                  placeholder="e.g., Room 401, Science Lab 3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Classroom</option>
                  <option>Laboratory</option>
                  <option>Gymnasium</option>
                  <option>Function Hall</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Capacity</label>
                  <input
                    type="number"
                    placeholder="20"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Capacity</label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Projector, Aircon, Whiteboard"
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
            <h3 className="text-xl font-bold mb-4">Edit Facility</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                <input
                  type="text"
                  defaultValue={showEditRoom.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  defaultValue={showEditRoom.type}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="classroom">Classroom</option>
                  <option value="lab">Laboratory</option>
                  <option value="gym">Gymnasium</option>
                  <option value="hall">Function Hall</option>
                </select>
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