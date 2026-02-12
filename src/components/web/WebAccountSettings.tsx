import React, { useState } from 'react';
import { 
  XIcon, UserIcon, MailIcon, PhoneIcon, IdCardIcon, LockIcon, 
  BellIcon, ShieldIcon, EyeIcon, EyeOffIcon, CheckCircleIcon,
  CameraIcon, EditIcon, SaveIcon, AlertCircleIcon, BuildingIcon
} from 'lucide-react';

interface WebAccountSettingsProps {
  userName: string;
  userRole: 'staff' | 'admin' | 'super-admin' | 'external-renter' | 'facility-admin' | 'service-admin' | 'librarian';
  onClose: () => void;
  onLogout?: () => void;
}

type TabType = 'profile' | 'security';

export function WebAccountSettings({ userName, userRole, onClose, onLogout }: WebAccountSettingsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile state - dynamically adapts based on user role
  const [profileData, setProfileData] = useState({
    fullName: userName,
    email: getDefaultEmail(userRole),
    phone: '+63 912 345 6789',
    employeeId: getDefaultEmployeeId(userRole),
    department: getDefaultDepartment(userRole),
    position: getDefaultPosition(userRole),
    organization: userRole === 'external-renter' ? 'ABC Corporation' : 'N/A',
    businessType: userRole === 'external-renter' ? 'Corporate Events' : 'N/A',
  });

  // Helper functions for default values
  function getDefaultEmail(role: typeof userRole) {
    if (role === 'external-renter') return 'contact@abccorp.com';
    if (role === 'super-admin') return 'superadmin@university.edu';
    if (role === 'facility-admin') return 'facility.admin@university.edu';
    if (role === 'service-admin') return 'service.admin@university.edu';
    if (role === 'librarian') return 'librarian@university.edu';
    return 'staff@university.edu';
  }

  function getDefaultEmployeeId(role: typeof userRole) {
    if (role === 'external-renter') return 'EXT-2024-001';
    if (role === 'super-admin') return 'SA-2020-001';
    if (role === 'facility-admin') return 'FA-2021-045';
    if (role === 'service-admin') return 'SVC-2022-032';
    if (role === 'librarian') return 'LIB-2019-018';
    return 'STAFF-2023-123';
  }

  function getDefaultDepartment(role: typeof userRole) {
    if (role === 'external-renter') return 'N/A';
    if (role === 'super-admin') return 'Office of the President';
    if (role === 'facility-admin') return 'Facilities Management Office';
    if (role === 'service-admin') return 'Student Services';
    if (role === 'librarian') return 'University Library';
    return 'Registrar Office';
  }

  function getDefaultPosition(role: typeof userRole) {
    if (role === 'external-renter') return 'External Client';
    if (role === 'super-admin') return 'System Administrator';
    if (role === 'facility-admin') return 'Facility Administrator';
    if (role === 'service-admin') return 'Service Administrator';
    if (role === 'librarian') return 'Head Librarian';
    return 'Counter Staff';
  }

  function getRoleDisplayName(role: typeof userRole) {
    if (role === 'super-admin') return 'Super Administrator';
    if (role === 'facility-admin') return 'Facility Administrator';
    if (role === 'service-admin') return 'Service Administrator';
    if (role === 'external-renter') return 'External Renter';
    if (role === 'librarian') return 'Librarian';
    if (role === 'admin') return 'Administrator';
    return 'Staff';
  }

  // Security state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveProfile = () => {
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword === passwordData.confirmPassword && 
        passwordData.currentPassword && 
        passwordData.newPassword) {
      setSaveSuccess(true);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-blue-500 hover:bg-blue-50 transition-colors">
                    <CameraIcon className="w-4 h-4 text-blue-600" />
                  </button>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{profileData.fullName}</h3>
                <p className="text-sm text-gray-500">{getRoleDisplayName(userRole)}</p>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Employee/Client ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userRole === 'external-renter' ? 'Client ID' : 'Employee ID'}
                </label>
                <div className="relative">
                  <IdCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.employeeId}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
              </div>

              {/* Department or Organization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userRole === 'external-renter' ? 'Organization' : 'Department'}
                </label>
                <div className="relative">
                  <BuildingIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={userRole === 'external-renter' ? profileData.organization : profileData.department}
                    onChange={(e) => setProfileData({ 
                      ...profileData, 
                      [userRole === 'external-renter' ? 'organization' : 'department']: e.target.value 
                    })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Position or Business Type */}
              {userRole === 'external-renter' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <input
                    type="text"
                    value={profileData.businessType}
                    onChange={(e) => setProfileData({ ...profileData, businessType: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <SaveIcon className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <EditIcon className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <ShieldIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Security Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Use a strong password with at least 8 characters</li>
                    <li>• Include uppercase, lowercase, numbers, and symbols</li>
                    <li>• Don't share your password with anyone</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Change Password Form */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Change Password</h3>

              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                onClick={handleChangePassword}
                disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Update Password
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 mt-1">Add an extra layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Active Sessions</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Current Device</p>
                      <p className="text-sm text-gray-500">Chrome on Windows • Manila, Philippines</p>
                      <p className="text-xs text-gray-400 mt-1">Last active: Just now</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Account Settings</h2>
            <p className="text-sm text-white/80">{getRoleDisplayName(userRole)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Security
          </button>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mx-6 mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5" />
            <span className="font-semibold">Changes saved successfully!</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {renderTabContent()}
        </div>

        {/* Footer */}
        {onLogout && (
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <button
              onClick={onLogout}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}