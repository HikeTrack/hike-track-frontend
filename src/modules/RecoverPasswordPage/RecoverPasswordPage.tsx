import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getLogoIcon } from "../../utils/getIcons";
import styles from './RecoverPasswordPage.module.scss';

export const RecoverPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
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
        
        <h1 className={styles.title}>Forgot your password?</h1>

        <p className={styles.titleMedium}>Enter your email to get help logging in</p>

        <form className={styles.form}>
          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="email" 
              id="email"
              placeholder="Email address"
              value={email}
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.button}>Send email</button>

          <Link to="/" className={styles.link}>Back to sign in</Link>
        </form>

        <div className={styles.titleSmall}>
          Don't have an account? 
          <Link to="/register" className={styles.signupLink}> Sign up </Link> 
          for free
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