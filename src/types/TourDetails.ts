import { Difficulty } from "../enums/Filters"

export type TourDetails = {
  id: number,
  name: string,
  length: number,
  price: number,
  date: string,
  difficulty: Difficulty,
  countryId: number,
  details: {
    id: number,
    additionalPhotos: string,
    elevationGain: number,
    routeType: string,
    duration: number,
    map: string,
    activity: number,
  },
  reviews: [
    {
      id: number,
      userProfileId: null,
      content: string,
      tourId: null,
      dateCreated: string,
    }
  ],
  currentReviewPage: number,
  totalReviewPages: number,
  totalReviewElements: number,
  mainPhoto: string,
}