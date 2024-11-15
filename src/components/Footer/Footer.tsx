import { AxiosError } from "axios";
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { axiosReg } from "../../utils/axios";
import { getFacebookIcon, getGithubIcon, getInstagramIcon, getLogoIcon, getYoutubeIcon } from "../../utils/getIcons";
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const instagramIcon = getInstagramIcon();
  const facebookIcon = getFacebookIcon();
  const githubIcon = getGithubIcon();
  const youtubeIcon = getYoutubeIcon();
  const logoIcon = getLogoIcon();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscription = async () => {
    setIsLoading(true);
    setError('');

    const payload = { email };
    
    try {
      const response = await axiosReg.post('/socials/subscribe', payload);

      if (response.status === 200) {
        console.log('Success: email has been subscribed');
        setIsLoading(false);
        setIsSubscribed(true);
      } else {
        setError('Something went wrong. Please try again');
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      setError('Something went wrong. Please try again');
      console.error('Subscription error:', axiosError);
    } finally {
      setIsLoading(false);
      setEmail('');
    }
  }

  const handleCloseNotification = () => {
    setIsSubscribed(false);
  }
  
  return (
    <footer className={styles.footer}>
      <div className={styles.containerTopMobile}>
        <h4 className={styles.title}>Subscribe to the newsletter and be the first to know about everything</h4>
 
        <div className={styles.containerSubscribe}>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address" 
            className={styles.input}
          />
          <button 
            className={styles.button} 
            onClick={handleSubscription}
            disabled={isLoading}
          >
            Subscribe
          </button>
        </div>

        {error && <p className={styles.subscribeError}>{error}</p>}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
            placeholder="Your email address" 
            className={styles.input}
          />

          <button 
            className={styles.button} 
            onClick={handleSubscription}
            disabled={isLoading}
          >
            Subscribe
          </button>

          {error && <p className={styles.subscribeError}>{error}</p>}
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

      {isSubscribed && (
        <div className={styles.overlay}>
          <div className={styles.notification}>
            <Link to="/" className={styles.logoLink}>
              <img 
                src={logoIcon} 
                alt="logo" 
                className={styles.logoIcon}
              />
            </Link>

            <h3 className={styles.notificationTitle}>You have been successfully subscribed!</h3>

            <button className={styles.notificationButton} onClick={handleCloseNotification}>Go back</button>
          </div>
        </div>
      )}
    </footer>
  )
};

export default Footer;