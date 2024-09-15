import React from 'react';
import { getOurMissionImg } from '../../utils/getImages';
import styles from './OurMission.module.scss';

export const OurMission = () => {
  const ourMissionImg = getOurMissionImg();
  
  return (
    <div className={styles.ourMission}>
      <div className={styles.containerTop}>
        <h2 className={styles.topTitle}>
          <span className={styles.span}>Our mission</span>
          <br />
          Connecting People with Nature
          <br />
          Through Unforgettable Adventures
        </h2>
      </div>

      <div className={styles.containerBottom}>
        <div className={styles.textWrapper}>
          <h3 className={styles.bottomTitle}>Project Description</h3>

          <p className={styles.text}>
            Our project is a platform for everyone seeking unforgettable 
            adventures in nature. We bring together the best hiking trails, 
            tours, and services in one place, making it easy for you to plan your 
            next hike. Whether you are a beginner, an experienced hiker, or a true 
            explorer, we offer routes for all skill levels. With us, every 
            journey becomes an exciting story you'll remember for a lifetime.
          </p>

          <h3 className={styles.bottomTitle}>Project value</h3>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              Accessibility for All: We bring nature closer by offering routes 
              for all fitness levels.
            </li>

            <li className={styles.listItem}>
              Reliability and Safety: We partner with trusted guides and operators to ensure 
              your comfort and safety at every step.
            </li>

            <li className={styles.listItem}>
              Inspiration and Knowledge: Our platform is not just about tours but also 
              about a community that shares experiences, tips, and inspiration for 
              new discoveries.
            </li>

            <li className={styles.listItem}>
              Environmental Responsibility: We support responsible tourism and 
              work to preserve natural beauty for future generations.
            </li>
          </ul>
        </div>

        <img 
          src={ourMissionImg} 
          alt="Hiking in the mountains"
          className={styles.image}
        />
      </div>
      
    </div>
  )
}
