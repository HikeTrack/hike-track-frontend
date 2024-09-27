import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { getArrowLeftActiveGreenIcon, getArrowLeftDisabledGreenIcon, getArrowRightActiveGreenIcon } from '../../utils/getIcons';
import { storyCards } from '../../utils/storyCards';
import styles from './TravelStories.module.scss';

export const TravelStories = () => {
  const [cardIndex, setCardIndex] = useState(0);

  const handleRightClick = () => {
    setCardIndex(prevIndex => {
      if (prevIndex === storyCards.length - 1) {
        return 0;
      }
      
      return Math.min(prevIndex + 1, storyCards.length - 1);
    });
  };

  const handleLeftClick = () => {
    setCardIndex(currIndex => {
      if (currIndex === 0) {
        return storyCards.length - 1;
      }
      return Math.max(currIndex - 1, 0);
    });
  };

  const isLeftDisabled = cardIndex === 0;
  const isRightDisabled = cardIndex === storyCards.length - 1;

  const handlers = useSwipeable({
    onSwipedLeft: () => handleRightClick(),
    onSwipedRight: () => handleLeftClick(),
  });
  
  const arrowLeftActiveGreenIcon = getArrowLeftActiveGreenIcon();
  const arrowLeftDisabledGreenIcon = getArrowLeftDisabledGreenIcon();
  const arrowRightActiveGreenIcon = getArrowRightActiveGreenIcon();
  const arrowRightDisabledGreenIcon = getArrowRightActiveGreenIcon();
  
  return (
    <div className={styles.storyGrid}>
      <div className={styles.cardSliderMobile} {...handlers}>
        <div className={styles.sliderContainer}>
          {storyCards.map(card => (
            <div 
              className={styles.sliderWrapper}
              key={card.id}
              style={{ transform: `translateX(-${cardIndex * 358}px` }}
            >
              <div 
                className={styles.storyCardMobile} 
              >
                <div className={styles.imgWrapper}>
                  <img 
                    src={card.image}
                    alt="Nature"
                    className={styles.storyImg}
                  />
                </div>
                
                <div className={styles.storyContent}>
                  <p className={styles.storyDate}>{card.date}</p>

                  <p className={styles.storyDescription}>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonsWrapper}>
          <button
            className={styles.button}
            onClick={handleLeftClick}
            disabled={isLeftDisabled}
          >
            {isLeftDisabled ? (
              <img 
                src={arrowLeftDisabledGreenIcon} 
                alt="arrow-left-disabled"
                className={styles.buttonIcon}
              />
            ) : (
              <img 
                src={arrowLeftActiveGreenIcon} 
                alt="arrow-left-active" 
                className={styles.buttonIcon}
              />
            )}
          </button>

          <button
            className={styles.button}
            onClick={handleRightClick}
            disabled={isRightDisabled}
          >
            {isRightDisabled ? (
              <img 
                src={arrowRightDisabledGreenIcon} 
                alt="arrowrightdisabled" 
                className={styles.buttonIcon}
              />
            ) : (
              <img 
                src={arrowRightActiveGreenIcon} 
                alt="arrowactiveactive" 
                className={styles.buttonIcon}
              />
            )}
          </button>
        </div>
      </div>
      
      {storyCards.map(card => (
        <div className={styles.storyCard}>
          <div className={styles.imgWrapper}>
            <img 
              src={card.image}
              alt="Nature"
              className={styles.storyImg}
            />
          </div>

          <div className={styles.storyContent}>

          <p className={styles.storyDate}>{card.date}</p>

          <p className={styles.storyTitle}>{card.title}</p>

          <p className={styles.storyDescription}>{card.description}</p>
          </div>
        </div>
      ))}

      {/* <a className={styles.storiesButton} href="#">All stories</a> */}
    </div>
  )
}