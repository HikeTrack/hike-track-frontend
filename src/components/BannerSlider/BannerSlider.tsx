import React, { useEffect, useState } from 'react';
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

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className={styles.bannerSlider}>
      <div className={styles.bannerTitleWrapper}>
        <h1 className={styles.bannerTitle}>Find Your Path: The Best Tours for True Explorers</h1>
        <a className={styles.bannerButton} href="#">Book now</a>
      </div>
      
      {bannerImages.map((image, index) => (
        <div 
          key={index}
          className={`${styles.slide} ${currentSlide === index ? styles.activeSlide : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}

      <div className={styles.sliderDots}>
        {bannerImages.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};