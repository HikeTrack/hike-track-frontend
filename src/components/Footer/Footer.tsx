import React from "react";
import { NavLink, Link } from "react-router-dom";
import { getFacebookIcon, getGithubIcon, getInstagramIcon, getYoutubeIcon } from "../../utils/getIcons";
import styles from './Footer.module.scss';

export const Footer = () => {
  const instagramIcon = getInstagramIcon();
  const facebookIcon = getFacebookIcon();
  const githubIcon = getGithubIcon();
  const youtubeIcon = getYoutubeIcon();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.containerTopMobile}>
        <h4 className={styles.title}>Subscribe to the newsletter and be the first to know about everything</h4>
 
        <div className={styles.containerSubscribe}>
          <input 
            type="email" 
            placeholder="Your email address" 
            className={styles.input}
          />
          <button className={styles.button}>Subscribe</button>
        </div>
      </div>
      
      <div className={styles.containerLeft}>
        <h4 className={styles.titleBig}>Menu</h4>

        <nav className={styles.nav}>
          <NavLink to="/" className={styles.navItem}>
            Home
          </NavLink>

          <NavLink to="/continents" className={styles.navItem}>
            Tours
          </NavLink>

          <NavLink to="/about" className={styles.navItem}>
            About us
          </NavLink>
        </nav>
      </div>

      <div className={styles.containerCenter}>
        <h4 className={styles.title}>Subscribe to the newsletter and be the first to know about everything</h4>
 
        <div className={styles.containerSubscribe}>
          <input 
            type="email" 
            placeholder="Your email address" 
            className={styles.input}
          />
          <button className={styles.button}>Subscribe</button>
        </div>

        <div className={styles.containerSocials}>
          <h4 className={styles.title}>Connect with us</h4>

          <div className={styles.socials}>
            <Link to="#" className={styles.logoLink}>
              <img src={instagramIcon} alt="instagram" />
            </Link>

            <Link to="#" className={styles.logoLink}>
              <img src={facebookIcon} alt="facebook" />
            </Link>

            <Link to="#" className={styles.logoLink}>
              <img src={githubIcon} alt="github" />
            </Link>

            <Link to="#" className={styles.logoLink}>
              <img src={youtubeIcon} alt="youtube" />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.containerRight}>
          <p className={styles.contactTitle}>Information line (24/7)</p>
          <a 
            className={styles.contactDetails}
            href="tel:0800644544"
          >
            0 800 644 544
          </a>

          <p className={styles.contactTitle}>Booking tours</p>
          <a 
            className={styles.contactDetails}
            href="tel:0800111999"
          >
            0 800 111 999
          </a>

          <p className={styles.contactTitle}>Customer support <span className={styles.span}>"HikeTrack"</span></p>
          <a 
            className={styles.contactDetails}
            href="mailto:HikeTrack24@gmail.com"
          >
            HikeTrack24@gmail.com
          </a>
      </div>

      <div className={styles.containerSocialsMobile}>
          <h4 className={styles.titleBig}>Connect with us</h4>

          <div className={styles.socialsMobile}>
            <Link to="#" className={styles.logoLink}>
              <img src={instagramIcon} alt="instagram" />
            </Link>

            <Link to="#" className={styles.logoLink}>
              <img src={facebookIcon} alt="facebook" />
            </Link>

            <Link to="#" className={styles.logoLink}>
              <img src={githubIcon} alt="github" />
            </Link>

            <Link to="#" className={styles.logoLink}>
              <img src={youtubeIcon} alt="youtube" />
            </Link>
          </div>
        </div>
    </footer>
  )
};

export default Footer;