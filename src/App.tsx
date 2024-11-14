import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { matchPath, Outlet, useLocation } from 'react-router-dom';
import styles from './App.module.scss';

export const App: React.FC = () => {
  const location = useLocation();
  const hideHeaderAndFooterRoutes = [
    '/register', 
    '/login', 
    '/auth/forgot-password', 
    '/auth/reset-password',
    '/auth/confirmation'
  ];

  const isNotFound = !hideHeaderAndFooterRoutes.includes(location.pathname) && location.pathname !== '/';
  const shouldHideHeaderAndFooter = hideHeaderAndFooterRoutes.includes(location.pathname) || isNotFound;
  
  return (
    <div className={styles.app}>
      {!shouldHideHeaderAndFooter && <Header />}

      <div className={styles.container}>
        <Outlet />
      </div>

      {!shouldHideHeaderAndFooter && <Footer />}
    </div>
  )
}