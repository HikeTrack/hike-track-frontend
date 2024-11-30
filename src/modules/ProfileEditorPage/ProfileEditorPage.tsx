import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { axiosToken } from "../../utils/axios";
import { DATE_REGEX, EMAIL_REGEX, PHONE_REGEX } from "../../utils/constants";
import { isDateInPast } from "../../utils/InputCheckAndPreparation";
import styles from './ProfileEditorPage.module.scss';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  userProfileRequestDto: {
    country: string;
    city: string;
    phoneNumber: string;
    dateOfBirth: string;
    aboutMe: string;
  };
  photo: File | string;
}

export const ProfileEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<FormValues>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      userProfileRequestDto: {
        country: user?.userProfileRespondDto.country || '',
        city: user?.userProfileRespondDto.city || '',
        phoneNumber: user?.userProfileRespondDto.phoneNumber || '',
        dateOfBirth: user?.userProfileRespondDto.dateOfBirth || '',
        aboutMe: user?.userProfileRespondDto.aboutMe || '',
      },
      photo: user?.userProfileRespondDto.photo || '',
    }
  });

  const photo = watch('photo');

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      if (data.photo && typeof data.photo !== 'string') {
        formData.append('photo', data.photo)
      }

      const response = await axiosToken.patch(`/users/${user?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error updating profile', error);
    } finally {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        userProfileRequestDto: {
          country: data.userProfileRequestDto.country,
          city: data.userProfileRequestDto.city,
          phoneNumber: data.userProfileRequestDto.phoneNumber,
          dateOfBirth: data.userProfileRequestDto.dateOfBirth,
          aboutMe: data.userProfileRequestDto.aboutMe,
        },
        photo: data.photo,
      });

      navigate('/profile');
    }
  }

  const handleCancel = () => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      userProfileRequestDto: {
        country: user?.userProfileRespondDto.country || '',
        city: user?.userProfileRespondDto.city || '',
        phoneNumber: user?.userProfileRespondDto.phoneNumber || '',
        dateOfBirth: user?.userProfileRespondDto.dateOfBirth || '',
        aboutMe: user?.userProfileRespondDto.aboutMe || '',
      },
      photo: user?.userProfileRespondDto.photo || '',
    });
    
    navigate('/profile');
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit profile</h1>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.wrapper}>
            <div className={styles.photoContainer}>
              <div
                style={{ 
                  backgroundImage: `url(${typeof photo === 'string' ? photo : URL.createObjectURL(photo)})`
                }}
                className={styles.photo}
              >
              </div>
              
              <label htmlFor="photo" className={styles.photoButton}>
                Change photo
              </label>

              <input 
                className={styles.inputImageHidden}
                type="file" 
                id="photo"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  
                  if (file) {
                    setValue('photo', file);
                  }
                }}
              />
            </div>
          </div>
          
          <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
              <label htmlFor="firstName" className={styles.inputLabel}>First name:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="firstName"
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters long',
                    }
                  })}
                />
              </div>

              <span className={styles.error}>{errors.firstName?.message}</span>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="lastName" className={styles.inputLabel}>Last name:</label>
            
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="lastName"
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 1,
                      message: 'Last name must be at least 1 character long',
                    }
                  })}
                />
              </div>

              <span className={styles.error}>{errors.lastName?.message}</span>
            </div>
          </div>
                    
          <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
              <label htmlFor="email" className={styles.inputLabel}>Email address:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="email" 
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Invalid email format',  
                    }
                  })}
                />
              </div>

              <span className={styles.error}>{errors.email?.message}</span>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="phone" className={styles.inputLabel}>Phone number:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="number" 
                  id="phoneNumber"
                  {...register('userProfileRequestDto.phoneNumber', {
                    pattern: {
                      value: PHONE_REGEX,
                      message: 'Invalid phone format',
                    }
                  })}
                />
              </div>

              <span className={styles.error}>{errors.userProfileRequestDto?.phoneNumber?.message}</span>
            </div>
          </div>
          
          <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
              <label htmlFor="city" className={styles.inputLabel}>City:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="city"
                  {...register('userProfileRequestDto.city')}
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="country" className={styles.inputLabel}>Country:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="country"
                  {...register('userProfileRequestDto.country')}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
              <label htmlFor="about-me" className={styles.inputLabel}>About me:</label>

              <textarea 
                className={styles.textarea}
                id="aboutMe"
                {...register('userProfileRequestDto.aboutMe', {
                  maxLength: {
                    value: 300,
                    message: 'Text must not exceed 300 characters'
                  }
                })}
              />

              <span className={styles.textareaCharCounter}>
                ({(watch('userProfileRequestDto.aboutMe')?.length || 0)}/300)
              </span>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="dateOfBirth" className={styles.inputLabel}>Date of birth:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="dateOfBirth"
                  placeholder="YYYY-MM-DD"
                  {...register('userProfileRequestDto.dateOfBirth', {
                    pattern: {
                      value: DATE_REGEX,
                      message: 'Please use YYYY-MM-DD format',
                    },
                    validate: {
                      isDateInPast: value => isDateInPast(value) || 'Date must be in the past',
                    },
                    onChange:(e) => {
                      e.target.value = e.target.value.replace(/\./g, '-');
                    }
                  })}
                />
              </div>

              <span className={styles.error}>{errors.userProfileRequestDto?.dateOfBirth?.message}</span>
            </div>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.buttonContainer}>
              <button 
                className={styles.buttonCancel}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              
              <button className={styles.buttonSave}>Save</button>
            </div>
          </div>
        </form>

        {/* <DevTool control={control}/> */}
      </div>
    </div>
  )
};