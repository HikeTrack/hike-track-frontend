import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/constants';
import { getLogoIcon, getRegistrationAppleIcon, getRegistrationFacebookIcon, getRegistrationGoogleIcon } from '../../utils/getIcons';
import styles from './LoginPage.module.scss';

const logoIcon = getLogoIcon();
const googleIcon = getRegistrationGoogleIcon();
const facebookIcon = getRegistrationFacebookIcon();
const appleIcon = getRegistrationAppleIcon();

type FormValues = {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      const isSuccess = await loginUser(
        data.email,
        data.password
      );
  
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
    <div className={styles.page}>
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

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="email" 
              id="email"
              placeholder="Email address"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Invalid email format'
                }
              })}
            />
          </div>

          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}

          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="password" 
              id="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: PASSWORD_REGEX,
                  message: 'Invalid password'
                }
              })}
            />
          </div>

          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}

          <button type="submit" className={styles.button}>Log in</button>

          <Link to="/auth/forgot-password" className={styles.link}>Forgot your password?</Link>
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