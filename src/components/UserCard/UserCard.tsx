import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAboutMeIcon, getBirthdayIcon, getEmailIcon, getGoNextGreyIcon, getGoNextWhiteIcon, getLocationIcon, getMyToursIcon, getPencilIcon, getPhoneIcon } from "../../utils/getIcons";
import styles from './UserCard.module.scss';

export const UserCard: React.FC = () => {
  const { user } = useAuth();
  const pencilIcon = getPencilIcon();
  const myToursIcon = getMyToursIcon();
  const phoneIcon = getPhoneIcon();
  const emailIcon = getEmailIcon();
  const locationIcon = getLocationIcon();
  const birthdayIcon = getBirthdayIcon();
  const aboutMeIcon = getAboutMeIcon();
  const goNextGrey = getGoNextGreyIcon();
  const goNextWhite = getGoNextWhiteIcon();

  const preparedDateOfBirth = user?.userProfileRespondDto.dateOfBirth
    ? user.userProfileRespondDto.dateOfBirth
        .replace(/\-/g, '.')
        .split('.')
        .reverse()
        .join('.')
    : '';

  const [aboutMeVisible, setAboutMeVisible] = useState(false);

  const toggleVisibility = () => {
    setAboutMeVisible(prev => !prev);
  }
  
  return (
    <div className={styles.userCard}>
      <div className={styles.topContainer}>
        <div 
          className={styles.avatar}
          style={{ backgroundImage: `url(${user?.userProfileRespondDto.photo})` }}
        ></div>

        <div className={styles.nameWrapper}>
          <p className={styles.textName}>{`${user?.firstName} ${user?.lastName}`}</p>
          {user?.role.includes('ROLE_GUIDE') && (
            <p className={styles.textGrey}>Guide profile</p>
          )}
        </div>

        <Link 
          className={styles.editButton}
          to="/edit-profile"
        >
          <img src={pencilIcon} alt="Pencil" />
        </Link>
      </div>

      <div className={styles.userDataContainer}>
        {user?.userProfileRespondDto.phoneNumber && (
          <div className={styles.userDataWrapper}>
            <img src={phoneIcon} alt="phone" />
            <p className={styles.textGrey}>{`+${user?.userProfileRespondDto.phoneNumber}`}</p>
          </div>
        )}

        <div className={styles.userDataWrapper}>
          <img src={emailIcon} alt="email" />
          <p className={styles.textGrey}>{user?.email}</p>
        </div>

        {user?.userProfileRespondDto.city && user?.userProfileRespondDto.country && (
          <div className={styles.userDataWrapper}>
            <img src={locationIcon} alt="location" />
            <p className={styles.textGrey}>{`${user?.userProfileRespondDto.city}, ${user?.userProfileRespondDto.country}`}</p>
          </div>
        )}

        {user?.userProfileRespondDto.dateOfBirth && (
          <div className={styles.userDataWrapper}>
            <img src={birthdayIcon} alt="birthday" />
            <p className={styles.textGrey}>{preparedDateOfBirth}</p>
          </div>
        )}

        {user?.userProfileRespondDto.aboutMe && (
          <>
          <button className={styles.userDataWrapperAbout} onClick={toggleVisibility}>
            <div className={styles.textWrapper}>
              <img src={aboutMeIcon} alt="about" />
              <p className={styles.textGrey}>About me</p>
            </div>
            
            <img src={goNextGrey} alt="arrow" />
          </button>

          {aboutMeVisible && <p className={styles.text}>{user?.userProfileRespondDto.aboutMe}</p>}
          </>
        )}

        {user?.role.includes('ROLE_GUIDE') && (
          <Link to="/my-tours" className={styles.userDataWrapperBlack}>
            <div className={styles.textWrapper}>
              <img src={myToursIcon} alt="tours" />
              <p className={styles.textTours}>My tours</p>
            </div>
            
            <img src={goNextWhite} alt="arrow" />
          </Link>
        )}
      </div>
    </div>
  )
}