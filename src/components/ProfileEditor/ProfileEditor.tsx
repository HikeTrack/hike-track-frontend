import React, { useState } from "react";
import styles from './ProfileEditor.module.scss';

type Props = {
  defaultAvatar: string
}

export const ProfileEditor: React.FC<Props> = ({ defaultAvatar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  return (
    <div className={styles.profileEditor}>
      <h1 className={styles.title}>Edit profile</h1>

      <div className={styles.avatarContainer}>
        <img 
          src={defaultAvatar} 
          alt="Avatar" 
          className={styles.avatar}
        />

        <button className={styles.avatarButton}>Change photo</button>
      </div>

      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <input 
            className={styles.input}
            type="text" 
            id="firstName"
            // value={state.firstName}
            // onChange={handleInputChange}
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
            // value={state.lastName}
            // onChange={handleInputChange}
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
            // value={state.email}
            // onChange={handleInputChange}
            placeholder="Email address"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby="emailError"
          />
        </div>
        {error && <span id="emailError" className={styles.errorMessage}>{error}</span>}

        <div className={styles.inputWrapper}>
          <input 
            className={styles.input}
            type="phone" 
            id="phone"
            // value={state.password}
            // onChange={handleInputChange}
            placeholder="Phone number"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby="phoneError"
          />
        </div>
        {error && <span id="phoneError" className={styles.errorMessage}>{error}</span>}

        <div className={styles.inputWrapper}>
          <input 
            className={styles.input}
            type="text" 
            id="city"
            // value={state.password}
            // onChange={handleInputChange}
            placeholder="City"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby="cityError"
          />
        </div>
        {error && <span id="cityError" className={styles.errorMessage}>{error}</span>}

        <div className={styles.inputWrapper}>
          <input 
            className={styles.input}
            type="text" 
            id="country"
            // value={state.password}
            // onChange={handleInputChange}
            placeholder="Country"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby="countryError"
          />
        </div>
        {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
      </form>

      <div className={styles.buttonContainer}>
        <button className={styles.buttonCancel}>Cancel</button>
        <button className={styles.buttonSave}>Save</button>
      </div>
    </div>
  )
};