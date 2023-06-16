import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./weather.css"

const WeatherForecast = () => {
    const location = useLocation();
    const { selectedCity } = location.state || {};
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
            const apiKey = process.env.REACT_APP_WEATHERAPI_API_KEY;
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
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };    

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

     const getUVDescription = (uv) => {
      if(uv >= 0 && uv <= 2){
        return 'Low Intensity';
      }
      else if(uv >= 3 && uv <= 5){
        return 'Moderate Intensity';
      }
      else if(uv >= 6 && uv <= 7){
        return 'High Intensity';
      }
      else if(uv >= 8 && uv <= 10){
        return 'Very High Intensity';
      }
      else
        return 'Extreme Intensity';

     };
      
      return (
        <div>
          <h2>7-Day Weather Forecast for {selectedCity.name}</h2>
      {weatherData && weatherData.forecast && (
        <div style={{ display: "flex" }}>
          {weatherData.forecast.forecastday.map((day, index) => (
            <div key={formatDate(day.date)} 
            style={{
              flex: 1,
              margin: "0 10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            }}>
              <h3>{formatDate(day.date)}</h3>
              <div className = "Weather-Icon"> 
              <img src={process.env.PUBLIC_URL + getWeatherIconUrl(day.day.condition.icon, true)} alt="Weather Icon" />
              </div>
              <p>Weather: {day.day.condition.text}</p>
              <p>Max Temperature: {day.day.maxtemp_c}°C</p>
              <p>Min Temperature: {day.day.mintemp_c}°C</p>
              <p> Humidity: {day.day.avghumidity}% </p>
              {day.day.air_quality?.['us-epa-index'] && (
              <p>Air Quality: {day.day.air_quality?.['us-epa-index']} ({getAQIDescription(day.day.air_quality?.['us-epa-index'])})</p>
              )}
              <p> Max Wind Speed: {day.day.maxwind_kph} km/h </p>
              <p> Chance of Rain: {day.day.daily_chance_of_rain}% </p>
              <p> Total Precipitation: {day.day.totalprecip_in} in.</p>
              <p>UV Index: {day.day.uv} ({getUVDescription(day.day.uv)})</p>
              {/* Display additional forecast data as needed */}
            </div>
          ))}
        </div>
      )}
        </div>
      );
}

export default WeatherForecast;