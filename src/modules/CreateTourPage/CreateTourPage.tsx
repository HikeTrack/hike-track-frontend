import React, { ChangeEventHandler, FormEvent, useEffect, useRef, useState } from "react";
import { fileToDataString } from "../../utils/fileToDataString";
import { Activity, Difficulty, RouteType } from '../../enums/Filters';
import { TourDropdown } from "../../components/TourDropdown/TourDropodown";
import { UserCard } from "../../components/UserCard/UserCard";
import { getRemoveIcon, getSmallCameraIcon } from "../../utils/getIcons";
import { axiosToken } from "../../utils/axios";
import { convertHoursToMinutes, convertKilometresToMetres, prepareDateString, validateDateString, validateField } from "../../utils/InputCheckAndPreparation";
import { getCountries } from "../../utils/fetchData";
import { CountryOption } from "../../types/Country";
import { useNavigate } from "react-router-dom";
import styles from './CreateTourPage.module.scss';

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

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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
    console.log('handleCountryIdSelect', value);
    
    if (!value) {
      return;
    }
    
    setSelectedCountryId(+value);

    setFormErrors((prev) => ({
      ...prev,
      selectedCountryId: '',
    }));
  };

  const handleDifficultySelect = (value: string | null) => {
    setSelectedDifficulty(value as Difficulty);

    setFormErrors((prev) => ({
      ...prev,
      selectedDifficulty: '',
    }));
  };

  const handleActivitySelect = (value: string | null) => {
    setSelectedActivity(value as Activity);

    setFormErrors((prev) => ({
      ...prev,
      selectedActivity: '',
    }));
  };

  const handleRouteTypeSelect = (value: string | null) => {
    setSelectedRouteType(value as RouteType);

    setFormErrors((prev) => ({
      ...prev,
      selectedRouteType: '',
    }));
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

    setFormErrors((prev) => ({
      ...prev,
      mainImage: '',
    }));

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

      setFormErrors((prev) => ({
        ...prev,
        additionalImages: '',
      }));

      try {
        const previews = await Promise.all(selectedFiles.map(file => fileToDataString(file)));
        setPreviewAdditionalImgUrl(prevPreviews => [
          ...prevPreviews,
          ...previews
        ]
        );
      } catch (error) {
        setError('Could not load an image, please try again');
      }
    }
  }

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewAdditionalImgUrl((prev) => prev.filter((_, i) => i !== index));
  } 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormErrors((prev) => ({
      ...prev,
      [id]: ''
    }));

    const normalisedValue = value.replace(',', '.');
    const numericValue = normalisedValue === '' ? null : Number(normalisedValue);

    switch (id) {
      case 'tour':
        setTour(value);
        break;
      case 'date':
        setTourDate(value);
        break;
      case 'length':
        setLength(numericValue);
        break;
      case 'elevation':
        setElevation(numericValue);
        break;
      case 'duration':
        setDuration(numericValue);
        break;
      case 'price':
        setPrice(numericValue);
        break;
      case 'map':
        setMapLink(value);
        break;
      default: break;
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setFormErrors((prev) => ({
      ...prev,
      [id]: '',
    }));

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

    let errors: Record<string, string> = {};

    if (!tour) {
      errors.tour = 'Tour name is required';
    }
    if (!length || length <= 0) {
      errors.length = 'Length is required';
    }
    if (!price || price <= 0) {
      errors.price = 'Price is required';
    }
    if (!tourDate || !validateDateString(tourDate)) {
      errors.date = 'Valid tour date is required';
    }
    if (!selectedDifficulty) {
      errors.selectedDifficulty = 'Select difficulty';
    }
    if (!selectedCountryId) {
      errors.selectedCountryId = 'Select country';
    }
    if (!elevation || elevation <= 0) {
      errors.elevation = 'Elevation is required';
    }
    if (!selectedRouteType) {
      errors.selectedRouteType = 'Select route type';
    }
    if (!duration || duration <= 0) {
      errors.duration = 'Duration is required';
    }
    if (!description) {
      errors.description = 'Description is required';
    }
    if (!mapLink) {
      errors.map = 'Map link is required';
    }
    if (!selectedActivity) {
      errors.selectedActivity = 'Select activity';
    }
    if (!mainImage) {
      errors.mainImage = 'Upload main image';
    }
    if (additionalImages.length === 0) {
      errors.additionalImages = 'Upload at least one additional image';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const selectedCountryOption = countryOptions.find(country => country.value === selectedCountryId);

      if (!selectedCountryOption) {
        setError('Invalid country');
        return;
      }

      const countryId = selectedCountryOption.value;
      const preparedDate = prepareDateString(tourDate);

      let durationInMinutes;
      let elevationGainInMetres;
      let lengthInMetres;

      const isValidNumber = (value: number | null): boolean => value !== null && value > 0;

      if (isValidNumber(duration)) {
        durationInMinutes = convertHoursToMinutes(duration as number);
      };

      if (isValidNumber(elevation)) {
        elevationGainInMetres = convertKilometresToMetres(elevation as number);
      };

      if (isValidNumber(length)) {
        lengthInMetres = convertKilometresToMetres(length as number);
      }
      
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
          activity: selectedActivity,
          description: description
        }
      };
      formData.append('data', JSON.stringify(data));
      
      if (mainImage) {
        formData.append('mainPhoto', mainImage);
      }

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
              />
            </div>
            {formErrors.tour && <span className={styles.formError}>{formErrors.tour}</span>}
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
              {formErrors.selectedCountryId && <span className={styles.formError}>{formErrors.selectedCountryId}</span>}
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
                />
              </div>
              {formErrors.date && <span className={styles.formError}>{formErrors.date}</span>}
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
                />
              </div>
              {formErrors.price && <span className={styles.formError}>{formErrors.price}</span>}
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
              {formErrors.selectedDifficulty && <span className={styles.formError}>{formErrors.selectedDifficulty}</span>}
            </div>
            
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Activity:</label>
                
              <TourDropdown 
                label="Activity"
                options={activityOptions}
                selected={selectedActivity}
                onChange={handleActivitySelect}
              />
              {formErrors.selectedActivity && <span className={styles.formError}>{formErrors.selectedActivity}</span>}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Route type:</label>
                
              <TourDropdown 
                label="Route type"
                options={routeTypeOptions}
                selected={selectedRouteType}
                onChange={handleRouteTypeSelect}
              />
              {formErrors.selectedRouteType && <span className={styles.formError}>{formErrors.selectedRouteType}</span>}
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
                />
              </div>
              {formErrors.length && <span className={styles.formError}>{formErrors.length}</span>}
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
                />
              </div>
              {formErrors.elevation && <span className={styles.formError}>{formErrors.elevation}</span>}
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
                />
              </div>
              {formErrors.duration && <span className={styles.formError}>{formErrors.duration}</span>}
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
            />
            <div className={styles.textareaCharCounter}>
              {description.length}/500
            </div>
            {formErrors.description && <span className={styles.formError}>{formErrors.description}</span>}
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
            {formErrors.mainImage && <span className={styles.formError}>{formErrors.mainImage}</span>}
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
            {formErrors.additionalImages && <span className={styles.formError}>{formErrors.additionalImages}</span>}
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
              />
            </div>
            {formErrors.map && <span className={styles.formError}>{formErrors.map}</span>}
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