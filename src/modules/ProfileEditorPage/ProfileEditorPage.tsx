import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Months } from "../../enums/Months";
import { axiosToken } from "../../utils/axios";
import { EMAIL_REGEX, PHONE_REGEX } from "../../utils/constants";
import { isDateInPast } from "../../utils/InputCheckAndPreparation";
import styles from './ProfileEditorPage.module.scss';

export const ProfileEditorPage: React.FC = () => {
  const navigate = useNavigate();
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, token, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Months | null>(null);
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [avatar, setAvatar] = useState<File | string>(user?.userProfileRespondDto.photo || '');

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [state, setState] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    userProfileRespondDto: {
      country: user?.userProfileRespondDto.country || '',
      city: user?.userProfileRespondDto.city || '',
      phoneNumber: user?.userProfileRespondDto.phoneNumber || '',
      dateOfBirth: user?.userProfileRespondDto.dateOfBirth || '',
      aboutMe: user?.userProfileRespondDto.aboutMe || '',
    }
  });

  const [passwordData, setPasswordData] = useState({
    password: '',
    repeatPassword: ''
  });

  const monthsOptions = Object.entries(Months).map(([name, value]) => ({
    label: name,
    value: value,
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setAvatar(file);
    }
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

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    
    setState(prevState => ({
      ...prevState,
      userProfileRespondDto: {
          ...prevState.userProfileRespondDto,
          aboutMe: value.slice(0, 500),
      },
    }));
  };

  const handleSelectMonth = (value: string | null) => {
    if (!value) {
      return;
    }

    setSelectedMonth(value as Months);
    setIsOpen(false);
  };

  const handleBirthDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDay(e.target.value);
  };
  
  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthYear(e.target.value);
  };
  

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errors: Record<string, string> = {};

    const preparedDateOfBirth = `${birthYear}-${selectedMonth}-${birthDay}`;

    if (!state.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!state.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!state.email || !EMAIL_REGEX.test(state.email)) {
      errors.email = 'Valid email is required';
    }
    if (!isDateInPast(preparedDateOfBirth)) {
      errors.dateOfBirth = 'Valid date of birth is required';
    }
    if (!PHONE_REGEX.test(state.userProfileRespondDto.phoneNumber)) {
      errors.phoneNumber = 'Valid phone number is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const formData = new FormData();
      
      const data = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        userProfileRespondDto: {
          country: state.userProfileRespondDto.country,
          city: state.userProfileRespondDto.city,
          phoneNumber: state.userProfileRespondDto.phoneNumber,
          dateOfBirth: preparedDateOfBirth,
          aboutMe: state.userProfileRespondDto.aboutMe,
        }
      };

      formData.append('data', JSON.stringify(data));

      if (avatar && typeof avatar !== 'string') {
        formData.append('photo', avatar);
      }

      console.log(formData);

      const response = await axiosToken.patch(`/users/${user?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      setError('An error occured while submitting the form. Please try again');
    } finally {
      setState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        userProfileRespondDto: {
          country: user?.userProfileRespondDto.country || '',
          city: user?.userProfileRespondDto.city || '',
          phoneNumber: user?.userProfileRespondDto.phoneNumber || '',
          dateOfBirth: user?.userProfileRespondDto.dateOfBirth || '',
          aboutMe: user?.userProfileRespondDto.aboutMe || '',
        }
      });

      navigate('/profile');
    }
  };

  const handleInputReset = () => {
    setState({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      userProfileRespondDto: {
        country: user?.userProfileRespondDto.country || '',
        city: user?.userProfileRespondDto.city || '',
        phoneNumber: user?.userProfileRespondDto.phoneNumber || '',
        dateOfBirth: user?.userProfileRespondDto.dateOfBirth || '',
        aboutMe: user?.userProfileRespondDto.aboutMe || '',
      }
    });
    // setPasswordData({ password: '', repeatPassword: '' });
    setSelectedMonth(null);

    navigate('/profile');
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit profile</h1>

        <div className={styles.avatarContainer}>
          <div
            style={{ backgroundImage: `url(${typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)})` }}
            className={styles.avatar}
          >
          </div>
          
          <label htmlFor="avatar" className={styles.avatarButton}>
            Change photo
          </label>

          <input 
            className={styles.inputImageHidden}
            type="file" 
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            // ref={fileInputRef}
          />
        </div>

        <form className={styles.form} onSubmit={handleFormSubmit}>
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
              />
            </div>
            {formErrors.firstName && <span className={styles.formError}>{formErrors.firstName}</span>}
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
              />
            </div>
            {formErrors.lastName && <span className={styles.formError}>{formErrors.lastName}</span>}
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
              />
            </div>
            {formErrors.email && <span className={styles.formError}>{formErrors.email}</span>}
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
              />
            </div>
            {formErrors.phoneNumber && <span id="phoneError" className={styles.errorMessage}>{formErrors.phoneNumber}</span>}
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
                placeholder="Leave empty to keep current password"
                value={passwordData.password}
                // onChange={handlePasswordDataChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="passError"
              />
            </div>
            {error && <span id="passError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="confirm-password" className={styles.inputLabel}>Confirm password:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="password" 
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Leave empty to keep current password"
                value={passwordData.repeatPassword}
                // onChange={handlePasswordDataChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="confirmPassError"
              />
            </div>
            {error && <span id="repeatPassError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="birth-day" className={styles.inputLabel}>Birtday:</label>
            
            <div className={styles.birthdayMobile}>
              <div className={styles.dropdown} ref={dropdownRef}>
                <button type="button" className={styles.dropdownButton} onClick={handleToggle}>
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
                  type="number" 
                  id="birthDay"
                  value={birthDay}
                  onChange={handleBirthDayChange}
                  placeholder="Day"
                />
              </div>

              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="number" 
                  id="birthYear"
                  value={birthYear}
                  onChange={handleBirthYearChange}
                  placeholder="Year"
                />
              </div>
            </div>
            
            {error && <span id="birthdateError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="about-me" className={styles.inputLabel}>About me:</label>

            <textarea 
              className={styles.textarea}
              id="aboutMe"
              name="aboutMe"
              value={state.userProfileRespondDto.aboutMe}
              onChange={handleTextAreaChange}
            />

            {error && <span id="aboutMeError" className={styles.errorMessage}>{error}</span>}
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