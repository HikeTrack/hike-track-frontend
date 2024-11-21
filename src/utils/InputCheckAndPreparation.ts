import { isValid } from 'date-fns';
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

export const validateDateString = (input: string): boolean => {
  const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;

  if (dateRegex.test(input)) {
    return false;
  }

  const [year, month, day] = input.split('.').map(Number);

  const isValidDate = !isNaN(year) 
    && !isNaN(month) 
    && !isNaN(day)
    && month >= 1 && month <= 12
    && day >= 1 && day <= new Date(year, month, 0). getDate();

  return isValidDate;
}

export const prepareDateString = (input: string): string => {
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

  return dateTime.toISO() + `[${userTimeZone}]`;
}