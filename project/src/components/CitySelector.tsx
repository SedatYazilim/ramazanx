import React from 'react';
import { City } from '../types';
import { Search } from 'lucide-react';

interface CitySelectorProps {
  cities: City[];
  selectedCity: City | null;
  onCityChange: (city: City) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ cities, selectedCity, onCityChange }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const filteredCities = searchTerm
    ? cities.filter(city => 
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : cities;

  return (
    <div className="relative w-full md:w-72">
      <div className="relative">
        <div 
          className="flex items-center justify-between w-full p-3 bg-indigo-700 border border-indigo-600 rounded-lg shadow-sm cursor-pointer text-white"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="text-indigo-100">
            {selectedCity ? selectedCity.name : 'Şehir Seçiniz'}
          </span>
          <svg 
            className={`w-5 h-5 transition-transform duration-200 text-indigo-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-indigo-700 border border-indigo-600 rounded-lg shadow-lg">
            <div className="sticky top-0 p-2 bg-indigo-700 border-b border-indigo-600">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Şehir ara..."
                  className="w-full p-2 pl-8 bg-indigo-800 border border-indigo-600 rounded-md text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-indigo-300" />
              </div>
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {filteredCities.length > 0 ? (
                filteredCities.map(city => (
                  <div
                    key={city.id}
                    className="p-2 hover:bg-indigo-600 cursor-pointer text-indigo-100"
                    onClick={() => {
                      onCityChange(city);
                      setIsDropdownOpen(false);
                      setSearchTerm('');
                    }}
                  >
                    {city.name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-indigo-300 text-center">Şehir bulunamadı</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelector;