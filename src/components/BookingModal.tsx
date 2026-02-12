import React, { useState } from 'react';
import { XIcon, ClockIcon, CalendarIcon, UsersIcon, CheckCircleIcon, ArrowRightIcon } from 'lucide-react';
import { Room, Booking } from './MobileApp';
import { getApprovalWorkflow } from '../utils/approvalWorkflow';

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
  const [isGroupSession, setIsGroupSession] = useState(false);
  const [purpose, setPurpose] = useState(''); // Academic purpose - now includes equipment needs
  
  // Calculate minimum capacity (50% of room capacity, rounded up, minimum 2)
  const minCapacity = Math.max(2, Math.ceil(room.capacity * 0.5));
  const maxCapacity = room.capacity;
  
  const [participants, setParticipants] = useState(minCapacity);

  // Get approval workflow based on room type
  const workflow = getApprovalWorkflow(room.type, false);
  
  // All bookings now require approval
  const needsApproval = true;

  // Generate session code for group bookings
  const generateSessionCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = () => {
    const workflow = getApprovalWorkflow(room.type, false);
    
    const booking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: room.id,
      roomName: room.name,
      roomType: room.type,
      startTime,
      endTime,
      date,
      equipment: [], // No separate equipment field
      purpose: purpose,
      status: 'pending',
      requiresApproval: true,
      checkedIn: false,
      sessionCode: isGroupSession ? generateSessionCode() : undefined,
      groupMembers: [],
      approvalWorkflow: {
        step: 1,
        totalSteps: workflow.approvers.length,
        currentApprover: workflow.approvers[0],
        approvers: workflow.approvers,
        statuses: workflow.approvers.map(() => 'pending' as const),
      },
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

          {/* Academic Purpose - Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Purpose <span className="text-red-600">*</span>
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Describe your academic activity and equipment needs (e.g., Thesis defense - need projector and microphone, Group study session - need whiteboard, Lab experiment - need safety equipment...)"
              rows={4}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              ℹ️ Include your purpose and any equipment you'll need
            </p>
          </div>

          {/* Approval Workflow Display */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-blue-900 mb-3">📋 Approval Workflow</p>
            <div className="flex items-center gap-2 flex-wrap">
              {workflow.approvers.map((approver, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-blue-200">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-900">{approver}</span>
                  </div>
                  {index < workflow.approvers.length - 1 && (
                    <ArrowRightIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-xs text-blue-700 mt-3">
              Your request will go through {workflow.approvers.length} approval step{workflow.approvers.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Approval Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-yellow-900 mb-1">⚠️ Approval Required</p>
            <p className="text-sm text-yellow-800">
              {workflow.description}. You'll be notified via email once reviewed.
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!purpose.trim()}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-colors ${
              !purpose.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            📋 Request Approval
          </button>
        </div>
      </div>
    </div>
  );
}