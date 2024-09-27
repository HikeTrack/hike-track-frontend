export const formatDate = (fullDate: string): string => {
  const date = new Date(fullDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export const formatDistance = (metres: number): string => {
  const kilometres = metres / 1000;

  return `${parseFloat(kilometres.toFixed(1))} km`;
}