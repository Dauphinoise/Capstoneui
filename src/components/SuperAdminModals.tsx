import React from 'react';
import { XCircleIcon, EditIcon, EyeIcon, CalendarCheckIcon, WrenchIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'service-admin' | 'facility-admin' | 'librarian';
  department?: string;
  status: 'active' | 'inactive';
}

interface ServiceDepartment {
  id: string;
  name: string;
  icon: string;
  admin: string;
  staffCount: number;
  windowCount: number;
  status: 'active' | 'inactive';
}

interface ModalsProps {
  showModal: string | null;
  setShowModal: (modal: string | null) => void;
  selectedUser: SystemUser | null;
  selectedFacility: 'facility' | 'librarian' | null;
  systemUsers: SystemUser[];
  departments: ServiceDepartment[];
}

export function SuperAdminModals({
  showModal,
  setShowModal,
  selectedUser,
  selectedFacility,
  systemUsers,
  departments,
}: ModalsProps) {
  return (
    <>
      {/* Edit User Modal */}
      {showModal === 'edit-user' && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Edit User: {selectedUser.name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select 
                  defaultValue={selectedUser.role}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="service-admin">Service Admin</option>
                  <option value="facility-admin">Facility Admin</option>
                  <option value="librarian">Librarian</option>
                </select>
              </div>
              {selectedUser.role === 'service-admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select 
                    defaultValue={selectedUser.department}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option>Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  defaultValue={selectedUser.status}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
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
                    alert('User updated successfully!');
                    setShowModal(null);
                  }}
                  className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Facility Details Modal */}
      {showModal === 'view-facility' && selectedFacility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedFacility === 'facility' ? 'Facility Admin Overview' : 'Head Librarian Overview'}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedFacility === 'facility' ? 'Lisa Mendoza' : 'Robert Tan'}
                </p>
              </div>
              <button onClick={() => setShowModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircleIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {selectedFacility === 'facility' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-orange-600 font-medium mb-1">Total Rooms</p>
                    <p className="text-3xl font-bold text-orange-900">37</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-600 font-medium mb-1">Under Maintenance</p>
                    <p className="text-3xl font-bold text-red-900">2</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Room Breakdown</h4>
                  <div className="space-y-2">
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
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Recent Activity</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 12 bookings approved today</li>
                    <li>• 3 equipment requests pending</li>
                    <li>• 2 rooms marked for maintenance</li>
                    <li>• 89% average facility utilization</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-teal-50 rounded-lg p-4">
                    <p className="text-sm text-teal-600 font-medium mb-1">Total Study Rooms</p>
                    <p className="text-3xl font-bold text-teal-900">8</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-600 font-medium mb-1">Currently Occupied</p>
                    <p className="text-3xl font-bold text-green-900">6</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Today's Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Bookings</span>
                      <span className="font-bold text-gray-900">18 sessions</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Available Rooms</span>
                      <span className="font-bold text-blue-600">2 rooms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Utilization Rate</span>
                      <span className="font-bold text-gray-900">92%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Recent Activity</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 18 bookings processed today</li>
                    <li>• 4 collaborative bookings completed</li>
                    <li>• Peak hours: 1:00 PM - 3:00 PM</li>
                    <li>• Average session: 2.5 hours</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => setShowModal('edit-facility')}
                className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
              >
                <EditIcon className="w-4 h-4" />
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Facility Modal */}
      {showModal === 'edit-facility' && selectedFacility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              Edit {selectedFacility === 'facility' ? 'Facility Admin' : 'Head Librarian'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Name</label>
                <input
                  type="text"
                  defaultValue={selectedFacility === 'facility' ? 'Lisa Mendoza' : 'Robert Tan'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue={selectedFacility === 'facility' ? 'lisa.mendoza@university.edu' : 'robert.tan@university.edu'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Approve bookings</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Manage rooms</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Set maintenance status</span>
                  </label>
                </div>
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
                    alert('Facility admin updated successfully!');
                    setShowModal(null);
                  }}
                  className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Bookings Modal */}
      {showModal === 'manage-bookings' && selectedFacility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Manage Bookings</h3>
                <p className="text-sm text-gray-500">
                  {selectedFacility === 'facility' ? 'Facility Reservations' : 'Library Study Room Bookings'}
                </p>
              </div>
              <button onClick={() => setShowModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircleIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Completed</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>All Rooms</option>
                <option>Classroom 101</option>
                <option>Lab A</option>
                <option>Study Room 1</option>
              </select>
              <input 
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Bookings Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Room</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Date & Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">Room 301</td>
                    <td className="px-4 py-3 text-sm">John Santos</td>
                    <td className="px-4 py-3 text-sm">Jan 25, 2:00 PM - 4:00 PM</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                        Pending
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">Lab A</td>
                    <td className="px-4 py-3 text-sm">Maria Reyes (Faculty)</td>
                    <td className="px-4 py-3 text-sm">Jan 26, 10:00 AM - 12:00 PM</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Approved
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="px-3 py-1 text-gray-600 text-xs hover:bg-gray-100 rounded">
                        View Details
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">Study Room 3</td>
                    <td className="px-4 py-3 text-sm">Pedro Cruz (+ 4 others)</td>
                    <td className="px-4 py-3 text-sm">Jan 25, 3:00 PM - 5:00 PM</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        In Progress
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="px-3 py-1 text-gray-600 text-xs hover:bg-gray-100 rounded">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => setShowModal(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Maintenance Modal */}
      {showModal === 'manage-maintenance' && selectedFacility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Maintenance Management</h3>
                <p className="text-sm text-gray-500">Mark rooms for maintenance or restore availability</p>
              </div>
              <button onClick={() => setShowModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircleIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 font-medium mb-1">Available Rooms</p>
                <p className="text-3xl font-bold text-green-900">35</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-red-600 font-medium mb-1">Under Maintenance</p>
                <p className="text-3xl font-bold text-red-900">2</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-yellow-600 font-medium mb-1">Scheduled Soon</p>
                <p className="text-3xl font-bold text-yellow-900">1</p>
              </div>
            </div>

            {/* Under Maintenance */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">🔧 Currently Under Maintenance</h4>
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900">Room 305 - Classroom</p>
                      <p className="text-sm text-gray-600">Started: Jan 23, 2026</p>
                      <p className="text-sm text-gray-600">Issue: Air conditioning repair</p>
                    </div>
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                      In Progress
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4" />
                    Mark as Available
                  </button>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900">Lab B - Chemistry Lab</p>
                      <p className="text-sm text-gray-600">Started: Jan 24, 2026</p>
                      <p className="text-sm text-gray-600">Issue: Equipment calibration</p>
                    </div>
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                      In Progress
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4" />
                    Mark as Available
                  </button>
                </div>
              </div>
            </div>

            {/* Available Rooms - Quick Actions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Available Rooms - Quick Maintenance</h4>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Room</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">Room 301</td>
                      <td className="px-4 py-3 text-sm">Classroom</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Available
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 flex items-center gap-1">
                          <WrenchIcon className="w-3 h-3" />
                          Set Maintenance
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">Lab A</td>
                      <td className="px-4 py-3 text-sm">Computer Lab</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Available
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 flex items-center gap-1">
                          <WrenchIcon className="w-3 h-3" />
                          Set Maintenance
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => setShowModal(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
