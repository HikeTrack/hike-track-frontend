import React, { ChangeEvent, ChangeEventHandler, FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { MyTours } from "../MyToursPage/MyToursPage";
import { UserCard } from "../../components/UserCard/UserCard";
import { useAuth } from "../../context/AuthContext";
import { ContinentsForGuide } from "../../enums/ContinentsForGuide";
import { axiosToken } from "../../utils/axios";
import { fileToDataString } from "../../utils/fileToDataString";
import { getLogoIcon } from "../../utils/getIcons";
import styles from './UserAccountPage.module.scss';

export const UserAccountPage: React.FC = () => {
  const { user, deleteUserAccount } = useAuth();
  const navigate = useNavigate();
  const logoIcon = getLogoIcon();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);

  const handleDeleteAccount = async () => {
    setIsLoading(true);

    if (!user) {
      return;
    }

    try {
      const isDeleted = await deleteUserAccount(user?.id);

      if (isDeleted) {
        setIsAccountDeleted(true);
      } else {
        setError('Failed to delete your account. Please try again later')
      }
    } catch (error) {
      setError('Unexpected error occured. Please try again later')
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setIsAccountDeleted(false);

    navigate('/');
  }
  
  /////////////////////
  const [userEmail, setUserEmail] = useState('');


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  }

  const submitGuidePromotion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userEmail) {
      return;
    }

    const payload = { email: userEmail };

    console.log(payload);

    try {
      const response = await axiosToken.post('/users/role_change', payload);

      if (response.status === 200) {
        console.log('Successfully submitted.')
      } else {
        console.log('An error occured', response.data);
      }
    } catch (error) {
      console.error('Unsuccessful', error);
      setError('Failed to promote user. Please try again later');
    }
  };

  ////////////////////
  ////////////////////
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<ContinentsForGuide | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [countryName, setCountryName] = useState('');
  const [previewImgUrl, setPreviewImgUrl] = useState('');

  const continentsOptions = Object.values(ContinentsForGuide).map(continent => ({
    value: continent,
    label: continent,
  }));

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelectContinent = (value: string | null) => {
    if (typeof value === 'string') {
      setSelectedContinent(value as ContinentsForGuide);
    }

    setIsOpen(false);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    console.log(file);

    if (!file) {
      setSelectedImage(null);
      setPreviewImgUrl('');
      return;
    }

    setSelectedImage(file);

    try {
      const imgUrl = await fileToDataString(file);
      setPreviewImgUrl(imgUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!selectedContinent || !countryName || !selectedImage) {
      return;
    }
   
    try {
      const formData = new FormData();
      const data = {
        continent: selectedContinent,
        name: countryName,
      };
      formData.append('data', JSON.stringify(data));
      formData.append('file', selectedImage);
  
      const response = await axiosToken.post('/countries', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedContinent(null);
      setSelectedImage(null);
      setCountryName('');
      setPreviewImgUrl('');
    }
  };  

  ////////////////////
  
  return (
    <div className={styles.page}>
      <div className={styles.profileSectionsMobile}>
        <div className={styles.section}>Tours</div>
        <div className={styles.section}>Photos</div>
        <div className={styles.section}>Reviews</div>
        <div className={styles.section}>Calendar</div>
      </div>

      
      <div className={styles.leftPanel}>
        <UserCard/>

        {!user?.role.includes('ROLE_GUIDE') && (
          <Link className={styles.guideButton} to="/guide-application">Become a guide today!</Link>
        )}
        
        <button 
          className={styles.deleteButton}
          onClick={handleDeleteAccount}
        >
          Delete account
        </button>
      </div>

      {isAccountDeleted && (
        <div className={styles.overlay}>
          <div className={styles.notification}>
            <Link to="/" className={styles.logoLink}>
              <img 
                src={logoIcon} 
                alt="logo" 
                className={styles.logoIcon}
              />
            </Link>

            <h3 className={styles.notificationTitle}>Your account has been removed!</h3>

            <button className={styles.notificationButton} onClick={handleCloseNotification}>Go back</button>
          </div>
        </div>
      )}
      
   
      <div className={styles.sectionContent}>
          
        <div className={styles.profileSections}>
          <div className={styles.section}>Upcoming tours</div>
          <div className={styles.section}>Photos</div>
          <div className={styles.section}>Reviews</div>
        </div>
          
        <div className={styles.noContent}>
          <h4 className={styles.title}>No upcoming tours yet</h4>

          <p className={styles.contentSmallText}>
            Inspire friends with your trail reviews, 
            adventure lists, and Navigator activities.
          </p>

          <Link to="/continents" className={styles.exploreButton}>Explore trails</Link>
        </div>
      </div>

      {/* {user?.role.includes('ROLE_GUIDE') && (
        <div className={styles.myToursContainer}>
          <MyTours />
        </div>
      )} */}

      

      {user?.role.includes('ROLE_ADMIN') && (
        <div className={styles.guideContainer}>
          <form className={styles.form} onSubmit={submitGuidePromotion}>
            <label htmlFor="email" className={styles.inputTitle}>Promote to guide role:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="email" 
                id="email"
                value={userEmail}
                onChange={handleEmailChange}
                placeholder="Email address"
              />
            </div>

            <button className={styles.submitButton} type="submit">Submit</button>
          </form>

          <form className={styles.form} onSubmit={handleFormSubmit}>
            <label htmlFor="country" className={styles.inputTitle}>Add a coutry:</label>
            
            <div className={styles.dropdown}>
              <button className={styles.dropdownButton} onClick={handleToggle}>
                {continentsOptions.find(continent => continent.value === selectedContinent)?.label || 'Choose continent'}
              </button>
              {isOpen && (
                <ul className={styles.dropdownList}>
                  {continentsOptions.map(option => (
                    <li 
                      className={styles.dropdownItem}
                      key={option.value}
                      onClick={() => handleSelectContinent(option.value)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="country"
                value={countryName}
                onChange={handleCountryChange}
                placeholder="Country"
                aria-describedby="emailError"
              />
            </div>

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="file" 
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                aria-describedby="imageError"
              />
            </div>

            <button className={styles.submitButton} type="submit">Submit</button>
          </form>

          <div className={styles.form}>
            <h3 className={styles.inputTitle}>Your image:</h3>
            
            <img 
              src={previewImgUrl} 
              alt="image" 
              className={styles.image}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserAccountPage;