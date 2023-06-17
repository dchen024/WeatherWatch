import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, NavigationControl, Source, Layer } from 'react-map-gl';
import "./maps.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

const Map = ({ selectedCity, mapSize }) => {
  // Mapbox API access token
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // Mapbox map style
  const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

  // Mapbox map viewport
  const [viewport, setViewport] = useState({
    width: '100%',
    height: mapSize === 'small' ? '200px' : '900px',
    latitude: selectedCity ? selectedCity.latitude : 0,
    longitude: selectedCity ? selectedCity.longitude : 0,
    zoom: mapSize = 8,
    bearing: 0, // Initial bearing (rotation) value
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
        console.error('Error fetching historical precipitation data:', error);
      }
    };
  
    if (selectedCity) {
      fetchHistoricalPrecipitation();
    }
  }, [selectedCity]);

  return (
    <div>
      <div style={{ position: 'relative', height: '600px', width: '600px' }}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={MAP_STYLE}
          onViewportChange={setViewport}
        >
          {selectedCity && (
            <Marker
              latitude={selectedCity.latitude}
              longitude={selectedCity.longitude}
              offsetTop={-20}
              offsetLeft={-10}
            >
              <div className="marker"></div>
              <span class = "pulse"></span>
            </Marker>
          )}
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <NavigationControl />
        </div>
        {selectedCity && (
      <Source
        id="historical-precipitation"
        type="raster"
        tiles={[`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OPEN_WEATHERMAP_API_KEY}`]}
        tileSize={256}
      >
        <Layer
          id="historical-precipitation-layer"
          type="raster"
          source="historical-precipitation"
        />
      </Source>
    )}
        </ReactMapGL>
        {selectedCity && (
          <div
            className="pin"
            style={{
              transform: 'translate(50%, 50%)',
            }}
          >
          </div>
        )}

      </div>
    </div>
  );  
};

export default Map;
