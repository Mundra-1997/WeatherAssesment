import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (location.trim() !== "") {
      const timeout = setTimeout(() => {
        fetchWeatherData();
      }, 1000);
      setTypingTimeout(timeout);
    } else {
      setData({});
    }
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=fcca84e7be0121f5f5884dccf8712c6a`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setData({});
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      {data.name && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              <h1>{data.main.temp.toFixed()}°C</h1>
            </div>
            <div className="description">
              <p>{data.weather[0].main}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="line"></div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="line"></div>
            <div className="wind">
              <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
