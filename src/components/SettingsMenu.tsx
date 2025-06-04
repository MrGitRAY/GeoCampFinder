import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Moon, Sun, LogOut, Globe } from "lucide-react";

const SettingsMenu = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <div className="absolute flex flex-col gap-2 top-full right-[-7.5%] mt-2 px-1 py-2 backdrop:blur-sm bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden z-50">
      <button
        onClick={toggleTheme}
        className="rounded-full p-2 w-full text-gray-500 dark:text-gray-300 hover:text-sky-500 dark:hover:text-yellow-400 hover:bg-sky-100 dark:hover:bg-gray-900 text-sm"
      >
        {theme === "dark" ? <Sun size={23} /> : <Moon size={23} />}
        {/* <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span> */}
      </button>

      <button
        onClick={() => alert("Language toggle coming soon!")}
        className="rounded-full p-2 w-full text-gray-500 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 text-sm"
      >
        <Globe size={22} />
        {/* <span>Language</span> */}
      </button>

      <button
        onClick={logout}
        className="rounded-full p-2 w-full text-gray-500 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 text-sm"
      >
        <LogOut size={22} />
        {/* <span>Log Out</span> */}
      </button>
    </div>
  );
};

export default SettingsMenu;