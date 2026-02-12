import React, { useState } from 'react';
import { BellIcon, CheckCheckIcon, TrashIcon, FilterIcon, XIcon, CalendarIcon, ClockIcon, AlertCircleIcon, InfoIcon, CheckCircleIcon } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'booking' | 'queue' | 'system' | 'reminder' | 'approval' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionable?: boolean;
  actionLabel?: string;
}

interface NotificationsProps {
  onBack: () => void;
}

export function Notifications({ onBack }: NotificationsProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'booking' | 'queue' | 'system'>('all');
  const [showFilter, setShowFilter] = useState(false);

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your booking for Room 304 has been approved. Check-in required 15 minutes before start time.',
      timestamp: new Date(Date.now() - 300000), // 5 min ago
      read: false,
      priority: 'high',
      actionable: true,
      actionLabel: 'View Booking',
    },
    {
      id: '2',
      type: 'queue',
      title: 'Queue Update',
      message: 'You are now 2nd in line at the Registrar Office. Estimated wait: 8 minutes.',
      timestamp: new Date(Date.now() - 900000), // 15 min ago
      read: false,
      priority: 'medium',
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Check-in Reminder',
      message: 'Don\'t forget to check in for your Lecture Hall A booking at 2:00 PM today.',
      timestamp: new Date(Date.now() - 1800000), // 30 min ago
      read: true,
      priority: 'medium',
      actionable: true,
      actionLabel: 'Check In Now',
    },
    {
      id: '4',
      type: 'approval',
      title: 'Approval Pending',
      message: 'Your booking request for Computer Lab 2 is awaiting approval from the Lab Coordinator.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: true,
      priority: 'low',
    },
    {
      id: '5',
      type: 'system',
      title: 'System Maintenance',
      message: 'ICRRUS will undergo scheduled maintenance on Feb 10, 2026 from 2:00 AM to 4:00 AM.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: true,
      priority: 'low',
    },
    {
      id: '6',
      type: 'alert',
      title: 'Booking Cancelled',
      message: 'Your booking for Study Room 3 was cancelled due to facility maintenance. Please rebook.',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      read: false,
      priority: 'high',
      actionable: true,
      actionLabel: 'Rebook Now',
    },
    {
      id: '7',
      type: 'booking',
      title: 'Booking Completed',
      message: 'Thank you for using Room 305. Please remember to fill out the feedback form.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true,
      priority: 'low',
    },
    {
      id: '8',
      type: 'queue',
      title: 'Queue Expired',
      message: 'Your ticket for ITSO (ITSO-042) has expired. Please rejoin the queue if still needed.',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      read: true,
      priority: 'low',
    },
  ]);

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600) > 1 ? 's' : ''} ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400) > 1 ? 's' : ''} ago`;
    return timestamp.toLocaleDateString();
  };

  const getNotificationIcon = (type: Notification['type'], priority: Notification['priority']) => {
    const iconClass = priority === 'high' ? 'text-red-600' : priority === 'medium' ? 'text-blue-600' : 'text-gray-600';
    
    switch (type) {
      case 'booking':
        return <CalendarIcon className={`w-5 h-5 ${iconClass}`} />;
      case 'queue':
        return <ClockIcon className={`w-5 h-5 ${iconClass}`} />;
      case 'reminder':
        return <AlertCircleIcon className={`w-5 h-5 ${iconClass}`} />;
      case 'approval':
        return <InfoIcon className={`w-5 h-5 ${iconClass}`} />;
      case 'alert':
        return <AlertCircleIcon className={`w-5 h-5 text-red-600`} />;
      case 'system':
        return <InfoIcon className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <BellIcon className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 pt-6 pb-6 sticky top-0 z-20 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-white">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors relative"
          >
            <FilterIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Dropdown */}
        {showFilter && (
          <div className="absolute right-6 top-20 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 w-48 z-30">
            <button
              onClick={() => { setFilter('all'); setShowFilter(false); }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${filter === 'all' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              All Notifications
            </button>
            <button
              onClick={() => { setFilter('unread'); setShowFilter(false); }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${filter === 'unread' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              Unread Only
            </button>
            <div className="border-t border-gray-200 my-2"></div>
            <button
              onClick={() => { setFilter('booking'); setShowFilter(false); }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${filter === 'booking' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              Bookings
            </button>
            <button
              onClick={() => { setFilter('queue'); setShowFilter(false); }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${filter === 'queue' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              Queue Updates
            </button>
            <button
              onClick={() => { setFilter('system'); setShowFilter(false); }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${filter === 'system' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              System
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <CheckCheckIcon className="w-4 h-4" />
              Mark All Read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </header>

      {/* Notifications List */}
      <div className="px-4 pt-4 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <BellIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications</h3>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              {filter === 'unread' 
                ? 'You\'re all caught up! No unread notifications.'
                : filter === 'all'
                ? 'You don\'t have any notifications yet.'
                : `No ${filter} notifications found.`
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
                notification.read 
                  ? 'border-gray-200' 
                  : 'border-blue-300 bg-blue-50/50'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.priority === 'high' 
                      ? 'bg-red-100' 
                      : notification.priority === 'medium'
                      ? 'bg-blue-100'
                      : 'bg-gray-100'
                  }`}>
                    {getNotificationIcon(notification.type, notification.priority)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {getTimeAgo(notification.timestamp)}
                      </span>
                      {notification.actionable && (
                        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                          {notification.actionLabel}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Priority Indicator */}
              {notification.priority === 'high' && (
                <div className="h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
