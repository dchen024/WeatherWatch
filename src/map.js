import React from "react";
import { useLocation } from "react-router-dom";
import { useMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "./components/map";

function MapPage() {
  const location = useLocation();
  const { selectedCity } = location.state || {};

  return (
    <Map selectedCity={selectedCity}>
      <Navigation />
    </Map>
  );
}

function Navigation() {
  const { current: map } = useMap();

  map.flyTo({ zoom: 10 });

  return <div />;
}

export default MapPage;
