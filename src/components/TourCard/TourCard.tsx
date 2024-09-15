import React from "react";
import { Link } from "react-router-dom";
import styles from './TourCard.module.scss';

export const TourCard = () => {
  return (
    <div className={styles.tourCard}>
      <Link to={"/toursByCountry/Turkey/Ararat"}>
        <div className={styles.tourDate}>
          <p className={styles.date}>16</p>
          <p className={styles.date}>Sep</p>
        </div>

        <div className={styles.tourInfo}>
          <p className={styles.tourLocation}>Turkey | 5137 m.</p>
          <p className={styles.tourTitle}>Climbing Ararat</p>
        </div>
      </Link>
    </div>
  )
}