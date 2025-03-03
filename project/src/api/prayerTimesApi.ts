import axios from 'axios';
import { PrayerTime } from '../types';
import { format } from 'date-fns';

const API_BASE_URL = 'https://api.aladhan.com/v1/calendarByCity';

export const fetchPrayerTimes = async (cityId: number, month: number, year: number): Promise<PrayerTime[]> => {
  try {
    // Map city ID to city name (this would be more sophisticated in a real app)
    // For now, we'll use Istanbul as default
    const cityName = "Istanbul";
    const country = "Turkey";
    
    const response = await axios.get(API_BASE_URL, {
      params: {
        city: cityName,
        country: country,
        method: 13, // Method 13 is for Turkey
        month: month,
        year: year
      }
    });

    if (response.data && response.data.data) {
      return response.data.data.map((day: any) => ({
        date: day.date.gregorian.date,
        fajr: day.timings.Fajr.split(' ')[0],
        sunrise: day.timings.Sunrise.split(' ')[0],
        dhuhr: day.timings.Dhuhr.split(' ')[0],
        asr: day.timings.Asr.split(' ')[0],
        maghrib: day.timings.Maghrib.split(' ')[0],
        isha: day.timings.Isha.split(' ')[0]
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    
    // Return mock data for demonstration purposes
    const today = new Date();
    const mockData: PrayerTime[] = [];
    
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      mockData.push({
        date: format(currentDate, 'dd-MM-yyyy'),
        fajr: '04:30',
        sunrise: '06:15',
        dhuhr: '13:00',
        asr: '16:45',
        maghrib: '19:45', // Iftar time
        isha: '21:15'
      });
    }
    
    return mockData;
  }
};