import React from 'react';
import { ArrowLeftIcon, UsersIcon, ClockIcon, XCircleIcon } from 'lucide-react';
import { QueueTicket } from './MobileApp';

interface VirtualTicketProps {
  ticket: QueueTicket;
  onLeaveQueue: () => void;
  onBack: () => void;
}

export function VirtualTicket({ ticket, onLeaveQueue, onBack }: VirtualTicketProps) {
  // Mock data for "Now Serving"
  const nowServing = {
    ticketNumber: ticket.ticketNumber.split('-')[0] + '-' + String(Math.floor(Math.random() * 900) + 100).padStart(3, '0'),
    peopleServing: 5, // Number of people icons to show
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-semibold text-white">Your Ticket</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
          {/* Hub Service Header - Now Serving */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-white font-bold text-lg">{ticket.department}</h2>
                <p className="text-white/80 text-sm">Now Serving</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xl">{nowServing.ticketNumber}</span>
              <div className="flex gap-1 ml-2">
                {Array.from({ length: nowServing.peopleServing }).map((_, idx) => (
                  <UsersIcon key={idx} className="w-4 h-4 text-white/70" fill="currentColor" />
                ))}
              </div>
            </div>
          </div>

          {/* Service Type */}
          <div className="px-6 pt-6 pb-4">
            <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
              <p className="text-center text-gray-900 font-semibold text-lg">
                {ticket.serviceType || 'General Service'}
              </p>
            </div>
          </div>

          {/* Ticket Number - Large Display */}
          <div className="px-6 pb-6">
            <div className="text-center mb-2">
              <p className="text-sm text-gray-500 font-medium">Ticket Number</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl py-8 border-2 border-orange-200">
              <div className="text-center">
                <div className="text-7xl font-bold text-orange-600 tracking-tight">
                  {ticket.ticketNumber}
                </div>
                <p className="text-sm text-orange-800 mt-2 font-medium">Your Queue Number</p>
              </div>
            </div>
          </div>

          {/* Queue Stats */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-4">
              {/* People Waiting */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-full p-3 mb-2 border border-gray-200">
                    <UsersIcon className="w-6 h-6 text-gray-700" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{ticket.position - 1}</p>
                  <p className="text-xs text-gray-500 text-center mt-1">People on waiting</p>
                </div>
              </div>

              {/* Approx Wait Time */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-full p-3 mb-2 border border-gray-200">
                    <ClockIcon className="w-6 h-6 text-gray-700" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{ticket.estimatedWait}</p>
                  <p className="text-xs text-gray-500 text-center mt-1">Approx. Wait Time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6">
            {/* Cancel Button */}
            <button
              onClick={onLeaveQueue}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition-colors flex flex-col items-center justify-center"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                <XCircleIcon className="w-5 h-5" />
              </div>
              <span className="text-sm">Cancel</span>
            </button>
          </div>
        </div>

        {/* Status Message Below Card */}
        <div className="mt-6 px-6 w-full max-w-sm">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <p className="text-center text-white font-medium text-sm">
              {ticket.position === 1
                ? '🎉 Your turn is coming up!'
                : ticket.position <= 3
                ? '⏱️ Almost there! Get ready.'
                : '✅ You\'re in line. You\'ll be notified when it\'s almost your turn.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}