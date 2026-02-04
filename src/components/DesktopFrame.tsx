import React from 'react';

interface DesktopFrameProps {
  children: React.ReactNode;
}

export function DesktopFrame({ children }: DesktopFrameProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div 
        className="bg-white shadow-2xl overflow-hidden"
        style={{ 
          width: '1440px', 
          height: '1024px',
          maxWidth: '100vw',
          maxHeight: '100vh'
        }}
      >
        {children}
      </div>
    </div>
  );
}
