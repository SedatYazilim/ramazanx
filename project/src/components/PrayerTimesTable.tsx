import React from 'react';
import { PrayerTime } from '../types';
import { format, parse } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Moon, Sun, Sunrise, Clock } from 'lucide-react';

interface PrayerTimesTableProps {
  prayerTimes: PrayerTime[];
  loading: boolean;
}

const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({ prayerTimes, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (prayerTimes.length === 0) {
    return (
      <div className="text-center p-8 bg-indigo-700/50 rounded-lg border border-indigo-600">
        <p className="text-indigo-200">Namaz vakitleri bulunamadı. Lütfen bir şehir seçin.</p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    try {
      // Try to parse the date in format dd-MM-yyyy
      const date = parse(dateStr, 'dd-MM-yyyy', new Date());
      return format(date, 'd MMMM yyyy EEEE', { locale: tr });
    } catch (error) {
      // If parsing fails, return the original string
      return dateStr;
    }
  };

  // Check if today is in the prayer times
  const today = new Date();
  const todayStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
  
  return (
    <div className="overflow-x-auto bg-indigo-900/30 rounded-lg shadow-lg border border-indigo-700">
      <table className="min-w-full divide-y divide-indigo-700">
        <thead className="bg-indigo-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
              Tarih
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider bg-indigo-700/50">
              <div className="flex items-center">
                <Moon className="h-3 w-3 mr-1 text-yellow-400" fill="currentColor" />
                İmsak (Sahur)
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
              <div className="flex items-center">
                <Sunrise className="h-3 w-3 mr-1 text-yellow-400" />
                Güneş
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
              <div className="flex items-center">
                <Sun className="h-3 w-3 mr-1 text-yellow-400" />
                Öğle
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-yellow-400" />
                İkindi
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider bg-purple-800/50">
              <div className="flex items-center">
                <Sun className="h-3 w-3 mr-1 text-yellow-400" />
                Akşam (İftar)
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
              <div className="flex items-center">
                <Moon className="h-3 w-3 mr-1 text-yellow-400" />
                Yatsı
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-indigo-700">
          {prayerTimes.map((time, index) => {
            const isToday = time.date === todayStr;
            const rowClass = isToday 
              ? 'bg-indigo-700/50 border-l-4 border-yellow-400' 
              : index % 2 === 0 
                ? 'bg-indigo-800/30' 
                : 'bg-indigo-900/30';
            
            return (
              <tr key={index} className={rowClass}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {isToday && <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>}
                  {formatDate(time.date)}
                  {isToday && <span className="ml-2 text-xs bg-yellow-500 text-indigo-900 px-2 py-0.5 rounded-full">Bugün</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200 font-semibold bg-indigo-700/30">
                  {time.fajr}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                  {time.sunrise}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                  {time.dhuhr}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                  {time.asr}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-300 font-bold bg-purple-800/30">
                  {time.maghrib}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                  {time.isha}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimesTable;