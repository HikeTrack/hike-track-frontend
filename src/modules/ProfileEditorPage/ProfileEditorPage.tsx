import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Months } from "../../enums/Months";
import { getDefaultAvatarIcon } from "../../utils/getIcons";
import styles from './ProfileEditorPage.module.scss';

export const ProfileEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, token, updateUserProfile, resetPassword } = useAuth();
  const defaultAvatar = getDefaultAvatarIcon();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Months | null>(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [state, setState] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    userProfileRespondDto: {
      country: '',
      city: '',
      phoneNumber: '',
      aboutMe: '',
      userPhoto: '',
    }
  });

  const [passwordData, setPasswordData] = useState({
    password: '',
    repeatPassword: ''
  });

  const monthsOptions = Object.values(Months).map(month => ({
    value: month,
    label: month,
  }));

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelectMonth = (value: string | null) => {
    if (typeof value === 'string') {
      setSelectedMonth(value as Months);
    }

    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setState(prevState => {
      if (name in prevState.userProfileRespondDto) {
        return {
          ...prevState,
          userProfileRespondDto: {
            ...prevState.userProfileRespondDto,
            [name]: value,
          },
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  }

  const handleSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Token before API calls:", token);

    if (!passwordData.password || !passwordData.repeatPassword) {
      setError('Please type in correct password')
      return;
    }

    if (!state.firstName || !state.lastName || !state.email) {
      setError('Please fill in all the necessary fields')
      return;
    }

    if (token) {
      const isSuccessPassword = await resetPassword(
        passwordData.password,
        passwordData.repeatPassword,
        token
      );

      const isSuccessProfileInfo = await updateUserProfile(
        state.firstName,
        state.lastName,
        state.email,
        {
          country: state.userProfileRespondDto.country || null,
          city: state.userProfileRespondDto.city || null,
          phoneNumber: state.userProfileRespondDto.phoneNumber || null,
          aboutMe: state.userProfileRespondDto.aboutMe || null,
          userPhoto: state.userProfileRespondDto.userPhoto || null,
        }
      );

      if (isSuccessPassword && isSuccessProfileInfo) {
        navigate('/profile');
      }
    } else {
      setError('Something went wrong. Please try again')
    }
  };

  const handlePasswordDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswordData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleInputReset = () => {
    setState({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      userProfileRespondDto: {
        country: '',
        city: '',
        phoneNumber: '',
        aboutMe: '',
        userPhoto: '',
      }
    });
    setPasswordData({ password: '', repeatPassword: '' });
    setSelectedMonth(null);
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit profile</h1>

        <div className={styles.avatarContainer}>
          <img 
            src={defaultAvatar} 
            alt="Avatar" 
            className={styles.avatar}
          />

          <button className={styles.avatarButton}>Change photo</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmitClick}>
          <div className={styles.inputContainer}>
            <label htmlFor="firstName" className={styles.inputLabel}>First name:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="firstName"
                name="firstName"
                value={state.firstName}
                onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="firstNameError"
              />
            </div>
            {error && <span id="firstNameError" className={styles.errorMessage}>{error}</span>}
          </div>
        
          <div className={styles.inputContainer}>
            <label htmlFor="lastName" className={styles.inputLabel}>Last name:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="lastName"
                name="lastName"
                value={state.lastName}
                onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="lastNameError"
              />
            </div>
            {error && <span id="lastNameError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.inputLabel}>Email address:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="email" 
                id="email"
                name="email"
                value={state.email}
                onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="emailError"
              />
            </div>
            {error && <span id="emailError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="phone" className={styles.inputLabel}>Phone number:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="phone" 
                id="phone"
                name="phoneNumber"
                value={state.userProfileRespondDto.phoneNumber}
                onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="phoneError"
              />
            </div>
            {error && <span id="phoneError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="city" className={styles.inputLabel}>City:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="city"
                name="city"
                value={state.userProfileRespondDto.city}
                onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="cityError"
              />
            </div>
            {error && <span id="cityError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="country" className={styles.inputLabel}>Country:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="country"
                name="country"
                value={state.userProfileRespondDto.country}
                onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="countryError"
              />
            </div>
            {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.inputLabel}>Set a new password:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="password" 
                id="password"
                name="password"
                value={passwordData.password}
                onChange={handlePasswordDataChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="countryError"
              />
            </div>
            {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="confirm-password" className={styles.inputLabel}>Confirm password:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="password" 
                id="confirm-password"
                name="repeatPassword"
                value={passwordData.repeatPassword}
                onChange={handlePasswordDataChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="countryError"
              />
            </div>
            {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="birth-day" className={styles.inputLabel}>Birtday:</label>
            
            <div className={styles.birthdayMobile}>
              <div className={styles.dropdown}>
                <button className={styles.dropdownButton} onClick={handleToggle}>
                  {monthsOptions.find(month => month.value === selectedMonth)?.label || 'Month'}
                </button>
                {isOpen && (
                  <ul className={styles.dropdownList}>
                    {monthsOptions.map(option => (
                      <li 
                        className={styles.dropdownItem}
                        key={option.value}
                        onClick={() => handleSelectMonth(option.value)}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="birth-day"
                  // value={state.password}
                  // onChange={handleInputChange}
                  placeholder="Day"
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby="countryError"
                />
              </div>

              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="birth-year"
                  // value={state.password}
                  // onChange={handleInputChange}
                  placeholder="Year"
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby="countryError"
                />
              </div>
            </div>
            
            {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="about-me" className={styles.inputLabel}>About me:</label>

            <textarea 
              className={styles.textarea}
              id="about-me"
              name="aboutMe"
              value={state.userProfileRespondDto.aboutMe}
              onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="countryError"
            />

            {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.buttonContainer}>
            <button 
              className={styles.buttonCancel}
              onClick={handleInputReset}
            >
              Cancel
            </button>
            <button 
              className={styles.buttonSave}
              type="submit"
              disabled={isLoading || !state.firstName || !state.lastName || !state.email}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};