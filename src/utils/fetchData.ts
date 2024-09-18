import { Country } from "../types/Country";
import { PopularTour } from "../types/PopularTour";
import { Tour } from "../types/Tour";

export const BASE_URL = 'http://localhost:8081';

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

export const getTours = (): Promise<Tour[]> => {
  return getData<Tour[]>('/tours');
};

export const getToursByCountry = async (countryId: number) => {
  return getTours().then(tours => 
    tours.filter(tour => tour.countryId === countryId),
  );
};

// export const getSuggestedTours = () => {
//   return getToursByCountry(countryId).then(tours => )
// }