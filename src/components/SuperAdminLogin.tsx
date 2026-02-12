import React, { useState } from 'react';
import { ArrowLeftIcon, UserIcon, LockIcon, EyeIcon, EyeOffIcon, AlertCircleIcon, ShieldIcon, KeyIcon, CheckCircleIcon, ShieldCheckIcon } from 'lucide-react';

interface SuperAdminLoginProps {
  onBack: () => void;
  onLogin: (username: string, password: string, twoFactorCode: string) => void;
  onForgotPassword: () => void;
}

export function SuperAdminLogin({ onBack, onLogin, onForgotPassword }: SuperAdminLoginProps) {
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
      setShow2FA(true);
      return;
    }

    if (!twoFactorCode || twoFactorCode.length !== 6) {
      setError('Please enter a valid 6-digit 2FA code');
      return;
    }

    // Call login handler with 2FA
    onLogin(username, password, twoFactorCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
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
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Portal</h1>
            <p className="text-gray-600">Highest Level System Access</p>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheckIcon className="w-5 h-5 text-blue-700" />
              <p className="text-sm font-bold text-blue-900">Maximum Security Level</p>
            </div>
            <p className="text-xs text-blue-800">All login attempts are monitored and logged for security auditing</p>
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
                    Super Admin Username
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="superadmin"
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
                    <p className="text-sm font-semibold text-green-900">Super Admin Credentials Verified</p>
                    <p className="text-xs text-green-700 mt-1">Enter your 2FA code to access system controls</p>
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
                      onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors text-base text-center tracking-widest font-bold text-xl"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Check your hardware token or authenticator app
                  </p>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-base hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Access Super Admin Portal
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
        <div className="mt-6 bg-blue-50 border border-blue-300 rounded-xl p-4">
          <p className="text-sm text-gray-700 text-center font-medium">
            ⚠️ All Super Admin actions are permanently logged for audit purposes
          </p>
        </div>
      </div>
    </div>
  );
}