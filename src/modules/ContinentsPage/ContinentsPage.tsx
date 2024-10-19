import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { ContinentsForSearch } from "../../enums/ContinentsForSearch";
import { Country } from "../../types/Country";
import { getCountries } from "../../utils/fetchData";
import { 
  getAfricaGreenIcon,
  getAfricaIcon, 
  getAsiaGreenIcon, 
  getAsiaIcon, 
  getAustraliaGreenIcon, 
  getAustraliaIcon, 
  getEuropeGreenIcon, 
  getEuropeIcon, 
  getNorthAmericaGreenIcon, 
  getNorthAmericaIcon, 
  getSearchIcon, 
  getSouthAmericaGreenIcon, 
  getSouthAmericaIcon, 
  getWorldGreenIcon, 
  getWorldIcon 
} from "../../utils/getIcons";
import styles from './ContinentsPage.module.scss';

const continentIcons: { [key in ContinentsForSearch]: string } = {
  [ContinentsForSearch.AllCountries]: getWorldIcon(),
  [ContinentsForSearch.Europe]: getEuropeIcon(),
  [ContinentsForSearch.Asia]: getAsiaIcon(),
  [ContinentsForSearch.Africa]: getAfricaIcon(),
  [ContinentsForSearch.NorthAmerica]: getNorthAmericaIcon(),
  [ContinentsForSearch.SouthAmerica]: getSouthAmericaIcon(),
  [ContinentsForSearch.Australia]: getAustraliaIcon(),
};

const continentIconsSelected: { [key in ContinentsForSearch]: string } = {
  [ContinentsForSearch.AllCountries]: getWorldGreenIcon(),
  [ContinentsForSearch.Europe]: getEuropeGreenIcon(),
  [ContinentsForSearch.Asia]: getAsiaGreenIcon(),
  [ContinentsForSearch.Africa]: getAfricaGreenIcon(),
  [ContinentsForSearch.NorthAmerica]: getNorthAmericaGreenIcon(),
  [ContinentsForSearch.SouthAmerica]: getSouthAmericaGreenIcon(),
  [ContinentsForSearch.Australia]: getAustraliaGreenIcon(),
}

export const ContinentsPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState(ContinentsForSearch.AllCountries);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const searchIcon = getSearchIcon();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await getCountries();

        setCountries(countryData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []); 

  useEffect(() => {
    if (selectedContinent === ContinentsForSearch.AllCountries) {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(countries.filter(country => country.continent === selectedContinent));
    }
  }, [selectedContinent, countries]);

  const handleContinentClick = (continent: ContinentsForSearch) => {
    setSelectedContinent(continent);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase().trim();

    setFilteredCountries(
      countries.filter(
        country => country.name.toLowerCase().includes(query) &&
        (selectedContinent === ContinentsForSearch.AllCountries || country.continent === selectedContinent)
      )
    );
  };

  const groupedCountries = filteredCountries.reduce((accumulator, country) => {
    const firstLetter = country.name.charAt(0);

    if (!accumulator[firstLetter]) {
      accumulator[firstLetter] = [];
    }

    accumulator[firstLetter].push(country);

    return accumulator;
  }, {} as { [key: string]: Country[] });
   
  return (
    <div className={styles.searchPage}>
      <div className={styles.containerMain}>
        <div className={styles.leftPanel}>
          <h4 className={styles.title}>Part of the world</h4>

          {Object.values(ContinentsForSearch).map((continent) =>(
            <div 
              className={styles.region} 
              key={continent}
              onClick={() => handleContinentClick(continent)}
            >
              <img 
                src={selectedContinent === continent 
                  ? continentIconsSelected[continent] 
                  : continentIcons[continent]
                }
                alt={continent} 
                className={styles.regionIcon}
              />
              <p className={styles.regionName}>{continent}</p>
            </div>
          ))}
        </div>

        <div className={styles.rightPanel}>
          <h4 className={styles.titleGreen}>Country</h4>

          <div className={styles.searchBar}>
            <img src={searchIcon} alt="Search" />
            <input 
              id="search"
              type="search"
              placeholder="Country search"
              className={styles.searchInput}
              onChange={handleQueryChange}
            />
          </div> 
          
          <div className={styles.searchResults}>
            {isLoading ? 
              <div className={styles.loaderWrapper}>
                <Loader />
              </div>
            :
            Object.keys(groupedCountries).length > 0 ? (
              Object.keys(groupedCountries).sort().map((letter) => (
                <div className={styles.alphabetic} key={letter}>
                  <h4 className={styles.category}>{letter}</h4>

                  <ul className={styles.resultList}>
                    {groupedCountries[letter].map((country) => (
                      <li className={styles.listItem} key={country.id}>
                        <Link to={`/toursByCountry/${country.id}`} className={styles.resultLink}>{country.name}</Link>
                      </li>
                    ))}
                    
                  </ul>
                </div>
              ))
            ) : (
              <p>No countries available for this continent</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}