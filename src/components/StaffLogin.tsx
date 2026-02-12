import React, { useState } from 'react';
import { ArrowLeftIcon, UserIcon, LockIcon, EyeIcon, EyeOffIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

interface StaffLoginProps {
  onBack: () => void;
  onLogin: (username: string, password: string) => void;
  onForgotPassword: () => void;
}

export function StaffLogin({ onBack, onLogin, onForgotPassword }: StaffLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Call login handler
    onLogin(username, password);
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
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-4xl">👥</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Portal</h1>
            <p className="text-gray-600">Service Counter Login</p>
          </div>

          {/* Department Badge Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
            <p className="text-sm font-bold text-blue-900 mb-3">Service Departments</p>
            <div className="flex flex-wrap gap-2">
              {['ITSO', 'Treasury', 'Registrar', 'Admission'].map((dept) => (
                <span key={dept} className="px-4 py-2 bg-white border border-blue-300 rounded-xl text-sm font-semibold text-blue-700">
                  {dept}
                </span>
              ))}
            </div>
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

            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Staff Username
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="staff.username"
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-base hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              Sign In to Staff Portal
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-gray-700 text-center font-medium">
            🔒 Staff accounts are managed by your department administrator
          </p>
        </div>
      </div>
    </div>
  );
}