import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { AboutUsPage } from './modules/AboutUsPage/AboutUsPage';
import { HomePage } from './modules/HomePage/HomePage';
import { ContinentsPage } from './modules/ContinentsPage/ContinentsPage';
import { TourDetailsPage } from './modules/TourDetailsPage/TourDetailsPage';
import { ToursPage } from './modules/ToursPage/ToursPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="continents" element={<ContinentsPage />} />
        <Route path="about" element={<AboutUsPage />} />

        <Route 
          path="/toursByCountry/:countryId"
          element={<ToursPage />}
        />

        <Route 
          path="/toursByCountry/:countryId/:tourId"
          element={<TourDetailsPage />}
        />
      </Route>
    </Routes>
  </Router>
);