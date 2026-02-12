import React, { useState } from 'react';
import { 
  LayoutDashboardIcon, ClipboardListIcon, CalendarIcon, UsersIcon, 
  SettingsIcon, BellIcon, CheckCircleIcon, XCircleIcon, ClockIcon,
  FilterIcon, SearchIcon, EyeIcon, ChevronDownIcon, ChevronUpIcon
} from 'lucide-react';
import { WebAccountSettings } from './WebAccountSettings';

type ViewType = 'dashboard' | 'approvals' | 'schedule' | 'students';
type ProgramType = 'CTHM' | 'SECA';

interface BookingApproval {
  id: string;
  studentName: string;
  studentId: string;
  roomName: string;
  roomType: 'kitchen' | 'restaurant' | 'suite' | 'comlab' | 'engineering-lab' | 'science-lab';
  date: string;
  time: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvalStep: number;
  totalSteps: number;
  nextApprover?: string;
}

interface ProgramChairPortalProps {
  programType: ProgramType;
  onLogout: () => void;
}

export function ProgramChairPortal({ programType, onLogout }: ProgramChairPortalProps) {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [expandedApproval, setExpandedApproval] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const programName = programType === 'CTHM' ? 'College of Tourism & Hospitality Management' : 'School of Engineering, Computer Studies & Architecture';
  const chairName = programType === 'CTHM' ? 'Dr. Maria Santos' : 'Dr. Juan Dela Cruz';

  // Mock approval data
  const mockApprovals: BookingApproval[] = programType === 'CTHM' ? [
    {
      id: '1',
      studentName: 'Ana Reyes',
      studentId: '2021-00123',
      roomName: 'Professional Kitchen A',
      roomType: 'kitchen',
      date: 'Feb 10, 2026',
      time: '9:00 AM - 12:00 PM',
      purpose: 'Culinary Arts practicum - French cuisine practical exam. Need commercial stove, industrial mixer, and refrigeration units.',
      status: 'pending',
      submittedAt: '2 hours ago',
      approvalStep: 1,
      totalSteps: 2,
      nextApprover: 'FMO (Facility Admin)',
    },
    {
      id: '2',
      studentName: 'Carlos Mendoza',
      studentId: '2020-00456',
      roomName: 'Training Restaurant',
      roomType: 'restaurant',
      date: 'Feb 12, 2026',
      time: '5:00 PM - 9:00 PM',
      purpose: 'Restaurant Management final project - Fine dining service simulation with 30 guests.',
      status: 'pending',
      submittedAt: '5 hours ago',
      approvalStep: 1,
      totalSteps: 2,
      nextApprover: 'FMO (Facility Admin)',
    },
    {
      id: '3',
      studentName: 'Lisa Garcia',
      studentId: '2022-00789',
      roomName: 'Executive Suite 201',
      roomType: 'suite',
      date: 'Feb 8, 2026',
      time: '2:00 PM - 5:00 PM',
      purpose: 'Hotel Management simulation - Room service and housekeeping training.',
      status: 'approved',
      submittedAt: '1 day ago',
      approvalStep: 2,
      totalSteps: 2,
    },
  ] : [
    {
      id: '4',
      studentName: 'Mark Rodriguez',
      studentId: '2021-00234',
      roomName: 'Computer Lab 2',
      roomType: 'comlab',
      date: 'Feb 11, 2026',
      time: '1:00 PM - 4:00 PM',
      purpose: 'Computer Science thesis defense - Machine Learning project presentation. Need projector and 30 computers with Python installed.',
      status: 'pending',
      submittedAt: '1 hour ago',
      approvalStep: 1,
      totalSteps: 3,
      nextApprover: 'ITSO',
    },
    {
      id: '5',
      studentName: 'Sarah Cruz',
      studentId: '2020-00567',
      roomName: 'Engineering Lab A',
      roomType: 'engineering-lab',
      date: 'Feb 13, 2026',
      time: '10:00 AM - 1:00 PM',
      purpose: 'Mechanical Engineering lab work - Stress testing and material analysis. Need testing equipment and safety gear.',
      status: 'pending',
      submittedAt: '3 hours ago',
      approvalStep: 1,
      totalSteps: 2,
      nextApprover: 'FMO (Facility Admin)',
    },
    {
      id: '6',
      studentName: 'James Torres',
      studentId: '2022-00890',
      roomName: 'Science Lab 3',
      roomType: 'science-lab',
      date: 'Feb 9, 2026',
      time: '8:00 AM - 11:00 AM',
      purpose: 'Chemistry experiment - Organic compound synthesis. Need fume hood, glassware, and chemical storage.',
      status: 'approved',
      submittedAt: '2 days ago',
      approvalStep: 2,
      totalSteps: 2,
    },
  ];

  const filteredApprovals = mockApprovals.filter(approval => 
    filterStatus === 'all' || approval.status === filterStatus
  );

  const pendingCount = mockApprovals.filter(a => a.status === 'pending').length;
  const approvedToday = mockApprovals.filter(a => a.status === 'approved' && a.submittedAt.includes('hour')).length;

  const handleApprove = (id: string) => {
    // In real app, this would call an API
    console.log('Approved:', id);
  };

  const handleReject = (id: string) => {
    // In real app, this would call an API
    console.log('Rejected:', id);
  };

  const sidebarItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'approvals' as ViewType, label: 'Approvals', icon: ClipboardListIcon, badge: pendingCount },
    { id: 'schedule' as ViewType, label: 'Schedule', icon: CalendarIcon },
    { id: 'students' as ViewType, label: 'Students', icon: UsersIcon },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                  <ClockIcon className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
                <p className="text-xs text-gray-500 mt-1">Require your review</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Approved Today</p>
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{approvedToday}</p>
                <p className="text-xs text-gray-500 mt-1">Bookings processed</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">This Week</p>
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-500 mt-1">Total requests</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Active Students</p>
                  <UsersIcon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">156</p>
                <p className="text-xs text-gray-500 mt-1">In your program</p>
              </div>
            </div>

            {/* Recent Approvals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Recent Approval Requests</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {mockApprovals.slice(0, 3).map((approval) => (
                  <div key={approval.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{approval.studentName}</h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            approval.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            approval.status === 'approved' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {approval.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">{approval.roomName}</span> • {approval.date} • {approval.time}
                        </p>
                        <p className="text-xs text-gray-500">{approval.submittedAt}</p>
                      </div>
                      {approval.status === 'pending' && (
                        <button
                          onClick={() => setActiveView('approvals')}
                          className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'approvals':
        return (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by student name or room..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FilterIcon className="w-5 h-5 text-gray-600" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Approvals List */}
            <div className="space-y-4">
              {filteredApprovals.map((approval) => (
                <div key={approval.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{approval.studentName}</h3>
                          <span className="text-sm text-gray-500">({approval.studentId})</span>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            approval.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            approval.status === 'approved' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {approval.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Room:</span>
                            <span className="ml-2 font-medium text-gray-900">{approval.roomName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Date:</span>
                            <span className="ml-2 font-medium text-gray-900">{approval.date}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Time:</span>
                            <span className="ml-2 font-medium text-gray-900">{approval.time}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Submitted:</span>
                            <span className="ml-2 font-medium text-gray-900">{approval.submittedAt}</span>
                          </div>
                        </div>

                        {/* Approval Progress */}
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(approval.totalSteps)].map((_, idx) => (
                              <React.Fragment key={idx}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                                  idx < approval.approvalStep ? 'bg-green-500 text-white' :
                                  idx === approval.approvalStep ? 'bg-blue-500 text-white' :
                                  'bg-gray-200 text-gray-600'
                                }`}>
                                  {idx + 1}
                                </div>
                                {idx < approval.totalSteps - 1 && (
                                  <div className={`w-8 h-1 ${
                                    idx < approval.approvalStep ? 'bg-green-500' : 'bg-gray-200'
                                  }`}></div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          {approval.nextApprover && (
                            <span className="text-xs text-gray-600 ml-2">
                              Next: {approval.nextApprover}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedApproval(expandedApproval === approval.id ? null : approval.id)}
                        className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {expandedApproval === approval.id ? (
                          <ChevronUpIcon className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {expandedApproval === approval.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Purpose:</h4>
                          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                            {approval.purpose}
                          </p>
                        </div>

                        {approval.status === 'pending' && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleApprove(approval.id)}
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircleIcon className="w-5 h-5" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(approval.id)}
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <XCircleIcon className="w-5 h-5" />
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredApprovals.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-12 text-center">
                  <ClipboardListIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No approvals found</h3>
                  <p className="text-sm text-gray-500">
                    {filterStatus === 'all' 
                      ? 'No booking requests at this time.'
                      : `No ${filterStatus} requests found.`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approved Bookings Schedule</h3>
            <p className="text-gray-600">Schedule view coming soon...</p>
          </div>
        );

      case 'students':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Students</h3>
            <p className="text-gray-600">Student management coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Back Button - Fixed Position */}
      <button
        onClick={onLogout}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
      >
        ← Back to Gallery
      </button>

      {/* Sidebar */}
      <aside className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">Program Chair</h1>
          <p className="text-xs text-gray-500 mt-1">{programType}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {programType}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{chairName}</p>
              <p className="text-xs text-gray-500">Program Chair</p>
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
              <p className="text-sm text-gray-500 mt-1">{programName}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BellIcon className="w-6 h-6 text-gray-600" />
                {pendingCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <SettingsIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>

      {/* Account Settings Modal */}
      {showSettings && (
        <WebAccountSettings
          userName={chairName}
          userRole="admin"
          onClose={() => setShowSettings(false)}
          onLogout={onLogout}
        />
      )}
    </div>
  );
}