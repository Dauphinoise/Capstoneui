import React, { useState } from 'react';
import { UploadIcon, CalendarIcon, AlertCircleIcon, CheckCircleIcon, FileTextIcon, DownloadIcon, XCircleIcon, EyeIcon, DatabaseIcon, UserPlusIcon, PlusCircleIcon, EditIcon, TrashIcon, BuildingIcon, UsersIcon, WrenchIcon, CalendarCheckIcon } from 'lucide-react';
import { SuperAdminModals } from './SuperAdminModals';

type AdminTab = 'users' | 'departments' | 'facilities' | 'import' | 'statistics';
type ModalType = 'create-department' | 'create-admin' | 'create-facility-admin' | 'create-librarian' | 'view-department' | 'edit-department' | 'view-facility' | 'edit-facility' | 'manage-bookings' | 'manage-maintenance' | 'edit-user' | null;

interface ServiceDepartment {
  id: string;
  name: string;
  icon: string;
  admin: string;
  staffCount: number;
  windowCount: number;
  status: 'active' | 'inactive';
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'service-admin' | 'facility-admin' | 'librarian';
  department?: string;
  status: 'active' | 'inactive';
}

export function SuperAdmin() {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [showModal, setShowModal] = useState<ModalType>(null);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptIcon, setNewDeptIcon] = useState('');
  const [selectedAdminEmail, setSelectedAdminEmail] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<ServiceDepartment | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<'facility' | 'librarian' | null>(null);
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);

  // Mock data
  const [departments, setDepartments] = useState<ServiceDepartment[]>([
    { id: '1', name: 'ITSO', icon: '💻', admin: 'John Santos', staffCount: 5, windowCount: 3, status: 'active' },
    { id: '2', name: 'Registrar', icon: '📝', admin: 'Maria Reyes', staffCount: 8, windowCount: 4, status: 'active' },
    { id: '3', name: 'Treasury', icon: '💰', admin: 'Pedro Cruz', staffCount: 6, windowCount: 3, status: 'active' },
    { id: '4', name: 'Admission', icon: '🎓', admin: 'Ana Garcia', staffCount: 4, windowCount: 2, status: 'active' },
  ]);

  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    { id: '1', name: 'John Santos', email: 'john.santos@university.edu', role: 'service-admin', department: 'ITSO', status: 'active' },
    { id: '2', name: 'Maria Reyes', email: 'maria.reyes@university.edu', role: 'service-admin', department: 'Registrar', status: 'active' },
    { id: '3', name: 'Pedro Cruz', email: 'pedro.cruz@university.edu', role: 'service-admin', department: 'Treasury', status: 'active' },
    { id: '4', name: 'Ana Garcia', email: 'ana.garcia@university.edu', role: 'service-admin', department: 'Admission', status: 'active' },
    { id: '5', name: 'Lisa Mendoza', email: 'lisa.mendoza@university.edu', role: 'facility-admin', status: 'active' },
    { id: '6', name: 'Robert Tan', email: 'robert.tan@university.edu', role: 'librarian', status: 'active' },
  ]);

  const handleCreateDepartment = () => {
    if (newDeptName && newDeptIcon && selectedAdminEmail) {
      alert(`New Department Created!\nName: ${newDeptName}\nIcon: ${newDeptIcon}\nAdmin: ${selectedAdminEmail}\n\nThe admin can now login and create staff members & service windows.`);
      setShowModal(null);
      setNewDeptName('');
      setNewDeptIcon('');
      setSelectedAdminEmail('');
    }
  };

  const handleCreateUser = (role: 'service-admin' | 'facility-admin' | 'librarian') => {
    alert(`Creating new ${role} account.\nThey will receive login credentials via email.`);
    setShowModal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">🔐 Super Admin Portal</h1>
          <p className="text-blue-100">Complete System Control & Configuration</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'users'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              👥 User Management
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'departments'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🏢 Queue Departments
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'facilities'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🏛️ Facilities
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'import'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📅 Schedule Import
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'statistics'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📊 Statistics
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* USER MANAGEMENT TAB */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">System User Management</h2>
                <p className="text-gray-600">Create and manage admin accounts across the system</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal('create-admin')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <UserPlusIcon className="w-4 h-4" />
                  New Service Admin
                </button>
                <button
                  onClick={() => setShowModal('create-facility-admin')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center gap-2"
                >
                  <UserPlusIcon className="w-4 h-4" />
                  New Facility Admin
                </button>
                <button
                  onClick={() => setShowModal('create-librarian')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <UserPlusIcon className="w-4 h-4" />
                  New Librarian
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {systemUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'service-admin' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'facility-admin' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role === 'service-admin' ? 'Service Admin' :
                           user.role === 'facility-admin' ? 'Facility Admin' : 'Librarian'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.department || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setSelectedUser(user);
                              setShowModal('edit-user');
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <EditIcon className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
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

        {/* SERVICE DEPARTMENTS TAB */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Queue Service Departments</h2>
                <p className="text-gray-600">Create new queueing departments (ITSO, Registrar, Clinic, etc.)</p>
              </div>
              <button
                onClick={() => setShowModal('create-department')}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center gap-2"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Create New Department
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-blue-900 mb-2">ℹ️ How Queue Departments Work</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Step 1:</strong> Super Admin creates a new department shell (e.g., "Clinic", "HR Office")</li>
                <li>• <strong>Step 2:</strong> Super Admin creates admin credentials and assigns them to the department</li>
                <li>• <strong>Step 3:</strong> Department Admin logs in and creates staff members</li>
                <li>• <strong>Step 4:</strong> Department Admin creates service windows (counters)</li>
                <li>• <strong>Step 5:</strong> Staff members log in and serve customers at their assigned counters</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <div key={dept.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{dept.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                        <p className="text-sm text-gray-500">Admin: {dept.admin}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      dept.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {dept.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-600 font-medium">Staff Members</p>
                      <p className="text-2xl font-bold text-blue-900">{dept.staffCount}</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <p className="text-xs text-yellow-600 font-medium">Service Windows</p>
                      <p className="text-2xl font-bold text-yellow-900">{dept.windowCount}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setShowModal('view-department');
                      }}
                      className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setShowModal('edit-department');
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FACILITIES TAB */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Facilities Overview</h2>
              <p className="text-gray-600">Monitor all facility admins and their managed spaces</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Facility Admin Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <BuildingIcon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Facility Admin</h3>
                    <p className="text-sm text-gray-500">Lisa Mendoza</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Classrooms</span>
                    <span className="font-bold text-gray-900">24 rooms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Laboratories</span>
                    <span className="font-bold text-gray-900">8 labs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Gyms & Halls</span>
                    <span className="font-bold text-gray-900">5 venues</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Under Maintenance</span>
                    <span className="font-bold text-red-600">2 rooms</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg mb-4">
                  Manages room bookings, equipment requests, and maintenance status
                </p>
                
                {/* Super Admin Controls */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button 
                    onClick={() => {
                      setSelectedFacility('facility');
                      setShowModal('view-facility');
                    }}
                    className="py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View Details
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedFacility('facility');
                      setShowModal('edit-facility');
                    }}
                    className="py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <EditIcon className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => {
                      setSelectedFacility('facility');
                      setShowModal('manage-bookings');
                    }}
                    className="py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                  >
                    Manage Bookings
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedFacility('facility');
                      setShowModal('manage-maintenance');
                    }}
                    className="py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
                  >
                    Maintenance
                  </button>
                </div>
              </div>

              {/* Librarian Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Head Librarian</h3>
                    <p className="text-sm text-gray-500">Robert Tan</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Study Rooms</span>
                    <span className="font-bold text-gray-900">8 rooms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Currently Occupied</span>
                    <span className="font-bold text-green-600">6 rooms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Available</span>
                    <span className="font-bold text-blue-600">2 rooms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Today's Bookings</span>
                    <span className="font-bold text-gray-900">18 sessions</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg mb-4">
                  Manages library study room reservations and occupancy
                </p>

                {/* Super Admin Controls */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button 
                    onClick={() => {
                      setSelectedFacility('librarian');
                      setShowModal('view-facility');
                    }}
                    className="py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View Details
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedFacility('librarian');
                      setShowModal('edit-facility');
                    }}
                    className="py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <EditIcon className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => {
                      setSelectedFacility('librarian');
                      setShowModal('manage-bookings');
                    }}
                    className="py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                  >
                    Manage Bookings
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedFacility('librarian');
                      setShowModal('manage-maintenance');
                    }}
                    className="py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
                  >
                    Maintenance
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="font-bold text-yellow-900 mb-2">🏛️ Facility Management Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-yellow-800">
                <div>
                  <p className="font-semibold mb-1">Facility Admin can:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Add new classrooms, labs, gyms</li>
                    <li>• Edit room details and capacity</li>
                    <li>• Mark rooms as "Under Maintenance"</li>
                    <li>• Approve/reject equipment requests</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-1">Librarian can:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Add new study rooms</li>
                    <li>• Edit room configurations</li>
                    <li>• Monitor occupancy status</li>
                    <li>• View utilization analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCHEDULE IMPORT TAB */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Official Schedule Import</h2>
              <p className="text-gray-600">Upload class schedules from CSV or Excel files</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <FileTextIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900 text-sm mb-1">Download CSV Template</p>
                    <p className="text-xs text-blue-800 mb-3">
                      Format: CourseCode, CourseName, Faculty, Room, Day, StartTime, EndTime, Semester
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
                      <DownloadIcon className="w-4 h-4 inline mr-2" />
                      Download Template
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-yellow-400 hover:bg-yellow-50/50 transition-all">
                <UploadIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">CSV or Excel files (max 10MB)</p>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs */}
        {activeTab === 'statistics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">System-Wide Statistics</h2>
              <p className="text-gray-600">Real-time analytics across all services and facilities</p>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-gray-900">8,234</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Bookings</h3>
                <p className="text-3xl font-bold text-gray-900">1,456</p>
                <p className="text-xs text-green-600 mt-1">This month</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Queue Tickets</h3>
                <p className="text-3xl font-bold text-gray-900">2,891</p>
                <p className="text-xs text-blue-600 mt-1">This month</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg Wait Time</h3>
                <p className="text-3xl font-bold text-gray-900">7.2 min</p>
                <p className="text-xs text-green-600 mt-1">↓ 18% improvement</p>
              </div>
            </div>

            {/* Queue Department Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Queue Department Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Served Today</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">In Queue</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Avg Wait</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Active Staff</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-medium">💻 ITSO</td>
                      <td className="px-4 py-3">45</td>
                      <td className="px-4 py-3 text-blue-600 font-semibold">12</td>
                      <td className="px-4 py-3">8 min</td>
                      <td className="px-4 py-3">5 / 5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">📝 Registrar</td>
                      <td className="px-4 py-3">67</td>
                      <td className="px-4 py-3 text-blue-600 font-semibold">18</td>
                      <td className="px-4 py-3">6 min</td>
                      <td className="px-4 py-3">8 / 8</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">💰 Treasury</td>
                      <td className="px-4 py-3">52</td>
                      <td className="px-4 py-3 text-blue-600 font-semibold">9</td>
                      <td className="px-4 py-3">5 min</td>
                      <td className="px-4 py-3">6 / 6</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">🎓 Admission</td>
                      <td className="px-4 py-3">34</td>
                      <td className="px-4 py-3 text-blue-600 font-semibold">7</td>
                      <td className="px-4 py-3">9 min</td>
                      <td className="px-4 py-3">4 / 4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Facility Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Facility Utilization</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Classrooms</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900">78%</p>
                    <p className="text-sm text-gray-500">utilization</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Laboratories</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900">65%</p>
                    <p className="text-sm text-gray-500">utilization</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Study Rooms</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900">92%</p>
                    <p className="text-sm text-gray-500">utilization</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Peak Hours */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Peak Usage Hours</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-sm text-gray-600">9:00 AM</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold" style={{ width: '85%' }}>
                        340 users
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-sm text-gray-600">1:00 PM</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold" style={{ width: '92%' }}>
                        368 users
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-sm text-gray-600">3:00 PM</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold" style={{ width: '78%' }}>
                        312 users
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Department Modal */}
      {showModal === 'create-department' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Create New Queue Department</h3>
            <p className="text-sm text-gray-600 mb-4">
              This will create a new queueing service department (e.g., Clinic, HR Office, Student Affairs)
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
                <input
                  type="text"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  placeholder="e.g., Clinic, HR Office"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon Emoji</label>
                <input
                  type="text"
                  value={newDeptIcon}
                  onChange={(e) => setNewDeptIcon(e.target.value)}
                  placeholder="e.g., 🏥, 👔, 🎯"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Create Department Admin Account</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Full Name</label>
                    <input
                      type="text"
                      placeholder="Juan Dela Cruz"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                    <input
                      type="email"
                      value={selectedAdminEmail}
                      onChange={(e) => setSelectedAdminEmail(e.target.value)}
                      placeholder="admin@university.edu"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temporary Password</label>
                    <input
                      type="password"
                      placeholder="Enter temporary password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Admin will be prompted to change on first login</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  Once created, the admin can log in and set up staff members and service windows for this department.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(null)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateDepartment}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modals */}
      {(showModal === 'create-admin' || showModal === 'create-facility-admin' || showModal === 'create-librarian') && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              Create New {showModal === 'create-admin' ? 'Service Admin' : showModal === 'create-facility-admin' ? 'Facility Admin' : 'Librarian'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Juan Dela Cruz"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="user@university.edu"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {showModal === 'create-admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Department</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(null)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCreateUser(showModal === 'create-admin' ? 'service-admin' : showModal === 'create-facility-admin' ? 'facility-admin' : 'librarian')}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Department Details Modal */}
      {showModal === 'view-department' && selectedDepartment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="text-5xl">{selectedDepartment.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedDepartment.name}</h3>
                  <p className="text-sm text-gray-500">Department Overview</p>
                </div>
              </div>
              <button onClick={() => setShowModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircleIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium mb-1">Staff Members</p>
                  <p className="text-3xl font-bold text-blue-900">{selectedDepartment.staffCount}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm text-yellow-600 font-medium mb-1">Service Windows</p>
                  <p className="text-3xl font-bold text-yellow-900">{selectedDepartment.windowCount}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Department Admin</p>
                <p className="text-lg font-semibold text-gray-900">{selectedDepartment.admin}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedDepartment.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {selectedDepartment.status === 'active' ? '✓ Active' : 'Inactive'}
                </span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Department Capabilities</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Staff can serve customers at assigned service windows</li>
                  <li>• Real-time queue monitoring and management</li>
                  <li>• Performance analytics and wait time tracking</li>
                  <li>• Ticket transfer between service windows</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(null)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowModal('edit-department');
                  }}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <EditIcon className="w-4 h-4" />
                  Edit Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {showModal === 'edit-department' && selectedDepartment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Edit Department: {selectedDepartment.name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
                <input
                  type="text"
                  defaultValue={selectedDepartment.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon Emoji</label>
                <input
                  type="text"
                  defaultValue={selectedDepartment.icon}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Admin</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>{selectedDepartment.admin}</option>
                  {systemUsers
                    .filter(u => u.role === 'service-admin')
                    .map(user => (
                      <option key={user.id}>{user.name}</option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(null)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Department updated successfully!');
                    setShowModal(null);
                  }}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Facility and User Management Modals */}
      <SuperAdminModals
        showModal={showModal}
        setShowModal={setShowModal}
        selectedUser={selectedUser}
        selectedFacility={selectedFacility}
        systemUsers={systemUsers}
        departments={departments}
      />
    </div>
  );
}