import React, { useState } from 'react';
import { CalendarIcon, UsersIcon, DollarSignIcon, DownloadIcon, LayoutGridIcon, ClipboardListIcon, UploadIcon, FileTextIcon, CheckCircleIcon, AlertCircleIcon, ArrowRightIcon, XIcon } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  capacity: number;
  hourlyRate: number;
  amenities: string[];
  image: string;
}

type ViewType = 'catalog' | 'dashboard';
type RenterType = 'affiliate' | 'guest';

interface BookingRequest {
  id: string;
  venueName: string;
  date: string;
  time: string;
  status: 'pending-super-admin' | 'pending-fmo' | 'approved' | 'rejected';
  renterType: RenterType;
  approvalStep: number;
  totalSteps: number;
  currentApprover: string;
}

export function ExternalRenterPortalNew() {
  const [view, setView] = useState<ViewType>('catalog');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [letterOfIntent, setLetterOfIntent] = useState<File | null>(null);
  
  // Simulated logged-in user
  const renterType: RenterType = 'affiliate'; // or 'guest'
  const renterName = renterType === 'affiliate' ? 'ABC Corporation (Affiliate)' : 'Guest User';

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

  const mockBookings: BookingRequest[] = [
    {
      id: '1',
      venueName: 'Main Gymnasium',
      date: 'February 15, 2026',
      time: '9:00 AM - 5:00 PM',
      status: 'approved',
      renterType: 'affiliate',
      approvalStep: 2,
      totalSteps: 2,
      currentApprover: 'Approved',
    },
    {
      id: '2',
      venueName: 'Conference Hall',
      date: 'March 10, 2026',
      time: '2:00 PM - 6:00 PM',
      status: 'pending-fmo',
      renterType: 'affiliate',
      approvalStep: 2,
      totalSteps: 2,
      currentApprover: 'FMO (Facility Admin)',
    },
  ];

  const handleVenueSelect = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowBookingModal(true);
  };

  const handleSubmitBooking = () => {
    alert('Booking request submitted! You will be notified once reviewed.');
    setShowBookingModal(false);
    setSelectedVenue(null);
    setLetterOfIntent(null);
  };

  const getWorkflowSteps = (type: RenterType) => {
    if (type === 'affiliate') {
      return ['Endorsement Review (Super Admin)', 'FMO Approval'];
    } else {
      return ['Letter of Intent Review (Super Admin)', 'FMO Approval'];
    }
  };

  const getStatusBadge = (status: BookingRequest['status']) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">✓ Approved</span>;
      case 'rejected':
        return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">✗ Rejected</span>;
      case 'pending-super-admin':
        return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">⏳ Pending Super Admin</span>;
      case 'pending-fmo':
        return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">⏳ Pending FMO</span>;
    }
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
          <p className="text-sm text-white/80">{renterName}</p>
          <div className="mt-2">
            {renterType === 'affiliate' ? (
              <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                ⭐ Affiliate
              </span>
            ) : (
              <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                👤 Guest
              </span>
            )}
          </div>
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
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{booking.venueName}</h3>
                        <p className="text-sm text-gray-600">Company Event</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="font-semibold text-gray-900">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="font-semibold text-gray-900">{booking.time}</p>
                      </div>
                    </div>

                    {/* Approval Progress */}
                    {booking.status !== 'approved' && booking.status !== 'rejected' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-blue-900 mb-2">📋 Approval Progress</p>
                        <div className="flex items-center gap-2 mb-2">
                          {getWorkflowSteps(booking.renterType).map((step, index) => (
                            <React.Fragment key={index}>
                              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                                index < booking.approvalStep - 1
                                  ? 'bg-green-100 text-green-700'
                                  : index === booking.approvalStep - 1
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-500'
                              }`}>
                                {index < booking.approvalStep - 1 ? (
                                  <CheckCircleIcon className="w-4 h-4" />
                                ) : index === booking.approvalStep - 1 ? (
                                  <AlertCircleIcon className="w-4 h-4" />
                                ) : (
                                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                )}
                                <span>{step}</span>
                              </div>
                              {index < getWorkflowSteps(booking.renterType).length - 1 && (
                                <ArrowRightIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <p className="text-xs text-blue-700">
                          Currently with: <strong>{booking.currentApprover}</strong>
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      {booking.status === 'approved' && (
                        <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                          <DownloadIcon className="w-4 h-4" />
                          Download Contract
                        </button>
                      )}
                    </div>
                  </div>
                ))}

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

      {/* Booking Modal */}
      {showBookingModal && selectedVenue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Book {selectedVenue.name}</h2>
              <button onClick={() => setShowBookingModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Date and Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input type="time" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input type="time" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Event Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your event purpose..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Letter of Intent - For Guests Only */}
              {renterType === 'guest' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Letter of Intent <span className="text-red-600">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setLetterOfIntent(e.target.files?.[0] || null)}
                      className="hidden"
                      id="letter-upload"
                    />
                    <label htmlFor="letter-upload" className="cursor-pointer">
                      <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Upload Letter of Intent</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX format</p>
                      {letterOfIntent && (
                        <p className="text-xs text-green-600 mt-2">✓ {letterOfIntent.name}</p>
                      )}
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    ℹ️ Required for guest bookings - will be reviewed by Super Admin
                  </p>
                </div>
              )}

              {/* Approval Workflow Display */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-blue-900 mb-3">📋 Approval Workflow</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {getWorkflowSteps(renterType).map((step, index) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-blue-200">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-900">{step}</span>
                      </div>
                      {index < getWorkflowSteps(renterType).length - 1 && (
                        <ArrowRightIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-xs text-blue-700 mt-3">
                  Your request will go through {getWorkflowSteps(renterType).length} approval steps
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitBooking}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-colors"
              >
                📋 Submit Booking Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}