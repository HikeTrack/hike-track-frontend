import React, { useEffect, useState } from "react"
import { BannerSlider } from "../../components/BannerSlider/BannerSlider";
import { Loader } from "../../components/Loader/Loader";
import { OurMission } from "../../components/OurMission/OurMission";
import { PopularTours } from "../../components/PopularTours/PopularTours";
import { TravelStories } from "../../components/TravelStories/TravelStories";
import { PopularTour } from "../../types/PopularTour";
import { getPopularTours } from "../../utils/fetchData";
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [popularTours, setPopularTours] = useState<PopularTour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularTours = async () => {
      try {
        const popularData = await getPopularTours();

        setPopularTours(popularData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularTours();
  }, []);
  
  return (
    <div className={styles.homePage}>
      <BannerSlider />
      
      <OurMission />

      {isLoading ? (
        <Loader />
      ) : (
        <PopularTours tours={popularTours}/>
      )}
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Travel & stories</h2>

        <TravelStories />
      </div>
    </div>
  )
}