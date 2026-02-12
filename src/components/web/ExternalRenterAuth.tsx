import React, { useState } from 'react';
import { ArrowLeftIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, AlertCircleIcon, CheckCircleIcon, UserIcon, PhoneIcon, BuildingIcon } from 'lucide-react';

interface ExternalRenterAuthProps {
  onBack: () => void;
  onLoginSuccess: (userType: 'affiliate' | 'guest', userData: any) => void;
}

type ViewType = 'select' | 'affiliate-login' | 'guest-register' | 'guest-verify' | 'guest-login';

export function ExternalRenterAuth({ onBack, onLoginSuccess }: ExternalRenterAuthProps) {
  const [view, setView] = useState<ViewType>('select');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Guest registration fields
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sentVerificationEmail, setSentVerificationEmail] = useState(false);

  const handleAffiliateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Simulate login
    onLoginSuccess('affiliate', { email, name: 'ABC Corporation' });
  };

  const handleGuestRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !organization || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@gmail.com')) {
      setError('Please use a Gmail address for registration');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // Send verification email
    setSentVerificationEmail(true);
    setSuccess('Verification code sent to ' + email);
    setView('guest-verify');
  };

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    // Simulate verification
    if (verificationCode === '123456') {
      setSuccess('Email verified! You can now log in.');
      setView('guest-login');
    } else {
      setError('Invalid verification code. Try 123456 for demo.');
    }
  };

  const handleGuestLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Simulate login
    onLoginSuccess('guest', { email, name: fullName || 'Guest User', organization });
  };

  const handleResendCode = () => {
    setSuccess('Verification code resent to ' + email);
    setError('');
  };

  // SELECT TYPE VIEW
  if (view === 'select') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Portal Selection</span>
          </button>

          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-5xl">🏢</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">External Renter Portal</h1>
            <p className="text-lg text-gray-600">Book university facilities for your events</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AFFILIATE LOGIN */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-8 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Affiliate Partner</h2>
              <p className="text-gray-600 mb-6">
                Pre-registered partners with endorsement privileges
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900 font-medium">✓ Account created by Super Admin</p>
                <p className="text-sm text-blue-900 font-medium">✓ Faster approval process</p>
                <p className="text-sm text-blue-900 font-medium">✓ Priority booking access</p>
              </div>
              <button
                onClick={() => setView('affiliate-login')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Login as Affiliate
              </button>
            </div>

            {/* GUEST REGISTRATION */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Guest User</h2>
              <p className="text-gray-600 mb-6">
                First-time renters and external organizations
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 font-medium">• Register with Gmail account</p>
                <p className="text-sm text-gray-700 font-medium">• Email verification required</p>
                <p className="text-sm text-gray-700 font-medium">• Letter of intent needed</p>
              </div>
              <button
                onClick={() => setView('guest-register')}
                className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Register as Guest
              </button>
              <button
                onClick={() => setView('guest-login')}
                className="w-full mt-3 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Login (Existing Guest)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AFFILIATE LOGIN VIEW
  if (view === 'affiliate-login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <button
            onClick={() => setView('select')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-4xl">⭐</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Affiliate Login</h1>
              <p className="text-gray-600">Access your pre-registered affiliate account</p>
            </div>

            <form onSubmit={handleAffiliateLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="affiliate@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
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

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // GUEST REGISTRATION VIEW
  if (view === 'guest-register') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <button
            onClick={() => setView('select')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-4xl">👤</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Guest Registration</h1>
              <p className="text-gray-600">Create your external renter account</p>
            </div>

            <form onSubmit={handleGuestRegister} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Juan Dela Cruz"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Organization</label>
                  <div className="relative">
                    <BuildingIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ABC Corporation"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Gmail Address <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="yourname@gmail.com"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Gmail required for email verification</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
                <div className="relative">
                  <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+63 912 345 6789"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Confirm Password</label>
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Register & Verify Email
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // EMAIL VERIFICATION VIEW
  if (view === 'guest-verify') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
            <div className="mb-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MailIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
              <p className="text-gray-600">We've sent a verification code to</p>
              <p className="text-blue-600 font-semibold">{email}</p>
            </div>

            <form onSubmit={handleVerifyEmail} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">Enter the 6-digit code sent to your email</p>
                <p className="text-xs text-blue-600 mt-1 text-center">Demo: Use code <strong>123456</strong></p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Verify Email
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Resend Code
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // GUEST LOGIN VIEW
  if (view === 'guest-login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <button
            onClick={() => setView('select')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-4xl">👤</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Guest Login</h1>
              <p className="text-gray-600">Access your external renter account</p>
            </div>

            <form onSubmit={handleGuestLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Gmail Address</label>
                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="yourname@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
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

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Login
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setView('guest-register')}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Don't have an account? Register here
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
