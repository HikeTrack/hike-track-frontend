import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBannerImage1, getBannerImage2, getBannerImage3 } from '../../utils/getBannerImages';
import styles from './BannerSlider.module.scss';

export const BannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    getBannerImage1(),
    getBannerImage2(),
    getBannerImage3()
  ];

  const totalSlides = bannerImages.length;

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);

    return () => clearInterval(slideInterval);
  }, [totalSlides]);
  
  return (
    <div className={styles.bannerSlider}>
      <div className={styles.bannerTitleWrapper}>
        <h1 className={styles.bannerTitle}>Find Your Path: The Best Tours for True Explorers</h1>
        <Link className={styles.bannerButton} to={'/continents'}>Book now</Link>
      </div>
      
      {bannerImages.map((image, index) => (
        <div 
          key={index}
          className={`${styles.slide} ${currentSlide === index ? styles.activeSlide : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    </div>
  );
};