import { Country } from "../types/Country";
import { TourCard } from "../types/TourCard";
import { Tour } from "../types/Tour";
import { TourDetails } from "../types/TourDetails";
import { UserProfilePuplic } from "../types/UserProfilePublic";
import { BASE_URL } from "./constants";
import { getRandomTours } from "./getRandomTours";
import { Photo } from "../types/Photo";

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Failed to load data from ${url}`);
  });
}

export const getPopularTours = (): Promise<TourCard[]> => {
  return getData<TourCard[]>('/tours/popular');
};

export const getCountries = (): Promise<Country[]> => {
  return getData<Country[]>('/countries');
};

export const getRandom10Countries = (): Promise<Country[]> => {
  return getData<Country[]>('/countries/random_ten');
}

export const getTours = (): Promise<Tour[]> => {
  return getData<Tour[]>('/tours');
};

export const getToursByCountry = async (countryName: string) => {
  return getData<Tour[]>(`/tours/search?country=${countryName}`);
};

export const getTourById = async (tourId: number) => {
  return getData<TourDetails>(`/tours/${tourId}`);
}

export const getRandomToursByCountry = async (countryName: string) => {
  const tours = await getToursByCountry(countryName);

  return getRandomTours(tours);
}

export const getToursByGuideId = async (guideId: number) => {
  return getData<TourCard[]>(`/tours/guide/${guideId}`);
}

export const getUserProfile = async (userId: number) => {
  return getData<UserProfilePuplic>(`/users/${userId}`);
}

export const getTourBackgroundPhoto = async (photoId: number) => {
  return getData<Photo>(`/tour_details/photo/${photoId}`);
}