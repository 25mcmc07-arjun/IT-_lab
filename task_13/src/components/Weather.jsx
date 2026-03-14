import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "252b2b7a224c42fa975163325261403";

function Weather() {

  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName) => {
    try {

      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=5`
      );

      setWeather(response.data.current);
      setForecast(response.data.forecast.forecastday);
      setError("");

    } catch (err) {
      setError("City not found");
      setWeather(null);
      setForecast([]);
    }
  };

  const handleSearch = () => {
    fetchWeather(city.trim());
  };

  return (
    <div>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{city}</h2>
          <p>Temperature: {weather.temp_c} °C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Condition: {weather.condition.text}</p>
        </div>
      )}

      <h3>5 Day Forecast</h3>

      {forecast.map((day, index) => (
        <div key={index}>
          <p>{day.date}</p>
          <p>Avg Temp: {day.day.avgtemp_c} °C</p>
          <p>{day.day.condition.text}</p>
        </div>
      ))}

    </div>
  );
}

export default Weather;