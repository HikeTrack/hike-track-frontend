import React, { useEffect, useState } from "react"
import { BannerSlider } from "../../components/BannerSlider/BannerSlider";
import { Loader } from "../../components/Loader/Loader";
import { OurMission } from "../../components/OurMission/OurMission";
import { PopularTours } from "../../components/PopularTours/PopularTours";
import { TravelStories } from "../../components/TravelStories/TravelStories";
import { Country } from "../../types/Country";
import { TourCard } from "../../types/TourCard";
import { getPopularTours, getRandom10Countries } from "../../utils/fetchData";
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [randomCountries, setRandomCountries] = useState<Country[]>([]);
  const [popularTours, setPopularTours] = useState<TourCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError('');
    
    const fetchData = async () => {
      try {
        const [countryData, popularData] = await Promise.all([
          getRandom10Countries(),
          getPopularTours(),
        ]); 

        setRandomCountries(countryData);
        setPopularTours(popularData);
      } catch (error) {
        setError('Error loading data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className={styles.homePage}>
      <BannerSlider />
      
      <OurMission />

      {isLoading ? (
        <Loader />
      ) : (
        <PopularTours 
          tours={popularTours}
          countries={randomCountries}
        />
      )}
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Travel & stories</h2>

        <TravelStories />
      </div>
    </div>
  )
}