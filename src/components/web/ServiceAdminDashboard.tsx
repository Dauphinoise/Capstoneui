import React, { useState } from 'react';
import { LayoutDashboardIcon, UsersIcon, MonitorIcon, XIcon, UserPlusIcon, EditIcon, TrashIcon, SettingsIcon, ClockIcon, ListIcon, AlertTriangleIcon, CalendarIcon, CheckCircleIcon, XCircleIcon, ChevronDownIcon, ChevronUpIcon, BellIcon } from 'lucide-react';
import { WebAccountSettings } from './WebAccountSettings';

type ServiceType = 'itso' | 'treasury' | 'registrar' | 'admission';
type TabType = 'overview' | 'queue' | 'staff' | 'windows' | 'comlab-bookings' | 'settings';

interface ServiceConfig {
  name: string;
  color: string;
  bgColor: string;
  icon: string;
}

interface QueueStats {
  active: number;
  served: number;
  avgWaitTime: number;
  activeWindows: number;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  window?: number;
  status: 'active' | 'break' | 'offline';
  servedToday: number;
  currentTicket?: string;
  currentService?: string;
}

interface ServiceWindow {
  id: string;
  windowNumber: number;
  serviceName: string;
  assignedStaff?: string;
  status: 'open' | 'closed';
}

interface QueueItem {
  ticketNumber: string;
  serviceType: string;
  waitTime: number;
  queuedAt: string;
  window?: string;
}

const serviceConfigs = {
  itso: {
    name: 'ITSO',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    icon: '💻',
  },
  treasury: {
    name: 'Treasury',
    color: 'from-yellow-600 to-yellow-700',
    bgColor: 'bg-yellow-50',
    icon: '💰',
  },
  registrar: {
    name: 'Registrar',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    icon: '📝',
  },
  admission: {
    name: 'Admission',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    icon: '🎓',
  },
};

// Service types by department
const serviceTypesByDept = {
  treasury: [
    { id: 'concerns-inquiry', name: 'Concerns & Inquiry', defaultWindow: 'Window 1' },
    { id: 'disbursements', name: 'Disbursements', defaultWindow: 'Window 2' },
    { id: 'payment', name: 'Payment', defaultWindow: 'Windows 3-5' },
  ],
  registrar: [
    { id: 'window-1', name: 'Window 1', programs: 'BSCE, BSCPE, BSBA' },
    { id: 'window-2', name: 'Window 2', programs: 'BSMA, BSPSY, BPED' },
    { id: 'window-3', name: 'Window 3', programs: 'Senior High School' },
    { id: 'window-4', name: 'Window 4', programs: 'BSARCH, ABCOMM, BSCS-ML, BSIT-MWA' },
    { id: 'window-5', name: 'Window 5', programs: 'BSTM, BSA, BSHM' },
  ],
  itso: [
    { id: 'it-concern', name: 'IT Concern' },
    { id: 'locked-account', name: 'Locked Account' },
    { id: 'general-inquiry', name: 'General Inquiry' },
  ],
  admission: [
    { id: 'inquiry', name: 'Inquiry' },
  ],
};

export function ServiceAdminDashboard({ serviceType }: { serviceType: ServiceType }) {
  const config = serviceConfigs[serviceType];
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showAddWindow, setShowAddWindow] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  const [stats] = useState<QueueStats>({
    active: 12,
    served: 45,
    avgWaitTime: 8,
    activeWindows: 3,
  });

  const [staffMembers] = useState<StaffMember[]>(
    serviceType === 'treasury' ? [
      { id: '1', name: 'Maria Santos', email: 'maria.santos@university.edu', window: 1, status: 'active', servedToday: 18, currentTicket: 'CI-012', currentService: 'Concerns & Inquiry' },
      { id: '2', name: 'Juan Reyes', email: 'juan.reyes@university.edu', window: 2, status: 'active', servedToday: 15, currentTicket: 'D-013', currentService: 'Disbursements' },
      { id: '3', name: 'Ana Cruz', email: 'ana.cruz@university.edu', window: 3, status: 'active', servedToday: 22, currentTicket: 'P-014', currentService: 'Payment' },
      { id: '4', name: 'Pedro Garcia', email: 'pedro.garcia@university.edu', window: 4, status: 'break', servedToday: 12, currentService: 'Payment' },
      { id: '5', name: 'Rosa Martinez', email: 'rosa.martinez@university.edu', window: 5, status: 'active', servedToday: 19, currentTicket: 'P-015', currentService: 'Payment' },
    ] : [
      { id: '1', name: 'Maria Santos', email: 'maria.santos@university.edu', window: 1, status: 'active', servedToday: 18, currentTicket: 'W1-012' },
      { id: '2', name: 'Juan Reyes', email: 'juan.reyes@university.edu', window: 2, status: 'active', servedToday: 15, currentTicket: 'W2-013' },
      { id: '3', name: 'Ana Cruz', email: 'ana.cruz@university.edu', window: 3, status: 'break', servedToday: 12 },
    ]
  );

  const [serviceWindows] = useState<ServiceWindow[]>(
    serviceType === 'treasury' ? [
      { id: '1', windowNumber: 1, serviceName: 'Concerns & Inquiry', assignedStaff: 'Maria Santos', status: 'open' },
      { id: '2', windowNumber: 2, serviceName: 'Disbursements', assignedStaff: 'Juan Reyes', status: 'open' },
      { id: '3', windowNumber: 3, serviceName: 'Payment', assignedStaff: 'Ana Cruz', status: 'open' },
      { id: '4', windowNumber: 4, serviceName: 'Payment', assignedStaff: 'Pedro Garcia', status: 'open' },
      { id: '5', windowNumber: 5, serviceName: 'Payment', assignedStaff: 'Rosa Martinez', status: 'open' },
    ] : [
      { id: '1', windowNumber: 1, serviceName: 'Window 1 - BSCE, BSCPE, BSBA', assignedStaff: 'Maria Santos', status: 'open' },
      { id: '2', windowNumber: 2, serviceName: 'Window 2 - BSMA, BSPSY, BPED', assignedStaff: 'Juan Reyes', status: 'open' },
      { id: '3', windowNumber: 3, serviceName: 'Window 3 - Senior High School', assignedStaff: 'Ana Cruz', status: 'open' },
    ]
  );

  // Mock queue data by service type
  const [queueByService] = useState<Record<string, QueueItem[]>>(
    serviceType === 'treasury' ? {
      'concerns-inquiry': [
        { ticketNumber: 'CI-016', serviceType: 'Concerns & Inquiry', waitTime: 5, queuedAt: '10:45 AM', window: 'Window 1' },
        { ticketNumber: 'CI-019', serviceType: 'Concerns & Inquiry', waitTime: 12, queuedAt: '10:52 AM', window: 'Window 1' },
      ],
      'disbursements': [
        { ticketNumber: 'D-017', serviceType: 'Disbursements', waitTime: 8, queuedAt: '10:47 AM', window: 'Window 2' },
        { ticketNumber: 'D-020', serviceType: 'Disbursements', waitTime: 15, queuedAt: '10:54 AM', window: 'Window 2' },
        { ticketNumber: 'D-021', serviceType: 'Disbursements', waitTime: 22, queuedAt: '10:59 AM', window: 'Window 2' },
        { ticketNumber: 'D-022', serviceType: 'Disbursements', waitTime: 29, queuedAt: '11:04 AM', window: 'Window 2' },
        { ticketNumber: 'D-023', serviceType: 'Disbursements', waitTime: 36, queuedAt: '11:09 AM', window: 'Window 2' },
      ],
      'payment': [
        { ticketNumber: 'P-018', serviceType: 'Payment', waitTime: 3, queuedAt: '10:50 AM', window: 'Windows 3-5' },
        { ticketNumber: 'P-024', serviceType: 'Payment', waitTime: 10, queuedAt: '10:55 AM', window: 'Windows 3-5' },
        { ticketNumber: 'P-025', serviceType: 'Payment', waitTime: 17, queuedAt: '11:00 AM', window: 'Windows 3-5' },
      ],
    } : {
      'window-1': [
        { ticketNumber: 'W1-016', serviceType: 'Window 1', waitTime: 5, queuedAt: '10:45 AM' },
        { ticketNumber: 'W1-019', serviceType: 'Window 1', waitTime: 12, queuedAt: '10:52 AM' },
      ],
      'window-2': [
        { ticketNumber: 'W2-017', serviceType: 'Window 2', waitTime: 8, queuedAt: '10:47 AM' },
      ],
      'window-3': [
        { ticketNumber: 'W3-018', serviceType: 'Window 3', waitTime: 3, queuedAt: '10:50 AM' },
        { ticketNumber: 'W3-020', serviceType: 'Window 3', waitTime: 10, queuedAt: '10:55 AM' },
      ],
    }
  );

  const navItems = [
    { id: 'overview' as TabType, label: 'Overview', icon: LayoutDashboardIcon },
    { id: 'queue' as TabType, label: 'Queue Management', icon: ListIcon },
    { id: 'staff' as TabType, label: 'Staff Management', icon: UserPlusIcon },
    { id: 'windows' as TabType, label: 'Service Windows', icon: MonitorIcon },
    ...(serviceType === 'itso' ? [{ id: 'comlab-bookings' as TabType, label: 'ComLab Bookings', icon: CalendarIcon }] : []),
    { id: 'settings' as TabType, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop Only */}
      <aside className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className={`bg-gradient-to-r ${config.color} text-white p-6`}>
          <div className="text-4xl mb-2">{config.icon}</div>
          <h2 className="text-xl font-bold">{config.name}</h2>
          <p className="text-sm text-white/80">Service Admin</p>
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
              <p className="text-sm text-gray-600">Queue Management Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BellIcon className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={() => setShowAccountSettings(!showAccountSettings)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <SettingsIcon className="w-6 h-6 text-gray-600" />
              </button>
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
                    <UsersIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-700">Active in Queue</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MonitorIcon className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-700">Served Today</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.served}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <ClockIcon className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-semibold text-gray-700">Avg Wait Time</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.avgWaitTime} min</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MonitorIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-700">Active Windows</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeWindows}</p>
                </div>
              </div>

              {/* Staff Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Staff Status</h3>
                <div className="space-y-3">
                  {staffMembers.map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          staff.status === 'active' ? 'bg-green-500' :
                          staff.status === 'break' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                        <div>
                          <p className="font-semibold text-gray-900">{staff.name}</p>
                          <p className="text-sm text-gray-500">
                            Window {staff.window}
                            {staff.currentService && ` • ${staff.currentService}`}
                            {staff.currentTicket && ` • Serving ${staff.currentTicket}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{staff.servedToday}</p>
                        <p className="text-xs text-gray-500">served today</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* QUEUE MANAGEMENT TAB */}
          {activeTab === 'queue' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Queue Bottleneck Management</p>
                    <p className="text-sm text-blue-800 mt-1">
                      Monitor queue lengths by service type. If one service has too many people waiting, staff can switch to help reduce bottlenecks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Queue by Service Type */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.entries(queueByService).map(([serviceId, queue]) => {
                  const serviceInfo = serviceTypesByDept[serviceType]?.find(s => s.id === serviceId);
                  const queueLength = queue.length;
                  const isBottleneck = queueLength > 3;
                  
                  return (
                    <div key={serviceId} className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
                      isBottleneck ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{serviceInfo?.name}</h3>
                          {serviceType === 'treasury' && 'defaultWindow' in serviceInfo! && (
                            <p className="text-sm text-gray-500">{serviceInfo.defaultWindow}</p>
                          )}
                          {serviceType === 'registrar' && 'programs' in serviceInfo! && (
                            <p className="text-sm text-gray-500">{serviceInfo.programs}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {isBottleneck && (
                            <AlertTriangleIcon className="w-5 h-5 text-red-600" />
                          )}
                          <span className={`text-2xl font-bold ${
                            isBottleneck ? 'text-red-600' : 'text-gray-900'
                          }`}>
                            {queueLength}
                          </span>
                        </div>
                      </div>

                      {isBottleneck && (
                        <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-4">
                          <p className="text-sm font-semibold text-red-800">⚠️ Bottleneck Detected</p>
                          <p className="text-xs text-red-700 mt-1">
                            Consider reassigning staff from other services
                          </p>
                        </div>
                      )}

                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {queue.length > 0 ? queue.map((item) => (
                          <div key={item.ticketNumber} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-gray-900">{item.ticketNumber}</span>
                              <span className="text-xs text-gray-500">{item.queuedAt}</span>
                            </div>
                            <p className="text-sm text-gray-600">Wait: {item.waitTime} mins</p>
                          </div>
                        )) : (
                          <div className="text-center py-8 text-gray-400">
                            <UsersIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No queue</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STAFF MANAGEMENT TAB */}
          {activeTab === 'staff' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
                  <p className="text-gray-600">Manage your service counter staff members</p>
                </div>
                <button
                  onClick={() => setShowAddStaff(true)}
                  className={`px-6 py-3 bg-gradient-to-r ${config.color} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2`}
                >
                  <UserPlusIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Add New Staff</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Window</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Current Service</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Served Today</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {staffMembers.map((staff) => (
                      <tr key={staff.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{staff.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{staff.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Window {staff.window}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.currentService || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            staff.status === 'active' ? 'bg-green-100 text-green-700' :
                            staff.status === 'break' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {staff.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">{staff.servedToday}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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

          {/* SERVICE WINDOWS TAB */}
          {activeTab === 'windows' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Service Windows</h2>
                  <p className="text-gray-600">Manage counters and service types</p>
                </div>
                <button
                  onClick={() => setShowAddWindow(true)}
                  className={`px-6 py-3 bg-gradient-to-r ${config.color} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2`}
                >
                  <MonitorIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Add New Window</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceWindows.map((window) => (
                  <div key={window.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Window {window.windowNumber}</h3>
                        <p className="text-sm text-gray-500">{window.serviceName}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        window.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {window.status}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-600 mb-2">Assigned Staff</p>
                      <p className="font-semibold text-gray-900">{window.assignedStaff || 'Unassigned'}</p>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm">
                        Edit
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors text-sm">
                        Close
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMLAB BOOKINGS TAB */}
          {activeTab === 'comlab-bookings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">ComLab Bookings</h3>
                <p className="text-gray-600">Manage and view ComLab bookings</p>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Department Settings</h3>
                <p className="text-gray-600">Configure department-specific settings and preferences</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}