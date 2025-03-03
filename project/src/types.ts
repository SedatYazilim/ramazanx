export interface City {
  id: number;
  name: string;
}

export interface PrayerTime {
  date: string;
  fajr: string; // Sahur (imsak)
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string; // Iftar
  isha: string;
}