import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { ContinentsForGuide } from "../../enums/ContinentsForGuide";
import { BASE_URL } from "../../utils/constants";
import { fileToDataString } from "../../utils/fileToDataString";
import { Activity, Difficulty } from '../../enums/Filters';
import { TourDropdown } from "../../components/TourDropdown/TourDropodown";
import styles from './CreateTourPage.module.scss';

export const CreateTourPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState('');

  const [selectedContinent, setSelectedContinent] = useState<ContinentsForGuide | null>(null);
  const [countryName, setCountryName] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedRouteType, setSelectedRouteType] = useState();
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

  const handleToggle = () => setIsOpen(!isOpen);

  const handleContinentSelect = (value: string | null) => {
    if (typeof value === 'string') {
      setSelectedContinent(value as ContinentsForGuide);
    }

    setIsOpen(false);
  };

  const handleDifficultySelect = (value: string | null) => {
    if (typeof value === 'string') {
      setSelectedDifficulty(value as Difficulty);
    }

    setIsOpen(false);
  };

  const handleActivitySelect = (value: string | null) => {
    if (typeof value === 'string') {
      setSelectedActivity(value as Activity);
    }

    setIsOpen(false);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

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

      const requestDto = {
        continent: selectedContinent,
        country: countryName,
      };
      formData.append('requestDto', new Blob([JSON.stringify(requestDto)], { type: 'application/json' }));

      formData.append('file', selectedImage);

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
            <label htmlFor="image" className={styles.inputLabel}>Upload an image:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="file" 
                id="image"
                accept="image/*"
                // onChange={handleFileChange}
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="date" className={styles.inputLabel}>Date:</label>
            
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="date"
                name="date"
                placeholder="Date"
                // value={state.firstName}
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
                placeholder="Country"
                // value={state.firstName}
                // onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="firstNameError"
              />
            </div>
          </div>

          <TourDropdown 
            label="Difficulty"
            options={difficultyOptions}
            selected={selectedDifficulty}
            onChange={handleDifficultySelect}
          />

          <TourDropdown 
            label="Activity"
            options={activityOptions}
            selected={selectedActivity}
            onChange={handleActivitySelect}
          />

          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="text" 
              id="length"
              name="length"
              placeholder="Length"
              // value={state.firstName}
              // onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="lengthError"
            />
          </div>

          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="text" 
              id="elevation"
              name="elevation"
              placeholder="Elevation"
              // value={state.firstName}
              // onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="elevationError"
            />
          </div>

          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="text" 
              id="price"
              name="price"
              placeholder="Price"
              // value={state.firstName}
              // onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="firstNameError"
            />
          </div>

          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="text" 
              id="duration"
              name="duration"
              placeholder="Duration"
              // value={state.firstName}
              // onChange={handleInputChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="durationError"
            />
          </div>

          <div className={styles.inputWrapper}>
            <input 
              className={styles.input}
              type="text" 
              id="map"
              name="map"
              placeholder="Map link"
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