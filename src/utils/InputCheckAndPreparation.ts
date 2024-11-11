import { DateTime } from 'luxon';

export const prepareInputString = (input: string) => {
  return input.trim();
}

export const prepareInputNumber = (input: number) => {
  if (!Number(input)) {
    return
  }
}

export const convertKilometresToMetres = (input: number) => {
  return input * 1000;
}

export const convertHoursToMinutes = (input: number) => {
  return input * 60;
}

export const prepareDateString = (input: string): { eventTime: string } => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [year, month, day] = input.split('.');
  const dateTime = DateTime.fromObject(
    { 
      year: parseInt(year), 
      month: parseInt(month), 
      day: parseInt(day),
      hour: 0,
      minute: 0
    },
    { zone: userTimeZone }
  );

  const eventTime = dateTime.toISO() + `[${userTimeZone}]`;

  return { eventTime };
}