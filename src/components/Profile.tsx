import React from 'react';
import { UserIcon, MailIcon, PhoneIcon, IdCardIcon, HistoryIcon, SettingsIcon, LogOutIcon, CalendarDaysIcon } from 'lucide-react';

interface ProfileProps {
  userName: string;
  userType: 'student' | 'faculty';
  onViewCalendar?: () => void;
}

export function Profile({ userName, userType, onViewCalendar }: ProfileProps) {
  const mockHistory = [
    {
      id: '1',
      type: 'booking',
      title: 'Room 304',
      date: 'Jan 22, 2026',
      time: '2:00 PM - 4:00 PM',
      status: 'completed',
    },
    {
      id: '2',
      type: 'queue',
      title: 'ITSO Queue',
      date: 'Jan 21, 2026',
      time: 'Ticket: ITSO-015',
      status: 'completed',
    },
    {
      id: '3',
      type: 'booking',
      title: 'Lecture Hall A',
      date: 'Jan 20, 2026',
      time: '10:00 AM - 12:00 PM',
      status: 'completed',
    },
    {
      id: '4',
      type: 'queue',
      title: 'Registrar Queue',
      date: 'Jan 19, 2026',
      time: 'Ticket: REG-042',
      status: 'completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 pt-6 pb-24">
        <h1 className="text-xl font-semibold text-white">Profile</h1>
      </header>

      {/* Profile Card */}
      <div className="px-6 -mt-16 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{userName}</h2>
              <p className="text-sm text-gray-500 capitalize">{userType}</p>
              <div className="flex items-center gap-2 mt-1">
                <IdCardIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">2021-12345</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3 text-gray-600">
              <MailIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm">juan.delacruz@university.edu</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <PhoneIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm">+63 912 345 6789</span>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <HistoryIcon className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Recent Activity</h3>
        </div>

        <div className="space-y-3">
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize">
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-6 pb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Settings</h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {onViewCalendar && (
            <button 
              onClick={onViewCalendar}
              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-blue-50 transition-colors border-b border-gray-200"
            >
              <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-medium">My Calendar</span>
              <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                View Bookings
              </span>
            </button>
          )}
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-200">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Account Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors text-red-600">
            <LogOutIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}