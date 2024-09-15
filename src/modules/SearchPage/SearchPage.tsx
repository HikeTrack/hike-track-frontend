import React from "react";
import { Link } from "react-router-dom";
import { getAfricaIcon, getAsiaIcon, getEuropeIcon, getNorthAmericaIcon, getSearchIcon, getSouthAmericaIcon, getWorldIcon } from "../../utils/getIcons";
import styles from './SearchPage.module.scss';

export const SearchPage = () => {
  const searchIcon = getSearchIcon();
  const allWorldIcon = getWorldIcon();
  const europeIcon = getEuropeIcon();
  const asiaIcon = getAsiaIcon();
  const southAmericaIcon = getSouthAmericaIcon();
  const africaIcon = getAfricaIcon();
  const northAmericaIcon = getNorthAmericaIcon();
  
  return (
    <div className={styles.searchPage}>
      <div className={styles.containerMain}>
        <div className={styles.leftPanel}>
          <h4 className={styles.title}>Part of the world</h4>

          <div className={styles.region}>
            <img 
              src={allWorldIcon} 
              alt="All world" 
              className={styles.regionIcon}
            />
            <p className={styles.regionName}>All</p>
          </div>

          <div className={styles.region}>
            <img 
              src={europeIcon} 
              alt="Europe" 
              className={styles.regionIcon}
            />
            <p className={styles.regionName}>Europe</p>
          </div>

          <div className={styles.region}>
            <img 
              src={asiaIcon} 
              alt="Asia" 
              className={styles.regionIcon}
            />
            <p className={styles.regionName}>Asia</p>
          </div>

          <div className={styles.region}>
            <img 
              src={southAmericaIcon} 
              alt="South America" 
              className={styles.regionIcon}
            />
            <p className={styles.regionName}>South America</p>
          </div>

          <div className={styles.region}>
            <img 
              src={africaIcon} 
              alt="Africa" 
              className={styles.regionIcon}
            />
            <p className={styles.regionName}>Africa</p>
          </div>

          <div className={styles.region}>
            <img 
              src={northAmericaIcon} 
              alt="North America" 
              className={styles.regionIcon}
            />
            <p className={styles.regionName}>North America</p>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <h4 className={styles.titleGreen}>Country</h4>

          <div className={styles.searchBar}>
            <img src={searchIcon} alt="Search icon" />
            <input 
              id="search"
              type="search"
              placeholder="Country search"
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.searchResults}>
            <div className={styles.alphabetic}>
              <h4 className={styles.category}>T</h4>

              <ul className={styles.resultList}>
                <li className={styles.listItem}>
                  <a href="/Turkey" className={styles.resultLink}>Tanzania</a>
                </li>

                <li className={styles.listItem}>
                  <Link to="/toursByCountry/Turkey" className={styles.resultLink}>Turkey</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}