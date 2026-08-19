import {useEffect, useRef, useState} from 'react';
import {useMapsLibrary} from '@vis.gl/react-google-maps';

export function useAutocompleteSuggestions(inputString, requestOptions = {}) {
  const placesLib = useMapsLibrary('places');
  const sessionTokenRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!placesLib) return;
    const {AutocompleteSessionToken, AutocompleteSuggestion} = placesLib;

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    if (!inputString) {
      if (suggestions.length > 0) setSuggestions([]);
      return;
    }

    const request = {
      ...requestOptions,
      input: inputString,
      sessionToken: sessionTokenRef.current
    };

    setIsLoading(true);
    AutocompleteSuggestion.fetchAutocompleteSuggestions(request).then(res => {
      setSuggestions(res.suggestions);
      setIsLoading(false);
    }).catch(e => {
      console.error(e);
      setIsLoading(false);
    });
  }, [placesLib, inputString]);

  return {
    suggestions,
    isLoading,
    resetSession: () => {
      sessionTokenRef.current = null;
      setSuggestions([]);
    }
  };
}
