import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getBookmarkIcon, getDefaultAvatarIcon, getPencilIcon } from "../../utils/getIcons";
import styles from './UserAccountPage.module.scss';

export const UserAccountPage = () => {
  const { user } = useAuth();
  
  const defaultAvatarIcon = getDefaultAvatarIcon();
  const pencilIcon = getPencilIcon();
  const bookmarkIcon = getBookmarkIcon();
  
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

      <Link className={styles.guideButton} to="/guide-application">Become a guide today!</Link>

      <button 
        className={styles.deleteButton}
      >
        Delete account
      </button>

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
    </div>
  )
}

export default UserAccountPage;