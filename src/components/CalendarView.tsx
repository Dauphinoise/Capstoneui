import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon, XIcon } from 'lucide-react';

interface CalendarViewProps {
  onSelectDate: (date: string) => void;
  selectedDate: string;
  onClose?: () => void;
  availabilityData?: { [date: string]: number }; // Number of available rooms per date
}

export function CalendarView({ onSelectDate, selectedDate, onClose, availabilityData }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr === selectedDate;
  };

  const isPast = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day);
    return checkDate < today;
  };

  const handleDateClick = (day: number) => {
    if (isPast(day)) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onSelectDate(dateStr);
  };

  const getAvailabilityCount = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return availabilityData?.[dateStr] || 0;
  };

  const getAvailabilityColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 text-gray-400';
    if (count <= 3) return 'bg-yellow-50 text-yellow-600';
    if (count <= 6) return 'bg-yellow-50 text-yellow-600';
    return 'bg-green-50 text-green-600';
  };

  // Create array of day cells
  const dayCells = [];
  
  // Empty cells for days before the month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    dayCells.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  // Actual day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const isCurrentDay = isToday(day);
    const isSelectedDay = isSelected(day);
    const isPastDay = isPast(day);
    const availabilityCount = getAvailabilityCount(day);
    const availabilityColor = getAvailabilityColor(availabilityCount);

    dayCells.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        disabled={isPastDay}
        className={`
          aspect-square p-1 rounded-xl transition-all relative
          ${isPastDay ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
          ${isSelectedDay ? 'bg-blue-600 text-white shadow-lg scale-105' : availabilityColor}
          ${isCurrentDay && !isSelectedDay ? 'ring-2 ring-blue-400' : ''}
        `}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <span className={`text-sm font-semibold ${isSelectedDay ? 'text-white' : ''}`}>
            {day}
          </span>
          {!isPastDay && !isSelectedDay && availabilityCount > 0 && (
            <span className="text-[10px] font-medium mt-0.5">
              {availabilityCount}
            </span>
          )}
        </div>
        {isCurrentDay && !isSelectedDay && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
        )}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-t-3xl w-full max-w-md">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Select Date</h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Month Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-bold">
            {monthNames[month]} {year}
          </h3>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="px-6 py-6">
        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {dayNames.map((dayName) => (
            <div
              key={dayName}
              className="text-center text-xs font-semibold text-gray-500"
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* Day Cells */}
        <div className="grid grid-cols-7 gap-2">
          {dayCells}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700 mb-3">Availability Legend</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-50 border border-green-200 rounded"></div>
              <span className="text-gray-600">7+ rooms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-50 border border-yellow-200 rounded"></div>
              <span className="text-gray-600">4-6 rooms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-50 border border-yellow-200 rounded"></div>
              <span className="text-gray-600">1-3 rooms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-100 border border-gray-200 rounded"></div>
              <span className="text-gray-600">No rooms</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
            <div className="w-6 h-6 bg-blue-600 rounded"></div>
            <span>Selected Date</span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
            <div className="w-6 h-6 border-2 border-blue-400 rounded"></div>
            <span>Today</span>
          </div>
        </div>

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon className="w-4 h-4 text-blue-600" />
              <div>
                <span className="font-semibold text-blue-900">Selected: </span>
                <span className="text-blue-700">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              {availabilityData?.[selectedDate] || 0} room(s) available on this date
            </p>
          </div>
        )}
      </div>
    </div>
  );
}