import React, { useState } from 'react';
import { ArrowLeftIcon, UserIcon, LockIcon, EyeIcon, EyeOffIcon, AlertCircleIcon, ShieldCheckIcon, KeyIcon, CheckCircleIcon } from 'lucide-react';

interface AdminLoginProps {
  onBack: () => void;
  onLogin: (username: string, password: string, twoFactorCode?: string) => void;
  onForgotPassword: () => void;
}

export function AdminLogin({ onBack, onLogin, onForgotPassword }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Simulate 2FA requirement
    if (!show2FA) {
      // Show 2FA input
      setShow2FA(true);
      return;
    }

    if (!twoFactorCode) {
      setError('Please enter your 2FA code');
      return;
    }

    // Call login handler with 2FA
    onLogin(username, password, twoFactorCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-xl">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Portal Selection</span>
          </button>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheckIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Administrator Login</h1>
              <p className="text-gray-600">Department Admin • Facility Admin • Queue Admin</p>
            </div>

            {/* Security Badge */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheckIcon className="w-5 h-5 text-blue-700" />
                <p className="font-bold text-blue-900">Enhanced Security</p>
              </div>
              <p className="text-sm text-blue-800">
                Two-factor authentication (2FA) required for all admin accounts
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}

              {!show2FA ? (
                <>
                  {/* Username Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Admin Username
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="admin.username"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors text-base"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-base hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    Continue to 2FA
                  </button>
                </>
              ) : (
                <>
                  {/* Success Message */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">Credentials Verified</p>
                      <p className="text-xs text-green-700 mt-1">Enter your 2FA code to complete login</p>
                    </div>
                  </div>

                  {/* 2FA Code Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Two-Factor Authentication Code
                    </label>
                    <div className="relative">
                      <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors text-base text-center tracking-widest font-bold text-xl"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Check your authenticator app for the code
                    </p>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-base hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    Sign In to Admin Portal
                  </button>

                  {/* Back to Credentials */}
                  <button
                    type="button"
                    onClick={() => {
                      setShow2FA(false);
                      setTwoFactorCode('');
                      setError('');
                    }}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    ← Back to credentials
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Footer Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 text-center font-medium">
              🔒 Administrator access is logged and monitored for security
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Information Panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-12 items-center justify-center">
        <div className="max-w-lg text-white">
          <h2 className="text-4xl font-bold mb-6">Admin Control Center</h2>
          <p className="text-xl text-blue-100 mb-8">
            Manage facilities, queues, and approvals with administrator privileges
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Facility Management</h3>
                <p className="text-blue-100">Approve bookings, manage rooms, and oversee facility operations</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Queue Administration</h3>
                <p className="text-blue-100">Configure service windows, manage staff, and optimize wait times</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">User Management</h3>
                <p className="text-blue-100">Manage department users, assign roles, and control permissions</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Analytics & Reports</h3>
                <p className="text-blue-100">Access detailed reports, usage statistics, and performance metrics</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheckIcon className="w-8 h-8 text-blue-200" />
              <div>
                <p className="font-bold text-lg">Enhanced Security</p>
                <p className="text-xs text-blue-200">Protected by 2FA</p>
              </div>
            </div>
            <p className="text-sm text-blue-100">
              All administrator actions are securely logged and can be audited by Super Admins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}