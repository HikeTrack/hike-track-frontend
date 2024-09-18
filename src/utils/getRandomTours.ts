import { Tour } from "../types/Tour";

export const getRandomTours = (tours: Tour[]) => {
  const randomTours = tours.slice();

  for (let i = randomTours.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [randomTours[i], randomTours[j]] = [randomTours[j], randomTours[i]];
  }

  return randomTours;
};
