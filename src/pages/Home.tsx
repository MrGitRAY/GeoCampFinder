import { useState } from 'react';
import Map from "../components/Map";
import { camps } from "../data/camps";
import { useNavigate } from 'react-router-dom';
import SettingsToggle from '../components/SettingsToggle';
import { Heart } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCamps = camps.filter((camp) =>
    camp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <header className="backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 shadow p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            🏕️ Geo<span className='text-lime-600'>Camp</span>Finder
          </h1>
          <div className='flex gap-2'>
            <SettingsToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex h-[calc(100vh-64px)]">
        {/* Camp list - left */}
        <div className="w-1/3 h-full flex flex-col">
          {/* Sticky Search Bar */}
          <div className="sticky top-0 z-1 bg-slate-50 dark:bg-gray-900 p-4">
            <input
              type="text"
              placeholder="🔍 Search for Camps"
              className="w-full p-4 bg-slate-200 dark:bg-slate-700 shadow-sm rounded-2xl focus:bg-sky-200 dark:focus:shadow-orange-500 outline-none placeholder-slate-900 dark:placeholder-gray-300 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Scrollable Camp List */}
          <div className="overflow-y-auto pl-4 pr-3 mb-3 custom-scrollbar">
            {filteredCamps.map((camp) => (
              <div
                key={camp.id}
                onClick={() => navigate(`/home/camp-details/${camp.id}`)}
                className="group relative cursor-pointer bg-slate-300 dark:bg-gray-700 hover:bg-orange-600 dark:hover:bg-orange-500 p-4 mb-2 rounded-2xl transition-colors"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(camp.id);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-slate-800 hover:scale-110 transition-transform"
                >
                  {isFavorite(camp.id) ? (
                    <Heart className="text-red-500 fill-red-500" size={20} />
                  ) : (
                    <Heart className="text-gray-400" size={20} />
                  )}
                </button>
                <h2 className="mb-2 font-semibold text-black dark:text-white group-hover:text-white">
                  {camp.name}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-100">
                  {camp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Map - right */}
        <div className="w-2/3 h-full">
          <Map />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-lime-800 p-20 text-center text-sm text-gray-50 dark:bg-orange-600">
        © {new Date().getFullYear()} GeoCamp Finder — All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
