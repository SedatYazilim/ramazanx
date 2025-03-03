import { City } from '../types';

// Haversine formula to calculate distance between two points on Earth
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  return distance;
};

// Turkish cities coordinates (approximate)
const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  "Adana": { lat: 37.0000, lon: 35.3213 },
  "Adıyaman": { lat: 37.7648, lon: 38.2786 },
  "Afyonkarahisar": { lat: 38.7507, lon: 30.5567 },
  "Ağrı": { lat: 39.7191, lon: 43.0503 },
  "Amasya": { lat: 40.6499, lon: 35.8353 },
  "Ankara": { lat: 39.9334, lon: 32.8597 },
  "Antalya": { lat: 36.8841, lon: 30.7056 },
  "Artvin": { lat: 41.1828, lon: 41.8183 },
  "Aydın": { lat: 37.8560, lon: 27.8416 },
  "Balıkesir": { lat: 39.6484, lon: 27.8826 },
  "Bilecik": { lat: 40.1506, lon: 29.9792 },
  "Bingöl": { lat: 38.8855, lon: 40.4966 },
  "Bitlis": { lat: 38.4006, lon: 42.1095 },
  "Bolu": { lat: 40.7392, lon: 31.6089 },
  "Burdur": { lat: 37.7212, lon: 30.2917 },
  "Bursa": { lat: 40.1885, lon: 29.0610 },
  "Çanakkale": { lat: 40.1553, lon: 26.4142 },
  "Çankırı": { lat: 40.6013, lon: 33.6134 },
  "Çorum": { lat: 40.5489, lon: 34.9533 },
  "Denizli": { lat: 37.7765, lon: 29.0864 },
  "Diyarbakır": { lat: 37.9144, lon: 40.2306 },
  "Edirne": { lat: 41.6818, lon: 26.5623 },
  "Elazığ": { lat: 38.6810, lon: 39.2264 },
  "Erzincan": { lat: 39.7500, lon: 39.5000 },
  "Erzurum": { lat: 39.9000, lon: 41.2700 },
  "Eskişehir": { lat: 39.7767, lon: 30.5206 },
  "Gaziantep": { lat: 37.0662, lon: 37.3833 },
  "Giresun": { lat: 40.9128, lon: 38.3895 },
  "Gümüşhane": { lat: 40.4603, lon: 39.4814 },
  "Hakkari": { lat: 37.5744, lon: 43.7408 },
  "Hatay": { lat: 36.2025, lon: 36.1606 },
  "Isparta": { lat: 37.7648, lon: 30.5566 },
  "Mersin": { lat: 36.8000, lon: 34.6333 },
  "İstanbul": { lat: 41.0082, lon: 28.9784 },
  "İzmir": { lat: 38.4192, lon: 27.1287 },
  "Kars": { lat: 40.6013, lon: 43.0975 },
  "Kastamonu": { lat: 41.3887, lon: 33.7827 },
  "Kayseri": { lat: 38.7312, lon: 35.4787 },
  "Kırklareli": { lat: 41.7333, lon: 27.2167 },
  "Kırşehir": { lat: 39.1425, lon: 34.1709 },
  "Kocaeli": { lat: 40.7654, lon: 29.9408 },
  "Konya": { lat: 37.8667, lon: 32.4833 },
  "Kütahya": { lat: 39.4167, lon: 29.9833 },
  "Malatya": { lat: 38.3552, lon: 38.3095 },
  "Manisa": { lat: 38.6191, lon: 27.4289 },
  "Kahramanmaraş": { lat: 37.5858, lon: 36.9371 },
  "Mardin": { lat: 37.3212, lon: 40.7245 },
  "Muğla": { lat: 37.2153, lon: 28.3636 },
  "Muş": { lat: 38.7432, lon: 41.5064 },
  "Nevşehir": { lat: 38.6939, lon: 34.6857 },
  "Niğde": { lat: 37.9667, lon: 34.6833 },
  "Ordu": { lat: 40.9839, lon: 37.8764 },
  "Rize": { lat: 41.0201, lon: 40.5234 },
  "Sakarya": { lat: 40.7731, lon: 30.3943 },
  "Samsun": { lat: 41.2867, lon: 36.3300 },
  "Siirt": { lat: 37.9333, lon: 41.9500 },
  "Sinop": { lat: 42.0231, lon: 35.1531 },
  "Sivas": { lat: 39.7477, lon: 37.0179 },
  "Tekirdağ": { lat: 40.9833, lon: 27.5167 },
  "Tokat": { lat: 40.3167, lon: 36.5500 },
  "Trabzon": { lat: 41.0015, lon: 39.7178 },
  "Tunceli": { lat: 39.1079, lon: 39.5401 },
  "Şanlıurfa": { lat: 37.1591, lon: 38.7969 },
  "Uşak": { lat: 38.6823, lon: 29.4082 },
  "Van": { lat: 38.4891, lon: 43.4089 },
  "Yozgat": { lat: 39.8181, lon: 34.8147 },
  "Zonguldak": { lat: 41.4564, lon: 31.7987 },
  "Aksaray": { lat: 38.3687, lon: 34.0370 },
  "Bayburt": { lat: 40.2552, lon: 40.2249 },
  "Karaman": { lat: 37.1759, lon: 33.2287 },
  "Kırıkkale": { lat: 39.8468, lon: 33.5153 },
  "Batman": { lat: 37.8812, lon: 41.1351 },
  "Şırnak": { lat: 37.5164, lon: 42.4611 },
  "Bartın": { lat: 41.6344, lon: 32.3375 },
  "Ardahan": { lat: 41.1105, lon: 42.7022 },
  "Iğdır": { lat: 39.9167, lon: 44.0333 },
  "Yalova": { lat: 40.6500, lon: 29.2667 },
  "Karabük": { lat: 41.2061, lon: 32.6204 },
  "Kilis": { lat: 36.7184, lon: 37.1212 },
  "Osmaniye": { lat: 37.0742, lon: 36.2478 },
  "Düzce": { lat: 40.8438, lon: 31.1565 }
};

export const findNearestCity = (latitude: number, longitude: number, cities: City[]): City | null => {
  let nearestCity: City | null = null;
  let shortestDistance = Number.MAX_VALUE;

  cities.forEach(city => {
    const coordinates = cityCoordinates[city.name];
    
    if (coordinates) {
      const distance = calculateDistance(latitude, longitude, coordinates.lat, coordinates.lon);
      
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestCity = city;
      }
    }
  });

  return nearestCity;
};