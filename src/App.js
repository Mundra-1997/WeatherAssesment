import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [population, setPopulation] = useState(0);

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fcca84e7be0121f5f5884dccf8712c6a`;
  const populationUrl = 'https://restcountries.com/v3.1/all?fields=capital,population';

  useEffect(() => {
    if (location) {
      axios.get(weatherUrl).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    }
  }, [location, weatherUrl]);

  useEffect(() => {
    axios.get(populationUrl).then((response) => {
      const countries = response.data;
      let foundPopulation = 0;

      countries.forEach((country) => {
        if (
          typeof country.capital?.[0] === 'string' &&
          country.capital[0].toLowerCase() === location.toLowerCase()
        ) {
          console.log(country.capital);
          console.log(country.population);
          foundPopulation = country.population;
        }
      });

      setPopulation(foundPopulation);
    });
  }, [location, populationUrl]);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setLocation(event.target.value);
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">{data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}</div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
            <div className="wind">
              <p className="bold">{population}</p>
              <p>Population</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
