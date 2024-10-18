import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ContinentsForGuide } from "../../enums/ContinentsForGuide";
import { getBookmarkIcon, getDefaultAvatarIcon, getPencilIcon } from "../../utils/getIcons";
import styles from './UserAccountPage.module.scss';

export const UserAccountPage = () => {
  const { user } = useAuth();
  const defaultAvatarIcon = getDefaultAvatarIcon();
  const pencilIcon = getPencilIcon();
  const bookmarkIcon = getBookmarkIcon();

  ////////////////////
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<ContinentsForGuide | null>(null);

  const continentsOptions = Object.values(ContinentsForGuide).map(continent => ({
    value: continent,
    label: continent,
  }));

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelectContinent = (value: string | null) => {
    if (typeof value === 'string') {
      setSelectedContinent(value as ContinentsForGuide);
    }

    setIsOpen(false);
  };
  ////////////////////
  
  return (
    <div className={styles.page}>
      <div className={styles.profileSectionsMobile}>
        <div className={styles.section}>Tours</div>
        <div className={styles.section}>Photos</div>
        <div className={styles.section}>Reviews</div>
        <div className={styles.section}>Calendar</div>
      </div>

      <div className={styles.userCard}>
        <div className={styles.topContainer}>
          <img src={defaultAvatarIcon} alt="Avatar" />

          <Link 
            className={styles.editButton}
            to="/edit-profile"
          >
            <img src={pencilIcon} alt="Pencil" />
          </Link>
        </div>

        <h4 className={styles.title}>{`${user?.firstName} ${user?.lastName}`}</h4>

        <p className={styles.text}>
          {`${user?.userProfileRespondDto.city}, ${user?.userProfileRespondDto.country}`}
        </p>

        <p className={styles.profileSmallText}>{`Member since ${user?.userProfileRespondDto.registrationDate}`}</p>

        <div className={styles.bottomContainer}>
          <div className={styles.bookmarkWrapper}>
            <img src={bookmarkIcon} alt="Bookmark" />
            <p className={styles.text}>Saved tours</p>
          </div>

          <p className={styles.text}>(0)</p>
        </div>
      </div>

      <div className={styles.buttonContainerMobile}>
        <Link className={styles.guideButton} to="/guide-application">Become a guide today!</Link>

        <button 
          className={styles.deleteButton}
        >
          Delete account
        </button>
      </div>
      
      <div className={styles.sectionContent}>
        <div className={styles.profileSections}>
          <div className={styles.section}>Tours</div>
          <div className={styles.section}>Photos</div>
          <div className={styles.section}>Reviews</div>
          <div className={styles.section}>Calendar</div>
        </div>
        
        <div className={styles.noContent}>
          <h4 className={styles.title}>No upcoming tours yet</h4>

          <p className={styles.contentSmallText}>
            Inspire friends with your trail reviews, 
            adventure lists, and Navigator activities.
          </p>

          <Link to="/continents" className={styles.exploreButton}>Explore trails</Link>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Link className={styles.guideButton} to="/guide-application">Become a guide today!</Link>

        <button 
          className={styles.deleteButton}
        >
          Delete account
        </button>
      </div>

      <div className={styles.guideContainer}>
        <form className={styles.form}>
          <label htmlFor="email" className={styles.inputTitle}>Become a guide:</label>
          
          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="email" 
              id="email"
              // value={state.email}
              // onChange={handleInputChange}
              placeholder="Email address"
              // aria-invalid={error ? 'true' : 'false'}
              aria-describedby="emailError"
            />
          </div>

          <button className={styles.submitButton}>Submit</button>
        </form>

        <form className={styles.form}>
        <label htmlFor="country" className={styles.inputTitle}>Add a coutry:</label>
          
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton} onClick={handleToggle}>
              {continentsOptions.find(continent => continent.value === selectedContinent)?.label || 'Choose continent'}
            </button>
            {isOpen && (
              <ul className={styles.dropdownList}>
                {continentsOptions.map(option => (
                  <li 
                    className={styles.dropdownItem}
                    key={option.value}
                    onClick={() => handleSelectContinent(option.value)}
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
              id="country"
              // value={state.email}
              // onChange={handleInputChange}
              placeholder="Country"
              // aria-invalid={error ? 'true' : 'false'}
              aria-describedby="emailError"
            />
          </div>

          <button className={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UserAccountPage;