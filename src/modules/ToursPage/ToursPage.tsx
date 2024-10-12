import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CalendarFilter } from "../../components/CalendarFilter/CalendarFilter";
import { FilterDropdown } from "../../components/FilterDropdown/FilterDropdown";
import { Loader } from "../../components/Loader/Loader";
import { TourCard } from "../../components/TourCard/TourCard";
import { Countries } from "../../enums/Countries";
import { Activity, Difficulty, Length, Price } from "../../enums/Filters";
import { Tour } from "../../types/Tour";
import { getToursByCountry } from "../../utils/fetchData";
import { getArrowBackIcon, getCalendarIcon } from "../../utils/getIcons";
import { countryNames } from "../../utils/mapCountries";
import styles from './ToursPage.module.scss';

export const ToursPage: React.FC = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("countryId from useParams:", countryId);
  
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialCountryId = Number(countryId) as Countries;
  const [selectedCountry, setSelectedCountry] = useState<Countries>(initialCountryId);
  const [filteredTours, setFilteredTours] = useState<Tour[]>(tours);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  // const [activity, setActivity] = useState<Activity | null>(null);
  
  const [length, setLength] = useState<Length | null>(null);
  const [lengthRange, setLengthRange] = useState<{ min: number, max: number } | null>(null);

  const [price, setPrice] = useState<Price | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number, max: number } | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (countryId) {
      const id = Number(countryId);

      if (Object.values(Countries).includes(id)) {
        setSelectedCountry(id as Countries);
      }
      
      const fetchTours = async () => {
        setIsLoading(true);
        
        try {
          const countryName = Countries[id];
          const tourData = await getToursByCountry(countryName);

          setTours(tourData);
        } catch (error) {
          setError('Failed to load tours. Please try again later.')
        } finally {
          setIsLoading(false);
        }
      };

      fetchTours()
    }
  }, [countryId]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lengthParam = params.get('length');
    const priceParam = params.get('price');

    if (lengthParam) {
      setLength(lengthParam as Length);
    }

    if (priceParam) {
      setPrice(priceParam as Price);
    }
  }, [location.search]);

  useEffect(() => {
    const updateFiltersURL = () => {
      const params = new URLSearchParams();
  
      if (length) {
        params.set('length', length);
      }
  
      if (price) {
        params.set('price', price);
      }
  
      navigate(`?${params.toString()}`);
    };

    updateFiltersURL();
  }, [length, price, navigate]);

  useEffect(() => {
    const handleScreenResize = () => {
      if (window.innerWidth >= 1280) {
        setFiltersVisible(true);
      } else {
        setFiltersVisible(false);
      }
    };

    handleScreenResize();

    window.addEventListener('resize', handleScreenResize);

    return () => window.removeEventListener('resize', handleScreenResize);
  }, []);

  const lengthRanges: Record<Length, [number, number]> = {
    [Length.Under10km]: [0, 10000],
    [Length.from10To50km]: [10000, 50000],
    [Length.from50To100km]: [50000, 100000],
    [Length.Over100km]: [100000, 500000],
  };

  const priceRanges: Record<Price, [number, number]> = {
    [Price.Under100]: [0, 100],
    [Price.from100To300]: [100, 300],
    [Price.from300To500]: [300, 500],
    [Price.Over500]: [500, 5000],
  }

  useEffect(() => {
    let filtered = tours;

    if (startDate && endDate) {
      filtered = filtered.filter(tour => {
        const tourDate = new Date(tour.date);
        
        return tourDate >= startDate && tourDate <= endDate;
      });
    }

    if (difficulty) {
      filtered = filtered.filter(tour => tour.difficulty === difficulty);
    }

    if (length) {
      const [min, max] = lengthRanges[length];
      filtered = filtered.filter(tour => tour.length >= min && tour.length <= max);
    }

    // if (activity) {
    //   filtered = filtered.filter(tour => tour.activity === activity);
    // }

    if (price) {
      const [min, max] = priceRanges[price];
      filtered = filtered.filter(tour => tour.price >= min && tour.price <= max);
    }
    
    setFilteredTours(filtered);
  }, [tours, startDate, endDate, difficulty, length, price]);

  const handleCountryChange = (value: string | number) => {
    if (typeof value === 'number') {
      setSelectedCountry(value as Countries);
    }

    setFilteredTours([]);
    setFilteredTours(tours);
    setDifficulty(null);
    setLength(null);
    setLengthRange(null);
    setPrice(null);
    setPriceRange(null);
    setStartDate(null);
    setEndDate(null);

    // const params = new URLSearchParams(location.search);
    // params.set('countryId', value.toString());
    navigate(`/toursByCountry/${value}`);
  };

  const countryOptions = Object.entries(Countries)
    .filter(([key]) => isNaN(Number(key)))
    .map(([name, id]) => ({
      value: id,
      label: name,
    }));

  const handleDifficultyChange = (value: string | number) => {
    if (typeof value === 'string')
    setDifficulty(value as Difficulty);
  };

  const difficultyOptions = Object.values(Difficulty).map(difficulty => ({
    value: difficulty,
    label: difficulty,
  }));

  const handleLengthChange = (value: string | number) => {
    if (typeof value === 'string' && Object.values(Length).includes(value as Length)) {
      setLength(value as Length);

      const range = lengthRanges[value as Length];

      if (range) {
        const [min, max] = range;
        setLengthRange({ min, max })
      } else {
        setLengthRange(null);
      }
    } else {
      setLength(null);
      setLengthRange(null);
    }
  };

  const lengthOptions = Object.values(Length).map(length => ({
    value: length,
    label: length,
  }));

  // const handleActivity = (activity: Activity) => {
  //   setActivity(activity);
  // };

  // const activityOptions = Object.values(Activity).map(activity => ({
  //   value: activity,
  //   label: activity,
  // }));

  const handlePriceChange = (value: string | number) => {
    if (typeof value === 'string' && Object.values(Price).includes(value as Price)) {
      setPrice(value as Price);

      const range = priceRanges[value as Price];

      if (range) {
        const [min, max] = range;
        setPriceRange({ min, max })
      } else {
        setPriceRange(null);
      }
    } else {
      setPrice(null);
      setPriceRange(null);
    }
  };

  const priceOptions = Object.values(Price).map(price => ({
    value: price,
    label: price,
  }));

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  }

  const toggleFiltersVisibility = () => {
    setFiltersVisible(prev => !prev);
  }

  const toggleCalendarVisibility = () => {
    setCalendarVisible(prev => !prev);
  }

  const handleFilterReset = () => {
    setFilteredTours(tours);
    setDifficulty(null);
    setLength(null);
    setLengthRange(null);
    setPrice(null);
    setPriceRange(null);
    setStartDate(null);
    setEndDate(null);

    const params = new URLSearchParams();

    navigate(`${location.pathname}?${params.toString()}`);
  }
  
  const arrowBackIcon = getArrowBackIcon();
  const calendarIcon = getCalendarIcon();
  
  return ( 
    <div className={styles.toursPage}>
      <div className={styles.containerTop}>
        <h1 className={styles.title}>Find the adventure of your dreams</h1>
      </div>

      <div className={styles.containerMain}>
        <button className={styles.backButton}>
          <img src={arrowBackIcon} alt="Arrow back"/>
          <p className={styles.buttonLabel} onClick={() => navigate('/continents')}>Go back</p>
        </button>

        <div className={styles.instructionWrapper}>
          <p className={styles.instruction}>
            Filter programs by type, region, duration and start date. 
            Or choose those hosted by your favorite team leader. And if you can't 
            decide for yourself - write to our consultants and they will be happy 
            to help. But know one thing - no matter which program you choose, 
            we will do everything in our power so that you return from the 
            trip healthy and happy!
          </p>

          <p className={styles.availability}>
            Active routes: 
            <span className={styles.span}>___</span>, 
            on which start dates are planned: 
            <span className={styles.span}>___</span>
          </p>
        </div>

        <div className={styles.containerGrid}>
          <button 
            className={styles.filterOpenButton} 
            onClick={toggleFiltersVisibility}
          >
            {filtersVisible ? 'Close filters' : 'Open filters'}
          </button>
          
          <div className={`${filtersVisible ? styles.containerDropdowns : styles.filtersNotVisible }`}>
            <button 
              className={styles.calendarButton}
              onClick={toggleCalendarVisibility}
            >
              <img src={calendarIcon} alt="Calendar" />
              <p className={styles.dropdownText}>Choose date</p>
            </button>

            <div className={`${calendarVisible ? styles.calendar : styles.calendarNotVisible }`}>
              <CalendarFilter 
                startDate={startDate}
                endDate={endDate}
                handleDateChange={handleDateChange}
              />
            </div>

            <div className={styles.containerSmall}>
              <h4 className={styles.dropdownTitle}>Country</h4>
              <FilterDropdown 
                label="Country"
                options={countryOptions}
                selected={selectedCountry}
                onChange={handleCountryChange}
              />

              <h4 className={styles.dropdownTitle}>Difficulty</h4>
              <FilterDropdown 
                label="Difficulty"
                options={difficultyOptions}
                selected={difficulty}
                onChange={handleDifficultyChange}
              />

              <h4 className={styles.dropdownTitle}>Length</h4>
              <FilterDropdown 
                label="Length"
                options={lengthOptions}
                selected={length}
                onChange={handleLengthChange}
              />

              {/* <h4 className={styles.dropdownTitle}>Activity</h4>
              <FilterDropdown 
                label="Activity"
                options={activityOptions}
                selected={length}
                onChange={handleActivity}
              /> */}
            </div>

            <h4 className={styles.dropdownTitle}>Determine the price range</h4>
            <FilterDropdown 
              label="Price"
              options={priceOptions}
              selected={price}
              onChange={handlePriceChange}
            />

            <button className={styles.resetButton} onClick={handleFilterReset}>Reset filters</button>

            <button className={styles.filterCloseButton} onClick={() => setFiltersVisible(false)}>Close filters</button>
          </div>

          <div className={styles.grid}>
            {isLoading ? (
              <div className={styles.loaderWrapper}>
                <Loader />
              </div>
              ) : error ? (
                <p>{error}</p>
              ) : filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <TourCard tour={tour} key={tour.id}/>
                ))
              ) : (
                <p className={styles.gridText}>No tours available for this country.</p>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}