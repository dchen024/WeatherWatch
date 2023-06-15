import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './search';
import Map from './maps';
import News from './news';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SearchPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
};

export default App;