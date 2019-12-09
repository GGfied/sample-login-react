// Centralized propType definitions
import { shape, bool, string, arrayOf } from 'prop-types';

export const user = shape({
  username: string,
  name: string,
  language: string,
  roles: arrayOf(string),
  accessToken: string,
  refreshToken: string,
  isLoggingIn: bool,
  loginErrorMsg: string,
  isRefreshingToken: bool,
  isTestingToken: bool,
  isAdmin: bool,
});
