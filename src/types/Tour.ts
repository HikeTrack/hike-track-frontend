export type Details = {
  id: number,
  additionalPhotos: string,
  elevationGain: string,
  routeType: string,
  duration: number,
  map: string,
  activity: 'Hiking' | 'Biking' | 'Climbing',
} | null;

export type Tour = {
  id: number,
  name: string,
  length: number,
  price: number,
  date: string,
  difficulty: 'Easy' | 'Medium' | 'Hard',
  countryId: number,
  details: Details,
  mainPhoto: string,
}