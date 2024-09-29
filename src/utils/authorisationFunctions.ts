export const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password: string) => {
  let errorMessage = '';

  switch(true) {
    case !/[A-Z]/.test(password):
      errorMessage = 'Password must contain at least one uppercase letter';
      break;

    case !/\d/.test(password):
      errorMessage = 'Password must contain at least one number';
      break;

    case !/[!@#$%^&*()_+\-=[\]{};:"'<>,.?/]/.test(password):
      errorMessage = 'Password must contain at least one special character';
      break;

    case password.length < 8:
      errorMessage = 'Password must be at least 8 characters long';
      break;

    default:
      return { isValid: true, message: '' };
  }

  return { isValid: false, message: errorMessage };
}