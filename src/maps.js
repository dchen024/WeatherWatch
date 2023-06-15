import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import "./maps.css"
import 'mapbox-gl/dist/mapbox-gl.css';

const MapPage = () => {
  const location = useLocation();
  const { selectedCity } = location.state || {};

  // Mapbox API access token
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // Mapbox map style
  const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

  // Mapbox map viewport
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: selectedCity ? selectedCity.latitude : 0,
    longitude: selectedCity ? selectedCity.longitude : 0,
    zoom: 8,
    bearing: 0, // Initial bearing (rotation) value
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
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setViewport((prevViewport) => {
        const newBearing = prevViewport.bearing + 1; // Adjust the rotation speed as needed

        // Stop the rotation after 4 seconds
        if (new Date().getTime() - prevViewport.startTimestamp >= 5000) {
          clearInterval(rotationInterval);
          return prevViewport;
        }

        return {
          ...prevViewport,
          bearing: newBearing,
        };
      });
    }, 100); // Adjust the interval duration as needed for smoother animation

    setViewport((prevViewport) => ({
      ...prevViewport,
      startTimestamp: new Date().getTime(), // Save the start timestamp
    }));

    return () => {
      clearInterval(rotationInterval); // Cleanup the interval on component unmount
    };
  }, []); // Run the effect only once on component mount

  return (
    <div>
      <div style={{ position: 'relative', height: '900px' }}>
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
