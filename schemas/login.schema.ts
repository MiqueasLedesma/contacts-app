export interface LoginValues {
  user: string;
  password: string;
}

export interface LoginErrors {
  user: string[];
  password: string[];
}

export const LoginValidate = (values: LoginValues): LoginErrors => {
  const errors: LoginErrors = { user: [], password: [] };
  const userRegex = /^(?=.*[A-Z])(?=.*\d)(?=\S+$)[A-Za-z\d]{8,}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])\S{8,}$/;
  const { user, password } = values;

  if (!userRegex.test(user)) {
    errors.user.push(
      "user name must have 8 digit and at least 1 uppercase and 1 number"
    );
  }

  if (!passwordRegex.test(password)) {
    errors.password.push(
      "Password must have 8 digits, 1 simbol and at least 1 uppercase and number"
    );
  }
  return errors;
};
