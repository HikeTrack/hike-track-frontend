import React from "react";
import { Link } from "react-router-dom";
import { getLogoIcon } from "../../utils/getIcons";
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const logoIcon = getLogoIcon();
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          <img 
            src={logoIcon} 
            alt="logo" 
            className={styles.logoIcon}
          />
        </Link>

        <h1 className={styles.title}>Page not found</h1>

        <Link to="/" className={styles.button}>Go back to home page</Link>
      </div>
    </div>
  )
}