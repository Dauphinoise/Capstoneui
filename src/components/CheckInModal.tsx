import React, { useState, useEffect, useRef } from 'react';
import { XIcon, QrCodeIcon, ClockIcon, AlertCircleIcon, CameraIcon } from 'lucide-react';
import { Booking } from './MobileApp';

interface CheckInModalProps {
  booking: Booking;
  onClose: () => void;
  onCheckIn: (scanned: boolean) => void;
}

export function CheckInModal({ booking, onClose, onCheckIn }: CheckInModalProps) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [manualEntry, setManualEntry] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (booking.checkInDeadline) {
        const now = new Date();
        const deadline = new Date(booking.checkInDeadline);
        const diff = deadline.getTime() - now.getTime();
        
        if (diff <= 0) {
          setTimeRemaining('00:00');
          clearInterval(timer);
        } else {
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setTimeRemaining(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [booking.checkInDeadline]);

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
            onCheckIn(true);
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

  const handleManualCheckIn = () => {
    if (manualEntry.trim().length >= 6) {
      setScanning(true);
      // Simulate validation
      setTimeout(() => {
        onCheckIn(true);
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
              <h2 className="text-2xl font-bold">QR Check-In Required</h2>
              <p className="text-sm opacity-90 mt-1">{booking.roomName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-xs opacity-80 mb-1">Time Remaining to Check-In</p>
            <div className="text-4xl font-bold font-mono">{timeRemaining}</div>
            <p className="text-xs opacity-80 mt-1">Scan QR code to confirm your booking</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Camera Feed */}
          {!cameraActive && !scanning && (
            <div className="bg-gray-100 rounded-xl h-64 flex flex-col items-center justify-center">
              <QrCodeIcon className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 text-sm">Camera not active</p>
              <p className="text-gray-500 text-xs mt-1">Click button below to start scanning</p>
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
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                  <div className="bg-white rounded-full p-4">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
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
                <p className="font-semibold text-blue-900 text-sm mb-1">Check-In Instructions</p>
                <ol className="text-xs text-blue-800 space-y-1">
                  <li>1. Click "Open Camera" below</li>
                  <li>2. Point camera at the QR code on the door</li>
                  <li>3. Wait for automatic detection</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-semibold">{booking.startTime} - {booking.endTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">{booking.date}</span>
            </div>
            {booking.sessionCode && (
              <div className="flex justify-between">
                <span className="text-gray-600">Session Code:</span>
                <span className="font-semibold font-mono">{booking.sessionCode}</span>
              </div>
            )}
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

          {/* Camera Error Message - No manual entry for main booker */}
          {cameraError && (
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-800 font-semibold mb-2">📷 Camera Access Required</p>
                <p className="text-xs text-red-700">
                  You must scan the QR code on the room door to check in. Please enable camera permissions and try again.
                </p>
              </div>
              <div className="text-center">
                <button
                  onClick={() => {
                    setCameraError(false);
                    startCamera();
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 underline font-medium"
                >
                  ← Try opening camera again
                </button>
              </div>
            </div>
          )}

          {/* Cancel Warning */}
          <p className="text-xs text-center text-red-600">
            ⚠️ Booking will be auto-cancelled if not checked in within {timeRemaining}
          </p>
        </div>
      </div>
    </div>
  );
}