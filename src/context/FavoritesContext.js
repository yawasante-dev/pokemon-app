import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (pokemonId) => {
    setFavorites((prev) => ({
      ...prev,
      [pokemonId]: !prev[pokemonId],
    }));
  };

  const isFavorite = (pokemonId) => {
    return !!favorites[pokemonId];
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
