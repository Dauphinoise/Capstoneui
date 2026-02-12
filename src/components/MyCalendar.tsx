import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon, MapPinIcon, PackageIcon, XIcon, AlertCircleIcon, CheckCircleIcon, UsersIcon } from 'lucide-react';
import { Booking } from './MobileApp';

interface MyCalendarProps {
  bookings: Booking[];
  onCancelBooking?: (bookingId: string) => void;
  onBack: () => void;
}

export function MyCalendar({ bookings, onCancelBooking, onBack }: MyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const getBookingsForDate = (day: number): Booking[] => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(booking => booking.date === dateStr);
  };

  const getBookingStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'active':
        return 'bg-blue-600';
      case 'pending':
        return 'bg-yellow-500';
      case 'awaiting-checkin':
        return 'bg-yellow-600';
      case 'completed':
        return 'bg-gray-400';
      case 'cancelled':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const bookingsOnDate = getBookingsForDate(day);
    if (bookingsOnDate.length > 0) {
      setSelectedDate(dateStr);
    }
  };

  // Create array of day cells
  const dayCells = [];
  
  // Empty cells for days before the month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    dayCells.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  // Actual day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const isCurrentDay = isToday(day);
    const dayBookings = getBookingsForDate(day);
    const hasBookings = dayBookings.length > 0;

    dayCells.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={`
          aspect-square p-1 rounded-xl transition-all relative
          ${hasBookings ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
          ${hasBookings ? 'bg-blue-50 border-2 border-blue-300' : 'bg-white border border-gray-200'}
          ${isCurrentDay ? 'ring-2 ring-blue-500' : ''}
        `}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <span className={`text-sm font-semibold ${hasBookings ? 'text-blue-900' : 'text-gray-700'}`}>
            {day}
          </span>
          {hasBookings && (
            <div className="flex gap-0.5 mt-1">
              {dayBookings.slice(0, 3).map((booking, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full ${getBookingStatusColor(booking.status)}`}
                />
              ))}
              {dayBookings.length > 3 && (
                <span className="text-[8px] text-blue-600 font-bold">+{dayBookings.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </button>
    );
  }

  const selectedDateBookings = selectedDate ? bookings.filter(b => b.date === selectedDate) : [];

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'active':
        return { text: 'Active', bg: 'bg-blue-100', text_color: 'text-blue-700', icon: CheckCircleIcon };
      case 'pending':
        return { text: 'Pending Approval', bg: 'bg-yellow-100', text_color: 'text-yellow-700', icon: AlertCircleIcon };
      case 'awaiting-checkin':
        return { text: 'Awaiting Check-in', bg: 'bg-yellow-100', text_color: 'text-yellow-700', icon: ClockIcon };
      case 'completed':
        return { text: 'Completed', bg: 'bg-gray-100', text_color: 'text-gray-700', icon: CheckCircleIcon };
      case 'cancelled':
        return { text: 'Cancelled', bg: 'bg-gray-100', text_color: 'text-gray-700', icon: XIcon };
      default:
        return { text: status, bg: 'bg-gray-100', text_color: 'text-gray-700', icon: AlertCircleIcon };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-6 shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 hover:bg-white/20 rounded-lg px-3 py-2 -ml-3 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        
        <div className="flex items-center gap-3 mb-2">
          <CalendarIcon className="w-7 h-7" />
          <h1 className="text-2xl font-bold">My Calendar</h1>
        </div>
        <p className="text-blue-100 text-sm">View and manage your bookings</p>
      </div>

      {/* Month Navigation */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center shadow-sm">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">
          {monthNames[month]} {year}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="px-6 py-6">
        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {dayNames.map((dayName) => (
              <div
                key={dayName}
                className="text-center text-xs font-semibold text-gray-600"
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-2">
            {dayCells}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Booking Status Legend</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <span className="text-gray-600">Awaiting Check-in</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-gray-600">Completed</span>
            </div>
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && selectedDateBookings.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-in slide-in-from-bottom">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
              <h3 className="font-bold text-lg">
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h3>
              <p className="text-blue-100 text-sm mt-1">
                {selectedDateBookings.length} booking{selectedDateBookings.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="p-6 space-y-4">
              {selectedDateBookings.map((booking) => {
                const statusBadge = getStatusBadge(booking.status);
                const StatusIcon = statusBadge.icon;
                
                return (
                  <div
                    key={booking.id}
                    className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
                  >
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${statusBadge.bg} mb-3`}>
                      <StatusIcon className={`w-3.5 h-3.5 ${statusBadge.text_color}`} />
                      <span className={`text-xs font-semibold ${statusBadge.text_color}`}>
                        {statusBadge.text}
                      </span>
                    </div>

                    {/* Room Info */}
                    <div className="flex items-start gap-3 mb-3">
                      <MapPinIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{booking.roomName}</h4>
                        <p className="text-sm text-gray-500">Room ID: {booking.roomId}</p>
                      </div>
                    </div>

                    {/* Time Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <ClockIcon className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {booking.startTime} - {booking.endTime}
                      </span>
                    </div>

                    {/* Equipment */}
                    {booking.equipment.length > 0 && (
                      <div className="flex items-start gap-3 mb-3">
                        <PackageIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <div className="flex flex-wrap gap-2">
                          {booking.equipment.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Academic Purpose */}
                    {booking.purpose && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Academic Purpose:</p>
                        <p className="text-xs text-gray-600">{booking.purpose}</p>
                      </div>
                    )}

                    {/* Approval Workflow Progress */}
                    {booking.approvalWorkflow && booking.status === 'pending' && (
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-blue-900 mb-2">📋 Approval Progress</p>
                        <div className="space-y-2">
                          {booking.approvalWorkflow.approvers.map((approver, index) => {
                            const isPending = index === booking.approvalWorkflow!.step - 1;
                            const isCompleted = index < booking.approvalWorkflow!.step - 1;
                            
                            return (
                              <div
                                key={index}
                                className={`flex items-center gap-2 p-2 rounded-lg ${
                                  isCompleted
                                    ? 'bg-green-100'
                                    : isPending
                                    ? 'bg-yellow-100'
                                    : 'bg-gray-100'
                                }`}
                              >
                                <div className="flex-shrink-0">
                                  {isCompleted ? (
                                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                                  ) : isPending ? (
                                    <AlertCircleIcon className="w-4 h-4 text-yellow-600" />
                                  ) : (
                                    <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className={`text-xs font-medium ${
                                    isCompleted
                                      ? 'text-green-900'
                                      : isPending
                                      ? 'text-yellow-900'
                                      : 'text-gray-600'
                                  }`}>
                                    {approver}
                                  </p>
                                </div>
                                {isPending && (
                                  <span className="text-xs font-semibold text-yellow-700">Reviewing...</span>
                                )}
                                {isCompleted && (
                                  <span className="text-xs font-semibold text-green-700">✓ Approved</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-xs text-blue-700 mt-2">
                          Step {booking.approvalWorkflow.step} of {booking.approvalWorkflow.totalSteps} • Currently with: {booking.approvalWorkflow.currentApprover}
                        </p>
                      </div>
                    )}

                    {/* Group Session Info */}
                    {booking.sessionCode && (
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-4 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <UsersIcon className="w-4 h-4 text-blue-700" />
                          <p className="text-sm font-bold text-blue-900">Collaborative Group Session</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 mb-2">
                          <p className="text-xs text-gray-600 mb-1">Share this code with group members:</p>
                          <p className="text-center text-2xl font-bold text-blue-600 tracking-wider font-mono">
                            {booking.sessionCode}
                          </p>
                        </div>
                        <p className="text-xs text-blue-700">
                          ✓ {booking.groupMembers?.length || 0} member(s) have checked in
                        </p>
                      </div>
                    )}

                    {/* Check-in Deadline */}
                    {booking.status === 'awaiting-checkin' && booking.checkInDeadline && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-yellow-900 mb-1">
                          ⏰ Check-in Required
                        </p>
                        <p className="text-xs text-yellow-700">
                          Deadline: {new Date(booking.checkInDeadline).toLocaleTimeString()}
                        </p>
                      </div>
                    )}

                    {/* Cancel Button */}
                    {(booking.status === 'pending' || booking.status === 'awaiting-checkin') && onCancelBooking && (
                      <button
                        onClick={() => onCancelBooking(booking.id)}
                        className="w-full mt-3 py-2.5 bg-red-50 text-red-700 border-2 border-red-200 rounded-xl font-semibold text-sm hover:bg-red-100 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setSelectedDate(null)}
              className="w-full py-3 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
              Close Details
            </button>
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 text-sm">
              Your upcoming reservations will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}