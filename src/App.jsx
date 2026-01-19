import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Weather & Travel Advisor 🌤️</h1>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />

        <button onClick={fetchWeather}>Check Weather</button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="card">
            <h2>{weather.name}</h2>
            <p className="temp">{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>

            <p className="advice">
              {weather.weather[0].main === "Rain"
                ? "🌧️ Better to stay in or carry rain gear"
                : "☀️ Good weather for travel"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
