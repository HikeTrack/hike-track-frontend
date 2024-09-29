import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLogoIcon, getRegistrationAppleIcon, getRegistrationFacebookIcon, getRegistrationGoogleIcon } from "../../utils/getIcons";
import { BASE_URL, ACCESS_TOKEN } from "../../utils/constants";
import styles from './RegistrationPage.module.scss';
import { validateEmail, validatePassword } from "../../utils/authorisationFunctions";
import axios, { AxiosError } from "axios";

const logoIcon = getLogoIcon();
const googleIcon = getRegistrationGoogleIcon();
const facebookIcon = getRegistrationFacebookIcon();
const appleIcon = getRegistrationAppleIcon();

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isCreateAccountClicked, setIsCreateAccountClicked] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleCreateAccountClick = () => {
    setIsCreateAccountClicked(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value,
    }))
  }

  const sendDataToServer = async () => {
    if (state.firstName.trim()
      && state.lastName.trim()
      && validateEmail(state.email) 
    ) {
      setIsLoading(true);

      const passwordValidation = validatePassword(state.password);

      if (!passwordValidation.isValid) {
        setError(passwordValidation.message);
        setIsLoading(false);
        return;
      }

      if (state.password !== state.repeatPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      
      const payload = {
        'firstName': state.firstName,
        'lastName': state.lastName,
        'email': state.email,
        'password': state.password,
        'repeatPassword': state.repeatPassword
      };

      console.log('Sending payload to server:', payload);

      try {
        const response = await axios.post(BASE_URL + '/auth/registration', payload);
      
        if (response.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, response.data.token);

          navigate('/profile', {
            state: {
              firstName: state.firstName,
              lastName: state.lastName,
            }
          });

          setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
          });

          setError('');
        } else {
          setError('Some error occurred');
        } 
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.status === 409) {
          setError('This email is already registered. Please use a different email.');
        } else {
          setError('Registration failed. Please try again');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please fill in all fields correctly')
    }
  };

  const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendDataToServer();
  }
  
  return (
    <div className={styles.page}>
      {!isCreateAccountClicked && (
        <div className={styles.containerFirst}>
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

          <button className={styles.button} onClick={handleCreateAccountClick}>Create your free account</button>

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
      )}

      {isCreateAccountClicked && (
        <div className={styles.containerSecond}>
          <h1 className={styles.title}>
            Sign up today to start planning your next adventure
          </h1>

          <form className={styles.form} onSubmit={handleSubmitClick}>
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="firstName"
                value={state.firstName}
                onChange={handleChange}
                placeholder="First name"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="firstNameError"
              />
            </div>
            {error && <span id="firstNameError" className={styles.errorMessage}>{error}</span>}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="lastName"
                value={state.lastName}
                onChange={handleChange}
                placeholder="Last name"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="lastNameError"
              />
            </div>
            {error && <span id="lastNameError" className={styles.errorMessage}>{error}</span>}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="email" 
                id="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Email address"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="emailNameError"
              />
            </div>
            {error && <span id="emailError" className={styles.errorMessage}>{error}</span>}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="password" 
                id="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Password"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="passwordError"
              />
            </div>
            {error && <span id="passwordError" className={styles.errorMessage}>{error}</span>}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="password" 
                id="repeatPassword"
                value={state.repeatPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="repeatPasswordError"
              />
            </div>
            {error && <span id="repeatPasswordError" className={styles.errorMessage}>{error}</span>}

            <button type="submit" className={styles.button}>Sign up</button>
          </form>

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
      )}
    </div>
  )
}