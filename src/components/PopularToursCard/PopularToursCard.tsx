import React, { useEffect, useState } from "react";
import { PopularTour } from "../../types/PopularTour";
import { 
  getDifficultyGreenIcon, 
  getDifficultyRedIcon, 
  getDifficultyYellowIcon,
  getDateIcon, 
  getPriceIcon,
  getGeoTagGreyIcon, 
  getLengthIcon  
} from "../../utils/getIcons";
import { Countries } from "../../enums/Countries";
import styles from './PopularToursCard.module.scss';
import { formatDate, formatDistance } from "../../utils/formatFunctions";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../utils/fetchData";

type Props = {
  tour: PopularTour;
}

const difficultyIcons: { [key: string]: string } = {
  "Easy": getDifficultyGreenIcon(),
  "Medium": getDifficultyYellowIcon(),
  "Hard": getDifficultyRedIcon(),
};

export const PopularToursCard: React.FC<Props> = ({ tour }) => {
  const navigate = useNavigate();
  const geoTagGreyIcon = getGeoTagGreyIcon();
  const lengthIcon = getLengthIcon();
  const dateIcon = getDateIcon();
  const priceIcon = getPriceIcon();
  const [guidePhoto, setGuidePhoto] = useState<string>('');
  
  useEffect(() => {
    const fetchGuidePhoto = async () => {
      try {
        const guide = await getUserProfile(tour.guideId);
  
        setGuidePhoto(guide.photo);
      } catch (error) {
        console.error("Error fetching guide photo:", error);
      }
    };
  
    if (tour.guideId) {
      fetchGuidePhoto();
    }
  }, [tour.guideId]);

  const handleCardClick = () => {
    navigate(`/toursByCountry/${tour.countryId}/${tour.id}`);
  }

  return (
    <div 
      className={styles.bigCard}
      onClick={handleCardClick}
    >
      <div 
        className={styles.cardTop}
        style={{ backgroundImage: `url(${tour.mainPhoto})` }}
      >
        <div 
          className={styles.guidePhoto}
          // style={{ backgroundImage: `url(${tour.})` }}
        ></div>
      </div>

      <div className={styles.cardBottom}>
        <div className={styles.wrapperTop}>
          <div className={styles.geo}>
            <img src={geoTagGreyIcon} alt="Geotag" />
            <p className={styles.region}>{Countries[tour.countryId]}</p>
          </div>

          <div className={styles.geo}>
            <p className={styles.level}>{tour.difficulty}</p>
            <img 
              src={difficultyIcons[tour.difficulty] || getDifficultyGreenIcon()} 
              alt="Difficulty scale"
            />
          </div>
        </div>

        <h4 className={styles.cardTitle}>{tour.name}</h4>

        <div className={styles.wrapperBottom}>
          <div className={styles.detailsContainer}>
            <p className={styles.details}>Date</p>

            <img 
              src={dateIcon} 
              alt="Date icon" 
              className={styles.detailsIcon}
            />

            <p className={styles.detailsCount}>{formatDate(tour.date)}</p>
          </div>

          <div className={styles.detailsContainer}>
            <p className={styles.details}>Price</p>

            <img 
              src={priceIcon} 
              alt="Price icon" 
              className={styles.detailsIcon}
            />

            <p className={styles.detailsCount}>{`${tour.price}$`}</p>
          </div>

          <div className={styles.detailsContainer}>
            <p className={styles.details}>Length</p>

            <img 
              src={lengthIcon} 
              alt="Length icon"
              className={styles.detailsIcon}
            />

            <p className={styles.detailsCount}>{formatDistance(tour.length)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}