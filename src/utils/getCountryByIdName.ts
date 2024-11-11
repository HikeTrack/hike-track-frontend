import { getCountries } from "./fetchData";

export const getCountryIdByName = async (name: string): Promise<number | null> => {
  try {
    const countries = await getCountries();
    const country = countries.find((country) => country.name === name);

    return country ? country.id : null;
  } catch (error) {
    console.error('Cannot fetch country by name', error);
    return null;
  }
};