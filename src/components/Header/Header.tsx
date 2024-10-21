import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMenuIcon, getLogoIcon, getDefaultAvatarIcon, getGoNextIcon } from '../../utils/getIcons';
import { AsideMenu } from "../AsideMenu/AsideMenu";
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserClicked, setIsUserClicked] = useState(false);

  const logoIcon = getLogoIcon();
  const burgerMenuIcon = getMenuIcon(isMenuOpen);
  const defaultAvatarIcon = getDefaultAvatarIcon();
  const goNextIcon = getGoNextIcon();

  const handleLogOut = () => {
    logoutUser();
    navigate('/');
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

  const handleUserCardVisibility = () => {
    setIsUserClicked((prev: boolean) => !prev);
  };

  const closeUserCard = () => {
    setIsUserClicked(false);
  };
  
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

        {user?.role.includes('ROLE_GUIDE') && (<NavLink to="/create-tour" className={styles.navItem}>
          Create a new tour
        </NavLink>)}
      </nav>

      <div className={styles.containerRight}>
        {user ? (
          <>
          <button 
            className={styles.profileButton}
            onClick={handleUserCardVisibility}
          >
            <span>{user.firstName}</span>

            <img 
              src={defaultAvatarIcon} 
              alt="Avatar" 
              className={styles.profileAvatar}
            />
          </button>

          {isUserClicked && (
            <div className={styles.userCard}>
              <Link 
                to="/profile" 
                className={styles.cardTop}
                onClick={closeUserCard}
              >
                <img 
                  src={defaultAvatarIcon} 
                  alt="Avatar" 
                  className={styles.profileAvatar}
                />

                <div className={styles.userNameWrapper}>
                  <span className={styles.userName}>{user?.firstName}</span>

                  <span className={styles.userText}>Show profile</span>
                </div>

                <img src={goNextIcon} alt="arrow" />
              </Link>

              <nav className={styles.userCardNav}>
                {user?.role.includes('ROLE_GUIDE') && (
                  <NavLink 
                    to="/create-tour" 
                    className={styles.userCardNavLink}
                    onClick={closeUserCard}
                  >
                    Create a tour
                  </NavLink>
                )}

                <NavLink 
                  to="/" 
                  className={styles.userCardNavLink}
                  onClick={closeUserCard}
                >
                  Settings
                </NavLink>
              </nav>
            </div>
          )}

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
