import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import "./weather.css"
import Map from "./map"

const WeatherForecast = () => {
  const location = useLocation();
  const { selectedCity } = location.state || {};
  const [weatherData, setWeatherData] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState('');

  const generateWeatherDescription = useCallback(async () => {
    if (selectedCity) {
      let prompt = `Right now, the weather in ${selectedCity.name} is ___, with a temperature of:__.\n
      The real feel is temperature:__.\n
      The forecast for the rest of the week is: ___.\n
      If you decide to go outside, you should wear: ___.\n
      Based on the weather this week, check out these places: ___!`; // Modify the prompt as desired

      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

      try {
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7,
            n: 1,
          }),
        });

        const data = await response.json();
        console.log(data);
        const generatedDescription = data.choices[0].text.trim(); // Extract the generated weather description
        setWeatherDescription(generatedDescription); // Set the weather description state
      } catch (error) {
        console.error('Error generating weather description:', error);
      }

    }
  }, [selectedCity]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = process.env.REACT_APP_WEATHERAPI_API_KEY;
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${selectedCity.latitude},${selectedCity.longitude}&days=7&aqi=yes`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setWeatherData(data);
        generateWeatherDescription();
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (selectedCity) {
      fetchWeatherData();
    }
  }, [selectedCity, generateWeatherDescription]);

  const formatDayOfWeek = (dateString) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString); 
    let dayOfWeekIndex = date.getDay() + 1;
    
    if (dayOfWeekIndex > 6)
      dayOfWeekIndex = 0

    console.log(dayOfWeekIndex);
    return daysOfWeek[dayOfWeekIndex];
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
    if (uv >= 0 && uv <= 2) {
      return 'Low Intensity';
    }
    else if (uv >= 3 && uv <= 5) {
      return 'Moderate Intensity';
    }
    else if (uv >= 6 && uv <= 7) {
      return 'High Intensity';
    }
    else if (uv >= 8 && uv <= 10) {
      return 'Very High Intensity';
    }
    else
      return 'Extreme Intensity';

  };

  return (
    <>
    <nav className="news-navbar">
        <a href="/" className="news-navbar-brand">Home</a>
        <h2 className='news-title'>Weather</h2>
      </nav>
    <div className='weather-main'>
      <div className="weather-container">
        <h2>Weather Description</h2>
        <p id="weatherDescription">{weatherDescription}</p>
      </div>
      <div className="weather-forecast-container">
        <h2 className="centered-title" id='#forecast-title'>7-Day Weather Forecast</h2>
        {weatherData && weatherData.forecast && (
          <div className='forecast-container'>
            {weatherData.forecast.forecastday.map((day, index) => (
              <div key={formatDayOfWeek(day.date)}
                className='forecast-background'>
                <h3> {index === 0 && "Today"}
                  { index > 0 && formatDayOfWeek(day.date)}</h3>
                <div className="Weather-Icon">
                  <img src={process.env.PUBLIC_URL + getWeatherIconUrl(day.day.condition.icon, true)} alt="Weather Icon" />
                </div>
                <p>Weather: {day.day.condition.text}</p>
                <p>Max Temperature: {day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F</p>
                <p>Min Temperature: {day.day.mintemp_c}°C / {day.day.mintemp_f}°F</p>
                <p>Humidity: {day.day.avghumidity}% </p>
                {day.day.air_quality?.['us-epa-index'] && (
                  <p>Air Quality: {day.day.air_quality?.['us-epa-index']} ({getAQIDescription(day.day.air_quality?.['us-epa-index'])})</p>
                )}
                <p>Max Wind Speed: {day.day.maxwind_kph} km/h </p>
                <p>Chance of Rain: {day.day.daily_chance_of_rain}% </p>
                <p>Total Precipitation: {day.day.totalprecip_in} in.</p>
                <p>UV Index: {day.day.uv} ({getUVDescription(day.day.uv)})</p>
                {/* Display additional forecast data as needed */}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="weather-map">
        <Map selectedCity={selectedCity}  />
      </div>
    </div>
    </>
  );


}

export default WeatherForecast;