import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DATE_REGEX } from "../../utils/constants";
import { getDefaultAvatarIcon } from "../../utils/getIcons";
import { isDateInPast } from "../../utils/InputCheckAndPreparation";
import styles from './GuideApplicationPage.module.scss';

type LocationState = {
  firstName?: string;
  lastName?: string;
  email?: string;
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
}

export const GuideApplicationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendGuideApplication, user } = useAuth();
  const { firstName, lastName, email } = location.state as LocationState || {};
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const defaultAvatar = getDefaultAvatarIcon();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      firstName: firstName || user?.firstName || '',
      lastName: lastName || user?.lastName || '',
      email: email || user?.email || '',
    }
  })

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName || '');
      setValue('lastName' ,user.lastName || '');
      setValue('email' ,user.email || '');
    }
  }, [user, setValue]);

  const onSumbit = async (data: FormValues) => {
    try {
      const isSuccess = await sendGuideApplication(data.email);

      if (isSuccess) {
        setError('');
      
        if (user) {
          navigate('/profile');
        } else {
          navigate('/login');
        }
      } else {
        setError('Failed to submit application. Please try again later');
      } 
    } catch (error) {
      setError('An unexpected error occured');
    } finally {
      setIsLoading(false);

      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });

      navigate('/profile');
    }
  }

  const handleCancel = () => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });

    navigate('/profile');
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Guide Application</h1>

        

        <form className={styles.form} onSubmit={handleSubmit(onSumbit)}>
          <div className={styles.wrapper}>
            <div className={styles.avatarContainer}>
              <img 
                src={defaultAvatar} 
                alt="Avatar" 
                className={styles.avatar}
              />

              <button className={styles.avatarButton}>Change photo</button>
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
                  {...register('firstName')}
                  readOnly
                />
              </div>
            </div>
          
            <div className={styles.inputContainer}>
              <label htmlFor="lastName" className={styles.inputLabel}>Last name:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="lastName"
                  {...register('lastName')}
                  readOnly
                />
              </div>
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
                  {...register('email')}
                  readOnly 
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="phone" className={styles.inputLabel}>Phone number:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="phone" 
                  id="phone"
                />
              </div>
              {error && <span id="phoneError" className={styles.errorMessage}>{error}</span>}
            </div>
          </div>
          
          <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
              <label htmlFor="dateOfBirth" className={styles.inputLabel}>Date of birth:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="dateOfBirth"
                  placeholder="YYYY-MM-DD"
                  // {...register('userProfileRequestDto.dateOfBirth', {
                  //   pattern: {
                  //     value: DATE_REGEX,
                  //     message: 'Please use YYYY-MM-DD format',
                  //   },
                  //   validate: {
                  //     isDateInPast: value => isDateInPast(value) || 'Date must be in the past',
                  //   },
                  //   onChange:(e) => {
                  //     e.target.value = e.target.value.replace(/\./g, '-');
                  //   }
                  // })}
                />
              </div>

              {/* <span className={styles.error}>{errors.userProfileRequestDto?.dateOfBirth?.message}</span> */}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="city" className={styles.inputLabel}>City of Residence:</label>
              
              <div className={styles.inputWrapper}>
                <input 
                  className={styles.input}
                  type="text" 
                  id="city"
                />
              </div>
              {error && <span id="cityError" className={styles.errorMessage}>{error}</span>}
            </div>
          </div>
          
          <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
              <label htmlFor="hiking-experience" className={styles.inputLabel}>Hiking experience:</label>
                
              <textarea 
                className={styles.textarea}
                id="hiking-experience"
              />

              {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="why-guiding" className={styles.inputLabel}>Why do you want to become a guide?</label>
              
              <textarea 
                className={styles.textarea}
                id="why-guiding"
              />
    
              {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
            </div>
          </div>
          
          <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
              <label htmlFor="about-me" className={styles.inputLabel}>About me:</label>
              
              <textarea 
                className={styles.textarea}
                id="about-me"
              />
          
              {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="specialisations" className={styles.inputLabel}>Specialisations (if any):</label>
              
              <textarea 
                className={styles.textarea}
                id="specialisations"
              />
    
              {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}

              <p className={styles.inputDescription}>
                (Select your specialisations: e.g., 
                mountain hiking, tourist routes, photography, etc.)
              </p>
            </div>
          </div>
          
          <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
              <label htmlFor="skills" className={styles.inputLabel}>Additional skills:</label>
              
              <textarea 
                className={styles.textarea}
                id="about-me"
              />

              {error && <span id="countryError" className={styles.errorMessage}>{error}</span>}

              <p className={styles.inputDescription}>
                (Describes any additional skills that may be useful: e.g., first aid knowledge,
                knowledge of plants and animals, etc.)
              </p>
            </div>

            <div className={styles.checkboxContainer}>
              <input className={styles.checkbox} type="checkbox"/>

              <label className={styles.inputLabel}>I agree to the terms and privacy policy</label>
            </div>
          </div>
          
          <div className={styles.buttonContainer}>
            <button className={styles.buttonSubmit}>Submit Application</button>
            
            <button 
              className={styles.buttonCancel} 
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};