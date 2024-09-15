import React from "react"
import { BannerSlider } from "../../components/BannerSlider/BannerSlider";
import { OurMission } from "../../components/OurMission/OurMission";
import { PopularTours } from "../../components/PopularTours/PopularTours";
import { TravelStories } from "../../components/TravelStories/TravelStories";
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <BannerSlider />
      
      <OurMission />

      <PopularTours />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Travel & stories</h2>

        <TravelStories />

        <a className={styles.storiesButton} href="#">All stories</a>
      </div>
    </div>
  )
}