import React, { useState } from 'react';
import { XIcon, CameraIcon, AlertTriangleIcon, UploadIcon } from 'lucide-react';

interface MaintenanceReportModalProps {
  onClose: () => void;
  onSubmit: (report: { issue: string; description: string; photo?: string }) => void;
}

export function MaintenanceReportModal({ onClose, onSubmit }: MaintenanceReportModalProps) {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [description, setDescription] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const commonIssues = [
    '❄️ Aircon Not Working',
    '💡 Lights Not Working',
    '📽️ Projector Malfunction',
    '🪑 Broken Furniture',
    '🚪 Door Lock Issue',
    '🧹 Cleanliness Issue',
  ];

  const handlePhotoUpload = () => {
    // Simulate photo upload
    setPhotoUploaded(true);
  };

  const handleSubmit = () => {
    if (selectedIssue || description.trim()) {
      onSubmit({
        issue: selectedIssue,
        description,
        photo: photoUploaded ? 'uploaded-photo.jpg' : undefined,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Report Maintenance Issue</h2>
            <p className="text-sm text-gray-500 mt-1">Help us keep facilities in good condition</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Warning Banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900 text-sm mb-1">Immediate Action</p>
                <p className="text-xs text-yellow-800">
                  The room will be marked as "Under Maintenance" until the issue is resolved. Future bookings will be suspended.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Issue Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Issue Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {commonIssues.map((issue) => (
                <button
                  key={issue}
                  onClick={() => setSelectedIssue(issue)}
                  className={`p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                    selectedIssue === issue
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {issue}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Detailed Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Photo Evidence (Optional)
            </label>
            {!photoUploaded ? (
              <button
                onClick={handlePhotoUpload}
                className="w-full p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <CameraIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">Take Photo or Upload</p>
                <p className="text-xs text-gray-500 mt-1">Helps us understand the issue better</p>
              </button>
            ) : (
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CameraIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-900 text-sm">Photo Uploaded</p>
                    <p className="text-xs text-green-700">maintenance-photo.jpg</p>
                  </div>
                  <button
                    onClick={() => setPhotoUploaded(false)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedIssue && !description.trim()}
              className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all ${
                !selectedIssue && !description.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg'
              }`}
            >
              Submit Report
            </button>
          </div>

          {/* Info */}
          <p className="text-xs text-center text-gray-500">
            Reports are sent to facility admins for immediate action
          </p>
        </div>
      </div>
    </div>
  );
}