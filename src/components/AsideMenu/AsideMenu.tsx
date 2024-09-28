import React from "react";
import styles from './AsideMenu.module.scss';
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

type Props = {
  isMenuOpen: boolean,
  handleMenuVisibility: () => void;
};

export const AsideMenu: React.FC<Props> = ({ isMenuOpen, handleMenuVisibility }) => {
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
    </aside>
  )
};