import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { TourCard } from "../../components/TourCard/TourCard";
import { Countries } from "../../enums/Countries";
import { CountryOption } from "../../types/Country";
import { Tour } from "../../types/Tour";
import { TourDetails } from "../../types/TourDetails";
import { getCountries, getRandomToursByCountry, getTourById } from "../../utils/fetchData";
import { formatDate, formatDistance } from "../../utils/formatFunctions";
import { getArrowBackIcon, getArrowNextIcon, getBookmarkIcon, getCameraIcon, getCarIcon, getPrinterIcon, getShareIcon, getShareSocialsIcon, getStarIcon, getThumbsUpIcon } from "../../utils/getIcons";
import { getMapImg, getUserContent1, getUserContent2, getUserContent3, getUserImg } from "../../utils/getImages";
import styles from './TourDetailsPage.module.scss';

export const TourDetailsPage: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [tourDetails, setTourDetails] = useState<TourDetails>();
  const [suggestedTours, setSuggestedTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const countryName = countryOptions.find(option => option.value === tourDetails?.countryId)?.label || 'Unknown country';
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const countriesData = await getCountries();
        
        const countryOpt = countriesData.map((country) => ({
          value: country.id,
          label: country.name,
        }));
        
        setCountryOptions(countryOpt);

        if (tourId) {
          const id = Number(tourId);
          const tourDetailsData = await getTourById(id);
          setTourDetails(tourDetailsData);

          if (tourDetailsData && tourDetailsData.countryId) {
            const countryName = countriesData.find(
              (country) => country.id === tourDetailsData.countryId
            )?.name;

            if (countryName) {
              const randomTours = await getRandomToursByCountry(countryName);
              const filteredTours = randomTours.filter((tour) => tour.id !== id);
              setSuggestedTours(filteredTours);
            }
          }
        }
      } catch (error) {
        setError('Failed to load tour details. Please try again later');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    
    // if (tourId) {
    //   const id = Number(tourId);
  
    //   const fetchTourDetailsAndSuggestedTours = async () => {
    //     setIsLoading(true);
  
    //     try {
    //       const tourDetailsData = await getTourById(id);
    //       setTourDetails(tourDetailsData);
  
    //       if (tourDetailsData && tourDetailsData.countryId) {
    //         const coutryName = Countries[tourDetailsData.countryId];

    //         if (coutryName) {
    //           const randomTours = await getRandomToursByCountry(coutryName);
    //           const filteredTours = randomTours.filter(tour => tour.id !== id);
    //           setSuggestedTours(filteredTours);
    //         }
    //       }
    //     } catch (error) {
    //       setError('Failed to load tours. Please try again later.');
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
  
    //   fetchTourDetailsAndSuggestedTours();
    // }
  }, [tourId]);  

  if (!tourDetails) {
    return <h2>This tour isn't available.</h2>
  }
  
  const arrowBackIcon = getArrowBackIcon();
  const starIcon = getStarIcon();
  const bookmarkIcon = getBookmarkIcon();
  const cameraIcon = getCameraIcon();
  const carIcon = getCarIcon();
  const printerIcon = getPrinterIcon();
  const shareIcon = getShareIcon();
  const arrowNextIcon = getArrowNextIcon();
  const thumbsUpIcon = getThumbsUpIcon();
  const shareSocialsIcon = getShareSocialsIcon();

  const mapImg = getMapImg();
  const userImg = getUserImg();
  const userContent1 = getUserContent1();
  const userContent2 = getUserContent2();
  const userContent3 = getUserContent3();
  
  return ( 
    <div className={styles.tourDetailsPage}>
      <div className={styles.containerTop}>
        <button className={styles.backButton}>
          <img src={arrowBackIcon} alt="Arrow back"/>
          <p className={styles.buttonLabel} onClick={() => navigate(-1)}>Go back</p>
        </button>
        
        <div className={styles.highlightContainer}>
          <div className={styles.highlights}>
            <p className={styles.highlightText}>{`${countryName} | ${tourDetails.details?.elevationGain} m`}</p>

            <div className={styles.highlightWrapper}>
              <p className={styles.highlightText}>Difficulty <span className={styles.highlightSpan}>{tourDetails.difficulty}</span></p>

              <div className={styles.tourRate}>
                <img src={starIcon} alt="star" />

                <p className={styles.highlightText}>4.2 (12)</p>
              </div>
            </div>

            <h4 className={styles.tourName}>{tourDetails.name}</h4>

            <h4 className={styles.tourNearest}>{`The nearest tour on ${formatDate(tourDetails.date)}`}</h4>

            <button className={styles.bookButton}>Book a tour</button>
          </div>

          <img 
            src={bookmarkIcon} 
            alt="Bookmark icon" 
            className={styles.icon}
          />
        </div>

        <div className={styles.actionButtons}>
          <div className={styles.actionWrapper}>
            <a className={styles.action} href="#">
              <img 
                src={cameraIcon} 
                alt="Camera icon" 
                className={styles.icon}
              />
            </a>

            <p className={styles.actionTitle}>Photos</p>
          </div>
          
          <div className={styles.actionWrapper}>
            <a className={styles.action} href="#">
              <img 
                src={carIcon} 
                alt="Car icon" 
                className={styles.icon}
              />
            </a>

            <p className={styles.actionTitle}>Details</p>
          </div>

          <div className={styles.actionWrapper}>
            <a className={styles.action} href="#">
              <img 
                src={printerIcon} 
                alt="Printer icon" 
                className={styles.icon}
              />
            </a>

            <p className={styles.actionTitle}>Print/PDF map</p>
          </div>

          <div className={styles.actionWrapper}>
            <a className={styles.action} href="#">
              <img 
                src={shareIcon} 
                alt="Share icon" 
                className={styles.icon}
              />
            </a>

            <p className={styles.actionTitle}>Share</p>
          </div>
        </div>
      </div>

      <div className={styles.containerMain}>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <div className={styles.infoHighlights}>
              <p className={styles.infoText}>
                Length
                <br />
                <span className={styles.infoSpan}>{formatDistance(tourDetails.length)}</span>
              </p>

              <p className={styles.infoText}>
                Elevation gain
                <br />
                <span className={styles.infoSpan}>{`${tourDetails.details?.elevationGain} m.`}</span>
              </p>

              <p className={styles.infoText}>
                Route type
                <br />
                <span className={styles.infoSpan}>{tourDetails.details?.routeType}</span>
              </p>
            </div>

            <p className={styles.infoDescription}>
              Discover the Ararat Mountain trail, a challenging 14 km route that ascends to the peak 
              of this iconic volcano located near Doğubayazıt, Turkey. Generally considered a difficult 
              climb due to its high altitude and varying weather conditions, the ascent usually takes 
              around 8 to 10 hours, depending on pace and conditions. This trail is popular among 
              experienced hikers and mountaineers, and you'll likely encounter other adventurers seeking 
              to conquer the summit. The best times to visit Ararat are from July through September 
              when the weather is most favorable and the snow has mostly melted, offering a clearer 
              and safer path to the top.
            </p>

            <div className={styles.infoTags}>
              <div className={styles.tag}>
                {tourDetails.details?.activity}
              </div>
            </div>
          </div>

          <div className={styles.mapWrapper}>
            <img src={mapImg} alt="Map" />

            <a className={styles.mapLink} href="#">look at the map</a>
          </div>
        </div>

        <div className={styles.conditionWrapper}>
          <h4 className={styles.title}>Conditions</h4>

          <div className={styles.conditionCards}>
            <div className={styles.cardOne}>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>Weather along trail</p>

                <img src={arrowNextIcon} alt="Arrow" />
              </div>

              <p className={styles.cardDescription}>Check the weather to guide your hike</p>
            </div>

            <div className={styles.cardTwo}>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>Check ground conditions</p>

                <img src={arrowNextIcon} alt="Arrow" />
              </div>

              <p className={styles.cardDescription}>Know when to expect wet, snowy, or icy terrain</p>
            </div>

            <div className={styles.cardThree}>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>Mosquito repellent</p>

                <img src={arrowNextIcon} alt="Arrow" />
              </div>

              <p className={styles.cardDescription}>Purchase the best mosquito repellents and your hike will be pleasant</p>
            </div>
          </div>
        </div>

        <div className={styles.feedbackContainer}>
          <div className={styles.feedbackTopbar}>
            <a className={styles.topbarItem} href="#">Reviews (12)</a>
            <a className={styles.topbarItem} href="#">Photos (20)</a>
            <a className={styles.topbarItem} href="#">Completed (55)</a>
            <a className={styles.topbarItem} href="#">Activities (71)</a>
          </div>

          <button className={styles.reviewButton}>Write a review</button>

          <div className={styles.reviewCard}>
            <div className={styles.reviewTopbar}>
              <div className={styles.user}>
                <img 
                  src={userImg} 
                  alt="User photo"
                  className={styles.userImage}
                />

                <div className={styles.userInfo}>
                  <p className={styles.userName}>Peter Breis</p>

                  <p className={styles.userStatus}>Local guide | 40 reviews</p>
                </div>
              </div>

              <div className={styles.userActions}></div>
            </div>

            <div className={styles.rateDetails}>
              <div className={styles.starWrapper}>
                <div className={styles.star}></div>
                <div className={styles.star}></div>
                <div className={styles.star}></div>
                <div className={styles.star}></div>
                <div className={styles.star}></div>
              </div>

              <p className={styles.rateDate}>31.08.2024</p>
            </div>

            <p className={styles.reviewText}>
              Amazing hike with stunning views all the way to the summit! It's 
              challenging but totally worth the effort—just be ready for changing 
              weather conditions.
            </p>

            <div className={styles.reviewPhotos}>
              <img src={userContent1} alt="photo" />
              <img src={userContent2} alt="photo" />
              <img src={userContent3} alt="photo" />
            </div>

            <div className={styles.reviewActions}>
              <div className={styles.review}>
                <img src={thumbsUpIcon} alt="Thumbsup icon"/>
                <p className={styles.reviewCount}>2</p>
              </div>

              <div className={styles.review}>
                <img src={shareSocialsIcon} alt="Share in socials icon"/>
                <p className={styles.reviewCount}>Share</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tourSuggestions}>
          <h4 className={styles.title}>{`Other tours in ${Countries[tourDetails.countryId]}`}</h4>

          {isLoading ? (
            <div className={styles.loaderWrapper}>
              <Loader />
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : suggestedTours.length > 0 ? (
            suggestedTours.map((tour) => (
              <TourCard tour={tour} key={tour.id} countryOptions={countryOptions}/>
            ))
          ) : (
            <p className={styles.gridText}>No tours available for this country.</p>
          )}
        </div>
      </div>
    </div>
  )
}