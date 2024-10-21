import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { ContinentsForGuide } from "../../enums/ContinentsForGuide";
import { BASE_URL } from "../../utils/constants";
import { fileToDataString } from "../../utils/fileToDataString";
import { Activity, Difficulty, RouteType } from '../../enums/Filters';
import { TourDropdown } from "../../components/TourDropdown/TourDropodown";
import styles from './CreateTourPage.module.scss';

export const CreateTourPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [previewMainImgUrl, setPreviewMainImgUrl] = useState('');
  
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [previewAdditionalImgUrl, setPreviewAdditionalImgUrl] = useState<string[]>([]);

  const [selectedContinent, setSelectedContinent] = useState<ContinentsForGuide | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedRouteType, setSelectedRouteType] = useState<RouteType | null>(null);
  
  const [countryName, setCountryName] = useState('');
  const [date, setDate] = useState('');
  const [length, setLength] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [mapLink, setMapLink] = useState('');

  const continentOptions = Object.values(ContinentsForGuide).map(continent => ({
    value: continent,
    label: continent,
  }));

  const difficultyOptions = Object.values(Difficulty).map(difficulty => ({
    value: difficulty,
    label: difficulty,
  }));

  const activityOptions = Object.values(Activity).map(activity => ({
    value: activity,
    label: activity,
  }));

  const routeTypeOptions = Object.values(RouteType).map(route => ({
    value: route,
    label: route,
  }));

  const handleContinentSelect = (value: string | null) => {
    if (typeof value === 'string') {
      setSelectedContinent(value as ContinentsForGuide);
    }
  };

  const handleDifficultySelect = (value: string | null) => {
    if (typeof value === 'string') {
      setSelectedDifficulty(value as Difficulty);
    }
  };

  const handleActivitySelect = (value: string | null) => {
    if (typeof value === 'string') {
      setSelectedActivity(value as Activity);
    }
  };

  const handleRouteTypeSelect = (value: string | null) => {
    if (typeof value === 'string') {
      setSelectedRouteType(value as RouteType);
    }
  };

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setMainImage(null);
      setPreviewMainImgUrl('');
      return;
    }

    setMainImage(file);

    try {
      const imgUrl = await fileToDataString(file);
      setPreviewMainImgUrl(imgUrl);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleAdditionalImgChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
  //   const files = e.target.files;

  //   if (files && files.length > 0) {
  //     const selectedFiles = Array.from(files).slice(0, 5);
  //     setAdditionalImages(selectedFiles);

  //     try {
  //       const previews = await Promise.all(selectedFiles.map(file => fileToDataString(file)))
  //     }
  //   }
  // }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedContinent || !countryName || !mainImage) {
      return;
    }

    try {
      const formData = new FormData();

      const requestDto = {
        continent: selectedContinent,
        country: countryName,
      };
      formData.append('requestDto', new Blob([JSON.stringify(requestDto)], { type: 'application/json' }));

      formData.append('file', mainImage);

      const response = await fetch(`${BASE_URL}/countries`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputReset = () => {
    
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create a new tour</h1>

        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="image" className={styles.inputLabel}>Upload main image:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="file" 
                id="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* {mainImage && ( */}
              <div className={styles.inputWrapper}>
                <div className={styles.inputImageWrapper}>
                  <img 
                    src={previewMainImgUrl} 
                    alt="main tour image"
                    className={styles.inputImage}
                  />
                </div>
              </div>
            {/* )} */}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="image" className={styles.inputLabel}>Upload additional images:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="file" 
                id="image"
                accept="image/*"
                // onChange={handleFileChange}
              />
            </div>

            <div className={styles.inputWrapper}>
                {previewAdditionalImgUrl.map((preview, index) => (
                  <div className={styles.inputImageWrapper}>
                    <img 
                      key={index}
                      src={preview} 
                      alt={`Additional image ${index + 1}`}
                      className={styles.inputImage}
                    />
                  </div>
                ))}
              </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="date" className={styles.inputLabel}>Date (YYYY.MM.DD):</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="date"
                name="date"
                value={date}
                // onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="dateError"
              />
            </div>
          </div>
          
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Continent:</label>
            
            <TourDropdown 
              label="Continent"
              options={continentOptions}
              selected={selectedContinent}
              onChange={handleContinentSelect}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="date" className={styles.inputLabel}>Country:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="countryName"
                name="countryName"
                value={countryName}
                onChange={handleCountryChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="firstNameError"
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Difficulty:</label>
            
            <TourDropdown 
              label="Difficulty"
              options={difficultyOptions}
              selected={selectedDifficulty}
              onChange={handleDifficultySelect}
            />
          </div>
          
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Activity:</label>
            
            <TourDropdown 
              label="Activity"
              options={activityOptions}
              selected={selectedActivity}
              onChange={handleActivitySelect}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Route type:</label>
            
            <TourDropdown 
              label="Route type"
              options={routeTypeOptions}
              selected={selectedRouteType}
              onChange={handleRouteTypeSelect}
            />
          </div>
          
          <div className={styles.inputContainer}>
            <label htmlFor="length" className={styles.inputLabel}>Length (in km):</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="length"
                name="length"
                value={length}
                // onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="lengthError"
              />
            </div>
          </div>
          
          <div className={styles.inputContainer}>
            <label htmlFor="elevation" className={styles.inputLabel}>Elevation (in m):</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="elevation"
                name="elevation"
                // value={state.firstName}
                // onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="elevationError"
              />
            </div>
          </div>
          
          <div className={styles.inputContainer}>
            <label htmlFor="price" className={styles.inputLabel}>Price:</label>

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="price"
                name="price"
                // value={state.firstName}
                // onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="firstNameError"
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="duration" className={styles.inputLabel}>Duration (in km):</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="duration"
                name="duration"
                // value={state.firstName}
                // onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="durationError"
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="duration" className={styles.inputLabel}>Map link:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="map"
                name="map"
                // value={state.firstName}
                // onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="mapLinkError"
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="duration" className={styles.inputLabel}>Tour description:</label>
            
            <textarea 
              className={styles.textarea}
              id="map"
              name="map"
              // value={state.firstName}
              // onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="mapLinkError"
            />
          </div>

          <div className={styles.buttonContainer}>
            <button 
              className={styles.buttonCancel}
              onClick={handleInputReset}
            >
              Cancel
            </button>
            <button 
              className={styles.buttonSave}
              type="submit"
              disabled={isLoading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}