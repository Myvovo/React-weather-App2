import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Weather() {
  let [city, setCity] = useState(" ");
  let [weather, setWeather] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = `9a5dc8766b040bccf4c4d1f2659e8c62`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(newWeather);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function newWeather(response) {
    setWeather({
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      humidity: Math.round(response.data.main.humidity),
      windSpeed: Math.round(response.data.wind.speed),
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Search Here" onChange={updateCity} />
        <input type="submit" />
      </form>
      <div>
        {weather ? (
          <ul>
            <li> {weather.city}</li>
            <li>Temperature: {weather.temperature}°F</li>
            <li>Humidity: {weather.humidity}%</li>
            <li>Wind Speed: {weather.windSpeed} mph</li>
            <li>Description: {weather.description}</li>
            <img src={weather.icon} alt={weather.description} />
          </ul>
        ) : null}
      </div>
    </div>
  );
}
