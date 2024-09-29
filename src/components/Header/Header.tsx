import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getMenuIcon, getLogoIcon } from '../../utils/getIcons';
import { AsideMenu } from "../AsideMenu/AsideMenu";
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthorised, setIsAuthorised] = useState(!!localStorage.getItem('user_access_token'));

  const logoIcon = getLogoIcon();
  const burgerMenuIcon = getMenuIcon(isMenuOpen);

  const handleLogOut = () => {
    localStorage.removeItem('user_access_token');
    setIsAuthorised(false);
  }

  const handleMenuVisibility = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const menuOverflowStatus = (menuVisibility: boolean) => {
    if (menuVisibility) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    menuOverflowStatus(isMenuOpen);
  }, [isMenuOpen]);
  
  return (
    <>
    <header className={classNames( styles.headerMobile, {
      [styles.menuOpen]: isMenuOpen,
    })}>
      <Link 
        to="/" 
        className={styles.logoLink}
        onClick={handleMenuVisibility}
      >
        <img 
          src={logoIcon} 
          alt="logo" 
          className={styles.logoIcon}
        />
      </Link>

      <button
        type="button"
        className={styles.menuButton}
        onClick={handleMenuVisibility}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <img
          src={burgerMenuIcon}
          alt={isMenuOpen ? 'Close menu' : 'Menu'}
          className={styles}
        />
      </button>

      <AsideMenu 
        isMenuOpen={isMenuOpen}
        handleMenuVisibility={handleMenuVisibility}
      />
    </header>
    
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
       <img src={logoIcon} alt="logo" />
      </Link>

      <nav className={styles.nav}>
        <NavLink to="/" className={styles.navItem}>
          Home
        </NavLink>

        <NavLink to="/continents" className={styles.navItem}>
          Tours
        </NavLink>

        <NavLink to="/about" className={styles.navItem}>
          About us
        </NavLink>
      </nav>

      <div className={styles.containerRight}>
        {isAuthorised ? (
          <>
          <Link to="/profile">
            Name
          </Link>

          <button className={styles.login} onClick={handleLogOut}>Log out</button>
          </>
        ) : (
          <>
          <Link to="/login" className={styles.login}>
            Log in
          </Link>

          <Link to="/register" className={styles.registration}>
            Registration
          </Link>
          </>
        )}
      </div>
    </header>
    </>
  )
};
