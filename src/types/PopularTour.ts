export type PopularTourDetails = {
  id: number;
  photo: string;
  elevationGain: number;
  routeType: string;
  duration: number;
  map: string;
  activity: string;
} | null;

export type PopularTour = {
  id: number;
  name: string;
  length: number;
  price: number;
  date: string;
  difficulty: string;
  countryId: number;
  mainPhoto: string;
  details: PopularTourDetails;
};