import React from 'react';
import { CalendarIcon, ListIcon, BellIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface MobileSplashScreenProps {
  onContinue: () => void;
}

export function MobileSplashScreen({ onContinue }: MobileSplashScreenProps) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  const pages = [
    {
      icon: CalendarIcon,
      title: 'Book Facilities',
      description: 'Reserve rooms, labs, and equipment with just a few taps. Get instant confirmation and manage all your bookings in one place.',
      emoji: '📅',
    },
    {
      icon: ListIcon,
      title: 'Virtual Queueing',
      description: 'Join queues remotely and track your position in real-time. No more waiting in long lines at campus offices.',
      emoji: '📋',
    },
    {
      icon: BellIcon,
      title: 'Smart Notifications',
      description: 'Get real-time updates on your bookings, queue status, and important announcements. Never miss a reservation again.',
      emoji: '🔔',
    },
    {
      icon: ClockIcon,
      title: 'Real-Time Tracking',
      description: 'Monitor facility availability instantly. See which rooms are free, check queue wait times, and plan your day efficiently.',
      emoji: '⏰',
    },
  ];

  const currentFeature = pages[currentPage];
  const isLastPage = currentPage === pages.length - 1;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Swipe left - go to next page or complete
    if (isLeftSwipe) {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        onContinue(); // Last page, proceed to login
      }
    }

    // Swipe right - go to previous page
    if (isRightSwipe && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }

    setIsDragging(false);
  };

  // Mouse drag support for desktop testing
  const onMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTouchEnd(e.clientX);
    }
  };

  const onMouseUp = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Swipe left - go to next page or complete
    if (isLeftSwipe) {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        onContinue(); // Last page, proceed to login
      }
    }

    // Swipe right - go to previous page
    if (isRightSwipe && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }

    setIsDragging(false);
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-6 relative select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Swipe Indicator - Left (Back) */}
      {currentPage > 0 && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 animate-pulse">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <ChevronLeftIcon className="w-6 h-6 text-white/60" />
          </div>
        </div>
      )}

      {/* Swipe Indicator - Right (Next/Start) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-pulse">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <ChevronRightIcon className="w-6 h-6 text-white/60" />
        </div>
      </div>

      {/* Mobile Container */}
      <div className="w-full max-w-md flex flex-col h-screen justify-between py-12">
        {/* Logo & Brand - Top */}
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold text-white">ICRRUS</h1>
          <p className="text-sm text-white/80 mt-1">Student & Faculty Portal</p>
        </div>

        {/* Feature Content - Center */}
        <div className="text-center px-6 space-y-8">
          {/* Large Emoji/Icon */}
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-7xl">{currentFeature.emoji}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white">
            {currentFeature.title}
          </h2>

          {/* Description */}
          <p className="text-lg text-white/90 leading-relaxed">
            {currentFeature.description}
          </p>
        </div>

        {/* Navigation - Bottom */}
        <div className="space-y-6">
          {/* Swipe Instruction */}
          <div className="text-center">
            <p className="text-white/60 text-sm font-medium">
              {isLastPage ? '← Swipe or drag to get started →' : '← Swipe or drag to navigate →'}
            </p>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center gap-2">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentPage 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Skip Button - Only on first pages */}
          {!isLastPage && (
            <button
              onClick={onContinue}
              className="w-full text-white/70 hover:text-white text-sm font-medium transition-colors py-2"
            >
              Skip to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}