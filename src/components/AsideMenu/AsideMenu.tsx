import React from "react";
import styles from './AsideMenu.module.scss';
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { getArrowNextIcon, getDefaultAvatarIcon, getGoNextIcon } from "../../utils/getIcons";

type Props = {
  isMenuOpen: boolean,
  user: boolean,
  handleMenuVisibility: () => void;
  handleLogOut: () => void;
};

export const AsideMenu: React.FC<Props> = ({ 
  isMenuOpen, 
  user,
  handleMenuVisibility,
  handleLogOut 
}) => {
  const defaultAvatarIcon = getDefaultAvatarIcon();
  const goNextIcon = getGoNextIcon();

  return (
    <aside 
      className={classNames(styles.asideMenu, {
      [styles.menuOpen]: isMenuOpen
      })}
      aria-expanded={isMenuOpen}
    >
      <nav className={styles.nav}>
        <NavLink 
          to="/" 
          onClick={handleMenuVisibility}
          className={({ isActive }) =>
            classNames(styles.navItem, { [styles.isActive]: isActive })
          }
        >
          Home
        </NavLink>

        <NavLink 
          to="/continents" 
          onClick={handleMenuVisibility}
          className={({ isActive }) =>
            classNames(styles.navItem, { [styles.isActive]: isActive })
          }
        >
          Tours
        </NavLink>

        <NavLink 
          to="/about" 
          onClick={handleMenuVisibility}
          className={({ isActive }) =>
            classNames(styles.navItem, { [styles.isActive]: isActive })
          }
        >
          About us
        </NavLink>
      </nav>

      {user ? (
        <div className={styles.userCard}>
          <Link 
            to="/profile" 
            className={styles.cardTop}
            onClick={handleMenuVisibility}
          >
            <img 
              src={defaultAvatarIcon} 
              alt="Avatar" 
              className={styles.userAvatar}
            />

            <div className={styles.profileLinkWrapper}>
              <p className={styles.userName}>firstName</p>

              <p className={styles.profileLink}>Show profile</p>
            </div>

            <img src={goNextIcon} alt="Arrow" />
          </Link>

          <NavLink to="/" className={styles.cardOptions}>Settings</NavLink>

          <a className={styles.logout} onClick={handleLogOut}>Log out</a>

          <NavLink to="/" className={styles.cardOptions}>Help Center</NavLink>
        </div>
      ) : (
        <div className={styles.authorisationWrapper}>
          <Link 
            to="/login" 
            className={styles.button}
            onClick={handleMenuVisibility}
          >
            Log in
          </Link>

          <Link 
            to="/register" 
            className={styles.button}
            onClick={handleMenuVisibility}
          >
            Registration
          </Link>
        </div>
      )}
      
    </aside>
  )
};