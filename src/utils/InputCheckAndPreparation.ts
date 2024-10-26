export const prepareInputString = (input: string) => {
  return input.trim();
}

export const prepareInputNumber = (input: number) => {
  if (!Number(input)) {
    return
  }
}

export const convertKilometres = (input: number) => {
  return input * 1000;
}