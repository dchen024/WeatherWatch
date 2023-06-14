import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMapGL, { Marker } from 'react-map-gl';
import "./maps.css"

const MapPage = () => {
  const location = useLocation();
  const { selectedCity } = location.state || {};

  // Mapbox API access token
  const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3Nha2liMiIsImEiOiJjbGl1dG5uaTAxcTQ4M3JrOWJldTJpazV1In0.IlyKslb44qscFU4K_e6fsg';

  // Mapbox map style
  const MAP_STYLE = 'mapbox://styles/mapbox/satellite-streets-v11';

  // Mapbox map viewport
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: selectedCity ? selectedCity.latitude : 0,
    longitude: selectedCity ? selectedCity.longitude : 0,
    zoom: 10,
  });

  // State to toggle the flashing effect
  // const [isFlashing, setIsFlashing] = useState(false);

  // // Start/stop the flashing effect when selectedCity changes
  // useEffect(() => {
  //   setIsFlashing(true);

  //   // Stop the flashing effect after 3 seconds
  //   const timeout = setTimeout(() => {
  //     setIsFlashing(false);
  //   }, 3000);

  //   // Cleanup the timeout on component unmount
  //   return () => clearTimeout(timeout);
  // }, [selectedCity]);

  return (
    <div>
      <div style={{ position: 'relative', height: '1000px' }}>
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
            </Marker>
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

export default MapPage;
