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
import { ForgotPasswordPage } from './modules/ForgotPasswordPage/ForgotPasswordPage'
import { AuthProvider } from './context/AuthContext';
import { ResetPasswordPage } from './modules/ResetPasswordPage/ResetPasswordPage';
import { ProfileEditorPage } from './modules/ProfileEditorPage/ProfileEditorPage';
import { GuideApplicationPage } from './modules/GuideApplicationPage/GuideApplicationPage';

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
          <Route path="edit-profile" element={<ProfileEditorPage />}></Route>
          <Route path="guide-application" element={<GuideApplicationPage />}></Route>
          <Route path="auth/forgot-password" element={<ForgotPasswordPage />}></Route>
          <Route path="auth/reset-password" element={<ResetPasswordPage />}></Route>

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