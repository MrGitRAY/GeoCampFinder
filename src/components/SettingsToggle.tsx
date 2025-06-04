import { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";
import SettingsMenu from "./SettingsMenu";

const SettingsToggle = () => {
  const [open, setOpen] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeWithAnimation();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeWithAnimation = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setOpen(false);
      setAnimatingOut(false);
    }, 500); // match animation duration
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center p-2 rounded-full bg-slate-100 dark:bg-gray-700 text-orange-500 hover:bg-slate-200 dark:hover:bg-gray-600 transition"
      >
        <Settings size={25} />
      </button>

      {open && (
        <div className={animatingOut ? "animate-fade-out-down" : "animate-fade-in-up"}>
          <SettingsMenu />
        </div>
      )}
    </div>
  );
};

export default SettingsToggle;