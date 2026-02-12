import React, { useState } from 'react';
import { CalendarIcon, UsersIcon, MapPinIcon, DollarSignIcon, DownloadIcon, LayoutGridIcon, ClipboardListIcon, UploadIcon, FileTextIcon, CheckCircleIcon, AlertCircleIcon, ArrowRightIcon } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  capacity: number;
  hourlyRate: number;
  amenities: string[];
  image: string;
}

type BookingStatus = 'request' | 'payment' | 'approved';
type ViewType = 'catalog' | 'dashboard';
type RenterType = 'affiliate' | 'guest' | null;

interface Booking {
  id: string;
  venueName: string;
  date: string;
  time: string;
  status: 'pending-endorsement' | 'pending-super-admin' | 'pending-fmo' | 'approved' | 'rejected';
  renterType: 'affiliate' | 'guest';
  approvalStep: number;
  totalSteps: number;
}

export function ExternalRenterPortal() {
  const [view, setView] = useState<ViewType>('catalog');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('request');
  const [renterType, setRenterType] = useState<RenterType>(null);
  const [letterOfIntent, setLetterOfIntent] = useState<File | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const venues: Venue[] = [
    {
      id: '1',
      name: 'Main Gymnasium',
      capacity: 500,
      hourlyRate: 5000,
      amenities: ['Air Conditioning', 'Sound System', 'Stage', 'Parking'],
      image: '🏟️',
    },
    {
      id: '2',
      name: 'University Theater',
      capacity: 300,
      hourlyRate: 4000,
      amenities: ['Professional Lighting', 'Sound System', 'Backstage', 'Green Room'],
      image: '🎭',
    },
    {
      id: '3',
      name: 'Conference Hall',
      capacity: 150,
      hourlyRate: 2500,
      amenities: ['Projector', 'Air Conditioning', 'WiFi', 'Catering Area'],
      image: '🏛️',
    },
    {
      id: '4',
      name: 'Outdoor Quadrangle',
      capacity: 1000,
      hourlyRate: 3000,
      amenities: ['Open Air', 'Power Supply', 'Parking', 'Tent Setup Available'],
      image: '🌳',
    },
  ];

  const handleVenueSelect = (venue: Venue) => {
    setSelectedVenue(venue);
    alert(`Selected: ${venue.name}`);
  };

  const navItems = [
    { id: 'catalog' as ViewType, label: 'Browse Venues', icon: LayoutGridIcon },
    { id: 'dashboard' as ViewType, label: 'My Bookings', icon: ClipboardListIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop Only */}
      <aside className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="text-4xl mb-2">🏢</div>
          <h2 className="text-xl font-bold">External Renter</h2>
          <p className="text-sm text-white/80">Venue Booking</p>
        </div>
        
        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  view === item.id
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {navItems.find(item => item.id === view)?.label}
              </h1>
              <p className="text-sm text-gray-600">Book university facilities for your events</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* VENUE CATALOG */}
          {view === 'catalog' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Available Venues</h2>
                <p className="text-gray-600">Choose the perfect space for your event</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {venues.map((venue) => (
                  <div key={venue.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-12 text-center">
                      <div className="text-6xl mb-2">{venue.image}</div>
                      <h3 className="text-2xl font-bold">{venue.name}</h3>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <UsersIcon className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-500">Capacity</p>
                            <p className="font-semibold text-gray-900">{venue.capacity}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSignIcon className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-xs text-gray-500">Hourly Rate</p>
                            <p className="font-semibold text-gray-900">₱{venue.hourlyRate.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {venue.amenities.map((amenity, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleVenueSelect(venue)}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MY BOOKINGS DASHBOARD */}
          {view === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">My Bookings</h2>
                <p className="text-gray-600">View and manage your venue reservations</p>
              </div>

              {/* Sample Bookings */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Main Gymnasium</h3>
                      <p className="text-sm text-gray-600">Company Annual Event</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                      Approved
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-semibold text-gray-900">February 15, 2026</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-semibold text-gray-900">9:00 AM - 5:00 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <DownloadIcon className="w-4 h-4" />
                      Download Contract
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Conference Hall</h3>
                      <p className="text-sm text-gray-600">Product Launch Event</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                      Pending Approval
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-semibold text-gray-900">March 10, 2026</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-semibold text-gray-900">2:00 PM - 6:00 PM</p>
                    </div>
                  </div>

                  <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No more bookings to display</p>
                  <button
                    onClick={() => setView('catalog')}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Browse Venues
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}