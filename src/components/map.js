import React, { useState, useEffect } from "react";
import MapGL, {
  useMap,
  Marker,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";
import "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

function Map({ selectedCity, children }) {
  // Mapbox API access token
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // Mapbox map style
  const MAP_STYLE = "mapbox://styles/mapbox/outdoors-v12";

  // Mapbox map viewport
  const [viewport, setViewport] = useState({
    latitude: selectedCity ? selectedCity.latitude : 0,
    longitude: selectedCity ? selectedCity.longitude : 0,
  });

  useEffect(() => {
    const fetchHistoricalPrecipitation = async () => {
      try {
        const currentDate = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(currentDate.getDate() - 3);

        const tilesUrl = `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OPEN_WEATHERMAP_API_KEY}`;

        const response = await axios.get(tilesUrl);
      } catch (error) {
        console.error("Error fetching historical precipitation data:", error);
      }
    };

    if (selectedCity) {
      fetchHistoricalPrecipitation();
    }
  }, [selectedCity]);

  return (
  <>
    <nav className="news-navbar">
        <a href="/" className="news-navbar-brand">Home</a>
        <a href="/weather" className="news-navbar-brand">Weather</a>
        <a href="/news" className="news-navbar-brand">News</a>
        <h2 className='news-title'>Map</h2>
      </nav>
    <div style={{ height: "100%", width: "100%" }}>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
        onViewportChange={setViewport}
      >
        {children}

        {selectedCity && (
          <Marker
            latitude={selectedCity.latitude}
            longitude={selectedCity.longitude}
            offsetTop={-20}
            offsetLeft={-10}
          >
            <div className="marker"></div>
            <span className="pulse"></span>
          </Marker>
        )}
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <NavigationControl />
        </div>
        {selectedCity && (
          <Source
            id="historical-precipitation"
            type="raster"
            tiles={[
              `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OPEN_WEATHERMAP_API_KEY}`,
            ]}
            tileSize={256}
          >
            <Layer
              id="historical-precipitation-layer"
              type="raster"
              source="historical-precipitation"
            />
          </Source>
        )}
      </MapGL>
      {selectedCity && (
        <div
          className="pin"
          style={{
            transform: "translate(50%, 50%)",
          }}
        ></div>
      )}
    </div>
  </>
  );
};

export default Map;
