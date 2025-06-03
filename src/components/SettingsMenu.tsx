import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Moon, Sun, LogOut, Globe } from "lucide-react";

const SettingsMenu = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm shadow-orange-500 overflow-hidden z-50">
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      </button>

      <button
        onClick={() => alert("Language toggle coming soon!")}
        className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
      >
        <Globe size={16} />
        <span>Language</span>
      </button>

      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950 text-sm"
      >
        <LogOut size={16} />
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default SettingsMenu;