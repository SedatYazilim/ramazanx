import React, { useState, useEffect } from 'react';
import { turkishCities } from './data/turkishCities';
import { fetchPrayerTimes } from './api/prayerTimesApi';
import { City, PrayerTime } from './types';
import CitySelector from './components/CitySelector';
import PrayerTimesTable from './components/PrayerTimesTable';
import DateSelector from './components/DateSelector';
import CountdownTimer from './components/CountdownTimer';
import HadithBanner from './components/HadithBanner';
import { Moon, Sun, Star, Parentheses, MapPin } from 'lucide-react';
import { findNearestCity } from './utils/locationUtils';

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      fetchPrayerTimes(selectedCity.id, currentMonth, currentYear)
        .then(times => {
          setPrayerTimes(times);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching prayer times:', error);
          setLoading(false);
        });
    }
  }, [selectedCity, currentMonth, currentYear]);

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const handleDateChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Tarayıcınız konum hizmetini desteklemiyor.");
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearestCity = findNearestCity(latitude, longitude, turkishCities);
        
        if (nearestCity) {
          setSelectedCity(nearestCity);
          setLocationLoading(false);
        } else {
          setLocationError("Yakınınızda bir şehir bulunamadı.");
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error("Konum alınamadı:", error);
        let errorMessage = "Konum alınamadı.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Konum izni reddedildi.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Konum bilgisi mevcut değil.";
            break;
          case error.TIMEOUT:
            errorMessage = "Konum isteği zaman aşımına uğradı.";
            break;
        }
        
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-yellow-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          >
            <Star className="h-4 w-4" fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Hadith Banner */}
      <HadithBanner />

      <header className="bg-indigo-800 shadow-lg border-b border-indigo-700">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <Parentheses className="h-10 w-10 text-yellow-400" fill="currentColor" />
              <Star className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1" fill="currentColor" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-white">Ramazan Vakitleri</h1>
              <p className="text-xs text-indigo-200">Mübarek Ramazan Ayı</p>
            </div>
          </div>
          <div className="text-sm text-indigo-200 bg-indigo-700 px-3 py-1 rounded-full">
            {today.toLocaleDateString('tr-TR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
            })}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-indigo-800 p-6 rounded-lg shadow-xl mb-6 border border-indigo-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-gradient-radial from-yellow-400/20 to-transparent rounded-full"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <CitySelector 
                cities={turkishCities} 
                selectedCity={selectedCity} 
                onCityChange={handleCityChange} 
              />
              <button 
                onClick={detectLocation}
                disabled={locationLoading}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-4 rounded-lg border border-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MapPin className="h-4 w-4" />
                {locationLoading ? 'Konum Alınıyor...' : 'Konumumu Kullan'}
              </button>
            </div>
            <DateSelector 
              currentMonth={currentMonth} 
              currentYear={currentYear} 
              onDateChange={handleDateChange} 
            />
          </div>

          {locationError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              <p>{locationError}</p>
            </div>
          )}

          {selectedCity && prayerTimes.length > 0 && (
            <CountdownTimer prayerTimes={prayerTimes} />
          )}
        </div>

        <div className="bg-indigo-800 p-6 rounded-lg shadow-xl border border-indigo-700 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-40 h-40 -mb-20 -ml-20 bg-gradient-radial from-purple-500/20 to-transparent rounded-full"></div>
          
          <div className="flex items-center mb-4 relative z-10">
            <div className="bg-yellow-400 p-2 rounded-full mr-3">
              <Moon className="h-6 w-6 text-indigo-900" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              {selectedCity ? `${selectedCity.name} İçin Ramazan Vakitleri` : 'Ramazan Vakitleri'}
            </h2>
          </div>
          
          <PrayerTimesTable prayerTimes={prayerTimes} loading={loading} />
          
          {!selectedCity && (
            <div className="mt-4 p-4 bg-indigo-700/50 rounded-lg border border-indigo-600">
              <p className="text-indigo-200">
                Lütfen namaz vakitlerini görmek için yukarıdan bir şehir seçiniz veya konumunuzu kullanınız.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-indigo-800 mt-12 py-6 border-t border-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-indigo-300 text-sm mb-4 md:mb-0">
              © {currentYear} Ramazan Vakitleri - Türkiye'deki tüm iller için sahur ve iftar vakitleri
            </p>
            <div className="flex space-x-4">
              <span className="text-indigo-300 text-sm">Hayırlı Ramazanlar</span>
              <Parentheses className="h-5 w-5 text-yellow-400" fill="currentColor" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;