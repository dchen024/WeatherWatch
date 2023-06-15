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
            const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${selectedCity.latitude},${selectedCity.longitude}&days=7&aqi=yes`;
  
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
    
    const getWeatherIconUrl = (iconCode, isDay) => {
      console.log(iconCode);
      // Assuming the weather icons are stored in the "weather-icons" directory
      const iconBaseUrl = '/weather-icons/';
      
      // Determine the folder based on the day or night condition
      const folder = isDay ? 'day' : 'night';
      const fileName = iconCode.split('/').pop();

      // Construct the URL for the weather icon
      const iconUrl = `${iconBaseUrl}${folder}/${fileName}`;
      console.log(iconUrl);
      return iconUrl;
    };

    const getAQIDescription = (aqi) => {
      switch (aqi) {
        case 1:
          return 'Good';
        case 2:
          return 'Moderate';
        case 3:
          return 'Unhealthy for Sensitive Groups';
        case 4:
          return 'Unhealthy';
        case 5:
          return 'Very Unhealthy';
        case 6:
          return 'Hazardous';
        default:
          return '';
      }
    };
      
      return (
        <div>
          <h2>7-Day Weather Forecast for {selectedCity.name}</h2>
      {weatherData && weatherData.forecast && (
        <div>
          {weatherData.forecast.forecastday.map((day) => (
            <div key={day.date}>
              <h3>{day.date}</h3>
              <img src={process.env.PUBLIC_URL + getWeatherIconUrl(day.day.condition.icon, true)} alt="Weather Icon" />
              <p>Max Temperature: {day.day.maxtemp_c}°C</p>
              <p>Min Temperature: {day.day.mintemp_c}°C</p>
              {day.day.air_quality?.['us-epa-index'] && (
              <p>AQI: {day.day.air_quality?.['us-epa-index']} ({getAQIDescription(day.day.air_quality?.['us-epa-index'])})</p>
              )}
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