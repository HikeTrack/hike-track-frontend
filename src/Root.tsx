import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { AboutUsPage } from './modules/AboutUsPage/AboutUsPage';
import { HomePage } from './modules/HomePage/HomePage';
import { SearchPage } from './modules/SearchPage/SearchPage';
import { TourDetailsPage } from './modules/TourDetailsPage/TourDetailsPage';
import { ToursPage } from './modules/ToursPage/ToursPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="about" element={<AboutUsPage />} />

        <Route 
          path="/toursByCountry/:country"
          element={<ToursPage />}
        />

        <Route 
          path="/toursByCountry/:country/:tourId"
          element={<TourDetailsPage />}
        />
      </Route>
    </Routes>
  </Router>
);