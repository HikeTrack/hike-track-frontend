import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getToursByGuideId } from "../../utils/fetchData";
import { getSearchIcon } from "../../utils/getIcons";
import { Loader } from "../../components/Loader/Loader";
import { TourCardGuide } from "../../components/TourCardGuide/TourCardGuide";
import debounce from "lodash/debounce";
import { UserCard } from "../../components/UserCard/UserCard";
import { TourCard } from "../../types/TourCard";
import styles from './MyToursPage.module.scss';

export const MyToursPage: React.FC = () => {
  const { user, removeTour } = useAuth();
  const searchIcon = getSearchIcon();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tours, setTours] = useState<TourCard[]>([]);
  const [filteredTours, setFilteredTours] = useState<TourCard[]>([]);

  useEffect(() => {
    if (user?.id) {
      const guideId = user.id;
      
      const fetchTours = async () => {
        setIsLoading(true);
         
        try {
          const tourData = await getToursByGuideId(guideId);

          setTours(tourData);
          setFilteredTours(tourData);
        } catch (error) {
          setError('Failed to load tours. Please try again later.')
        } finally {
          setIsLoading(false);
        }
      };

      fetchTours();
    }
  }, [user?.id]);

  const handleQueryChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase().trim();

    setFilteredTours(tours.filter(tour => tour.name.toLowerCase().includes(query)));
  }, 300);


  const handleRemoveTour = useCallback(async (tourId: number) => {
    setIsLoading(true);

    if (user?.id) {
      try {
        const success = await removeTour(tourId, user.id);

        if (success) {
          setTours(prevTours => prevTours.filter(tour => tour.id !== tourId));
          setFilteredTours(prevFiltered => prevFiltered.filter(tour => tour.id !== tourId));
        } else {
          setError('Failed to remove the tour. Please try again later')
        }
      } catch (error) {
        setError('An error occured while removing the tour. Please try again later');
      } finally {
        setIsLoading(false);
      }
    }
  }, [user?.id]);
  
  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <UserCard />

        <Link
          to="/profile" 
          className={styles.backButton}
        >
          Back to profile
        </Link>
      </div>

      <div className={styles.myTours}>
        <div className={styles.topPanel}>
          <Link
            to="/profile"
            className={styles.topPanelButtonActive}
          >
            Tour List
          </Link>

          <Link 
            to="/create-tour"
            className={styles.topPanelButton}  
          >
            Add new tour
          </Link>
        </div>

        <div className={styles.searchBar}>
          <img src={searchIcon} alt="Search" />
          
          <input 
            id="search"
            type="search"
            placeholder="Tour search"
            className={styles.searchInput}
            onChange={handleQueryChange}
          />
        </div> 

        <div className={styles.myToursGrid}>
          {isLoading ? (
            <div className={styles.loaderWrapper}>
              <Loader />
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <TourCardGuide 
                tour={tour} 
                key={tour.id}
                onRemove={() => handleRemoveTour(tour.id)}
              />
            ))
          ) : (
            <p className={styles.gridText}>There are no tours yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}