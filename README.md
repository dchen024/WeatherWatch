# WeatherWatch
Headstarter Project 2  
Created by Daniel Chen, Shadman Sakib, and Jawad Chowdhury.

## Inspiration / Problem We Are Solving
On June 7th, a Canadian wildfire caused New York City's air quality to drop significantly. We wanted to build a real-time weather app so people can check the weather and air condition of their desired locations.<br>  
<img src="https://github.com/shadasali/Data-Aggregation/blob/main/picture.png" alt="NYC during Canadian wildfire">

## What is WeatherWatch  
- real-time weather
- precipitation map
- 7-day forecast
- historical weather data
- top news by location
- OpenAI-powered summaries for weather & news

## Weather Search Page
On the weather page, you will see the AI summarized current weather plus suggestions based on the weather at the top. Under that, you will see the 7-day forecast which shows information such as the weather, air quality, etc. Below the 7-day forecast, you will see the historical weather data which shows the data for previous days. And finally, at the bottom, you can see the precipitation in your local area or zoom out to see the precipitation around the world.<br><br>
!add GIF here!

## Local News Page
On the news page, you will see the top news in your area. If you're short on time read the summarization of the top articles.<br><br>
!add GIF here!

## Technology Stack
**Frontend**
- React
- HTML/CSS/JavaScript

**Backend**
- Node
- Axios
- APIs

**APIs**
- Mapbox API
- NewsAPI
- OpenAI ChatGPT API
- OpenWeatherMap API
- Geoapify API

## Hurdles
1) Having a pin on the map to show User's selected location
2) Displaying real-time precipitation map
3) Displaying weather icons for each weather description
4) Filtering news articles by country
5) Passing data between React pages

## Future Iterations
1) Using Twilio to add SMS notifications for alerts and etc
2) Add a Search Bar to Weather and News Page

## How to Run
1) Run `npm install` inside the project's terminal <br>
Installs all the necessary dependencies for the code to compile properly.
2) Create a `.env` file in the root directory <br>
Used to connect Resume Parser to your Firebase Storage
```
REACT_APP_MAPBOX_ACCESS_TOKEN="Mapbox API Key"
REACT_APP_NEWS_API_KEY= "News API Key"
REACT_APP_GEOAPIFY_API_KEY = "Geoapify API Key"
REACT_APP_WEATHERAPI_API_KEY = "WeatherAPI API Key"
REACT_APP_OPEN_WEATHERMAP_API_KEY = "OpenWeatherMap API Key"
REACT_APP_OPENAI_API_KEY = "OpenAI API Key"
```
3) Run `npm start` in the project's terminal
Opens Resume Parser app in your browser <br>
By default it will open [http://localhost:3000](http://localhost:3000)
