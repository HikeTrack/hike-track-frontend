import React from "react"
import { getDifficultyGreenIcon, getDifficultyRedIcon, getDifficultyYellowIcon, getDistanceIcon, getDurationIcon, getGeoTagGreenIcon, getGeoTagGreyIcon, getHeartWhiteIcon } from "../../utils/getIcons";
import styles from './PopularTours.module.scss';

export const PopularTours = () => {
  const heartWhiteIcon = getHeartWhiteIcon();
  const difficultyGreenIcon = getDifficultyGreenIcon();
  // const difficultyYellowIcon = getDifficultyYellowIcon();
  // const difficultyRedIcon = getDifficultyRedIcon();
  const geoTagGreyIcon = getGeoTagGreyIcon();
  const geoTagGreenIcon = getGeoTagGreenIcon();
  const distanceIcon = getDistanceIcon();
  const durationIcon = getDurationIcon();
  
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Popular Tours</h2>

        <a className={styles.link} href="#">Leave a request</a>

        <div className={styles.cardContainer}>
      
          {/* API */}
          <div className={styles.smallCard}>
            <div className={styles.favIcon}>
              <img src={heartWhiteIcon} alt="Heart icon" />
            </div>

            <p className={styles.location}>Carpathians</p>
          </div>
        </div>

        <div className={styles.cardSlider}>

          {/* API */}
          <div className={styles.bigCard}>
            <div className={styles.cardTop}>
              <div className={styles.guidePhoto}></div>
            </div>

            <div className={styles.cardBottom}>
              <div className={styles.wrapperTop}>
                <div className={styles.geo}>
                  <img src={geoTagGreyIcon} alt="Geotag" />
                  <p className={styles.region}>Europe</p>
                </div>

                <div className={styles.geo}>
                  <p className={styles.level}>Easy</p>
                  <img src={difficultyGreenIcon} alt="Difficulty scale"/>
                </div>
              </div>

              <h4 className={styles.cardTitle}>Carpathian mountains</h4>

              <div className={styles.wrapperBottom}>
                <div className={styles.detailsContainer}>
                  <p className={styles.details}>Locations</p>

                  <img 
                    src={geoTagGreenIcon} 
                    alt="Geotag icon" 
                    className={styles.detailsIcon}
                  />

                  <p className={styles.detailsCount}>5</p>
                </div>

                <div className={styles.detailsContainer}>
                  <p className={styles.details}>Kilometers</p>

                  <img 
                    src={distanceIcon} 
                    alt="Distance icon" 
                    className={styles.detailsIcon}
                  />

                  <p className={styles.detailsCount}>6</p>
                </div>

                <div className={styles.detailsContainer}>
                  <p className={styles.details}>On the way</p>

                  <img 
                    src={durationIcon} 
                    alt="Duration icon"
                    className={styles.detailsIcon}
                  />

                  <p className={styles.detailsCount}>8-12 Hour</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sliderDots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
      </div>
    </div>
  )
}