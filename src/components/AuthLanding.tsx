import React from 'react';
import { GraduationCapIcon, UsersIcon, ShieldIcon, BuildingIcon, ArrowRightIcon, CrownIcon, AwardIcon, FileCheckIcon } from 'lucide-react';

interface AuthLandingProps {
  onSelectPortal: (portal: 'student-faculty' | 'staff' | 'admin' | 'super-admin' | 'external-renter' | 'program-chair' | 'dept-endorser') => void;
}

export function AuthLanding({ onSelectPortal }: AuthLandingProps) {
  const portals = [
    {
      id: 'student-faculty' as const,
      icon: GraduationCapIcon,
      title: 'Student & Faculty',
      description: 'Access room reservations, queues, and schedules',
      color: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-600',
      features: ['Room Booking', 'Virtual Queue', 'Check-in System', 'Profile Management']
    },
    {
      id: 'staff' as const,
      icon: UsersIcon,
      title: 'Service Staff',
      description: 'Manage service queues and assist students',
      color: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-600',
      features: ['Queue Management', 'Ticket Control', 'Service Monitoring', 'Staff Dashboard']
    },
    {
      id: 'admin' as const,
      icon: ShieldIcon,
      title: 'Admin Portal',
      description: 'System administration and facility management',
      color: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-600',
      features: ['Facility Management', 'System Config', 'User Management', 'Analytics & Reports']
    },
    {
      id: 'super-admin' as const,
      icon: CrownIcon,
      title: 'Super Admin',
      description: 'Highest level system control and management',
      color: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-600',
      features: ['Create Admin Accounts', 'Department Setup', 'System Configuration', 'Full System Control']
    },
    {
      id: 'external-renter' as const,
      icon: BuildingIcon,
      title: 'External Renter',
      description: 'Apply for venue rental access',
      color: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-600',
      features: ['Venue Booking', 'Rental Application', 'Payment Portal', 'Event Management']
    },
    {
      id: 'program-chair' as const,
      icon: AwardIcon,
      title: 'Program Chair',
      description: 'Review and approve program facility bookings',
      color: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-600',
      features: ['Booking Approvals', 'Program Schedule', 'Student Management', 'Resource Oversight']
    },
    {
      id: 'dept-endorser' as const,
      icon: FileCheckIcon,
      title: 'Department Endorser',
      description: 'Endorse affiliate organization facility requests',
      color: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-600',
      features: ['Affiliate Endorsements', 'No Payment Required', 'Organization Verification', 'FMO Forwarding']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">ICRRUS</h1>
            <p className="text-lg text-gray-600">Integrated Campus Resource Reservation with Queueing System</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to ICRRUS</h2>
          <p className="text-gray-600 text-lg">Select your portal to continue</p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            return (
              <button
                key={portal.id}
                onClick={() => onSelectPortal(portal.id)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-gray-200 text-left"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${portal.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${portal.iconBg} bg-opacity-30 backdrop-blur-sm p-3 rounded-xl`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{portal.title}</h3>
                        <p className="text-white/90 text-sm">{portal.description}</p>
                      </div>
                    </div>
                    <ArrowRightIcon className="w-6 h-6 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <ul className="space-y-2">
                    {portal.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className={`w-1.5 h-1.5 rounded-full ${portal.iconBg}`}></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <div className={`bg-gradient-to-r ${portal.color} text-white py-3 px-4 rounded-xl text-center font-semibold group-hover:shadow-lg transition-all`}>
                    Continue to {portal.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-700">
              System Status: <span className="font-semibold text-green-600">Online</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 ICRRUS - University Facility Management System
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">Help Center</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}