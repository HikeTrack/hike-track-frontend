import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getLogoIcon } from "../../utils/getIcons";
import styles from './ConfirmationPage.module.scss';

export const ConfirmationPage: React.FC = () => {
  const { confirmEmail } = useAuth();
  const logoIcon = getLogoIcon();
  const location = useLocation();
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      confirmEmail(token).then((success) => {
        if (success) {
          setIsConfirmed(true);
        } else {
          setIsConfirmed(false);
        }
      }).catch((error) => {
        console.error('Error confirming email:', error);
      })
    }
  }, [confirmEmail, location.search])

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

        <div className={styles.textContainer}>
          {isConfirmed ? (
            <h1 className={styles.title}>Email is verified</h1>
          ) : (
            <h1 className={styles.title}>Email is not verified</h1>
          )}
 
          {isConfirmed ? (
            <p className={styles.text}>
              Your email has been successfully verified. You can 
              now go back to the login page to access the platform
            </p>
          ) : (
            <p className={styles.text}>
              Your email has not been confirmed. Please try again later
            </p>
          )}
        </div>

        {isConfirmed ? (
          <Link to="/login" className={styles.button}>Log in</Link>
        ) : (
          <Link to="/" className={styles.button}>Back to home page</Link>
        )}
        
      </div>
    </div>
  )
}