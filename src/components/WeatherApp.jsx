import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState(""); // User input for city name
  const [weatherData, setWeatherData] = useState(null); // Weather data from API
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error message

  const handleSearch = async () => {
    // If no city name is entered, alert the user
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    // Reset states and set loading to true
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      // Artificial delay to ensure loading state is visible
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Fetch weather data
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a22bb9a358564871b32133556241703&q=${city}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data); // Update weather data state
    } catch (err) {
      setError("Failed to fetch weather data"); // Handle errors
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        {/* Input for city name */}
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading} // Disable input while loading
          data-testid="city-input"
        />
        {/* Search button */}
        <button onClick={handleSearch} disabled={loading} data-testid="search-button">
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
      {/* Loading message */}
      {loading && <p data-testid="loading-state">Loading data…</p>}
      {/* Error message */}
      {error && <p style={{ color: "red" }} data-testid="error-message">{error}</p>}
      {/* Weather data */}
      {weatherData && (
        <div className="weather-cards" data-testid="weather-data">
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
