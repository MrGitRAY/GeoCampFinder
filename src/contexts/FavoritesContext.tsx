import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type FavoritesContextType = {
  favorites: number[]; // store camp IDs
  toggleFavorite: (campId: number) => void;
  isFavorite: (campId: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => { },
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem("Favorites");
    if (stored) return JSON.parse(stored)
    else return []
  });  

  // useEffect(() => {
  //   const stored = localStorage.getItem("Favorites");
  //   if (stored) {
  //     setFavorites(JSON.parse(stored));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("Favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (campId: number) => {
    setFavorites((prev) =>
      prev.includes(campId)
        ? prev.filter((id) => id !== campId)
        : [...prev, campId]
    );
  };

  const isFavorite = (campId: number) => favorites.includes(campId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);