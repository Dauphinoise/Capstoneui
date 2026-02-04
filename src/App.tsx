import { useState } from 'react';
import { BookOpenIcon, MenuIcon, UserIcon, CalendarIcon, ClipboardListIcon, ClockIcon, TvIcon } from 'lucide-react';
import { SuperAdminDashboard } from './components/web/SuperAdminDashboard';
import { FacilityAdminDashboard } from './components/web/FacilityAdminDashboard';
import { LibrarianDashboard } from './components/web/LibrarianDashboard';
import { ServiceAdminDashboard } from './components/web/ServiceAdminDashboard';
import { StaffCounterDashboard } from './components/web/StaffCounterDashboard';
import { FacilityAdminPortal } from './components/web/FacilityAdminPortal';
import { ExternalRenterPortal } from './components/web/ExternalRenterPortal';
import { KioskUI } from './components/kiosk/KioskUI';
import { HallwayMonitor } from './components/display/HallwayMonitor';
import { AuthLanding } from './components/AuthLanding';
import { StudentFacultyLogin } from './components/StudentFacultyLogin';
import { StudentFacultyRegister, RegisterData } from './components/StudentFacultyRegister';
import { StaffLogin } from './components/StaffLogin';
import { AdminLogin } from './components/AdminLogin';
import { SuperAdminLogin } from './components/SuperAdminLogin';
import { ExternalRenterApplication, ApplicationData } from './components/ExternalRenterApplication';
import { DesignGallery } from './components/DesignGallery';
import { DesktopFrame } from './components/DesktopFrame';
import { ForgotPassword } from './components/ForgotPassword';
import { MobileApp } from './components/MobileApp';
import { SmartphoneIcon, MonitorIcon, LayoutDashboardIcon, BuildingIcon } from 'lucide-react';

type AppView = 
  | 'auth-landing'
  | 'design-gallery'
  | 'student-faculty-login'
  | 'student-faculty-register'
  | 'staff-login'
  | 'admin-login'
  | 'super-admin-login'
  | 'external-renter-application'
  | 'forgot-password-student-faculty'
  | 'forgot-password-staff'
  | 'forgot-password-admin'
  | 'forgot-password-super-admin'
  | 'launcher'
  | 'mobile'
  | 'mobile-student-home'
  | 'mobile-faculty-home'
  | 'mobile-rooms'
  | 'mobile-queue'
  | 'mobile-profile'
  | 'super-admin'
  | 'librarian'
  | 'service-admin-itso'
  | 'service-admin-treasury'
  | 'service-admin-registrar'
  | 'service-admin-admission'
  | 'staff-counter'
  | 'facility-admin'
  | 'external-renter'
  | 'kiosk'
  | 'hallway-monitor';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('design-gallery');
  const [mobileScreen, setMobileScreen] = useState<'home' | 'rooms' | 'queue' | 'profile'>('home');

  // Design Gallery
  if (currentView === 'design-gallery') {
    return (
      <DesignGallery
        onSelectScreen={(screen) => {
          setCurrentView(screen as AppView);
        }}
        onBack={() => setCurrentView('auth-landing')}
      />
    );
  }

  // Auth Landing
  if (currentView === 'auth-landing') {
    return (
      <AuthLanding
        onSelectPortal={(portal) => {
          if (portal === 'student-faculty') setCurrentView('student-faculty-login');
          else if (portal === 'staff') setCurrentView('staff-login');
          else if (portal === 'admin') setCurrentView('admin-login');
          else if (portal === 'super-admin') setCurrentView('super-admin-login');
          else if (portal === 'external-renter') setCurrentView('external-renter-application');
        }}
      />
    );
  }

  // Student/Faculty Login
  if (currentView === 'student-faculty-login') {
    return (
      <StudentFacultyLogin
        onBack={() => setCurrentView('design-gallery')}
        onLogin={(email, password) => {
          // Simulate successful login - go directly to mobile app
          alert(`Login successful for ${email}`);
          setCurrentView('mobile');
        }}
        onRegister={() => setCurrentView('student-faculty-register')}
        onForgotPassword={() => setCurrentView('forgot-password-student-faculty')}
      />
    );
  }

  // Student/Faculty Register
  if (currentView === 'student-faculty-register') {
    return (
      <StudentFacultyRegister
        onBack={() => setCurrentView('student-faculty-login')}
        onRegister={(data: RegisterData) => {
          // Simulate successful registration
          alert(`Registration successful! Please check ${data.email} for verification.`);
          setCurrentView('student-faculty-login');
        }}
      />
    );
  }

  // Staff Login
  if (currentView === 'staff-login') {
    return (
      <StaffLogin
        onBack={() => setCurrentView('design-gallery')}
        onLogin={(username, password) => {
          // Simulate successful login
          alert(`Staff login successful for ${username}`);
          setCurrentView('launcher');
        }}
        onForgotPassword={() => setCurrentView('forgot-password-staff')}
      />
    );
  }

  // Admin Login
  if (currentView === 'admin-login') {
    return (
      <AdminLogin
        onBack={() => setCurrentView('design-gallery')}
        onLogin={(username, password, twoFactorCode) => {
          // Simulate successful login
          alert(`Admin login successful for ${username}`);
          setCurrentView('launcher');
        }}
        onForgotPassword={() => setCurrentView('forgot-password-admin')}
      />
    );
  }

  // Super Admin Login
  if (currentView === 'super-admin-login') {
    return (
      <SuperAdminLogin
        onBack={() => setCurrentView('design-gallery')}
        onLogin={(username, password) => {
          // Simulate successful login
          alert(`Super Admin login successful for ${username}`);
          setCurrentView('launcher');
        }}
        onForgotPassword={() => setCurrentView('forgot-password-super-admin')}
      />
    );
  }

  // External Renter Application
  if (currentView === 'external-renter-application') {
    return (
      <ExternalRenterApplication
        onBack={() => setCurrentView('auth-landing')}
        onSubmit={(data: ApplicationData) => {
          // Simulate successful submission
          alert(`Application submitted successfully for ${data.organizationName}! You'll receive an email notification once reviewed.`);
          setCurrentView('auth-landing');
        }}
      />
    );
  }

  if (currentView === 'mobile') {
    return <MobileApp onBack={() => setCurrentView('design-gallery')} />;
  }

  if (currentView === 'mobile-student-home') {
    return <MobileApp onBack={() => setCurrentView('design-gallery')} initialUserType="student" />;
  }

  if (currentView === 'mobile-faculty-home') {
    return <MobileApp onBack={() => setCurrentView('design-gallery')} initialUserType="faculty" />;
  }

  if (currentView === 'mobile-rooms') {
    return <MobileApp onBack={() => setCurrentView('design-gallery')} />;
  }

  if (currentView === 'mobile-queue') {
    return <MobileApp onBack={() => setCurrentView('design-gallery')} />;
  }

  if (currentView === 'mobile-profile') {
    return <MobileApp onBack={() => setCurrentView('design-gallery')} />;
  }

  if (currentView === 'super-admin') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <SuperAdminDashboard />
      </div>
    );
  }

  if (currentView === 'librarian') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <LibrarianDashboard />
      </div>
    );
  }

  if (currentView === 'service-admin-itso') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <ServiceAdminDashboard serviceType="itso" />
      </div>
    );
  }

  if (currentView === 'service-admin-treasury') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <ServiceAdminDashboard serviceType="treasury" />
      </div>
    );
  }

  if (currentView === 'service-admin-registrar') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <ServiceAdminDashboard serviceType="registrar" />
      </div>
    );
  }

  if (currentView === 'service-admin-admission') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <ServiceAdminDashboard serviceType="admission" />
      </div>
    );
  }

  if (currentView === 'staff-counter') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <StaffCounterDashboard />
      </div>
    );
  }

  if (currentView === 'facility-admin') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <FacilityAdminDashboard />
      </div>
    );
  }

  if (currentView === 'external-renter') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <ExternalRenterPortal />
      </div>
    );
  }

  if (currentView === 'kiosk') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <KioskUI />
      </div>
    );
  }

  if (currentView === 'hallway-monitor') {
    return (
      <div className="relative overflow-y-auto" style={{ width: '1920px', height: '1080px' }}>
        <button
          onClick={() => setCurrentView('design-gallery')}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          ← Back
        </button>
        <HallwayMonitor />
      </div>
    );
  }

  if (currentView === 'forgot-password-student-faculty') {
    return (
      <ForgotPassword
        onBack={() => setCurrentView('student-faculty-login')}
        accountType="student-faculty"
      />
    );
  }

  if (currentView === 'forgot-password-staff') {
    return (
      <ForgotPassword
        onBack={() => setCurrentView('staff-login')}
        accountType="staff"
      />
    );
  }

  if (currentView === 'forgot-password-admin') {
    return (
      <ForgotPassword
        onBack={() => setCurrentView('admin-login')}
        accountType="admin"
      />
    );
  }

  if (currentView === 'forgot-password-super-admin') {
    return (
      <ForgotPassword
        onBack={() => setCurrentView('super-admin-login')}
        accountType="super-admin"
      />
    );
  }

  // Launcher View
  if (currentView === 'launcher') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">ICRRUS Dashboard Launcher</h1>
            <p className="text-gray-600">Select a dashboard to access</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Design Gallery */}
            <button
              onClick={() => setCurrentView('design-gallery')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LayoutDashboardIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Design Gallery</h3>
              <p className="text-sm text-gray-600 mb-3">
                View all ICRRUS screens and designs
              </p>
              <span className="text-xs text-blue-600 font-semibold">→ Open Gallery</span>
            </button>

            {/* Super Admin Portal */}
            <button
              onClick={() => setCurrentView('super-admin')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LayoutDashboardIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Super Admin</h3>
              <p className="text-sm text-gray-600 mb-3">
                System Configuration Portal
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                👑 Highest Access
              </span>
            </button>

            {/* Librarian Portal - Keep Blue */}
            <button
              onClick={() => setCurrentView('librarian')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpenIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Librarian Admin</h3>
              <p className="text-sm text-gray-600 mb-3">
                Library Study Rooms Portal
              </p>
              <span className="text-xs text-blue-600 font-semibold">→ Open Dashboard</span>
            </button>

            {/* Facility Admin Portal */}
            <button
              onClick={() => setCurrentView('facility-admin')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BuildingIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Facility Admin</h3>
              <p className="text-sm text-gray-600 mb-3">
                Room & Equipment Management
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                Classrooms • Labs • Gyms
              </span>
            </button>

            {/* Kiosk */}
            <button
              onClick={() => setCurrentView('kiosk')}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MonitorIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kiosk Interface</h3>
              <p className="text-sm text-gray-600 mb-3">
                Student Queue Management
              </p>
              <span className="text-xs text-yellow-600 font-semibold">→ Open Kiosk</span>
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Click any card to preview that interface
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            University Facility Management System
          </h1>
          <p className="text-xl text-gray-600">
            Select an interface to preview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mobile App */}
          <button
            onClick={() => setCurrentView('mobile')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <SmartphoneIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile App</h3>
            <p className="text-sm text-gray-600 mb-3">
              Student & Faculty Interface
            </p>
            <div className="text-xs text-gray-500">
              • Home Dashboard<br />
              • Room Reservation<br />
              • Virtual Queue<br />
              • Profile & History
            </div>
          </button>

          {/* Super Admin Portal */}
          <button
            onClick={() => setCurrentView('super-admin')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <LayoutDashboardIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Super Admin</h3>
            <p className="text-sm text-gray-600 mb-3">
              System Configuration Portal
            </p>
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
              👑 Highest Access
            </span>
          </button>

          {/* Staff Counter */}
          <button
            onClick={() => setCurrentView('staff-counter')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MonitorIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Staff Counter</h3>
            <p className="text-sm text-gray-600 mb-3">
              Office Staff Interface
            </p>
            <div className="text-xs text-gray-500">
              • Current Ticket Display<br />
              • Next/Recall Controls<br />
              • Transfer & Resolve<br />
              • Queue Management
            </div>
          </button>

          {/* Facility Admin Portal */}
          <button
            onClick={() => setCurrentView('facility-admin')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BuildingIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Facility Admin</h3>
            <p className="text-sm text-gray-600 mb-3">
              Room & Equipment Management
            </p>
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
              Classrooms • Labs • Gyms
            </span>
          </button>

          {/* External Renter */}
          <button
            onClick={() => setCurrentView('external-renter')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MonitorIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">External Renter</h3>
            <p className="text-sm text-gray-600 mb-3">
              Public Venue Booking Portal
            </p>
            <div className="text-xs text-gray-500">
              • Venue Catalog<br />
              • Booking Calendar<br />
              • Guest Dashboard<br />
              • QR Pass Download
            </div>
          </button>

          {/* Kiosk UI */}
          <button
            onClick={() => setCurrentView('kiosk')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TvIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Kiosk UI</h3>
            <p className="text-sm text-gray-600 mb-3">
              Touch-Screen Walk-in Interface
            </p>
            <div className="text-xs text-gray-500">
              • Attract Screen<br />
              • Service Selection<br />
              • Mobile Input<br />
              • Ticket Display
            </div>
          </button>

          {/* Hallway Monitor */}
          <button
            onClick={() => setCurrentView('hallway-monitor')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TvIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Hallway Monitor</h3>
            <p className="text-sm text-gray-600 mb-3">
              Digital Display Screen
            </p>
            <div className="text-xs text-gray-500">
              • Room Status Grid<br />
              • Now Serving List<br />
              • Real-time Updates<br />
              • Split Display
            </div>
          </button>

          {/* Librarian Dashboard */}
          <button
            onClick={() => setCurrentView('librarian')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpenIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Librarian</h3>
            <p className="text-sm text-gray-600 mb-3">
              Study Rooms Management
            </p>
            <div className="text-xs text-gray-500">
              • 8 Study Rooms<br />
              • Occupancy Status<br />
              • Time Remaining<br />
              • Utilization Analytics
            </div>
          </button>

          {/* Service Admin - ITSO */}
          <button
            onClick={() => setCurrentView('service-admin-itso')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-3xl">
              💻
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">ITSO Service</h3>
            <p className="text-sm text-gray-600 mb-3">
              IT Support Queue Admin
            </p>
            <div className="text-xs text-gray-500">
              • Queue Management<br />
              • Staff Monitoring<br />
              • Wait Time Analytics<br />
              • Performance Metrics
            </div>
          </button>

          {/* Service Admin - Treasury */}
          <button
            onClick={() => setCurrentView('service-admin-treasury')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-3xl">
              💰
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Treasury Service</h3>
            <p className="text-sm text-gray-600 mb-3">
              Treasury Queue Admin
            </p>
            <div className="text-xs text-gray-500">
              • Queue Management<br />
              • Staff Monitoring<br />
               Wait Time Analytics<br />
              • Performance Metrics
            </div>
          </button>

          {/* Service Admin - Registrar */}
          <button
            onClick={() => setCurrentView('service-admin-registrar')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-3xl">
              📝
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Registrar Service</h3>
            <p className="text-sm text-gray-600 mb-3">
              Registrar Queue Admin
            </p>
            <div className="text-xs text-gray-500">
              • Queue Management<br />
              • Staff Monitoring<br />
              • Wait Time Analytics<br />
              • Performance Metrics
            </div>
          </button>

          {/* Service Admin - Admission */}
          <button
            onClick={() => setCurrentView('service-admin-admission')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-3xl">
              🎓
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Admission Service</h3>
            <p className="text-sm text-gray-600 mb-3">
              Admission Queue Admin
            </p>
            <div className="text-xs text-gray-500">
              • Queue Management<br />
              • Staff Monitoring<br />
              • Wait Time Analytics<br />
              • Performance Metrics
            </div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Click any card to preview that interface
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;