import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getLogoIcon } from '../../utils/getIcons';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const logoIcon = getLogoIcon();
  
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
       <img src={logoIcon} alt="logo" />
      </Link>

      <nav className={styles.nav}>
        <NavLink to="/" className={styles.navItem}>
          Home
        </NavLink>

        <NavLink to="/search" className={styles.navItem}>
          Tours
        </NavLink>

        <NavLink to="/about" className={styles.navItem}>
          About us
        </NavLink>
      </nav>

      <div className={styles.containerRight}>
        <Link to="/login" className={styles.login}>
          Log in
        </Link>

        <Link to="/register" className={styles.registration}>
          Registration
        </Link>
      </div>
    </header>
  )
};

export default Header;