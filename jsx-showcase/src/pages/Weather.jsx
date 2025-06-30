import { useState } from "react";

const API_KEY = "YOUR_API_KEY_HERE"; // 🔑 Replace with your OpenWeatherMap API key

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setError("");
    setWeather(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-200 to-blue-300 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-sky-700 mb-4">Weather App</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            onClick={fetchWeather}
            className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {weather && (
          <div className="text-center space-y-2 mt-4">
            <h3 className="text-2xl font-semibold text-blue-800">
              {weather.name}, {weather.sys.country}
            </h3>
            <div className="text-5xl font-bold text-indigo-700">
              {Math.round(weather.main.temp)}°C
            </div>
            <p className="text-lg text-gray-600 capitalize">
              {weather.weather[0].description}
            </p>
            <p className="text-sm text-gray-500">
              Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
