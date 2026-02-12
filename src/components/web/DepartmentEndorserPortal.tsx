import React, { useState } from 'react';
import { 
  LayoutDashboardIcon, ClipboardListIcon, CalendarIcon, BuildingIcon,
  SettingsIcon, BellIcon, CheckCircleIcon, XCircleIcon, ClockIcon,
  FilterIcon, SearchIcon, FileTextIcon, ChevronDownIcon, ChevronUpIcon,
  AlertCircleIcon
} from 'lucide-react';
import { WebAccountSettings } from './WebAccountSettings';

type ViewType = 'dashboard' | 'endorsements' | 'schedule' | 'affiliates';

interface AffiliateEndorsement {
  id: string;
  organizationName: string;
  contactPerson: string;
  contactEmail: string;
  venueName: string;
  eventType: string;
  date: string;
  time: string;
  attendees: number;
  purpose: string;
  endorsementLetter?: string;
  status: 'pending' | 'endorsed' | 'rejected';
  submittedAt: string;
  nextApprover?: string;
}

interface DepartmentEndorserPortalProps {
  departmentName: string;
  onLogout: () => void;
}

export function DepartmentEndorserPortal({ departmentName, onLogout }: DepartmentEndorserPortalProps) {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [expandedEndorsement, setExpandedEndorsement] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'endorsed' | 'rejected'>('all');

  const endorserName = 'Dr. Department Head';

  // Mock endorsement data
  const mockEndorsements: AffiliateEndorsement[] = [
    {
      id: '1',
      organizationName: 'PLDT Corporation',
      contactPerson: 'Maria Santos',
      contactEmail: 'maria.santos@pldt.com',
      venueName: 'Grand Hall',
      eventType: 'Corporate Training',
      date: 'Feb 15, 2026',
      time: '9:00 AM - 5:00 PM',
      attendees: 80,
      purpose: 'IT Infrastructure training program for employees. Need projector, sound system, and internet access.',
      endorsementLetter: 'Official endorsement from IT Department',
      status: 'pending',
      submittedAt: '2 hours ago',
      nextApprover: 'FMO (Facility Admin)',
    },
    {
      id: '2',
      organizationName: 'Department of Education',
      contactPerson: 'Juan Dela Cruz',
      contactEmail: 'juan.delacruz@deped.gov.ph',
      venueName: 'Conference Room A',
      eventType: 'Educational Seminar',
      date: 'Feb 18, 2026',
      time: '1:00 PM - 4:00 PM',
      attendees: 40,
      purpose: 'Teacher training workshop on new curriculum implementation. Need whiteboard and presentation equipment.',
      endorsementLetter: 'Endorsed by Education Department',
      status: 'pending',
      submittedAt: '5 hours ago',
      nextApprover: 'FMO (Facility Admin)',
    },
    {
      id: '3',
      organizationName: 'City Health Office',
      contactPerson: 'Dr. Ana Reyes',
      contactEmail: 'ana.reyes@cityhealth.gov.ph',
      venueName: 'Gymnasium',
      eventType: 'Health Fair',
      date: 'Feb 20, 2026',
      time: '8:00 AM - 3:00 PM',
      attendees: 200,
      purpose: 'Community health screening and vaccination drive. Need tables, chairs, and electrical outlets.',
      endorsementLetter: 'Endorsed by Health Services Department',
      status: 'endorsed',
      submittedAt: '1 day ago',
    },
  ];

  const filteredEndorsements = mockEndorsements.filter(endorsement => 
    filterStatus === 'all' || endorsement.status === filterStatus
  );

  const pendingCount = mockEndorsements.filter(e => e.status === 'pending').length;
  const endorsedToday = mockEndorsements.filter(e => e.status === 'endorsed' && e.submittedAt.includes('hour')).length;

  const handleEndorse = (id: string) => {
    // In real app, this would call an API
    console.log('Endorsed:', id);
  };

  const handleReject = (id: string) => {
    // In real app, this would call an API
    console.log('Rejected:', id);
  };

  const sidebarItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'endorsements' as ViewType, label: 'Endorsements', icon: ClipboardListIcon, badge: pendingCount },
    { id: 'schedule' as ViewType, label: 'Schedule', icon: CalendarIcon },
    { id: 'affiliates' as ViewType, label: 'Affiliates', icon: BuildingIcon },
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
                  <p className="text-sm text-gray-600">Pending Endorsements</p>
                  <ClockIcon className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
                <p className="text-xs text-gray-500 mt-1">Awaiting your review</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Endorsed Today</p>
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{endorsedToday}</p>
                <p className="text-xs text-gray-500 mt-1">Requests processed</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">This Month</p>
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">18</p>
                <p className="text-xs text-gray-500 mt-1">Total requests</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Active Affiliates</p>
                  <BuildingIcon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-500 mt-1">Organizations</p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Affiliate Endorsement Process</h4>
                  <p className="text-sm text-blue-800">
                    As a Department Endorser, you review and endorse facility rental requests from affiliated organizations. 
                    <span className="font-semibold"> Affiliates do NOT pay rental fees</span> - your endorsement confirms their 
                    affiliation and forwards the request to FMO for final approval.
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Endorsements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Recent Endorsement Requests</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {mockEndorsements.slice(0, 3).map((endorsement) => (
                  <div key={endorsement.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{endorsement.organizationName}</h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            endorsement.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            endorsement.status === 'endorsed' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {endorsement.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">{endorsement.venueName}</span> • {endorsement.date} • {endorsement.time}
                        </p>
                        <p className="text-xs text-gray-500">{endorsement.submittedAt}</p>
                      </div>
                      {endorsement.status === 'pending' && (
                        <button
                          onClick={() => setActiveView('endorsements')}
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

      case 'endorsements':
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
                      placeholder="Search by organization or venue..."
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
                    <option value="endorsed">Endorsed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Endorsements List */}
            <div className="space-y-4">
              {filteredEndorsements.map((endorsement) => (
                <div key={endorsement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{endorsement.organizationName}</h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            endorsement.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            endorsement.status === 'endorsed' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {endorsement.status.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            NO PAYMENT REQUIRED
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Contact:</span>
                            <span className="ml-2 font-medium text-gray-900">{endorsement.contactPerson}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Email:</span>
                            <span className="ml-2 font-medium text-gray-900">{endorsement.contactEmail}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Venue:</span>
                            <span className="ml-2 font-medium text-gray-900">{endorsement.venueName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Event Type:</span>
                            <span className="ml-2 font-medium text-gray-900">{endorsement.eventType}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Date:</span>
                            <span className="ml-2 font-medium text-gray-900">{endorsement.date}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Time:</span>
                            <span className="ml-2 font-medium text-gray-900">{endorsement.time}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Attendees:</span>
                            <span className="ml-2 font-medium text-gray-900">{endorsement.attendees} people</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Submitted:</span>
                            <span className="ml-2 font-medium text-gray-900">{endorsement.submittedAt}</span>
                          </div>
                        </div>

                        {endorsement.nextApprover && (
                          <div className="mt-3 flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Next Approver:</span>
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 font-medium rounded">
                              {endorsement.nextApprover}
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setExpandedEndorsement(expandedEndorsement === endorsement.id ? null : endorsement.id)}
                        className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {expandedEndorsement === endorsement.id ? (
                          <ChevronUpIcon className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {expandedEndorsement === endorsement.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Event Purpose:</h4>
                          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                            {endorsement.purpose}
                          </p>
                        </div>

                        {endorsement.endorsementLetter && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Endorsement Letter:</h4>
                            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                              <FileTextIcon className="w-5 h-5 text-blue-600" />
                              <span className="text-sm text-blue-900">{endorsement.endorsementLetter}</span>
                            </div>
                          </div>
                        )}

                        {endorsement.status === 'pending' && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEndorse(endorsement.id)}
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircleIcon className="w-5 h-5" />
                              Endorse to FMO
                            </button>
                            <button
                              onClick={() => handleReject(endorsement.id)}
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <XCircleIcon className="w-5 h-5" />
                              Reject Request
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredEndorsements.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-12 text-center">
                  <ClipboardListIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No endorsements found</h3>
                  <p className="text-sm text-gray-500">
                    {filterStatus === 'all' 
                      ? 'No endorsement requests at this time.'
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Endorsed Events Schedule</h3>
            <p className="text-gray-600">Schedule view coming soon...</p>
          </div>
        );

      case 'affiliates':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Affiliate Organizations</h3>
            <p className="text-gray-600">Affiliate management coming soon...</p>
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
          <h1 className="text-lg font-bold text-gray-900">Dept. Endorser</h1>
          <p className="text-xs text-gray-500 mt-1">{departmentName}</p>
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
              DE
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{endorserName}</p>
              <p className="text-xs text-gray-500">Dept. Endorser</p>
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
              <p className="text-sm text-gray-500 mt-1">Affiliate Endorsement Management</p>
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
          userName={endorserName}
          userRole="admin"
          onClose={() => setShowSettings(false)}
          onLogout={onLogout}
        />
      )}
    </div>
  );
}