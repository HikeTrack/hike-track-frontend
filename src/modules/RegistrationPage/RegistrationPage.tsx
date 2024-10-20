import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLogoIcon, getRegistrationAppleIcon, getRegistrationFacebookIcon, getRegistrationGoogleIcon } from "../../utils/getIcons";
import styles from './RegistrationPage.module.scss';
import { useAuth } from "../../context/AuthContext";

const logoIcon = getLogoIcon();
const googleIcon = getRegistrationGoogleIcon();
const facebookIcon = getRegistrationFacebookIcon();
const appleIcon = getRegistrationAppleIcon();

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [isCreateAccountClicked, setIsCreateAccountClicked] = useState(false);
  const [isGuideButtonChecked, setIsGuideButtonChecked] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsGuideButtonChecked(e.target.checked);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value,
    }))
  };

  const handleSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (!state.firstName 
      || !state.lastName
      || !state.email
      || !state.password
      || !state.repeatPassword
    ) {
      return;
    }
    
    const isSuccess = await registerUser(
      state.firstName,
      state.lastName,
      state.email,
      state.password,
      state.repeatPassword
    );
    
    if (isSuccess) {
      if (isGuideButtonChecked) {
        navigate('/guide-application', { 
          state: { 
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
          } 
        });
      } else {
        navigate('/login');
      }
    }
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
          <Link to="/" className={styles.logoLink}>
            <img 
              src={logoIcon} 
              alt="logo" 
              className={styles.logoIcon}
            />
          </Link>
          
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
                onChange={handleInputChange}
                placeholder="First name"
                aria-invalid={isFormSubmitted && !state.firstName ? 'true' : 'false'}
                aria-describedby="firstNameError"
              />
            </div>
            {isFormSubmitted && !state.firstName && (
              <span id="firstNameError" className={styles.errorMessage}>
                First name is required
              </span>
            )}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="lastName"
                value={state.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                aria-invalid={isFormSubmitted && !state.lastName ? 'true' : 'false'}
                aria-describedby="lastNameError"
              />
            </div>
            {isFormSubmitted && !state.lastName && (
              <span id="lastNameError" className={styles.errorMessage}>
                Last name is required
              </span>
            )}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="email" 
                id="email"
                value={state.email}
                onChange={handleInputChange}
                placeholder="Email address"
                aria-invalid={isFormSubmitted && !state.email ? 'true' : 'false'}
                aria-describedby="emailError"
              />
            </div>
            {isFormSubmitted && !state.email && (
              <span id="emailError" className={styles.errorMessage}>
                Email is required
              </span>
            )}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="password" 
                id="password"
                value={state.password}
                onChange={handleInputChange}
                placeholder="Password"
                aria-invalid={isFormSubmitted && !state.password ? 'true' : 'false'}
                aria-describedby="passwordError"
              />
            </div>
            {isFormSubmitted && !state.email && (
              <span id="passwordError" className={styles.errorMessage}>
                Password is required
              </span>
            )}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="password" 
                id="repeatPassword"
                value={state.repeatPassword}
                onChange={handleInputChange}
                placeholder="Repeat password"
                aria-invalid={isFormSubmitted && !state.repeatPassword ? 'true' : 'false'}
                aria-describedby="repeatPasswordError"
              />
            </div>
            {isFormSubmitted && !state.repeatPassword && (
              <span id="passwordError" className={styles.errorMessage}>
                Repeating password is required
              </span>
            )}

            <div className={styles.checkboxContainer}>
              <input 
                className={styles.checkbox} 
                type="checkbox"
                checked={isGuideButtonChecked}
                onChange={handleCheckboxChange}
              />

              <label className={styles.checkboxLabel}>I want to become a guide!</label>
            </div>

            <button 
              type="submit" 
              className={styles.button}
            >
              Sign up
            </button>
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

export default RegistrationPage;