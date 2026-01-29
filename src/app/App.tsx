import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { useEffect, useState } from 'react';
import { Locality } from '../entities/locality/model/types';
import { LOCALITY } from '../entities/locality/constants';
import { PlacePage } from '../pages/Place';
import { FavoritesPage } from '../pages/Favorites';

import './App.css';

export const App = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedLocality, setSelectedLocality] = useState<Locality['id']>(LOCALITY[0].id);
  const [isMobileState, setIsMobileState] = useState(window.innerWidth <= 768);
  const [isSmallMobileState, setIsSmallMobileState] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileState(window.innerWidth <= 768);
      setIsSmallMobileState(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const favoritesFromLS = localStorage.getItem('favorites');
    if (favoritesFromLS) {
      const parsedFavorites = JSON.parse(favoritesFromLS) as string[];
      setFavorites(parsedFavorites);
    }

    return () => {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isMobileState={isMobileState}
              isSmallMobileState={isSmallMobileState}
              selectedLocality={selectedLocality}
              setSelectedLocality={setSelectedLocality}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route
          path="/places/:id"
          element={
            <PlacePage
              selectedLocality={selectedLocality}
              setSelectedLocality={setSelectedLocality}
              isMobileState={isMobileState}
              isSmallMobileState={isSmallMobileState}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              isMobileState={isMobileState}
              isSmallMobileState={isSmallMobileState}
              selectedLocality={selectedLocality}
              setSelectedLocality={setSelectedLocality}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
