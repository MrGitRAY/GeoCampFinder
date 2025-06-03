import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type FavoritesContextType = {
  favorites: string[]; // store camp IDs
  toggleFavorite: (campId: string) => void;
  isFavorite: (campId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("Favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (campId: string) => {
    setFavorites((prev) =>
      prev.includes(campId)
        ? prev.filter((id) => id !== campId)
        : [...prev, campId]
    );
  };

  const isFavorite = (campId: string) => favorites.includes(campId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);