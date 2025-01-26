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
      await new Promise((resolve) => setTimeout(resolve, 700)); 
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a22bb9a358564871b32133556241703&q=${city}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data");
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
          disabled={loading}
          data-testid="city-input"
        />
        <button onClick={handleSearch} disabled={loading} data-testid="search-button">
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
      {loading && (
        <p data-testid="loading-state" aria-live="polite">
          Loading data…
        </p>
      )}
      {error && (
        <p data-testid="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {weatherData && (
        <div className="weather-cards" data-testid="weather-data">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current?.temp_c ?? "N/A"}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current?.humidity ?? "N/A"}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current?.condition?.text ?? "N/A"}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current?.wind_kph ?? "N/A"} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
