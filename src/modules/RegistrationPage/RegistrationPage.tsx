import React from "react";
import { Link } from "react-router-dom";
import { getLogoIcon, getRegistrationAppleIcon, getRegistrationFacebookIcon, getRegistrationGoogleIcon } from "../../utils/getIcons";
import styles from './RegistrationPage.module.scss';

const logoIcon = getLogoIcon();
const googleIcon = getRegistrationGoogleIcon();
const facebookIcon = getRegistrationFacebookIcon();
const appleIcon = getRegistrationAppleIcon();

export const RegistrationPage = () => {
  return (
    <div className={styles.registrationPage}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          <img 
            src={logoIcon} 
            alt="logo" 
            className={styles.logoIcon}
          />
        </Link>

        <h1 className={styles.title}>Create your free account</h1>

        <div className={styles.socialsWrapper}>
          <div className={styles.socials}>
            <img 
              src={googleIcon} 
              alt="Register with google" 
              className={styles.socialsIcon}
            />
          </div>

          <div className={styles.socials}>
            <img 
              src={facebookIcon} 
              alt="Register with facebook" 
              className={styles.socialsIcon}
            />
          </div>

          <div className={styles.socials}>
            <img 
              src={appleIcon} 
              alt="Register with apple" 
              className={styles.socialsIcon}
            />
          </div>
        </div>

        <div className={styles.middleContainer}>
          <div className={styles.line}></div>
          <p className={styles.text}>Or</p>
          <div className={styles.line}></div>
        </div>

        <button className={styles.button}>Create your free account</button>

        <div className={styles.titleSmall}>
          Already have an account?
          <Link to="/login" className={styles.loginLink}> Log in</Link>
        </div>

        <div className={styles.text}>
          By continuing to use All Trails, you agree to our 
          <Link to="/" className={styles.textLink}> Terms of Service</Link> and <Link to="/" className={styles.textLink}>Privacy Policy</Link>. 
          Personal data added to AllTrails is public by default — 
          refer to our <Link to="/" className={styles.textLink}>Privacy FAQs</Link> to make changes.
        </div>
      </div>
    </div>
  )
}