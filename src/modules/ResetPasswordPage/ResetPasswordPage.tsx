import React, { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getLogoIcon } from "../../utils/getIcons";
import styles from './ResetPasswordPage.module.scss';

export const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const navigate = useNavigate();
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [state, setState] = useState({
    password: '',
    repeatPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value,
    }))
  };

  const handleSubmitClick = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.password || !state.repeatPassword) {
      setError('Please ')
      return;
    }

    if (token) {
      const isSuccess = await resetPassword(
        state.password,
        state.repeatPassword,
        token
      );

      if (isSuccess) {
        setSuccessMessage('Your password has been successfully reset');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } else {
      setError('Invalid token. Please try again later')
    }
  }
  
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
        
        <h1 className={styles.title}>Change your password</h1>

        <form className={styles.form} onSubmit={handleSubmitClick}>
          <label className={styles.inputLabel}>Type in your new password</label>
          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="password" 
              id="password"
              value={state.password}
              onChange={handleInputChange}
            />
          </div>

          <label className={styles.inputLabel}>Confirm password</label>
          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="password" 
              id="repeatPassword"
              value={state.repeatPassword}
              onChange={handleInputChange}
            />
          </div>

          {successMessage && <p className={styles.message}>{successMessage}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.button}>Change your password</button>
        </form>

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