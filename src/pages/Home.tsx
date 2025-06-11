import { useState } from 'react';
import Map from "../components/Map";
import { camps, allFeatures } from "../data/camps";
import { useNavigate } from 'react-router-dom';
import SettingsToggle from '../components/SettingsToggle';
import { Heart, SearchIcon, FilterIcon, User } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";

const Home = () => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const userCamps = JSON.parse(localStorage.getItem("UserCamps") || "[]");
  const allCamps = [...camps, ...userCamps];

  const filteredCamps = allCamps.filter((camp) => {
    //match search query?
    const matchesSearch = camp.name.toLowerCase().includes(searchQuery.toLowerCase());
    //match favorites?
    const matchesFavorites = onlyFavorites ? isFavorite(camp.id) : true;
    //match selected features?
    const matchesFeatures = selectedFeatures.length === 0
      ? true
      : selectedFeatures.every((feature) => camp.features?.includes(feature));

    return matchesSearch && matchesFavorites && matchesFeatures;
  });


  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <header className="backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 shadow py-2 px-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            🏕️ <a href="/">Geo<span className='text-lime-600'>Camp</span>Finder</a>
          </h1>
          <div className='flex gap-2'>
            <button
              onClick={() => navigate("/profile")}
              className="p-2 rounded-full bg-slate-100 dark:bg-gray-700 text-orange-500 dark:text-lime-500 hover:bg-slate-200 dark:hover:bg-gray-600 transition"
            >
              <User size={25} />
            </button>
            <SettingsToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col md:flex-row  md:h-[calc(100vh-55px)]">
        {/* Camp list - left */}
        <div className="w-full h-[60vh] md:w-1/3 md:h-full flex flex-col order-1 md:order-0 sm:mt-4 md:mt-auto">
          <div className="flex flex-col sm:flex-row md:flex-col">
            {/* Sticky Search Bar */}
            <div className="sticky top-0 z-1 bg-slate-50 dark:bg-gray-900 p-4 sm:w-1/2 md:w-auto">
              <div className='w-full relative'>
                <input
                  type="text"
                  placeholder="Search for Camps"
                  className="w-full sm:py-8 md:py-4 p-4 pl-12 bg-slate-200 dark:bg-slate-700 shadow-sm rounded-2xl focus:shadow-lime-600 dark:focus:shadow-orange-500 outline-none placeholder-gray-700 dark:placeholder-gray-300 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon size={28} className='absolute top-1/2 -translate-y-1/2 left-3 text-orange-500 dark:text-lime-400' />
              </div>
            </div>
            {/* filter by features */}
            <div className="bg-slate-200 dark:bg-slate-500 flex flex-wrap gap-2 mx-4 mb-4 rounded-2xl p-2 sm:w-1/2 md:w-auto">
              <FilterIcon size={27} className='text-orange-500 dark:text-lime-400' />
              <div className='font-semibold text-center text-orange-50 dark:text-lime-400 bg-orange-500 dark:bg-lime-900/70 w-7 h-7 rounded-full'>
                {filteredCamps.length}
              </div>
              <button
                onClick={() => setOnlyFavorites((prev) => !prev)}
                className={`flex gap-1 justify-center items-center px-3 py-1 rounded-full text-sm transition ${onlyFavorites
                  ? "bg-lime-700 dark:bg-orange-600 text-white"
                  : "bg-slate-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
              >
                <Heart size={14} />
                <span>Favorites</span>
              </button>
              {allFeatures.map((feature) => (
                <button
                  key={feature}
                  onClick={() => {
                    setSelectedFeatures((prev) =>
                      prev.includes(feature)
                        ? prev.filter((f) => f !== feature)
                        : [...prev, feature]
                    );
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition ${selectedFeatures.includes(feature)
                    ? "bg-lime-700 dark:bg-orange-600 text-white"
                    : "bg-slate-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                >
                  {feature}
                </button>
              ))}
            </div>
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
        <div className="w-full h-[40vh] md:w-2/3 md:h-full order-0 md:order-1">
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
