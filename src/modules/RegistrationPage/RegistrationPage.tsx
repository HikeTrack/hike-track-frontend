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
  const { registerUser, setUser, error, isLoading } = useAuth();
  const [isCreateAccountClicked, setIsCreateAccountClicked] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value,
    }))
  };

  const handleSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      navigate('/login');
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                placeholder="Email address"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="emailError"
              />
            </div>
            {error && <span id="emailError" className={styles.errorMessage}>{error}</span>}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="password" 
                id="password"
                value={state.password}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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

export default RegistrationPage;