import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Months } from "../../enums/Months";
import { getDefaultAvatarIcon } from "../../utils/getIcons";
import styles from './GuideApplicationPage.module.scss';

type LocationState = {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export const GuideApplicationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendGuideApplication, user } = useAuth();
  const { firstName, lastName, email } = location.state as LocationState || {};
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const defaultAvatar = getDefaultAvatarIcon();
  const [selectedMonth, setSelectedMonth] = useState<Months | null>(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [userFirstName, setUserFirstName] = useState(firstName || user?.firstName || '');
  const [userLastName, setUserLastName] = useState(lastName || user?.lastName || '');
  const [userEmail, setUserEmail] = useState(email || user?.email || '');

  useEffect(() => {
    if (user) {
      setUserFirstName(user.firstName || '');
      setUserLastName(user.lastName || '');
      setUserEmail(user.email || '');
    }
  }, [user]);
  
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

  const handleSubmitCick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError('No email is provided');
      return;
    }

    const isSuccess = await sendGuideApplication(email);

    if (isSuccess) {
      navigate('/login');
    }
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Guide Application</h1>

        <div className={styles.avatarContainer}>
          <img 
            src={defaultAvatar} 
            alt="Avatar" 
            className={styles.avatar}
          />

          <button className={styles.avatarButton}>Change photo</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmitCick}>
          <div className={styles.inputContainer}>
            <label htmlFor="firstName" className={styles.inputLabel}>First name:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="firstName"
                value={userFirstName}
                readOnly
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
                value={userLastName}
                readOnly
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
                value={userEmail}
                readOnly
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
                // value={state.password}
                // onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="phoneError"
              />
            </div>
            {error && <span id="phoneError" className={styles.errorMessage}>{error}</span>}
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
                  id="birthDay"
                  // value={state.password}
                  // onChange={handleInputChange}
                  placeholder="Day"
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby="birthdateError"
                />
              </div>

              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="birthYear"
                  // value={state.password}
                  // onChange={handleInputChange}
                  placeholder="Year"
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby="birthdateError"
                />
              </div>
            </div>
            
            {error && <span id="birthdateError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="city" className={styles.inputLabel}>City of Residence:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="city"
                // value={state.password}
                // onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="cityError"
              />
            </div>
            {error && <span id="cityError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="hiking-experience" className={styles.inputLabel}>Hiking experience:</label>
              
            <textarea 
              className={styles.textarea}
              id="hiking-experience"
              // value={state.password}
              // onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="countryError"
            />

            {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="why-guiding" className={styles.inputLabel}>Why do you want to become a guide?</label>
            
            <textarea 
              className={styles.textarea}
              id="why-guiding"
              // value={state.password}
              // onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="countryError"
            />
  
            {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="about-me" className={styles.inputLabel}>About me:</label>
            
            <textarea 
              className={styles.textarea}
              id="about-me"
              // value={state.password}
              // onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="countryError"
            />
        
            {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="specialisations" className={styles.inputLabel}>Specialisations (if any):</label>
            
            <textarea 
              className={styles.textarea}
              id="specialisations"
              // value={state.password}
              // onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="countryError"
            />
   
            {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}

            <p className={styles.inputDescription}>
              (Select your specialisations: e.g., 
              mountain hiking, tourist routes, photography, etc.)
            </p>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="skills" className={styles.inputLabel}>Additional skills:</label>
            
            <textarea 
              className={styles.textarea}
              id="about-me"
              // value={state.password}
              // onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="countryError"
            />

            {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}

            <p className={styles.inputDescription}>
              (Describes any additional skills that may be useful: e.g., first aid knowledge,
              knowledge of plants and animals, etc.)
            </p>
          </div>

          <div className={styles.checkboxContainer}>
            <input className={styles.checkbox} type="checkbox"/>

            <label className={styles.inputLabel}>I agree to the terms and privacy policy</label>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.buttonSubmit} type="submit">Submit Application</button>
            <button 
              className={styles.buttonCancel} 
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};