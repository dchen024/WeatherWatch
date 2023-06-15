import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const WeatherForecast = () => {
    const location = useLocation();
    const { selectedCity } = location.state || {};
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
            const apiKey = '93ad2cb637544848b61163447231506';
            const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${selectedCity.latitude},${selectedCity.longitude}&days=3`;
  
          const response = await fetch(apiUrl);
          const data = await response.json();
  
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
  
      if (selectedCity) {
        fetchWeatherData();
      }
    }, [selectedCity]);
    
    const getWeatherIconUrl = (iconCode) => {
        return `https://www.weatherapi.com/docs/static/img/weather/${iconCode}.svg`;
    };

      return (
        <div>
          <h2>3-Day Weather Forecast for {selectedCity.name}</h2>
      {weatherData && weatherData.forecast && (
        <div>
          {weatherData.forecast.forecastday.map((day) => (
            <div key={day.date}>
              <h3>{day.date}</h3>
              <img src={getWeatherIconUrl(day.day.condition.icon)} alt="Weather Icon" />
              <p>Max Temperature: {day.day.maxtemp_f}°F</p>
              <p>Min Temperature: {day.day.mintemp_f}°F</p>
              <p>Average Temperature: {day.day.avgtemp_f}°F</p>
              <p>Weather: {day.day.condition.text}</p>
              {/* Display additional forecast data as needed */}
            </div>
          ))}
        </div>
      )}
        </div>
      );
}

export default WeatherForecast;