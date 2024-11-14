import { format, formatDate } from "date-fns";
import { formatDistance } from "../../utils/formatFunctions";
import React from "react";
import { Link } from "react-router-dom";
import { Tour } from "../../types/Tour";
import { Countries } from "../../enums/Countries";
import { getDifficultyGreenIcon, getPriceIcon } from "../../utils/getIcons";
import styles from './TourCardGuide.module.scss';

type Props = {
  tour: Tour,
  onRemove: () => void;
}

export const TourCardGuide: React.FC<Props> = ({ tour, onRemove }) => {
  const preparedDate = format(new Date(tour.date), 'dd');
  const preparedMonth = format(new Date(tour.date), 'MMM');
  const preparedDistance = formatDistance(tour.length);

  const priceIcon = getPriceIcon();
  const difficultyIcon = getDifficultyGreenIcon();
  
  return (
    <div className={styles.tourCard}>
      <img
        src={tour.mainPhoto}
      />

      <div className={styles.tourDate}>
        <p className={styles.date}>{preparedDate}</p>
        <p className={styles.date}>{preparedMonth}</p>
      </div>

      <div className={styles.tourInfo}>
        <p className={styles.tourLocation}>{`${Countries[tour.countryId]} | ${preparedDistance}`}</p>
        <p className={styles.tourTitle}>{tour.name}</p>
      </div>

      <div className={styles.tourDetails}>
        <div className={styles.tourDetailsWrapper}>
          <img src={difficultyIcon} alt="Difficulty" />

          <div className={styles.tourTextWrapper}>
            <p className={styles.tourText}>Difficulty</p>
            <p className={styles.tourHighlighted}>{tour.difficulty}</p>
          </div>
        </div>

        <div className={styles.tourDetailsWrapper}>
          <img src={priceIcon} alt="Price" />
          
          <div className={styles.tourTextWrapper}>
            <p className={styles.tourText}>Price</p>
            <p className={styles.tourHighlighted}>{`${tour.price}$`}</p>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.editButton}>Edit tour</button>

          <button className={styles.removeButton} onClick={onRemove}>Remove tour</button>
        </div>
      </div>
    </div>
  )
}