import axios, { AxiosError } from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";
import { validateEmail, validatePassword } from "../utils/authorisationFunctions";
import { ACCESS_TOKEN, BASE_URL } from "../utils/constants";
import { useLocalStorage } from "../utils/useLocalStorage";

type Props = {
  children: React.ReactNode;
};

export type User = {
  userId: number;
  firstName: string;
  lastName: string;
  userPhoto: string | null;
  // country: string | null;
  city: string | null;
  registrationDate: string;
}

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string;
  registerUser: (firstName: string, lastName: string, email: string, password: string, repeatPassword: string) => Promise<boolean>;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  setUser: (user: User | null) => void;
  recoverPassword: (email: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: false,
  error: '',
  registerUser: async () => false,
  loginUser: async () => false,
  logoutUser: () => {},
  setUser: () => {},
  recoverPassword: async () => false,
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
        const response = await axios.post(`${BASE_URL}/auth/registration`, payload);
      
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

  const loginUser = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError('');

    const payload = { email, password };

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, payload);

      console.log('Profile response data:', response.data);

      if (response.status === 200) {
        const token = response.data.Token;
        localStorage.setItem(ACCESS_TOKEN, token);

        console.log('Stored token:', localStorage.getItem(ACCESS_TOKEN));

        setToken(token);

        // console.log(token);

        console.log('Using token for profile request:', token);

        console.log('Fetching profile...');

        const profileResponse = await axios.get(`${BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Profile response data:', profileResponse);

        if (profileResponse.status === 200) {
          const { userId, city, userPhoto, registrationDate } = profileResponse.data;

          console.log(profileResponse.data);
         
          const userResponse = await axios.get(`${BASE_URL}/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (userResponse.status === 200) {
            const { firstName, lastName } = userResponse.data;

            setUser({
              userId,
              firstName,
              lastName,
              city,
              userPhoto,
              registrationDate,
            });

            return true;
          } else {
            setError('Failed to fetch user details');
            return false;
          }
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

      console.error('Error details:', axiosError.response?.data); 

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

  const logoutUser = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(ACCESS_TOKEN);
  }, [setToken, setUser]);

  const recoverPassword = useCallback(async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError('');

    const payload = { email };

    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, payload);
      
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

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        registerUser,
        loginUser,
        logoutUser,
        setUser,
        recoverPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;