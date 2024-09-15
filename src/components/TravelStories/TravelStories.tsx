import React from 'react';
import { getStoriesImg1, getStoriesImg2, getStoriesImg3, getStoriesImg4 } from '../../utils/getImages';
import styles from './TravelStories.module.scss';

export const TravelStories = () => {
  const storiesImg1 = getStoriesImg1();
  const storiesImg2 = getStoriesImg2();
  const storiesImg3 = getStoriesImg3();
  const storiesImg4 = getStoriesImg4();
  
  return (
    <div className={styles.storyGrid}>
      <div className={styles.storyCard}>
        <img 
          src={storiesImg1}
          alt="Story picture"
          className={styles.storyImg}
        />

        <div className={styles.storyContent}>
          <p className={styles.storyDate}>August 03, 2018</p>

          <p className={styles.storyTitle}>Sunrise at the Summit of the Carpathians</p>

          <p className={styles.storyDescription}>
            It was an incredible moment when we reached the summit and saw the 
            sun slowly setting below the horizon, bathing everything around 
            us in golden light. The fatigue from the long ascent instantly vanished, 
            giving way to a feeling of freedom and awe at the beauty of nature. 
            This sunrise will forever be remembered as a symbol of reaching new heights.
          </p>
        </div>
      </div>

      <div className={styles.storyCard}>
        <img 
          src={storiesImg2}
          alt="Story picture"
          className={styles.storyImg}
        />

        <div className={styles.storyContent}>
          <p className={styles.storyDate}>October 12, 2020</p>

          <p className={styles.storyTitle}>Forest Trail in the Morning Fog</p>

          <p className={styles.storyDescription}>
            This journey felt like a real fairy tale—thick fog enveloped the trees as we moved 
            along a narrow path, feeling like characters in a movie. Every step 
            brought new discoveries, and we savored every moment. In times like these, 
            you realize that nature is always ready to surprise and inspire.
          </p>
        </div>
      </div>

      <div className={styles.storyCard}>
        <img 
          src={storiesImg3}
          alt="Story picture"
          className={styles.storyImg}
        />

        <div className={styles.storyContent}>
          <p className={styles.storyDate}>June 22, 2019</p>

          <p className={styles.storyTitle}>Friendly Meeting at the Summit of Hoverla</p>

          <p className={styles.storyDescription}>
            One of the warmest moments of our hikes was meeting other travelers at the 
            summit. Sharing impressions and smiles, we realized that the love for mountains 
            unites people from all walks of life. This journey reminded us of the 
            importance of supporting one another and sharing the joy of achievements.
          </p>
        </div>
      </div>

      <div className={styles.storyCard}>
        <img 
          src={storiesImg4}
          alt="Story picture"
          className={styles.storyImg}
        />

        <div className={styles.storyContent}>
          <p className={styles.storyDate}>July 10, 2021</p>

          <p className={styles.storyTitle}>Hike Along Lake Synevyr</p>

          <p className={styles.storyDescription}>
            Our route took us along the picturesque Lake Synevyr, and we couldn’t 
            take our eyes off its crystal-clear water. The silence, fresh air, 
            and the calm surface of the lake created a sense of harmony and tranquility. 
            This journey helped us find inner balance and truly enjoy the present moment.
          </p>
        </div>
      </div>
    </div>
  )
}