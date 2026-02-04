import React, { useState, useEffect, useRef } from 'react';
import { XIcon, QrCodeIcon, AlertCircleIcon, CameraIcon, UsersIcon } from 'lucide-react';

interface CollaborativeCheckInModalProps {
  onClose: () => void;
  onJoinSession: (sessionCode: string) => void;
}

export function CollaborativeCheckInModal({ onClose, onJoinSession }: CollaborativeCheckInModalProps) {
  const [cameraActive, setCameraActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [manualEntry, setManualEntry] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setCameraError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        
        // Simulate QR detection after 2 seconds
        setTimeout(() => {
          setScanning(true);
          setTimeout(() => {
            if (streamRef.current) {
              streamRef.current.getTracks().forEach(track => track.stop());
            }
            // Simulate detected session code
            onJoinSession('GRP789');
          }, 1000);
        }, 2000);
      }
    } catch (error) {
      // Silently handle camera permission denial - show manual entry instead
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const handleManualJoin = () => {
    if (manualEntry.trim().length >= 6) {
      setScanning(true);
      // Simulate validation
      setTimeout(() => {
        onJoinSession(manualEntry.toUpperCase());
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <UsersIcon className="w-7 h-7" />
                Join Collaborative Session
              </h2>
              <p className="text-sm opacity-90 mt-1">Scan or enter session code</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Camera Feed */}
          {!cameraActive && !scanning && (
            <div className="bg-gray-100 rounded-xl h-64 flex flex-col items-center justify-center">
              <QrCodeIcon className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 text-sm">Camera not active</p>
              <p className="text-gray-500 text-xs mt-1">Scan group session QR code</p>
            </div>
          )}
          
          {cameraActive && (
            <div className="relative bg-black rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover"
                autoPlay
                playsInline
                muted
              />
              {!scanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 border-2 border-white/50 rounded-lg"></div>
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500"></div>
                  </div>
                </div>
              )}
              {scanning && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                  <div className="bg-white rounded-full p-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 text-sm mb-1">How to Join</p>
                <ol className="text-xs text-blue-800 space-y-1">
                  <li>1. Ask group host for session QR code</li>
                  <li>2. Scan the QR code or enter session code</li>
                  <li>3. You'll join the collaborative booking</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Camera Control Button */}
          {!cameraError && (
            <button
              onClick={cameraActive ? stopCamera : startCamera}
              disabled={scanning}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                scanning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : cameraActive
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg'
              }`}
            >
              {scanning ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Detecting QR Code...
                </div>
              ) : cameraActive ? (
                <div className="flex items-center justify-center gap-2">
                  <XIcon className="w-6 h-6" />
                  Close Camera
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <CameraIcon className="w-6 h-6" />
                  Open Camera to Scan
                </div>
              )}
            </button>
          )}

          {/* Alternative Manual Entry Option */}
          {!cameraError && !cameraActive && (
            <div className="text-center">
              <button
                onClick={() => setCameraError(true)}
                className="text-sm text-blue-600 hover:text-blue-700 underline"
              >
                Can't access camera? Enter session code manually
              </button>
            </div>
          )}

          {/* Manual Entry Section */}
          {cameraError && (
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <p className="text-xs text-yellow-800">
                  💡 Ask the host for their session code
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Code
                </label>
                <input
                  type="text"
                  value={manualEntry}
                  onChange={(e) => setManualEntry(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g., GRP123)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 font-mono text-lg tracking-wider text-center"
                  maxLength={8}
                />
              </div>
              <button
                onClick={handleManualJoin}
                disabled={scanning || manualEntry.trim().length < 6}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                  scanning || manualEntry.trim().length < 6
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg'
                }`}
              >
                {scanning ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Joining Session...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <UsersIcon className="w-6 h-6" />
                    Join Session
                  </div>
                )}
              </button>
              <div className="text-center">
                <button
                  onClick={() => {
                    setCameraError(false);
                    setManualEntry('');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-700 underline"
                >
                  ← Back to camera scan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}