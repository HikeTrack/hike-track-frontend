export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userProfileRespondDto: {
    id: number;
    country: string | null;
    city: string | null;
    phoneNumber: string | null;
    aboutMe: string | null;
    registrationDate: string;
    profilePhoto: string | null;
  }
}