import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLogoIcon, getRegistrationAppleIcon, getRegistrationFacebookIcon, getRegistrationGoogleIcon } from "../../utils/getIcons";
import { useAuth } from "../../context/AuthContext";
import { DevTool } from '@hookform/devtools';
import { Controller, useForm } from "react-hook-form";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/constants";
import styles from './RegistrationPage.module.scss';

const logoIcon = getLogoIcon();
const googleIcon = getRegistrationGoogleIcon();
const facebookIcon = getRegistrationFacebookIcon();
const appleIcon = getRegistrationAppleIcon();

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  isGuide: boolean;
}

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [isCreateAccountClicked, setIsCreateAccountClicked] = useState(false);
 
  const handleCreateAccountClick = () => {
    setIsCreateAccountClicked(true);
  }

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const password = watch('password');

  const onSubmit = async (data: FormValues) => {
    const isSuccess = await registerUser(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.repeatPassword
    );

    if (isSuccess) {
      if (data.isGuide) {
        navigate('/guide-application', {
          state: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
        });
      } else {
        navigate('/');
      }
    }
  };
  
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

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="firstName"
                placeholder="First name"
                {...register('firstName', {
                  required: 'First name is required'
                })}
              />
            </div>
            {errors.firstName && (
              <span className={styles.errorMessage}>{errors.firstName.message}</span>
            )}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="lastName"
                placeholder="Last name"
                {...register('lastName', {
                  required: 'Last name is required'
                })}
              />
            </div>
            {errors.lastName && (
              <span className={styles.errorMessage}>{errors.lastName.message}</span>
            )}

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
                    message: 'Invalid format',
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
                    message: 'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 symbol, and be at least 8 characters long'
                  },
                })}
              />
            </div>
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password.message}</span>
            )}

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="password" 
                id="repeatPassword"
                placeholder="Repeat password"
                {...register('repeatPassword', {
                  required: 'Repeating password is required',
                  validate: (value) => 
                    value === password || 'Passwords do not match',
                })}
              />
            </div>
            {errors.repeatPassword && (
              <span className={styles.errorMessage}>{errors.repeatPassword.message}</span>
            )}

            <div className={styles.checkboxContainer}>
              <Controller
                control={control}
                name="isGuide"
                render={({ field }) => (
                  <input 
                    className={styles.checkbox} 
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target)}
                  />
                )}
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