import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { TravelStories } from "../../components/TravelStories/TravelStories";
import { getArrowLeftActiveGreenIcon, getArrowLeftActiveIcon, getArrowLeftDisabledGreenIcon, getArrowLeftDisabledIcon, getArrowRightActiveGreenIcon, getArrowRightActiveIcon, getArrowRightDisabledIcon, getNoTraceIcon, getOnePercentIcon, getTreeIcon } from "../../utils/getIcons";
import { teamMembers } from "../../utils/teamMembers";
import styles from './AboutUsPage.module.scss';

export const AboutUsPage = () => {
  const [cardIndex, setCardIndex] = useState(0);

  const handleRightClick = () => {
    setCardIndex(prevIndex => {
      if (prevIndex === teamMembers.length - 1) {
        return 0;
      }
      
      return Math.min(prevIndex + 1, teamMembers.length - 1);
    });
  };

  const handleLeftClick = () => {
    setCardIndex(currIndex => {
      if (currIndex === 0) {
        return teamMembers.length - 1;
      }
      return Math.max(currIndex - 1, 0);
    });
  };

  const isLeftDisabled = cardIndex === 0;
  const isRightDisabled = cardIndex === teamMembers.length - 1;

  const handlers = useSwipeable({
    onSwipedLeft: () => handleRightClick(),
    onSwipedRight: () => handleLeftClick(),
  });
  
  const arrowLeftActiveGreenIcon = getArrowLeftActiveGreenIcon();
  const arrowLeftDisabledGreenIcon = getArrowLeftDisabledGreenIcon();
  const arrowRightActiveGreenIcon = getArrowRightActiveGreenIcon();
  const arrowRightDisabledGreenIcon = getArrowRightActiveGreenIcon();
  
  const onePercentIcon = getOnePercentIcon();
  const treeIcon = getTreeIcon();
  const noTraceIcon = getNoTraceIcon();
  
  return (
    <div className={styles.AboutUsPage}>
      <div className={styles.containerTop}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>About us</h1>

          <p className={styles.introduction}>
            We are a team of hiking enthusiasts who love nature and adventure. 
            Our goal is to share our passion for outdoor activities, explore new trails, 
            and help others enjoy the beauty of the world around us. We believe that 
            hiking is not just a sport but a way of life that inspires and connects people. 
            Join us and discover new horizons together!
          </p>
        </div>
      </div>

      <div className={styles.containerMain}>
        <h3 className={styles.titleSmall}>Out team</h3>

        <div className={styles.teamGrid}>
          <div className={styles.cardSliderMobile} {...handlers}>
            <div className={styles.sliderContainer}>
              {teamMembers.map(member => (
                <div 
                  className={styles.sliderWrapper}
                  key={member.id}
                  style={{ transform: `translateX(-${cardIndex * 358}px` }}
                >
                  <div className={styles.teamCardMobile}>
                    <img 
                      src={member.image} 
                      alt="Team member" 
                      className={styles.teamPhoto}
                    />

                    <h3 className={styles.teamName}>{member.name}</h3>

                    <p className={styles.teamPosition}>{member.position}</p>

                    <p className={styles.teamAbout}>{member.description}</p>
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
          
          
          {teamMembers.map(member => (
            <div className={styles.teamCard} key={member.id}>
            <img src={member.image} alt="Team member" />

            <h3 className={styles.teamName}>{member.name}</h3>

            <p className={styles.teamPosition}>{member.position}</p>

            <p className={styles.teamAbout}>{member.description}</p>
          </div>
          ))}
        </div>

        <h3 className={styles.titleSmall}>Our history</h3>

        <div className={styles.historyGrid}>
          <p className={styles.history}>
            Our team started as a group of friends united by a shared love of 
            nature and adventure. Our first hike together showed us that hiking is 
            more than a hobby—it's a passion that connects people. 
          </p>

          <p className={styles.history}>
            We began organizing hikes for friends and acquaintances, and soon decided to create a project 
            to help others join our journeys. This led to the creation of our website, 
            where we share trails, tips, and bring together like-minded people. 
            Our goal is to make hiking accessible to everyone who seeks new horizons and adventures.
          </p>
        </div>

        <TravelStories />

        <h3 className={styles.titleSmall}>Idea and Development of the Website</h3>

        <p className={styles.history}>
          Idea: Our website was born from a shared love of hiking and a 
          desire to share this passion with others. Observing how our hikes 
          bring people together and create unforgettable moments, we decided 
          to create a platform that helps others discover the joys of outdoor 
          adventures.
        </p>

        <h4 className={styles.titleXSmall}>Development Stages:</h4>

        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.span}>Concept and Planning:</span> We began by discussing the concept and goals of the website, defining its main features and content.
          </li>

          <li className={styles.listItem}>
            <span className={styles.span}>Development:</span> Created a prototype of the site, working on design and functionality.
          </li>

          <li className={styles.listItem}>
            <span className={styles.span}>Launch:</span> Officially launched the site with basic features and an initial set of content.
          </li>

          <li className={styles.listItem}>
            <span className={styles.span}>Expansion:</span> Added new trails, tips, and interactive elements for user convenience.
          </li>

          <li className={styles.listItem}>
            <span className={styles.span}>Feedback and Improvement:</span> Collected user feedback and continuously improved the site based on their suggestions.
          </li>
        </ul>
      </div>

      <div className={styles.containerBottom}>
        <div className={styles.wrapper}>
          <div className={styles.green}>
            <img 
              src={onePercentIcon} 
              alt="One percent icon" 
              className={styles.greenIcon}
            />

            <h3 className={styles.greenTitle}>1% for the Planet</h3>

            <p className={styles.greenDescription}>
              A portion of every HikeTrack membership goes to protecting the wild 
              places we cherish.
            </p>
          </div>

          <div className={styles.green}>
            <img 
              src={treeIcon} 
              alt="Tree icon" 
              className={styles.greenIcon}
            />

            <h3 className={styles.greenTitle}>10,000 trees (and counting)</h3>

            <p className={styles.greenDescription}>
              From new member invites to employee anniversaries, we celebrate 
              by giving to One Tree Planted.
            </p>
          </div>

          <div className={styles.green}>
            <img 
              src={noTraceIcon} 
              alt="No trace icon" 
              className={styles.greenIcon}
            />

            <h3 className={styles.greenTitle}>No trace on the trail</h3>

            <p className={styles.greenDescription}>
              As a Leave No Trace partner, we're committed to keeping outdoor spaces 
              clean, safe, and kind.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}