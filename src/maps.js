import React from 'react';
import { useLocation } from 'react-router-dom';
import "./maps.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './map';

const MapPage = () => {
  const location = useLocation();
  const { selectedCity } = location.state || {};

  return <Map selectedCity={selectedCity} />; 
};

export default MapPage;
