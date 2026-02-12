import React, { useState } from 'react';
import { UserIcon, LockIcon, EyeIcon, EyeOffIcon, GraduationCapIcon } from 'lucide-react';

interface ProgramChairLoginProps {
  onBack: () => void;
  onLogin: (programType: 'CTHM' | 'SECA') => void;
}

export function ProgramChairLogin({ onBack, onLogin }: ProgramChairLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<'CTHM' | 'SECA'>('CTHM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedProgram);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCapIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Program Chair Portal</h1>
          <p className="text-sm text-gray-600">ICRRUS Approval Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Program Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Program
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedProgram('CTHM')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedProgram === 'CTHM'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-1">CTHM</div>
                  <div className="text-xs text-gray-600">Tourism & Hospitality</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedProgram('SECA')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedProgram === 'SECA'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-1">SECA</div>
                  <div className="text-xs text-gray-600">Engineering & CS</div>
                </div>
              </button>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="programchair@university.edu"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Sign In as Program Chair
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Back to Portal Selection
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-xs text-blue-800">
            <span className="font-semibold">Note:</span> Program Chairs review and approve facility booking requests from students in their respective programs.
          </p>
        </div>
      </div>
    </div>
  );
}
