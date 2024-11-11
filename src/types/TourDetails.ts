import { Difficulty } from "../enums/Filters"

export type TourDetails = {
  id: number,
  name: string,
  length: number,
  date: string,
  countryId: number,
  price: number,
  difficulty: Difficulty,
  mainPhoto: string,
  details: {
    id: number,
    additionalPhotos: string,
    elevationGain: number,
    routeType: string,
    duration: number,
    map: string,
    activity: string,
  },
  // reviews: [
  //   {
  //     id: number,
  //     userProfileId: null,
  //     content: string,
  //     tourId: null,
  //     dateCreated: string,
  //   }
  // ],
  // currentReviewPage: number,
  // totalReviewPages: number,
  // totalReviewElements: number,
}