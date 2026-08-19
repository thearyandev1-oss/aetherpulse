import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function AutocompleteInput({ placeholder, onPlaceSelect }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  useEffect(() => {
    if (!inputValue || inputValue.length < 3) {
      setSuggestions([]);
      return;
    }
    
    const timeoutId = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputValue)}&limit=5`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data);
        })
        .catch(err => console.error(err));
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleInput = (e) => setInputValue(e.target.value);
  
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.display_name);
    setSuggestions([]);
    
    onPlaceSelect({
      id: suggestion.place_id,
      name: suggestion.display_name.split(',')[0],
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
    });
  };

  return (
    <div className="relative">
      <input aria-label="Location input" aria-required="true"
        type="text"
        value={inputValue}
        onChange={handleInput}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li 
              key={i} 
              onClick={() => handleSuggestionClick(s)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-start gap-2 text-sm"
            >
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-gray-900">{s.display_name.split(',')[0]}</div>
                <div className="text-xs text-gray-500 truncate max-w-[250px]">{s.display_name}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
