import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { UserCard } from "../../components/UserCard/UserCard";
import { useAuth } from "../../context/AuthContext";
import { ContinentsForGuide } from "../../enums/ContinentsForGuide";
import { axiosToken } from "../../utils/axios";
import { fileToDataString } from "../../utils/fileToDataString";
import styles from './UserAccountPage.module.scss';

export const UserAccountPage: React.FC = () => {
  const { user } = useAuth();
  
  /////////////////////
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');

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
      const response = await axiosToken.post('/user/role_change', payload);

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
      // formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
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

      <div className={styles.userCardWrapper}>
        <UserCard/>
      </div>

      <div className={styles.buttonContainerMobile}>
        {!user?.role.includes('ROLE_GUIDE') && (
          <Link className={styles.guideButton} to="/guide-application">Become a guide today!</Link>
        )}

        <button 
          className={styles.deleteButton}
        >
          Delete account
        </button>
      </div>
      
      <div className={styles.sectionContent}>
        <div className={styles.profileSections}>
          <div className={styles.section}>Tours</div>
          <div className={styles.section}>Photos</div>
          <div className={styles.section}>Reviews</div>
          <div className={styles.section}>Calendar</div>
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

      <div className={styles.buttonContainer}>
        <Link className={styles.guideButton} to="/guide-application">Become a guide today!</Link>

        <button 
          className={styles.deleteButton}
        >
          Delete account
        </button>
      </div>

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