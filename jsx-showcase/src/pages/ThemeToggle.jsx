import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Load dark mode preference from localStorage if available
    return localStorage.getItem("theme") === "dark";
  });

  // Update HTML class and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 dark:from-gray-800 dark:via-gray-900 dark:to-black transition-all duration-500 flex items-center justify-center p-6">
      <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-white/30 dark:border-gray-600 shadow-2xl p-10 rounded-2xl max-w-md w-full text-center transition-all duration-500">
        <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Theme Toggle
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
          Click below to switch between Light and Dark mode. Your preference will be saved.
        </p>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
}
