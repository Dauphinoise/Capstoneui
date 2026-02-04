import React, { useState } from 'react';
import { SearchIcon, FilterIcon, TvIcon, WindIcon, ProjectorIcon, UsersIcon, ShieldIcon, UserPlusIcon, CalendarIcon } from 'lucide-react';
import { Room } from './MobileApp';
import { CalendarView } from './CalendarView';

interface RoomListProps {
  onSelectRoom: (room: Room) => void;
  onCollaborativeJoin?: () => void;
  userType: 'student' | 'faculty';
}

const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Room 304',
    type: 'classroom',
    status: 'available',
    capacity: 40,
    amenities: ['projector', 'aircon', 'tv'],
    floor: 3,
  },
  {
    id: '2',
    name: 'Room 305',
    type: 'classroom',
    status: 'reserved',
    occupiedBy: 'Student Group (4/5 checked in)',
    capacity: 30,
    amenities: ['projector', 'aircon'],
    floor: 3,
  },
  {
    id: '3',
    name: 'Lecture Hall A',
    type: 'classroom',
    status: 'occupied',
    occupiedBy: 'Student - Juan Dela Cruz',
    capacity: 100,
    amenities: ['projector', 'aircon', 'tv'],
    floor: 2,
  },
  {
    id: '4',
    name: 'Computer Lab 1',
    type: 'lab',
    status: 'available',
    capacity: 35,
    amenities: ['computers', 'projector', 'aircon'],
    floor: 1,
  },
  {
    id: '5',
    name: 'Science Lab 2',
    type: 'lab',
    status: 'occupied',
    occupiedBy: 'Prof. Cruz - CHEM-101',
    capacity: 25,
    amenities: ['lab-equipment', 'aircon'],
    floor: 1,
  },
  {
    id: '6',
    name: 'Room 306',
    type: 'classroom',
    status: 'available',
    capacity: 35,
    amenities: ['aircon'],
    floor: 3,
  },
  {
    id: '7',
    name: 'Study Room 1',
    type: 'library',
    status: 'available',
    capacity: 8,
    amenities: ['aircon', 'whiteboard'],
    floor: 2,
  },
  {
    id: '8',
    name: 'Study Room 2',
    type: 'library',
    status: 'reserved',
    occupiedBy: 'Student Group (2/4 checked in)',
    capacity: 6,
    amenities: ['aircon'],
    floor: 2,
  },
  {
    id: '9',
    name: 'Private Study Room A',
    type: 'library',
    status: 'occupied',
    occupiedBy: 'Active Session',
    capacity: 4,
    amenities: ['aircon'],
    floor: 2,
  },
];

export function RoomList({ onSelectRoom, onCollaborativeJoin, userType }: RoomListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<'all' | 'facility' | 'library'>('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Mock availability data - in real app, this would come from backend
  const mockAvailability: { [date: string]: number } = {
    [new Date().toISOString().split('T')[0]]: 7,
    [new Date(Date.now() + 86400000).toISOString().split('T')[0]]: 5,
    [new Date(Date.now() + 172800000).toISOString().split('T')[0]]: 3,
    [new Date(Date.now() + 259200000).toISOString().split('T')[0]]: 8,
  };

  // Simulate room availability based on selected date
  const getRoomsForDate = (rooms: Room[], date: string) => {
    // In a real app, this would filter based on actual bookings for that date
    // For now, we'll just simulate by randomly marking some as occupied/reserved
    const dateObj = new Date(date);
    const dayOfMonth = dateObj.getDate();
    
    return rooms.map((room, index) => {
      // Simulate different availability patterns based on date
      const shouldBeOccupied = (dayOfMonth + index) % 4 === 0;
      const shouldBeReserved = (dayOfMonth + index) % 5 === 0 && !shouldBeOccupied;
      
      if (shouldBeOccupied) {
        return { ...room, status: 'occupied' as const };
      } else if (shouldBeReserved) {
        return { ...room, status: 'reserved' as const };
      } else {
        return { ...room, status: 'available' as const };
      }
    });
  };

  // Filter out labs for students
  const availableRooms = userType === 'student' 
    ? MOCK_ROOMS.filter(room => room.type !== 'lab')
    : MOCK_ROOMS;

  const filteredRooms = availableRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Location filter
    if (locationFilter === 'facility') {
      return matchesSearch && (room.type === 'classroom' || room.type === 'lab');
    }
    if (locationFilter === 'library') {
      return matchesSearch && room.type === 'library';
    }
    
    return matchesSearch; // 'all' shows everything
  });

  // Apply date filter to rooms
  const dateFilteredRooms = getRoomsForDate(filteredRooms, selectedDate);

  const getStatusConfig = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return { color: 'bg-green-500', text: 'AVAILABLE', textColor: 'text-green-700', bgColor: 'bg-green-50' };
      case 'occupied':
        return { color: 'bg-red-500', text: 'OCCUPIED', textColor: 'text-red-700', bgColor: 'bg-red-50' };
      case 'pending':
        return { color: 'bg-yellow-500', text: 'PENDING', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' };
      case 'maintenance':
        return { color: 'bg-gray-500', text: 'MAINTENANCE', textColor: 'text-gray-700', bgColor: 'bg-gray-50' };
      case 'reserved':
        return { color: 'bg-blue-500', text: 'RESERVED', textColor: 'text-blue-700', bgColor: 'bg-blue-50' };
    }
  };

  const handleRoomClick = (room: Room) => {
    if (room.status === 'available') {
      onSelectRoom(room);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Room Reservation</h1>
        <p className="text-xs text-gray-500 mt-1">
          {userType === 'faculty' ? 'Faculty can book all facilities including labs' : 'Book available study spaces'}
        </p>
      </header>

      <div className="px-6 py-4 space-y-4">
        {/* Date Selector Button */}
        <button
          onClick={() => setShowCalendar(true)}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold flex items-center justify-between hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <span>
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg">
            <span className="text-sm">{mockAvailability[selectedDate] || 0} available</span>
          </div>
        </button>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setLocationFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              locationFilter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setLocationFilter('facility')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              locationFilter === 'facility'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            Facilities
          </button>
          <button
            onClick={() => setLocationFilter('library')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              locationFilter === 'library'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            Library
          </button>
        </div>

        {/* Room List */}
        <div className="space-y-3 pb-6">
          {dateFilteredRooms.map(room => {
            const statusConfig = getStatusConfig(room.status);
            const isLab = room.type === 'lab';
            return (
              <div
                key={room.id}
                className={`bg-white rounded-xl p-4 border border-gray-200 ${
                  room.status === 'available' ? 'cursor-pointer hover:border-blue-300 hover:shadow-md' : ''
                } transition-all relative`}
              >
                {isLab && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      LAB
                    </span>
                  </div>
                )}
                
                <div
                  onClick={() => handleRoomClick(room)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{room.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <UsersIcon className="w-4 h-4" />
                        <span>Capacity: {room.capacity}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${statusConfig.bgColor}`}>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${statusConfig.color}`}></div>
                        <span className={`text-xs font-semibold ${statusConfig.textColor}`}>
                          {statusConfig.text}
                        </span>
                      </div>
                    </div>
                  </div>

                  {room.occupiedBy && (
                    <p className="text-sm text-gray-500 mb-3">{room.occupiedBy}</p>
                  )}

                  <div className="flex gap-3 mb-3">
                    {room.amenities.includes('projector') && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <ProjectorIcon className="w-4 h-4" />
                      </div>
                    )}
                    {room.amenities.includes('aircon') && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <WindIcon className="w-4 h-4" />
                      </div>
                    )}
                    {room.amenities.includes('tv') && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <TvIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Collaborative Join Button - ONLY for STUDENTS on RESERVED rooms */}
                {userType === 'student' && room.status === 'reserved' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCollaborativeJoin?.();
                    }}
                    className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <UserPlusIcon className="w-4 h-4" />
                    Collaborative Join
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-in fade-in">
          <div className="animate-in slide-in-from-bottom">
            <CalendarView
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date);
                setShowCalendar(false);
              }}
              onClose={() => setShowCalendar(false)}
              availabilityData={mockAvailability}
            />
          </div>
        </div>
      )}
    </div>
  );
}