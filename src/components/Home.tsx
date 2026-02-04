import React, { useState } from 'react';
import { BellIcon, QrCodeIcon, TicketIcon, AlertCircleIcon, CalendarIcon, CodeIcon, ClockIcon, CalendarDaysIcon } from 'lucide-react';
import { Booking, QueueTicket } from './MobileApp';
import { MaintenanceReportModal } from './MaintenanceReportModal';
import { getOrdinal } from '../utils/ordinal';

interface HomeProps {
  userName: string;
  userType: 'student' | 'faculty';
  activeBooking: Booking | null;
  activeTicket: QueueTicket | null;
  onShowTicket: () => void;
  onShowCheckIn: () => void;
  onShowCollaborativeCheckIn?: () => void;
  onViewCalendar?: () => void;
  upcomingBookingsCount?: number;
}

export function Home({ userName, userType, activeBooking, activeTicket, onShowTicket, onShowCheckIn, onShowCollaborativeCheckIn, onViewCalendar, upcomingBookingsCount }: HomeProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [showMaintenanceReport, setShowMaintenanceReport] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getTimeRemaining = () => {
    if (!activeBooking?.checkInDeadline) return '';
    const now = new Date();
    const deadline = new Date(activeBooking.checkInDeadline);
    const diff = deadline.getTime() - now.getTime();
    
    if (diff <= 0) return '00:00';
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Mock official schedule for faculty
  const facultyClasses = [
    {
      id: '1',
      course: 'CS-101',
      room: 'Room 304',
      day: 'Monday/Wednesday',
      time: '9:00 AM - 11:00 AM',
      status: 'scheduled' as const,
    },
    {
      id: '2',
      course: 'CS-201',
      room: 'Room 305',
      day: 'Tuesday/Thursday',
      time: '1:00 PM - 3:00 PM',
      status: 'scheduled' as const,
    },
  ];

  const handleCancelClass = (classId: string) => {
    // This would update the room status to 'available'
    alert(`Class cancelled. ${facultyClasses.find(c => c.id === classId)?.room} is now available for booking.`);
  };

  const handleRunningLate = (classId: string) => {
    // This would hold the room status for 15-30 mins
    alert(`Running late status activated. Room will be held for 30 minutes.`);
  };

  const handleMaintenanceReport = (report: { issue: string; description: string; photo?: string }) => {
    alert(`Maintenance report submitted:\n${report.issue}\n${report.description}\nRoom will be marked as "Under Maintenance"`);
    setShowMaintenanceReport(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-6 pb-24">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-blue-100 text-sm mb-1">{getGreeting()}</p>
            <h1 className="text-2xl font-bold text-white">{userName}</h1>
            <p className="text-blue-100 text-xs mt-1">
              {userType === 'faculty' ? '👨‍🏫 Faculty Member' : '🎓 Student'}
            </p>
          </div>
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <BellIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Faculty Official Classes Section */}
        {userType === 'faculty' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">My Official Classes</h2>
            {facultyClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Official Schedule</p>
                    <h3 className="text-2xl font-bold mb-2">{cls.course}</h3>
                    <p className="text-sm opacity-90">{cls.room}</p>
                  </div>
                  <div className="px-3 py-1 bg-yellow-500 rounded-full">
                    <span className="text-xs font-semibold text-white">TODAY</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm mb-4 opacity-90">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{cls.day} • {cls.time}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCancelClass(cls.id)}
                    className="bg-white/20 hover:bg-white/30 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                  >
                    🚫 Cancel Class
                  </button>
                  <button
                    onClick={() => handleRunningLate(cls.id)}
                    className="bg-white/20 hover:bg-white/30 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                  >
                    ⏰ Running Late
                  </button>
                </div>

                <p className="text-xs opacity-75 mt-3 text-center">
                  Cancelling opens room for student bookings • Running late holds room for 30 mins
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Active Booking Card - Awaiting Check-In */}
        {activeBooking && activeBooking.status === 'awaiting-checkin' && (
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-1">⏰ Check-In Required</p>
            <h2 className="text-2xl font-bold mb-4">{activeBooking.roomName}</h2>
            <div className="flex items-center gap-2 text-sm mb-4 opacity-90">
              <ClockIcon className="w-4 h-4" />
              <span>{activeBooking.startTime} - {activeBooking.endTime}</span>
            </div>
            {activeBooking.checkInDeadline && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-4">
                <p className="text-xs font-semibold mb-1">Check-in Deadline</p>
                <p className="text-sm">{new Date(activeBooking.checkInDeadline).toLocaleTimeString()}</p>
              </div>
            )}
            <button
              onClick={activeBooking.sessionCode ? onShowCollaborativeCheckIn : onShowCheckIn}
              className="w-full py-3 bg-white text-yellow-600 rounded-xl font-semibold hover:bg-yellow-50 transition-colors flex items-center justify-center gap-2"
            >
              <QrCodeIcon className="w-5 h-5" />
              Check In Now
            </button>
          </div>
        )}

        {/* Active Booking Card - Pending Approval */}
        {activeBooking && activeBooking.status === 'pending' && (
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-1">📋 Pending Approval</p>
            <h2 className="text-2xl font-bold mb-2">{activeBooking.roomName}</h2>
            <p className="text-sm opacity-90 mb-4">Equipment request under review</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="opacity-90">Time Slot</span>
                <span className="font-semibold">{activeBooking.startTime} - {activeBooking.endTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-90">Equipment</span>
                <span className="font-semibold">{activeBooking.equipment.join(', ')}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm opacity-90">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Waiting for admin approval</span>
            </div>
          </div>
        )}

        {/* Active Booking Card - Checked In */}
        {activeBooking && activeBooking.status === 'active' && activeBooking.checkedIn && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-1">✅ Active Session</p>
            <h2 className="text-2xl font-bold mb-4">{activeBooking.roomName}</h2>
            <div className="flex items-center gap-2 text-sm mb-4 opacity-90">
              <ClockIcon className="w-4 h-4" />
              <span>{activeBooking.startTime} - {activeBooking.endTime}</span>
            </div>
            {activeBooking.sessionCode && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold mb-2">Group Session Code</p>
                <p className="text-2xl font-bold tracking-wider">{activeBooking.sessionCode}</p>
                <p className="text-xs mt-2 opacity-90">
                  {activeBooking.groupMembers?.length || 0} member(s) checked in
                </p>
              </div>
            )}
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              View Details
            </button>
          </div>
        )}

        {/* Student Queue Ticket */}
        {userType === 'student' && activeTicket && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-1">Queue Status</p>
            <h2 className="text-2xl font-bold mb-2">You are {getOrdinal(activeTicket.position)} in line</h2>
            <p className="text-sm opacity-90 mb-4">{activeTicket.department}</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
              <p className="text-xs font-semibold mb-2">Estimated Wait Time</p>
              <p className="text-2xl font-bold">{activeTicket.estimatedWait}</p>
            </div>
            <button
              onClick={onShowTicket}
              className="w-full py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <TicketIcon className="w-5 h-5" />
              View Ticket
            </button>
          </div>
        )}

        {/* No Active Sessions */}
        {!activeBooking && (!activeTicket || userType === 'faculty') && userType === 'student' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No Active Sessions</h3>
              <p className="text-sm text-gray-500">Book a room or join a queue to get started</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => setShowMaintenanceReport(true)}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertCircleIcon className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-xs text-gray-700 text-center">Report Issue</p>
            </button>
            {userType === 'student' && (
              <button 
                onClick={onShowCollaborativeCheckIn}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CodeIcon className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-xs text-gray-700 text-center">Join Session</p>
              </button>
            )}
            {onViewCalendar && (
              <button 
                onClick={onViewCalendar}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all relative"
              >
                {upcomingBookingsCount && upcomingBookingsCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {upcomingBookingsCount}
                  </div>
                )}
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-xs text-gray-700 text-center">My Calendar</p>
              </button>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">Recent Activity</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">Room 304</p>
                  <p className="text-sm text-gray-500">Yesterday, 2:00 PM - 4:00 PM</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  Completed
                </span>
              </div>
            </div>
            {userType === 'student' && (
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">ITSO Queue</p>
                    <p className="text-sm text-gray-500">2 days ago</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Maintenance Report Modal */}
      {showMaintenanceReport && (
        <MaintenanceReportModal
          onClose={() => setShowMaintenanceReport(false)}
          onSubmit={handleMaintenanceReport}
        />
      )}
    </div>
  );
}