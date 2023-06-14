import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './search';
import Map from './maps';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<SearchPage />} />
          <Route path="/map" element={<Map />} />
        </Routes>
    </Router>
  );
};

export default App;
