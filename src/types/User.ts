export type UserRoles = 'ROLE_ADMIN' | 'ROLE_GUIDE' | 'ROLE_USER';

export type User = {
  id: number;
  role: UserRoles[];
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
    photo: string | null;
  }
}