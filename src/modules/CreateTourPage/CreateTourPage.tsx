import React, { ChangeEventHandler, FormEvent, useEffect, useRef, useState } from "react";
import { fileToDataString } from "../../utils/fileToDataString";
import { Activity, Difficulty, RouteType } from '../../enums/Filters';
import { TourDropdown } from "../../components/TourDropdown/TourDropodown";
import { UserCard } from "../../components/UserCard/UserCard";
import { getRemoveIcon, getSmallCameraIcon } from "../../utils/getIcons";
import { axiosToken } from "../../utils/axios";
import { convertHoursToMinutes, convertKilometresToMetres, prepareDateString } from "../../utils/InputCheckAndPreparation";
import styles from './CreateTourPage.module.scss';
import { getCountries } from "../../utils/fetchData";
import { CountryOption } from "../../types/Country";
import { useNavigate } from "react-router-dom";

export const CreateTourPage: React.FC = () => {
  const navigate = useNavigate();
  const smallCameraIcon = getSmallCameraIcon();
  const removeIcon = getRemoveIcon();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [previewMainImgUrl, setPreviewMainImgUrl] = useState('');
  
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [previewAdditionalImgUrl, setPreviewAdditionalImgUrl] = useState<string[]>([]);

  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedRouteType, setSelectedRouteType] = useState<RouteType | null>(null);
  
  const [tour, setTour] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [length, setLength] = useState<number | null>(null);
  const [elevation, setElevation] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<number | null>(null);
  const [mapLink, setMapLink] = useState('');
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await getCountries();
        const options = countries.map(country => ({
          value: country.id,
          label: country.name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
        setCountryOptions(options);
      } catch (error) {
        console.error('Error fetching countries');
      }
    }

    fetchCountries();
  }, []);

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

  const handleCountryIdSelect = (value: string | null) => {
    if (!value) {
      return;
    }
    
    setSelectedCountryId(+value);
  };

  const handleDifficultySelect = (value: string | null) => {
    setSelectedDifficulty(value as Difficulty);
  };

  const handleActivitySelect = (value: string | null) => {
    setSelectedActivity(value as Activity);
  };

  const handleRouteTypeSelect = (value: string | null) => {
    setSelectedRouteType(value as RouteType);
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
        setPreviewAdditionalImgUrl(prevPreviews => [
          ...prevPreviews,
          ...previews
        ]
        );
      } catch (error) {
        setError('Could not load an image, try again');
      }
    }
  }

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewAdditionalImgUrl((prev) => prev.filter((_, i) => i !== index));
  } 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const numericValue = value === '' ? null : Number(value);

    if (id === 'tour') {
      setTour(value);
    } else if (id === 'date') {
      setTourDate(value);
    } else if (id === 'length') {
      setLength(numericValue);
    } else if (id === 'elevation') {
      setElevation(numericValue);
    } else if (id === 'duration') {
      setDuration(numericValue);
    } else if (id === 'price') {
      setPrice(numericValue);
    } else if (id === 'map') {
      setMapLink(value);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    if (id === 'description') {
      setDescription(value.slice(0, 500));
    }
  }

  const handleInputReset = () => {
    setMainImage(null);
    setPreviewMainImgUrl('');
    setAdditionalImages([]);
    setPreviewAdditionalImgUrl([]);
    setSelectedCountryId(null);
    setSelectedDifficulty(null);
    setSelectedActivity(null);
    setSelectedRouteType(null);
    setTour('');
    setTourDate('');
    setLength(null);
    setDuration(null);
    setElevation(null);
    setDescription('');
    setPrice(null);
    setMapLink(''); 
    setError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    navigate('/profile');
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tour 
      || !length 
      || !price
      || !tourDate
      || !selectedDifficulty
      || !selectedCountryId
      || !elevation
      || !selectedRouteType
      || !duration
      || !mapLink
      || !selectedActivity
      || !mainImage
      || additionalImages.length === 0
      ) {
      setError('All information must be provided')
      return;
    }

    try {
      const selectedCountryOption = countryOptions.find(country => country.value === selectedCountryId);

      if (!selectedCountryOption) {
        setError('Invalid country');
        return;
      }

      const countryId = selectedCountryOption.value;

      const durationInMinutes = convertHoursToMinutes(duration);
      const elevationGainInMetres = convertKilometresToMetres(elevation);
      const lengthInMetres = convertKilometresToMetres(length);
      const preparedDate = prepareDateString(tourDate);

      console.log(preparedDate);

      const formData = new FormData();

      const data = {
        name: tour,
        length: lengthInMetres,
        price: price,
        date: preparedDate,
        difficulty: selectedDifficulty,
        countryId: countryId,
        detailsRequestDto: {
          elevationGain: elevationGainInMetres,
          routeType: selectedRouteType,
          duration: durationInMinutes,
          map: mapLink,
          activity: selectedActivity
        }
      };
      formData.append('data', JSON.stringify(data));
      formData.append('mainPhoto', mainImage);

      additionalImages.forEach((image) => {
        formData.append(`additionalPhotos`, image);
      });

      const response = await axiosToken.post('/tours', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError('An error occured while submitting the form. Please try again')
    } finally {
      setMainImage(null);
      setPreviewMainImgUrl('');
      setAdditionalImages([]);
      setPreviewAdditionalImgUrl([]);
      setSelectedCountryId(null);
      setSelectedDifficulty(null);
      setSelectedActivity(null);
      setSelectedRouteType(null);
      setTour('');
      setTourDate('');
      setLength(null);
      setDuration(null);
      setElevation(null);
      setDescription('');
      setPrice(null);
      setMapLink(''); 
      setError('');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      navigate('/profile');
    }
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.userCardWrapper}>
        <UserCard/>
      </div>

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create a new tour</h1>

        <form className={styles.form} onSubmit={handleFormSubmit}>
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

          <div className={styles.inputContainerBig}>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Country:</label>
                
              <TourDropdown 
                label="Country"
                options={countryOptions}
                selected={selectedCountryId}
                onChange={handleCountryIdSelect}
              />
            </div> 
             
            <div className={styles.inputContainer}>
              <label htmlFor="date" className={styles.inputLabel}>Date (YYYY.MM.DD):</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="date"
                  name="date"
                  value={tourDate}
                  onChange={handleInputChange}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby="dateError"
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="price" className={styles.inputLabel}>Price:</label>

              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="number" 
                  id="price"
                  name="price"
                  value={price !== null ? price : ''}
                  onChange={handleInputChange}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby="firstNameError"
                />
              </div>
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
                  type="number" 
                  id="length"
                  name="length"
                  value={length !== null ? length : ''}
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
                  type="number" 
                  id="elevation"
                  name="elevation"
                  value={elevation !== null ? elevation : ''}
                  onChange={handleInputChange}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby="elevationError"
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="duration" className={styles.inputLabel}>Duration (in hours):</label>
                
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="number" 
                  id="duration"
                  name="duration"
                  value={duration !== null ? duration : ''}
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
              maxLength={500}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby="descriptionError"
            />
            <div className={styles.textareaCharCounter}>
              {description.length}/500
            </div>
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

          <div className={styles.inputContainer}>
            <label htmlFor="map" className={styles.inputLabel}>Insert your map link:</label>
              
            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text" 
                id="map"
                name="map"
                value={mapLink}
                onChange={handleInputChange}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="mapLinkError"
              />
            </div>


            {/* <GoogleMap /> */}
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
              // disabled={isLoading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}