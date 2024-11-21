import React, { useEffect, useState } from "react"
import { PopularTour } from "../../types/PopularTour";
import { PopularToursCard } from '../PopularToursCard/PopularToursCard';
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";
import { getArrowLeftActiveIcon, getArrowLeftDisabledIcon, getArrowRightActiveIcon, getArrowRightDisabledIcon } from "../../utils/getIcons";
import { Country } from "../../types/Country";
import styles from './PopularTours.module.scss';

type Props = {
  tours: PopularTour[];
  countries: Country[];
}

export const PopularTours: React.FC<Props> = ({ tours, countries }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [smallCardIndex, setSmallCardIndex] = useState(0);
  // const [smallCardsCount, setSmallCardsCount] = useState(2);

  const [bigCardIndex, setBigCardIndex] = useState(0);
  const [bigCardsCount, setBigCardsCount] = useState(1);
  const [bigCardWidth, setBigCardWidth] = useState(384);
  const [bigCardGap, setBigCardGap] = useState(16);

  const manageSlider = () => {
    const newScreenWidth = window.innerWidth;
    setScreenWidth(newScreenWidth);

    if (newScreenWidth >= 375 && newScreenWidth < 1280) {
      setBigCardsCount(1);
      setBigCardWidth(343);
      setBigCardGap(16);
    } else if (newScreenWidth >= 1280 && newScreenWidth < 1920) {
      setBigCardsCount(3);
      setBigCardWidth(384);
      setBigCardGap(32);
    } else if (newScreenWidth >= 1920) {
      setBigCardsCount(3);
      setBigCardWidth(493);
      setBigCardGap(20);
    }
  }

  useEffect(() => {
    manageSlider();
    window.addEventListener('resize', manageSlider);

    return () => {
      window.removeEventListener('resize', manageSlider);
    };
  }, [screenWidth]);

  const handleRightClickForSmall = () => {
    setSmallCardIndex(prevIndex => {
      if (prevIndex === tours.length - 2) {
        return 0;
      }
      
      return Math.min(prevIndex + 1, tours.length - 2);
    });
  };

  const handleLeftClickForSmall = () => {
    setSmallCardIndex(currIndex => {
      if (currIndex === 0) {
        return tours.length - 2;
      }
      return Math.max(currIndex - 1, 0);
    });
  };

  const handleRightClickForBig = () => {
    setBigCardIndex(prevIndex => {
      if (prevIndex === tours.length - bigCardsCount) {
        return 0;
      }
      
      return Math.min(prevIndex + 1, tours.length - bigCardsCount);
    });
  };

  const handleLeftClickForBig = () => {
    setBigCardIndex(currIndex => {
      if (currIndex === 0) {
        return tours.length - bigCardsCount;
      }

      return Math.max(currIndex - 1, 0);
    });
  };

  const isLeftSmallDisabled = smallCardIndex === 0;
  const isRightSmallDisabled = smallCardIndex === tours.length - 2;

  const isLeftBigDisabled = bigCardIndex === 0;
  const isRightBigDisabled = bigCardIndex === tours.length - bigCardsCount;

  const handlersSmall = useSwipeable({
    onSwipedLeft: () => handleRightClickForSmall(),
    onSwipedRight: () => handleLeftClickForSmall(),
  });

  const handlersBig = useSwipeable({
    onSwipedLeft: () => handleRightClickForBig(),
    onSwipedRight: () => handleLeftClickForBig(),
  });

  const arrowLeftActiveIcon = getArrowLeftActiveIcon();
  const arrowLeftDisabledIcon = getArrowLeftDisabledIcon();
  const arrowRightActiveIcon = getArrowRightActiveIcon();
  const arrowRightDisabledIcon = getArrowRightDisabledIcon();
  
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Popular Tours</h2>

        <a className={styles.link} href="#">Leave a request</a>

        <div className={styles.smallCardSlider} {...handlersSmall}>
          <div className={styles.sliderContainerSmall}>
            {countries.map(countryCard => (
              <div 
                className={styles.smallCardMobile} 
                key={countryCard.id}
                style={{ transform: `translateX(-${smallCardIndex * 177}px` }}
              >
                <Link to={"/toursByCountry/:countryId"}>
                  <img 
                    src={countryCard.photo}
                    alt="Nature scenery" 
                    className={styles.cardImageSmall}
                  />
                  
                  <p className={styles.location}>{countryCard.name}</p>
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.buttonsSmallWrapper}>
            <button
              className={styles.buttonSmall}
              onClick={handleLeftClickForSmall}
              disabled={isLeftSmallDisabled}
            >
              {isLeftSmallDisabled ? (
                <img 
                  src={arrowLeftDisabledIcon} 
                  alt="arrow-left-disabled"
                  className={styles.buttonIcon}
                />
              ) : (
                <img 
                  src={arrowLeftActiveIcon} 
                  alt="arrow-left-active" 
                  className={styles.buttonIcon}
                />
              )}
            </button>

            <button
              className={styles.buttonSmall}
              onClick={handleRightClickForSmall}
              disabled={isRightSmallDisabled}
            >
              {isRightSmallDisabled ? (
                <img 
                  src={arrowRightDisabledIcon} 
                  alt="arrowrightdisabled" 
                  className={styles.buttonIcon}
                />
              ) : (
                <img 
                  src={arrowRightActiveIcon} 
                  alt="arrowactiveactive" 
                  className={styles.buttonIcon}
                />
              )}
            </button>
          </div>
        </div>
        
        <div className={styles.cardSlider} {...handlersBig}>
          <div className={styles.sliderContainer}>
            {tours.map(tourCard => (
              <div
                key={tourCard.id}
                className={styles.sliderWrapper}
                style={{ transform: `translateX(-${bigCardIndex * (bigCardWidth + bigCardGap)}px` }}
              >
                <PopularToursCard tour={tourCard}/>
              </div>
            ))}
          </div>

          <div className={styles.buttonsWrapper}>
            <button
              className={styles.button}
              onClick={handleLeftClickForBig}
              disabled={isLeftBigDisabled}
            >
              {isLeftBigDisabled ? (
                <img 
                  src={arrowLeftDisabledIcon} 
                  alt="arrow-left-disabled" 
                  className={styles.buttonIcon}
                />
              ) : (
                <img 
                  src={arrowLeftActiveIcon} 
                  alt="arrow-left-active" 
                  className={styles.buttonIcon}
                />
              )}
            </button>

            <button
              className={styles.button}
              onClick={handleRightClickForBig}
              disabled={isRightBigDisabled}
            >
              {isRightBigDisabled ? (
                <img 
                  src={arrowRightDisabledIcon}  
                  alt="arrowrightdisabled" 
                  className={styles.buttonIcon}
                />
              ) : (
                <img 
                  src={arrowRightActiveIcon} 
                  alt="arrowactiveactive" 
                  className={styles.buttonIcon}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}