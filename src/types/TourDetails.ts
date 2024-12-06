import { Difficulty } from "../enums/Filters"

export type TourDetails = {
  id: number,
  name: string,
  length: number,
  price: number,
  date: string,
  difficulty: Difficulty,
  countryId: number,
  mainPhoto: string,
  details: {
    id: number,
    additionalPhotos: number[],
    elevationGain: number,
    routeType: string,
    duration: number,
    map: string,
    activity: string,
    description: string,
  }
  reviews: string[],
  currentReviewPage: number,
  totalReviewPages: number,
  totalReviewElements: number,
  guideId: number,
  averageRating: number,
  totalAmountOfMarks: number,
}