import React, { useState } from 'react';
import { XIcon, ClockIcon, CalendarIcon, UsersIcon } from 'lucide-react';
import { Room, Booking } from './MobileApp';

interface BookingModalProps {
  room: Room;
  onClose: () => void;
  onBook: (booking: Booking) => void;
  userType: 'student' | 'faculty';
}

export function BookingModal({ room, onClose, onBook, userType }: BookingModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [isGroupSession, setIsGroupSession] = useState(false);
  
  // Calculate minimum capacity (50% of room capacity, rounded up, minimum 2)
  const minCapacity = Math.max(2, Math.ceil(room.capacity * 0.5));
  const maxCapacity = room.capacity;
  
  const [participants, setParticipants] = useState(minCapacity);

  const toggleEquipment = (equipment: string) => {
    setSelectedEquipment(prev =>
      prev.includes(equipment)
        ? prev.filter(e => e !== equipment)
        : [...prev, equipment]
    );
  };

  // All bookings now require approval
  // - Library study rooms (study-room): Need Librarian approval
  // - Students with equipment: Need Facility Admin approval
  // - Students without equipment (non-library): Need Facility Admin approval
  // - Faculty: Need Admin approval
  const needsApproval = true;

  // Generate session code for group bookings
  const generateSessionCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = () => {
    const booking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: room.id,
      roomName: room.name,
      startTime,
      endTime,
      date,
      equipment: selectedEquipment,
      status: needsApproval ? 'pending' : 'awaiting-checkin',
      requiresApproval: needsApproval,
      checkedIn: false,
      sessionCode: isGroupSession ? generateSessionCode() : undefined,
      groupMembers: [],
    };
    onBook(booking);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-in fade-in">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{room.name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <UsersIcon className="w-4 h-4" />
              <span>Capacity: {room.capacity} people</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Date
              </div>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  Start Time
                </div>
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  End Time
                </div>
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Group Session Toggle - ONLY for Students */}
          {userType === 'student' && (
            <div>
              <label className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
                <input
                  type="checkbox"
                  checked={isGroupSession}
                  onChange={(e) => setIsGroupSession(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Group Session</p>
                  <p className="text-sm text-gray-600">Enable collaborative check-in with session code</p>
                </div>
              </label>
              
              {isGroupSession && (
                <div className="mt-3 ml-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Participants
                    <span className="ml-2 text-xs text-gray-500">(Min: {minCapacity}, Max: {maxCapacity})</span>
                  </label>
                  <input
                    type="number"
                    min={minCapacity}
                    max={maxCapacity}
                    value={participants}
                    onChange={(e) => setParticipants(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum {minCapacity} participants required for collaborative booking
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Equipment Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Additional Equipment
              {userType === 'student' && (
                <span className="ml-2 text-xs text-orange-600">(Requires Approval)</span>
              )}
            </label>
            <div className="space-y-2">
              {room.amenities.includes('tv') && (
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedEquipment.includes('tv')}
                    onChange={() => toggleEquipment('tv')}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">TV</span>
                </label>
              )}
              {room.amenities.includes('aircon') && (
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedEquipment.includes('aircon')}
                    onChange={() => toggleEquipment('aircon')}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Air Conditioning</span>
                </label>
              )}
            </div>
          </div>

          {/* Approval Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-orange-900 mb-1">⚠️ Approval Required</p>
            <p className="text-sm text-orange-800">
              {room.type === 'study-room' 
                ? 'Library study room bookings require Librarian approval.'
                : 'Your booking requires Facility Admin approval.'}
              {' '}You'll be notified via email once reviewed.
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors"
          >
            📋 Request Approval
          </button>
        </div>
      </div>
    </div>
  );
}