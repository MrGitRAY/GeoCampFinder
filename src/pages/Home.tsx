import { useState } from 'react';
import Map from "../components/Map";
import { camps } from "../data/camps";
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Settings } from "lucide-react";
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCamps = camps.filter((camp) =>
    camp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <header className="dark:bg-gray-800 shadow p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            🏕️ GeoCamp Finder
          </h1>
          <div className='flex gap-2'>
            <button
              onClick={toggleTheme}
              className="flex items-center p-2 rounded-full bg-slate-100 dark:bg-gray-700 text-orange-500 dark:text-orange-300 hover:bg-slate-200 dark:hover:bg-gray-600 transition"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              className="flex items-center p-2 rounded-full bg-slate-100 dark:bg-gray-700 text-orange-500 dark:text-orange-300 hover:bg-slate-200 dark:hover:bg-gray-600 transition"
            >
              <Settings size={20} />
            </button>
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
                className="group cursor-pointer bg-slate-300 dark:bg-gray-700 hover:bg-orange-600 dark:hover:bg-orange-500 p-4 mb-2 rounded-2xl transition-colors"
              >
                <h2 className="font-semibold text-black dark:text-white group-hover:text-white">
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
      <footer className="bg-lime-800 p-4 text-center text-sm text-gray-50 dark:bg-orange-600">
        © {new Date().getFullYear()} GeoCamp Finder — All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
