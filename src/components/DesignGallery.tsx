import React from 'react';
import { LayoutGridIcon } from 'lucide-react';

interface DesignGalleryProps {
  onSelectScreen: (screen: string) => void;
  onBack: () => void;
}

export function DesignGallery({ onSelectScreen, onBack }: DesignGalleryProps) {
  const studentScreens = [
    {
      id: 'splash-student-faculty',
      name: 'Mobile Splash Screen',
      description: '4-page onboarding with Next/Back navigation',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'student-faculty-login',
      name: 'Student/Faculty Login',
      description: 'Login screen with email/password',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'student-faculty-register',
      name: 'Student/Faculty Register',
      description: 'Registration form with role selection',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'mobile-student-home',
      name: 'Student - Home (Mobile)',
      description: 'Dashboard with active bookings & tickets',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const facultyScreens = [
    {
      id: 'mobile-faculty-home',
      name: 'Faculty - Home (Mobile)',
      description: 'Dashboard with override privileges',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const mobileSharedScreens = [
    {
      id: 'mobile-rooms',
      name: 'Room List (Mobile)',
      description: 'Browse available rooms',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'mobile-queue',
      name: 'Queue Module (Mobile)',
      description: 'Join virtual queues',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'mobile-profile',
      name: 'Profile (Mobile)',
      description: 'User profile & history',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const adminScreens = [
    {
      id: 'staff-login',
      name: 'Staff Login',
      description: 'Staff portal login',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'admin-login',
      name: 'Admin Login',
      description: 'Admin portal (6 types)',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'super-admin-login',
      name: 'Super Admin Login',
      description: 'Super Admin portal',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'program-chair-login',
      name: 'Program Chair Login',
      description: 'CTHM & SECA program chair login',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'dept-endorser-login',
      name: 'Dept. Endorser Login',
      description: 'Department endorser portal login',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const webDashboards = [
    {
      id: 'super-admin',
      name: 'Super Admin Dashboard',
      description: 'Full system management',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'facility-admin',
      name: 'Facility Admin Dashboard',
      description: 'Manage all facilities',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'staff-counter',
      name: 'Staff Counter Dashboard',
      description: 'Queue management interface',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'librarian',
      name: 'Librarian Dashboard',
      description: 'Library admin interface',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'program-chair-cthm',
      name: 'CTHM Program Chair Portal',
      description: 'Kitchen/Restaurant/Suite approvals',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'program-chair-seca',
      name: 'SECA Program Chair Portal',
      description: 'Lab/ComLab booking approvals',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'dept-endorser',
      name: 'Department Endorser Portal',
      description: 'Affiliate organization endorsements',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const serviceAdminDashboards = [
    {
      id: 'service-admin-itso',
      name: 'ITSO Service Admin',
      description: 'IT Support queue management',
      color: 'from-blue-500 to-blue-600',
      icon: '💻',
    },
    {
      id: 'service-admin-treasury',
      name: 'Treasury Service Admin',
      description: 'Treasury queue management',
      color: 'from-blue-500 to-blue-600',
      icon: '💰',
    },
    {
      id: 'service-admin-registrar',
      name: 'Registrar Service Admin',
      description: 'Registrar queue management',
      color: 'from-blue-500 to-blue-600',
      icon: '📝',
    },
    {
      id: 'service-admin-admission',
      name: 'Admission Service Admin',
      description: 'Admission queue management',
      color: 'from-blue-500 to-blue-600',
      icon: '🎓',
    },
  ];

  const kioskScreens = [
    {
      id: 'kiosk',
      name: 'Kiosk UI',
      description: 'Touch-screen walk-in interface',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'hallway-monitor',
      name: 'Hallway Monitor',
      description: 'Digital display screen',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'external-renter-auth',
      name: 'External Renter Auth',
      description: 'Affiliate/Guest login & registration',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'external-renter',
      name: 'External Renter Portal',
      description: 'Public venue booking',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const ScreenCard = ({ screen }: { screen: any }) => (
    <button
      onClick={() => onSelectScreen(screen.id)}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left group"
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${screen.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <LayoutGridIcon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{screen.name}</h3>
      <p className="text-sm text-gray-600">{screen.description}</p>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              📐 Design Gallery - ICRRUS
            </h1>
            <p className="text-lg text-gray-600">
              Click any screen below to view and copy to Figma
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
          >
            ← Back to Auth
          </button>
        </div>

        {/* Student & Faculty Screens */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Student & Faculty Screens
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentScreens.map(screen => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </div>

        {/* Faculty Screens */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Faculty Screens
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyScreens.map(screen => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </div>

        {/* Mobile Shared Screens */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Mobile Shared Screens
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobileSharedScreens.map(screen => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </div>

        {/* Admin Login Screens */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-yellow-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Admin Login Portals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminScreens.map(screen => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </div>

        {/* Web Dashboards */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-green-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Web Dashboards
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webDashboards.map(screen => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </div>

        {/* Service Admin Dashboards */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Service Admin Dashboards
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAdminDashboards.map(screen => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </div>

        {/* Kiosk & Display Screens */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gray-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Kiosk & Display Screens
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kioskScreens.map(screen => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            💡 How to Copy to Figma
          </h3>
          <ol className="space-y-2 text-gray-700">
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">1.</span>
              <span>Click on any screen card above to view it full-screen</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">2.</span>
              <span>Use Figma's "Copy as Image" plugin or take a screenshot</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">3.</span>
              <span>Paste directly into your Figma file</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">4.</span>
              <span>Click "← Back" button on each screen to return here</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}