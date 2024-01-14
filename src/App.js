import React, { useState } from "react";
import Weather from "./Weather";
import Button from "@mui/material/Button";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = Array.from(icons.keys()).find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function fetchWeather() {
    try {
      setIsLoading(true);

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Location not found");
      }

      const { latitude, longitude, timezone } = geoData.results[0];

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );

      const data = await res.json();
      setWeather(data.daily);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <div>
        <input
          type="text"
          placeholder="Search Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <Button
        variant="outlined"
        size="large"
        color="success"
        onClick={fetchWeather}
      >
        Get Weather
      </Button>
      {isLoading && <p className="loader">Loading...</p>}
      {weather.weathercode && (
        <Weather
          location={location}
          weather={weather}
          getWeatherIcon={getWeatherIcon}
          formatDay={formatDay}
        />
      )}
    </div>
  );
};

export default App;
