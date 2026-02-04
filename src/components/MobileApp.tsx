import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, BuildingIcon, TicketIcon, UserIcon, BellIcon, QrCodeIcon } from 'lucide-react';
import { Home } from './Home';
import { RoomList } from './RoomList';
import { QueueModule } from './QueueModule';
import { Profile } from './Profile';
import { VirtualTicket } from './VirtualTicket';
import { CheckInModal } from './CheckInModal';
import { BookingModal } from './BookingModal';
import { CollaborativeCheckInModal } from './CollaborativeCheckInModal';
import { MyCalendar } from './MyCalendar';
import { getOrdinal } from '../utils/ordinal';

type ScreenType = 'home' | 'rooms' | 'queue' | 'profile' | 'my-calendar';

export interface Room {
  id: string;
  name: string;
  type: 'classroom' | 'lab' | 'gym' | 'hall' | 'study-room' | 'library';
  status: 'available' | 'occupied' | 'pending' | 'maintenance' | 'reserved';
  occupiedBy?: string;
  capacity: number;
  amenities: string[];
  floor: number;
  officialSchedule?: {
    day: string;
    startTime: string;
    endTime: string;
    course: string;
    faculty: string;
  }[];
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  startTime: string;
  endTime: string;
  date: string;
  equipment: string[];
  status: 'active' | 'pending' | 'completed' | 'cancelled' | 'awaiting-checkin';
  requiresApproval: boolean;
  checkedIn: boolean;
  checkInDeadline?: Date;
  sessionCode?: string;
  groupMembers?: string[];
}

export interface QueueTicket {
  department: string;
  ticketNumber: string;
  position: number;
  estimatedWait: number;
  status: 'waiting' | 'called' | 'serving';
  serviceType?: string; // The specific service type selected (e.g., "Payment", "Disbursements", etc.)
}

interface MobileAppProps {
  onBack: () => void;
  initialUserType?: 'student' | 'faculty';
}

export function MobileApp({ onBack, initialUserType = 'student' }: MobileAppProps) {
  const [userType, setUserType] = useState<'student' | 'faculty'>(initialUserType);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [activeTicket, setActiveTicket] = useState<QueueTicket | null>(null);
  const [showTicketView, setShowTicketView] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCollaborativeCheckIn, setShowCollaborativeCheckIn] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Mock bookings array for My Calendar
  const mockBookings: Booking[] = [
    {
      id: '1',
      roomId: '304',
      roomName: 'Room 304',
      date: new Date().toISOString().split('T')[0],
      startTime: '14:00',
      endTime: '16:00',
      equipment: ['Projector', 'Microphone'],
      status: 'awaiting-checkin',
      requiresApproval: false,
      checkedIn: false,
      checkInDeadline: new Date(Date.now() + 900000),
    },
    {
      id: '2',
      roomId: '305',
      roomName: 'Study Room 1',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '12:00',
      equipment: [],
      status: 'pending',
      requiresApproval: true,
      checkedIn: false,
    },
    {
      id: '3',
      roomId: '306',
      roomName: 'Lecture Hall A',
      date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '11:00',
      equipment: ['Projector'],
      status: 'active',
      requiresApproval: false,
      checkedIn: true,
      sessionCode: 'GRPA1B2',
      groupMembers: ['Juan Dela Cruz', 'Maria Santos'],
    },
  ];

  const handleCancelBooking = (bookingId: string) => {
    addNotification('❌ Booking cancelled successfully');
    // In real app, this would remove the booking
  };

  const userName = "Juan Dela Cruz";

  // Ghost booking prevention - check-in countdown
  useEffect(() => {
    if (activeBooking && activeBooking.status === 'awaiting-checkin' && activeBooking.checkInDeadline) {
      const timer = setInterval(() => {
        const now = new Date();
        const deadline = new Date(activeBooking.checkInDeadline);
        
        if (now > deadline) {
          // Auto-cancel booking
          setActiveBooking(null);
          addNotification('❌ Booking cancelled - No check-in within 15 minutes');
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [activeBooking]);

  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev].slice(0, 5));
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== message));
    }, 5000);
  };

  const handleBookRoom = (booking: Booking) => {
    // Set check-in deadline (15 minutes from now)
    const checkInDeadline = new Date();
    checkInDeadline.setMinutes(checkInDeadline.getMinutes() + 15);
    
    const newBooking = {
      ...booking,
      checkInDeadline,
      status: booking.requiresApproval ? 'pending' : 'awaiting-checkin',
    } as Booking;

    setActiveBooking(newBooking);
    setSelectedRoom(null);

    // All bookings now require approval
    addNotification('📋 Booking request sent for approval. You\'ll be notified via email once reviewed.');
  };

  const handleCheckIn = (scanned: boolean) => {
    if (activeBooking && scanned) {
      // Generate session code for collaborative bookings
      const sessionCode = 'GRP' + Math.random().toString(36).substring(2, 6).toUpperCase();
      
      setActiveBooking({
        ...activeBooking,
        status: 'active',
        checkedIn: true,
        sessionCode: sessionCode, // Add session code for group members to join
      });
      addNotification('✅ Booking confirmed! QR check-in successful');
      setShowCheckIn(false);
    }
  };

  const handleJoinQueue = (ticket: QueueTicket) => {
    setActiveTicket(ticket);
    setShowTicketView(true);
    
    // Simulate push notifications
    setTimeout(() => {
      addNotification(`📢 You are ${getOrdinal(3)} in line at ${ticket.department}`);
    }, 3000);
    
    setTimeout(() => {
      addNotification(`⏰ Almost your turn! You're next at ${ticket.department}`);
    }, 10000);
  };

  const handleLeaveQueue = () => {
    setActiveTicket(null);
    setShowTicketView(false);
  };

  const handleJoinCollaborativeSession = (sessionCode: string) => {
    addNotification(`✅ Joined collaborative session: ${sessionCode}`);
    setShowCollaborativeCheckIn(false);
    // Join existing group booking
  };

  if (showTicketView && activeTicket) {
    return (
      <div className="relative">
        <button
          onClick={onBack}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          Logout
        </button>
        <VirtualTicket
          ticket={activeTicket}
          onLeaveQueue={handleLeaveQueue}
          onBack={() => setShowTicketView(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20 relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="text-lg font-bold text-gray-900"></div>
      </div>

      {/* Push Notifications */}
      <div className="fixed top-20 right-4 z-40 space-y-2 max-w-sm">
        {notifications.map((notif, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-in slide-in-from-right"
          >
            <p className="text-sm text-gray-900">{notif}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {currentScreen === 'home' && (
          <Home
            userName={userName}
            userType={userType}
            activeBooking={activeBooking}
            activeTicket={activeTicket}
            onShowTicket={() => setShowTicketView(true)}
            onShowCheckIn={() => setShowCheckIn(true)}
            onShowCollaborativeCheckIn={() => setShowCollaborativeCheckIn(true)}
            onViewCalendar={() => setCurrentScreen('my-calendar')}
            upcomingBookingsCount={mockBookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length}
          />
        )}
        {currentScreen === 'rooms' && (
          <RoomList
            onSelectRoom={setSelectedRoom}
            onCollaborativeJoin={() => setShowCollaborativeCheckIn(true)}
            userType={userType}
          />
        )}
        {currentScreen === 'queue' && (
          <QueueModule onJoinQueue={handleJoinQueue} />
        )}
        {currentScreen === 'profile' && (
          <Profile 
            userName={userName} 
            userType={userType}
            onViewCalendar={() => setCurrentScreen('my-calendar')}
          />
        )}
        {currentScreen === 'my-calendar' && (
          <MyCalendar 
            bookings={mockBookings} 
            onCancelBooking={handleCancelBooking}
            onBack={() => setCurrentScreen('home')}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentScreen === 'home'
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setCurrentScreen('rooms')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentScreen === 'rooms'
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}
          >
            <BuildingIcon className="w-6 h-6" />
            <span className="text-xs">Rooms</span>
          </button>
          {/* Queue tab only for students */}
          {userType === 'student' && (
            <button
              onClick={() => setCurrentScreen('queue')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentScreen === 'queue'
                  ? 'text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              <TicketIcon className="w-6 h-6" />
              <span className="text-xs">Queue</span>
            </button>
          )}
          <button
            onClick={() => setCurrentScreen('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentScreen === 'profile'
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onBook={handleBookRoom}
          userType={userType}
        />
      )}

      {/* Check-In Modal */}
      {showCheckIn && activeBooking && (
        <CheckInModal
          booking={activeBooking}
          onClose={() => setShowCheckIn(false)}
          onCheckIn={handleCheckIn}
        />
      )}

      {/* Collaborative Check-In Modal */}
      {showCollaborativeCheckIn && (
        <CollaborativeCheckInModal
          onClose={() => setShowCollaborativeCheckIn(false)}
          onJoinSession={handleJoinCollaborativeSession}
        />
      )}
    </div>
  );
}