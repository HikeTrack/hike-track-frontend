import { Country } from "../types/Country";
import { PopularTour } from "../types/PopularTour";
import { Tour } from "../types/Tour";
import { TourDetails } from "../types/TourDetails";
import { BASE_URL } from "./constants";
import { getRandomTours } from "./getRandomTours";

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Failed to load data from ${url}`);
  });
}

export const getPopularTours = (): Promise<PopularTour[]> => {
  return getData<PopularTour[]>('/tours/popular');
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
  return getData<Tour[]>(`/tours/guide/${guideId}`);
}
