import React, { useState, useEffect } from 'react';
import { PrayerTime } from '../types';
import { Clock, Sunrise, Sunset, Moon, Star } from 'lucide-react';

interface CountdownTimerProps {
  prayerTimes: PrayerTime[];
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ prayerTimes }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; type: 'sahur' | 'iftar' } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (prayerTimes.length === 0) return;

    // Get today's prayer times
    const today = new Date();
    const todayStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    
    const todayPrayerTime = prayerTimes.find(time => time.date === todayStr);
    
    if (!todayPrayerTime) return;

    const now = today;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // Parse prayer times
    const fajrTime = parseTimeString(todayPrayerTime.fajr);
    const maghribTime = parseTimeString(todayPrayerTime.maghrib);

    // Determine next prayer (sahur or iftar)
    if (
      currentHour < fajrTime.hours || 
      (currentHour === fajrTime.hours && currentMinute < fajrTime.minutes)
    ) {
      // Next prayer is sahur (fajr)
      setNextPrayer({ name: 'Sahur', time: todayPrayerTime.fajr, type: 'sahur' });
      
      // Calculate time remaining
      let hours = fajrTime.hours - currentHour;
      let minutes = fajrTime.minutes - currentMinute;
      let seconds = 60 - currentSecond;
      
      if (seconds === 60) {
        seconds = 0;
      } else {
        minutes--;
      }
      
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      
      setTimeRemaining({ hours, minutes, seconds });
    } else if (
      currentHour < maghribTime.hours || 
      (currentHour === maghribTime.hours && currentMinute < maghribTime.minutes)
    ) {
      // Next prayer is iftar (maghrib)
      setNextPrayer({ name: 'İftar', time: todayPrayerTime.maghrib, type: 'iftar' });
      
      // Calculate time remaining
      let hours = maghribTime.hours - currentHour;
      let minutes = maghribTime.minutes - currentMinute;
      let seconds = 60 - currentSecond;
      
      if (seconds === 60) {
        seconds = 0;
      } else {
        minutes--;
      }
      
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      
      setTimeRemaining({ hours, minutes, seconds });
    } else {
      // Next prayer is tomorrow's sahur
      const tomorrowIndex = prayerTimes.findIndex(time => time.date === todayStr) + 1;
      
      if (tomorrowIndex < prayerTimes.length) {
        const tomorrowPrayerTime = prayerTimes[tomorrowIndex];
        setNextPrayer({ name: 'Sahur', time: tomorrowPrayerTime.fajr, type: 'sahur' });
        
        // Calculate time remaining
        const tomorrowFajrTime = parseTimeString(tomorrowPrayerTime.fajr);
        
        let hours = (24 - currentHour) + tomorrowFajrTime.hours;
        let minutes = tomorrowFajrTime.minutes - currentMinute;
        let seconds = 60 - currentSecond;
        
        if (seconds === 60) {
          seconds = 0;
        } else {
          minutes--;
        }
        
        if (minutes < 0) {
          minutes += 60;
          hours--;
        }
        
        setTimeRemaining({ hours, minutes, seconds });
      }
    }
  }, [currentTime, prayerTimes]);

  const parseTimeString = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
  };

  if (!nextPrayer || !timeRemaining) {
    return null;
  }

  const getBackgroundColor = () => {
    return nextPrayer.type === 'sahur' ? 'bg-indigo-700/50' : 'bg-purple-700/50';
  };

  const getBorderColor = () => {
    return nextPrayer.type === 'sahur' ? 'border-indigo-600' : 'border-purple-600';
  };

  const getTextColor = () => {
    return nextPrayer.type === 'sahur' ? 'text-indigo-200' : 'text-purple-200';
  };

  const getIcon = () => {
    if (nextPrayer.type === 'sahur') {
      return (
        <div className="bg-indigo-600 p-2 rounded-full">
          <Moon className="h-6 w-6 text-white" />
        </div>
      );
    } else {
      return (
        <div className="bg-yellow-500 p-2 rounded-full">
          <Sunset className="h-6 w-6 text-indigo-900" />
        </div>
      );
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${getBackgroundColor()} border ${getBorderColor()} relative overflow-hidden`}>
      <div className="absolute top-0 right-0 opacity-10">
        {nextPrayer.type === 'sahur' ? (
          <Moon className="h-40 w-40 -mt-10 -mr-10 text-white" />
        ) : (
          <Sunset className="h-40 w-40 -mt-10 -mr-10 text-yellow-400" />
        )}
      </div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center">
          {getIcon()}
          <div className="ml-3">
            <h2 className="text-xl font-bold text-white">
              {nextPrayer.name} Vakti: {nextPrayer.time}
            </h2>
            <p className={`text-sm ${getTextColor()}`}>
              {nextPrayer.type === 'sahur' ? 'İmsak vaktine kalan süre' : 'İftar vaktine kalan süre'}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-indigo-900/50 px-3 py-1 rounded-full">
          <Clock className="h-4 w-4 text-indigo-300 mr-1" />
          <span className="text-indigo-200">
            {currentTime.toLocaleTimeString('tr-TR')}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center relative z-10">
        <div className="bg-indigo-900/50 p-4 rounded-lg shadow-sm border border-indigo-700">
          <p className="text-3xl font-bold text-white">
            {String(timeRemaining.hours).padStart(2, '0')}
          </p>
          <p className="text-xs text-indigo-300 uppercase mt-1">Saat</p>
        </div>
        <div className="bg-indigo-900/50 p-4 rounded-lg shadow-sm border border-indigo-700">
          <p className="text-3xl font-bold text-white">
            {String(timeRemaining.minutes).padStart(2, '0')}
          </p>
          <p className="text-xs text-indigo-300 uppercase mt-1">Dakika</p>
        </div>
        <div className="bg-indigo-900/50 p-4 rounded-lg shadow-sm border border-indigo-700">
          <p className="text-3xl font-bold text-white">
            {String(timeRemaining.seconds).padStart(2, '0')}
          </p>
          <p className="text-xs text-indigo-300 uppercase mt-1">Saniye</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;