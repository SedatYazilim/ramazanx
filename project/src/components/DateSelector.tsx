import React from 'react';

interface DateSelectorProps {
  currentMonth: number;
  currentYear: number;
  onDateChange: (month: number, year: number) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ currentMonth, currentYear, onDateChange }) => {
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative">
        <select
          value={currentMonth}
          onChange={(e) => onDateChange(parseInt(e.target.value), currentYear)}
          className="block w-full pl-3 pr-10 py-2 text-base bg-indigo-700 border-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:text-sm rounded-md appearance-none"
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-300">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="relative">
        <select
          value={currentYear}
          onChange={(e) => onDateChange(currentMonth, parseInt(e.target.value))}
          className="block w-full pl-3 pr-10 py-2 text-base bg-indigo-700 border-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:text-sm rounded-md appearance-none"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-300">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;