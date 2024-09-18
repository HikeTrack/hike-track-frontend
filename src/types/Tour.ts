export type Tour = {
  id: number,
  name: string,
  length: number,
  price: number,
  date: string,
  difficulty: 'Easy' | 'Medium' | 'Hard',
  countryId: number,
  details: null,
  mainPhoto: string,
}