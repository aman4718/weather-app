import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState(""); 
  const [weatherData, setWeatherData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a22bb9a358564871b32133556241703&q=${city}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading} // Disable the input while loading
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Loading..." : "Search"} {/* Change button text */}
        </button>
      </div>
      {loading && <p>Loading data…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
