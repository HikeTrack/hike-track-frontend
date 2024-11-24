import { AxiosError } from "axios";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { validateEmail, validatePassword } from "../utils/authorisationFunctions";
import { axiosReg, axiosToken } from "../utils/axios";
import { ACCESS_TOKEN, INACTIVITY_LIMIT } from "../utils/constants";
import { useLocalStorage } from "../utils/useLocalStorage";
 
type Props = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string;
  registerUser: (firstName: string, lastName: string, email: string, password: string, repeatPassword: string) => Promise<boolean>;
  confirmEmail: (token: string) => Promise<boolean>;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  setUser: (user: User | null) => void;
  sendEmailForNewPassword: (email: string) => Promise<boolean>;
  resetPassword: (password: string, repeatPassword: string, token: string) => Promise<boolean>;
  sendGuideApplication: (email: string) => Promise<boolean>;
  removeTour: (tourId: number, userId: number) => Promise<boolean>;
  deleteUserAccount: (userId: number) => Promise<boolean>;
  // updateUserProfile: (
  //   email: string,
  //   firstName: string,
  //   lastName: string,
  //   userProfileRespondDto: {
  //     country: string | null;
  //     city: string | null;
  //     phoneNumber: string | null;
  //     dateOfBirth: string;
  //     aboutMe: string | null;
  //   }
  // ) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: false,
  error: '',
  registerUser: async () => false,
  confirmEmail: async () => false,
  loginUser: async () => false,
  logoutUser: () => {},
  setUser: () => {},
  sendEmailForNewPassword: async () => false,
  resetPassword: async () => false,
  sendGuideApplication: async () => false,
  // updateUserProfile: async () => false,
  removeTour: async () => false,
  deleteUserAccount: async () => false,
});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [token, setToken] = useLocalStorage<string | null>('token', null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = useCallback(async (
    firstName: string,
    lastName: string, 
    email: string,
    password: string,
    repeatPassword: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError('');

    if (firstName.trim() && lastName.trim() && validateEmail(email)) {
      const passwordValidation = validatePassword(password);

      if (!passwordValidation.isValid) {
        setError(passwordValidation.message);
        setIsLoading(false);
        return false;
      }

      if (password !== repeatPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return false;
      }
      
      const payload = { firstName, lastName, email, password, repeatPassword };

      try {
        const response = await axiosReg.post(`/auth/registration`, payload);
      
        if (response.status === 200) {
          setError('');
          return true;
        } else {
          setError('Some error occurred');
          return false;
        } 
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.status === 409) {
          setError('This email is already registered. Please use a different email.');
        } else {
          setError('Registration failed. Please try again');
        }

        return false;
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please fill in all fields correctly');
      setIsLoading(false);
      return false;
    }
  }, [setError, setIsLoading]);

  const confirmEmail = useCallback(async (token: string): Promise<boolean> => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axiosReg.post(`/auth/confirmation?token=${token}`, {});

      if (response.status === 200) {
        return true;
      } else {
        setError('Failed to confirm email');
        return false;
      }
    } catch (error) {
      setError('Failed to confirm email');

      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setError, setIsLoading]);

  const loginUser = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError('');

    const payload = { email, password };

    try {
      const response = await axiosReg.post(`/auth/login`, payload);

      console.log('Login response:', response);

      if (response.status === 200) {
        const token = response.data.token;

        localStorage.setItem(ACCESS_TOKEN, token);

        console.log('Token saved:', token);

        setToken(token);

        const userResponse = await axiosToken.get(`/users/me`);

        if (userResponse.status === 200) {
          const { 
            id, 
            role,
            email,
            firstName, 
            lastName, 
            userProfileRespondDto,

          } = userResponse.data;

          setUser({
            id,
            role,
            email,
            firstName,
            lastName,
            userProfileRespondDto
          });
          return true;
        } else {
          setError('Failed to fetch user profile');
          return false;
        }
      } else {
        setError('Invalid login credentials. Please try again');
        return false;
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 401) {
        setError('Incorrect email or password.');
      } else {
        setError('Login failed. Please try again');
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setToken, setUser, setError, setIsLoading]);

  const refreshTokenSilently = useCallback(async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    console.log(token)

    if (token) {
      try {
        const response = await axiosToken.post('/tokens/refresh', {});

        console.log('API Response:', response);

        if (response.status === 200) {
          const newToken = response.data.token;

          localStorage.setItem(ACCESS_TOKEN, newToken);
          setToken(newToken);
        } else {
          console.log('Failed to refresh token');
        }
      } catch (error) {
        const axiosError = error as AxiosError;
  
        if (axiosError.response && axiosError.response.status === 401) {
          setError('Something went wrong. Try again later');
        }
  
        return false;
      } finally {
        setIsLoading(false);
      }
    }
  }, [setToken, setIsLoading, setError]);

  let inactivityTimer: NodeJS.Timeout;

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {
      logoutUser();
    }, INACTIVITY_LIMIT)
  };

  useEffect(() => {
    refreshTokenSilently();

    const interval = setInterval(() => {
      refreshTokenSilently();
    }, 780000);

    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    resetInactivityTimer();

    return () => {
      clearInterval(interval);
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
    };
  }, [refreshTokenSilently]);

  const logoutUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token) {
        setError('No token found');
        return;
      }

      const response = await axiosToken.post('/users/logout', {});

      if (response.status === 200) {
        setUser(null);
        setToken(null);
        localStorage.removeItem(ACCESS_TOKEN);
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Failed to log out. Pllease try again.')
    } finally {
      setIsLoading(false);
    }
  }, [setToken, setUser, setError]);

  const sendEmailForNewPassword = useCallback(async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError('');

    const payload = { email };

    try {
      const response = await axiosReg.post('/auth/forgot-password', payload);
      
      if (response.status === 200) {
        console.log('Success: email has been sent');
        setIsLoading(false);
        return true;
      } else {
        setError('Failed to send recovery email');
        return false;
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        setError('This email is not registered');
      } else {
        setError('An error occurred while attempting password recovery')
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (
    password: string,
    repeatPassword: string,
    token: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    setError('');

    const passwordValidation = validatePassword(password);

    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      setIsLoading(false);
      return false;
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return false;
    }
      
    const payload = { password, repeatPassword };

    try {
      const response = await axiosReg.post(`/auth/reset-password?token=${token}`, payload);
      
      if (response.status === 200) {
        return true;
      } else {
        setError('Some error occurred');
        return false;
      } 
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 401) {
        setError('Something went wrong. Try again later');
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setError, setIsLoading]);

  // const updateUserProfile = useCallback(async (
  //   email: string,
  //   firstName: string,
  //   lastName: string,
  //   userProfileRespondDto: {
  //     country: string | null,
  //     city: string | null,
  //     phoneNumber: string | null,
  //     dateOfBirth: string;
  //     aboutMe: string | null,
  //     profilePhoto: string | null,
  //   }
  // ): Promise<boolean> => {
  //   setIsLoading(true);
  //   setError('');

  //   const payload = {
  //     email,
  //     firstName,
  //     lastName,
  //     ...userProfileRespondDto
  //   };

  //   console.log(payload);

  //   try {
  //     const response = await axiosToken.patch(`/users/${user?.id}`);

  //     if (response.status === 200) {
  //       setUser(prevUser => {

  //         if (!prevUser) {
  //           return null;
  //         }

  //         return {
  //           ...prevUser,
  //           email,
  //           firstName,
  //           lastName,
  //           userProfileRespondDto: {
  //             ...prevUser.userProfileRespondDto,
  //             country: userProfileRespondDto.country,
  //             city: userProfileRespondDto.city,
  //             phoneNumber: userProfileRespondDto.phoneNumber,
  //             aboutMe: userProfileRespondDto.aboutMe,
  //             userPhoto: userProfileRespondDto.profilePhoto
  //         }
  //       };
  //     });
  //       return true;
  //     } else {
  //       setError('Failed to update profile');
  //       return false;
  //     }
  //   } catch {
  //     setError('Something went wrong, please try again');
  //     return false;
  //   }
  // }, [setUser, setError, setIsLoading, user, token ]);

  const sendGuideApplication = useCallback(async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError('');

    const payload = { email };

    try {
      const response = await axiosReg.post(`/users/request`, payload);

      if (response.status === 200) {
        setError('');
        return true;
      } 
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 409) {
        setError('This email is already registered. Please use a different email.');
      } else {
        setError('Registration failed. Please try again');
      }

      return false;
    } finally {
      setIsLoading(false);
    }
 
    return false;
  }, [setIsLoading, setError]);

  const removeTour = useCallback(async (tourId: number, userId: number): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await axiosToken.delete(`/tours/${tourId}/${userId}`);

      if (response.status === 200) {
        return true;
      } else {
        setError('Failed to delete the tour');
        return false;
      }
    } catch (error) {
      console.error('Failed to delete the tour:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setError, setIsLoading]);

  const deleteUserAccount = useCallback(async (userId: number): Promise<boolean> => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axiosToken.delete(`/users/${userId}`);

      if (response.status === 200) {
        setUser(null);
        return true;
      } else {
        setError('Failed to delete your account');
        return false;
      }
    } catch (error) {
      console.error('Failed to delete account:', error);
      setError('An unexpected error occured while deleting your account');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setError, setIsLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        registerUser,
        confirmEmail,
        loginUser,
        logoutUser,
        setUser,
        sendEmailForNewPassword,
        resetPassword,
        sendGuideApplication,
        // updateUserProfile,
        removeTour,
        deleteUserAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;