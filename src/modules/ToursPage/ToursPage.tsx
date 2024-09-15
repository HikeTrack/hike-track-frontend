import React from "react";
import { TourCard } from "../../components/TourCard/TourCard";
import { getArrowBackIcon, getCalendarIcon } from "../../utils/getIcons";
import styles from './ToursPage.module.scss';

export const ToursPage = () => {
  const arrowBackIcon = getArrowBackIcon();
  const calendarIcon = getCalendarIcon();
  
  return ( 
    <div className={styles.toursPage}>
      <div className={styles.containerTop}>
        <h1 className={styles.title}>Find the adventure of your dreams</h1>
      </div>

      <div className={styles.containerMain}>
        <button className={styles.backButton}>
          <img src={arrowBackIcon} alt="Arrow back icon"/>
          <p className={styles.buttonLabel}>Go back</p>
        </button>

        <div className={styles.instructionWrapper}>
          <p className={styles.instruction}>
            Filter programs by type, region, duration and start date. 
            Or choose those hosted by your favorite team leader. And if you can't 
            decide for yourself - write to our consultants and they will be happy 
            to help. But know one thing - no matter which program you choose, 
            we will do everything in our power so that you return from the 
            trip healthy and happy!
          </p>

          <p className={styles.availability}>
            Active routes: 
            <span className={styles.span}>___</span>, 
            on which start dates are planned: 
            <span className={styles.span}>___</span>
          </p>
        </div>

        <div className={styles.containerGrid}>
          <div className={styles.containerDropdowns}>
            <div className={styles.containerSmall}>
              <h4 className={styles.dropdownTitle}>Route Category</h4>

              <div className={styles.categoryWrapper}>
                <button className={styles.categoryButton}>Campaign</button>
                <button className={styles.categoryButton}>Climbing</button>
              </div>
            </div>

            <div className={styles.checkButtonContainer}>
              <button className={styles.checkButton}></button>
              <p>Knowledge of English is necessary</p>
            </div>
            
            <div className={styles.calendarButton}>
              <img src={calendarIcon} alt="Calendar icon" />
              <p className={styles.dropdownText}>Take date</p>
            </div>

            <div className={styles.containerSmall}>
              <h4 className={styles.dropdownTitle}>Types</h4>
              <div className={styles.dropdown}>
                {/* <ul>
                  <li className={styles.dropdownItem}>1</li>
                  <li className={styles.dropdownItem}>2</li>
                  <li className={styles.dropdownItem}>3</li>
                  <li className={styles.dropdownItem}>4</li>
                  <li className={styles.dropdownItem}>5</li>
                </ul> */}
              </div>

              <h4 className={styles.dropdownTitle}>Duration</h4>
              <div className={styles.dropdown}>
                {/* <ul>
                  <li className={styles.dropdownItem}>1</li>
                  <li className={styles.dropdownItem}>2</li>
                  <li className={styles.dropdownItem}>3</li>
                  <li className={styles.dropdownItem}>4</li>
                  <li className={styles.dropdownItem}>5</li>
                </ul> */}
              </div>

              <h4 className={styles.dropdownTitle}>Region</h4>
              <div className={styles.dropdown}></div>

              <h4 className={styles.dropdownTitle}>Country</h4>
              <div className={styles.dropdown}></div>

              <h4 className={styles.dropdownTitle}>Guide</h4>
              <div className={styles.dropdown}></div>
            </div>
            

            

            <h4 className={styles.dropdownTitle}>Determine the price range</h4>
            <div className={styles.dropdown}></div>


          </div>

          <div className={styles.grid}>
            <TourCard />
          </div>
        </div>
      </div>
    </div>
  )
}