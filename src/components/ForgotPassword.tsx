import React, { useState } from 'react';
import { MailIcon, ArrowLeftIcon, CheckCircleIcon, ShieldCheckIcon } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
  accountType: 'student-faculty' | 'staff' | 'admin' | 'super-admin' | 'external-renter';
}

export function ForgotPassword({ onBack, accountType }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getTitle = () => {
    switch (accountType) {
      case 'student-faculty':
        return 'Student & Faculty';
      case 'staff':
        return 'Staff';
      case 'admin':
        return 'Admin';
      case 'super-admin':
        return 'Super Admin';
      case 'external-renter':
        return 'External Renter';
      default:
        return '';
    }
  };

  const getGradient = () => {
    // All forgot password pages use the same blue gradient for consistency
    return 'from-blue-600 to-blue-700';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Check Your Email
            </h1>

            <p className="text-gray-600 mb-6">
              We've sent a password reset link to:
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="font-semibold text-gray-900">{email}</p>
              <p className="text-sm text-gray-500 mt-1">Microsoft 365 Account</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4" />
                Next Steps:
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>1. Check your Microsoft 365 inbox</li>
                <li>2. Click the password reset link (valid for 1 hour)</li>
                <li>3. Create a new secure password</li>
                <li>4. Sign in with your new password</li>
              </ul>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Didn't receive the email? Check your spam folder or contact IT support.
            </p>

            <button
              onClick={onBack}
              className={`w-full py-3 bg-gradient-to-r ${getGradient()} text-white rounded-xl font-semibold hover:opacity-90 transition-opacity`}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 bg-gradient-to-br ${getGradient()} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            <MailIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600">
            {getTitle()} Account Recovery
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">🔐 Secure Reset Process:</span> Enter your university Microsoft 365 email address and we'll send you a password reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                University Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MailIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@university.edu"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Must be your registered Microsoft 365 email address
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-900">
                <span className="font-semibold">⚠️ Important:</span> The reset link will be sent to your Microsoft Outlook inbox and will expire in 1 hour for security.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-gradient-to-r ${getGradient()} text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Reset Link...
                </>
              ) : (
                <>
                  <MailIcon className="w-5 h-5" />
                  Send Reset Link
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Login
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-2">Need help?</p>
            <p className="text-sm text-gray-500">
              Contact IT Support: <span className="font-semibold text-blue-600">support@university.edu</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}