import { Countries } from "../enums/Countries"; 

export const countryNames: { [key in Countries]: string } = {
  [Countries.Ukraine]: 'Ukraine',
  [Countries.Indonesia]: 'Indonesia',
  [Countries.India]: 'India',
  [Countries.Italy]: 'Italy',
  [Countries.Turkey]: 'Turkey',
  [Countries.Canada]: 'Canada',
  [Countries.Nepal]: 'Nepal',
  [Countries.China]: 'China',
};