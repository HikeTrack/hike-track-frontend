import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.container}>
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}