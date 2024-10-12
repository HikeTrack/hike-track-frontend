import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/constants';
import { getLogoIcon, getRegistrationAppleIcon, getRegistrationFacebookIcon, getRegistrationGoogleIcon } from '../../utils/getIcons';
import styles from './LoginPage.module.scss';

export const LoginPage: React.FC = () => {
  const { loginUser, setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const logoIcon = getLogoIcon();
  const googleIcon = getRegistrationGoogleIcon();
  const facebookIcon = getRegistrationFacebookIcon();
  const appleIcon = getRegistrationAppleIcon();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'email') {
      setEmail(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  const handleSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isSuccess = await loginUser(email, password);

      if (isSuccess) {
        navigate('/profile');
      } else {
        setError('Login failed. Please try again'); 
      }
    } catch (error) {
      setError('Login failed. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          <img 
            src={logoIcon} 
            alt="logo" 
            className={styles.logoIcon}
          />
        </Link>
        
        <h1 className={styles.title}>Welcome back.
          <br />
          Log in and start exploring
        </h1>

        <form className={styles.form} onSubmit={handleSubmitClick}>
          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="email" 
              id="email"
              placeholder="Email address"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="password" 
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.button}>Log in</button>

          <Link to="/" className={styles.link}>Forgot your password?</Link>
        </form>


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

export default LoginPage;