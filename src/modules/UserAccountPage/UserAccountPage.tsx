import React from "react";
import { useLocation } from "react-router-dom";
import { getBookmarkIcon, getDefaultAvatarIcon, getPencilIcon } from "../../utils/getIcons";
import styles from './UserAccountPage.module.scss';

export const UserAccountPage = () => {
  const location = useLocation();

  console.log('Location state:', location.state);

  const { firstName, lastName } = location.state || {};
  
  const defaultAvatarIcon = getDefaultAvatarIcon();
  const pencilIcon = getPencilIcon();
  const bookmarkIcon = getBookmarkIcon();
  
  return (
    <div className={styles.page}>
      <div className={styles.userCard}>
        <div className={styles.topContainer}>
          <img src={defaultAvatarIcon} alt="Avatar" />

          <img src={pencilIcon} alt="Pencil" />
        </div>

        <h4 className={styles.title}>{`${firstName} ${lastName}`}</h4>

        <p className={styles.text}>City, Country</p>

        <p>Member since MONTH YEAR</p>

        <div className={styles.bottomContainer}>
          <div className={styles.bookmarkWrapper}>
            <img src={bookmarkIcon} alt="Bookmark" />
            <p className={styles.text}>Saved tours</p>
          </div>

          <p className={styles.text}>(0)</p>
        </div>
      </div>

      <div className={styles.userContent}>

      </div>
    </div>
  )
}