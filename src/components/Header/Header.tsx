import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMenuIcon, getLogoIcon, getDefaultAvatarIcon } from '../../utils/getIcons';
import { AsideMenu } from "../AsideMenu/AsideMenu";
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { user, logoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoIcon = getLogoIcon();
  const burgerMenuIcon = getMenuIcon(isMenuOpen);
  const defaultAvatarIcon = getDefaultAvatarIcon();

  const handleLogOut = () => {
    logoutUser();
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
        user={!!user}
        handleMenuVisibility={handleMenuVisibility}
        handleLogOut={handleLogOut}
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
        {user ? (
          <>
          <div className={styles.profileContainer}>
            <Link to="/profile" className={styles.profileLink}>
              {user.firstName}
            </Link>

            <img 
              src={defaultAvatarIcon} 
              alt="Avatar" 
              className={styles.profileAvatar}
            />
          </div>

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
