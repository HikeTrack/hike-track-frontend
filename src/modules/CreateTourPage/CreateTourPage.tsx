import React, { ChangeEvent, ChangeEventHandler, FormEvent, useRef, useState } from "react";
import { ContinentsForGuide } from "../../enums/ContinentsForGuide";
import { BASE_URL } from "../../utils/constants";
import { fileToDataString } from "../../utils/fileToDataString";
import { Activity, Difficulty, RouteType } from '../../enums/Filters';
import { TourDropdown } from "../../components/TourDropdown/TourDropodown";
import { UserCard } from "../../components/UserCard/UserCard";
import { getRemoveIcon, getSmallCameraIcon } from "../../utils/getIcons";
import styles from './CreateTourPage.module.scss';
import { GoogleMap } from "../../components/GoolgeMap/GoogleMap";

export const CreateTourPage: React.FC = () => {
  const smallCameraIcon = getSmallCameraIcon();
  const removeIcon = getRemoveIcon();
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  
  const [tour, setTour] = useState('');
  const [countryName, setCountryName] = useState('');
  const [stateName, setStateName] = useState('');
  const [date, setDate] = useState('');
  const [length, setLength] = useState('');
  const [elevation, setElevation] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [price, setPrice] = useState('');

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

  const handleMainImageChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setMainImage(null);
      setPreviewMainImgUrl('');
      e.target.value = '';
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

  const removeMainImage = () => {
    setMainImage(null);
    setPreviewMainImgUrl('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAdditionalImgChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).slice(0, 5);
      
      setAdditionalImages(prevImages => [
        ...prevImages,
        ...selectedFiles
      ]);

      try {
        const previews = await Promise.all(selectedFiles.map(file => fileToDataString(file)));
        setPreviewAdditionalImgUrl(prePreviews => [
          ...prePreviews,
          ...previews
        ]
        );
      } catch (error) {
        setError('Couldn not load an image, try again');
      }
    }
  }

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewAdditionalImgUrl((prev) => prev.filter((_, i) => i !== index));
  } 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'tour') {
      setTour(value);
    } else if (id === 'date') {
      setDate(value);
    } else if (id === 'length') {
      setLength(value);
    } else if (id === 'elevation') {
      setElevation(value);
    } else if (id === 'duration') {
      setDuration(value);
    } else if (id === 'stateName') {
      setStateName(value);
    } else if (id === 'countryName') {
      setCountryName(value);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    if (id === 'description') {
      setDescription(value);
    }
  }

  const handleInputReset = () => {
    setMainImage(null);
    setPreviewMainImgUrl('');
    setAdditionalImages([]);
    setPreviewAdditionalImgUrl([]);
    setSelectedContinent(null);
    setSelectedDifficulty(null);
    setSelectedActivity(null);
    setSelectedRouteType(null);
    setTour('');
    setCountryName('');
    setStateName('');
    setDate('');
    setLength('');
    setDuration('');
    setElevation('');
    setDescription('');
    setPrice('');
    setMapLink('');
    setError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

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
  
  return (
    <div className={styles.page}>
      <div className={styles.userCardWrapper}>
        <UserCard/>
      </div>

      <form className={styles.formContainer} onSubmit={handleFormSubmit}>
        <div className={styles.centralPanel}>
          <h1 className={styles.title}>Create a new tour</h1>

          <div className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="tour" className={styles.inputLabel}>Tour name:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="tour"
                  name="tour"
                  value={tour}
                  onChange={handleInputChange}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby="tourError"
                />
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
                  onChange={handleInputChange}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby="dateError"
                />
              </div>
            </div>

            <div className={styles.inputContainerBig}>
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
            </div>

            <div className={styles.inputContainerBig}>
              <div className={styles.inputContainer}>
                <label htmlFor="length" className={styles.inputLabel}>Length (in km):</label>
                
                <div className={styles.inputWrapper}>
                  <input 
                    className={styles.input}
                    type="text" 
                    id="length"
                    name="length"
                    value={length}
                    onChange={handleInputChange}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby="lengthError"
                  />
                </div>
              </div>
            
              <div className={styles.inputContainer}>
                <label htmlFor="elevation" className={styles.inputLabel}>Elevation (in km):</label>
                
                <div className={styles.inputWrapper}>
                  <input 
                    className={styles.input}
                    type="text" 
                    id="elevation"
                    name="elevation"
                    value={elevation}
                    onChange={handleInputChange}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby="elevationError"
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
                    value={duration}
                    onChange={handleInputChange}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby="durationError"
                  />
                </div>
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="description" className={styles.inputLabel}>Tour description:</label>
              
              <textarea 
                className={styles.textarea}
                id="description"
                name="description"
                value={description}
                onChange={handleTextAreaChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="descriptionError"
              />
            </div>

            <div className={styles.inputImageContainer}>
              <label htmlFor="main-image" className={styles.inputImage}>
                <img 
                  src={smallCameraIcon} 
                  alt="camera" 
                  className={styles.cameraIcon}
                />
                
                Upload main image
              </label>
              
              <input 
                className={styles.inputImageHidden}
                type="file" 
                id="main-image"
                accept="image/*"
                onChange={handleMainImageChange}
                ref={fileInputRef}
              />

              {mainImage && (
                <div className={styles.imagePreviewWrapper}>
                  <img 
                    src={previewMainImgUrl} 
                    alt="main tour image"
                    className={styles.imagePreview}
                  />

                  <button className={styles.removeButton} onClick={removeMainImage}>
                    <img src={removeIcon} alt="bin" />
                  </button>
                </div>
              )}
            </div>

            <div className={styles.inputImageContainer}>
              <label htmlFor="additional-images" className={styles.inputImage}>
                <img 
                  src={smallCameraIcon} 
                  alt="camera" 
                  className={styles.cameraIcon}
                />
                
                Upload more images
              </label>
              
              <input 
                className={styles.inputImageHidden}
                type="file" 
                id="additional-images"
                accept="image/*"
                onChange={handleAdditionalImgChange}
                ref={fileInputRef}
              />

              {previewAdditionalImgUrl.length > 0 && (
                <div className={styles.imagePreviewContainer}>
                  {previewAdditionalImgUrl.map((preview, index) => (
                    <div className={styles.imagePreviewWrapper} key={index}>
                      <img 
                        src={preview} 
                        alt={`Additional image ${index + 1}`}
                        className={styles.imagePreview}
                      />

                      <button className={styles.removeButton} onClick={() => removeAdditionalImage(index)}>
                        <img src={removeIcon} alt="bin" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className={styles.inputContainerBig}>
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
                <label htmlFor="state-name" className={styles.inputLabel}>State:</label>
                
                <div className={styles.inputWrapper}>
                  <input 
                    className={styles.input}
                    type="text" 
                    id="stateName"
                    name="stateName"
                    value={stateName}
                    onChange={handleInputChange}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby="stateError"
                  />
                </div>
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
                    onChange={handleInputChange}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby="countryError"
                  />
                </div>
              </div>
            </div>
            

            <div className={styles.inputContainer}>
              {/* <label htmlFor="duration" className={styles.inputLabel}>Map link:</label>
              
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
              </div> */}





              {/* <GoogleMap /> */}
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.serviceContainer}>
            <h4 className={styles.titleSmall}>Extra services</h4>

            <div className={styles.checkboxContainer}>
              <div className={styles.checkboxWrapper}>
                <input 
                  className={styles.checkbox} 
                  id="transfer"
                  name="transfer"
                  type="checkbox"
                  // checked={isGuideButtonChecked}
                  // onChange={handleCheckboxChange}
                />

                <label htmlFor="transfer" className={styles.checkboxLabel}>Transfer</label>
              </div>

              <div className={styles.checkboxWrapper}>
                <input 
                  className={styles.checkbox} 
                  id="accomodation"
                  name="accomodation"
                  type="checkbox"
                  // checked={isGuideButtonChecked}
                  // onChange={handleCheckboxChange}
                />

                <label htmlFor="accomodation" className={styles.checkboxLabel}>Accomodation (for multi-day tours)</label>
              </div>

              <div className={styles.checkboxWrapper}>
                <input 
                  className={styles.checkbox} 
                  id="meals"
                  name="meals"
                  type="checkbox"
                  // checked={isGuideButtonChecked}
                  // onChange={handleCheckboxChange}
                />

                <label htmlFor="meals" className={styles.checkboxLabel}>Meals</label>
              </div>

              <div className={styles.checkboxWrapper}>
                <input 
                  className={styles.checkbox} 
                  id="medical"
                  name="medical"
                  type="checkbox"
                  // checked={isGuideButtonChecked}
                  // onChange={handleCheckboxChange}
                />

                <label className={styles.checkboxLabel}>Insurance</label>
              </div>

              <div className={styles.checkboxWrapper}>
                <input 
                  className={styles.checkbox} 
                  id="insurance"
                  name="insurance"
                  type="checkbox"
                  // checked={isGuideButtonChecked}
                  // onChange={handleCheckboxChange}
                />

                <label className={styles.checkboxLabel}>Pre-hike briefing</label>
              </div>

              <div className={styles.checkboxWrapper}>
                <input 
                  className={styles.checkbox} 
                  id="equipment"
                  name="equipment"
                  type="checkbox"
                  // checked={isGuideButtonChecked}
                  // onChange={handleCheckboxChange}
                />

                <label className={styles.checkboxLabel}>Equipment rental</label>
              </div>

              <div className={styles.checkboxWrapper}>
                <input 
                  className={styles.checkbox} 
                  id="photoVideo"
                  name="photoVideo"
                  type="checkbox"
                  // checked={isGuideButtonChecked}
                  // onChange={handleCheckboxChange}
                />

                <label className={styles.checkboxLabel}>Photo and video shooting</label>
              </div>
            </div>
          </div>

          <div className={styles.pricingContainer}>
            <h4 className={styles.titleSmall}>Pricing</h4>

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

            <div className={styles.inputContainerBig}>
              <div className={styles.inputContainer}>
                <label htmlFor="price" className={styles.inputLabel}>Extra services:</label>

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
            </div>
          </div>
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
  )
}