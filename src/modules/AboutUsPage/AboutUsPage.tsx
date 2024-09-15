import React from "react";
import { TravelStories } from "../../components/TravelStories/TravelStories";
import { getNoTraceIcon, getOnePercentIcon, getTreeIcon } from "../../utils/getIcons";
import { 
  getTeamImg1, 
  getTeamImg2, 
  getTeamImg3, 
  getTeamImg4, 
  getTeamImg5, 
  getTeamImg6, 
  getTeamImg7, 
  getTeamImg8, 
  getTeamImg9 
} from "../../utils/getImages";
import styles from './AboutUsPage.module.scss';

export const AboutUsPage = () => {
  const onePercentIcon = getOnePercentIcon();
  const treeIcon = getTreeIcon();
  const noTraceIcon = getNoTraceIcon();

  const teamImg1 = getTeamImg1();
  const teamImg2 = getTeamImg2();
  const teamImg3 = getTeamImg3();
  const teamImg4 = getTeamImg4();
  const teamImg5 = getTeamImg5();
  const teamImg6 = getTeamImg6();
  const teamImg7 = getTeamImg7();
  const teamImg8 = getTeamImg8();
  const teamImg9 = getTeamImg9();
  
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
          <div className={styles.teamCard}>
            <img src={teamImg1} alt="Team member photo" />

            <h3 className={styles.titleSmall}>Dmytro Karp</h3>

            <p className={styles.teamPosition}>Head, founder of travel.ua</p>

            <p className={styles.teamAbout}>
              Dmytro is an entrepreneur, a person who lives in the rhythm of a full life. 
              Any adrenaline venture causes him admiration not only in words, but also 
              in deed
            </p>
          </div>

          <div className={styles.teamCard}>
            <img src={teamImg2} alt="Team member photo" />

            <h3 className={styles.titleSmall}>Volodymyr Zaylo</h3>

            <p className={styles.teamPosition}>Manager, co-owner of travel.ua</p>

            <p className={styles.teamAbout}>
              Volodymyr - If this person is called Volodymyr Feodosiyovych, then most of the 
              team will ask "Who is this?", because for everyone he is Uncle Vova. 
              He knows everything!
            </p>
          </div>

          <div className={styles.teamCard}>
            <img src={teamImg3} alt="Team member photo" />

            <h3 className={styles.titleSmall}>Vitaly Pyrig</h3>

            <p className={styles.teamPosition}>Head of the certificate department</p>

            <p className={styles.teamAbout}>
              Vitaly is the biggest calculator in the office. Not a single certificate or 
              extra hryvnia will pass by her, as she keeps records of finances.
            </p>
          </div>

          <div className={styles.teamCard}>
            <img src={teamImg4} alt="Team member photo" />

            <h3 className={styles.titleSmall}>Anton Vasylkiv</h3>

            <p className={styles.teamPosition}>Head of the Cooperation Department (Western and Central regions)</p>

            <p className={styles.teamAbout}>
            Anton is Sherlock Holmes in the world of interesting services. It is she who 
            discovers cool new experiences, negotiates with partners, signs contracts 
            and does a lot of work.
            </p>
          </div>

          <div className={styles.teamCard}>
            <img src={teamImg5} alt="Team member photo" />

            <h3 className={styles.titleSmall}>Valentina Ushakova</h3>

            <p className={styles.teamPosition}>Marketer</p>

            <p className={styles.teamAbout}>
              Because of this person, instead of sitting quietly at home, 
              you wanted to go/swim/jump/fly/climb - as she is engaged in all 
              social networks.
            </p>
          </div>

          <div className={styles.teamCard}>
            <img src={teamImg6} alt="Team member photo" />

            <h3 className={styles.titleSmall}>Karina Andronova</h3>

            <p className={styles.teamPosition}>Senior customer service manager</p>

            <p className={styles.teamAbout}>
              Karina herself answers your calls and messages, and makes 
              sure that the managers do it right.
            </p>
          </div>

          <div className={styles.teamCard}>
            <img src={teamImg7} alt="Team member photo" />

            <h3 className={styles.titleSmall}>Vasyl Karpenko</h3>

            <p className={styles.teamPosition}>Organizer of excursions to Uman</p>

            <p className={styles.teamAbout}>
              Will develop excursion programs for any taste, organizes the use of various types 
              of transport for the transportation of tourists during excursion service.
            </p>
          </div>

          <div className={styles.teamCard}>
            <img src={teamImg8} alt="Team member photo" />

            <h3 className={styles.titleSmall}>Andriy Shevchenko</h3>

            <p className={styles.teamPosition}>Organizer</p>

            <p className={styles.teamAbout}>
              Andriy is an active, positive, cheerful member of our team of extremes! 
              The organizer of Rope Jumping, as well as a professional 
              videographer and photographer
            </p>
          </div>

          <div className={styles.teamCard}>
            <img src={teamImg9} alt="Team member photo" />

            <h3 className={styles.titleSmall}>Sofia Brydun</h3>

            <p className={styles.teamPosition}>Head of the corporate department, as well as excursions to Chernobyl, Mafia games</p>

            <p className={styles.teamAbout}>
              A responsible, cheerful, fragile and positive girl, and also a mother. 
              If you want to visit an extreme place with a great and valuable history 
              for Ukraine - contact me.
            </p>
          </div>
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