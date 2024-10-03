import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { AboutUsPage } from './modules/AboutUsPage/AboutUsPage';
import { HomePage } from './modules/HomePage/HomePage';
import { ContinentsPage } from './modules/ContinentsPage/ContinentsPage';
import { TourDetailsPage } from './modules/TourDetailsPage/TourDetailsPage';
import { ToursPage } from './modules/ToursPage/ToursPage';
import { RegistrationPage } from './modules/RegistrationPage/RegistrationPage';
import { LoginPage } from './modules/LoginPage/LoginPage';
import { UserAccountPage } from './modules/UserAccountPage/UserAccountPage';
import { AuthProvider } from './context/AuthContext';

export const Root = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="continents" element={<ContinentsPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<UserAccountPage />}></Route>

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
  </AuthProvider>
);

export default Root;