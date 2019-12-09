import initialState from './initialState';
import {
  INIT_LOGIN, LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILURE,
  TEST_TOKEN_ATTEMPT, TEST_TOKEN_SUCCESS, TEST_TOKEN_FAILURE,
  REFRESH_TOKEN_ATTEMPT, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE,
  CHANGE_LANGUAGE,
} from '../constants/actionTypes';
import { ADMIN } from '../constants/userTypes';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authReducer(state = initialState.user, action) {

  console.log(state, action);

  switch (action.type) {
    case INIT_LOGIN:
      return {
        ...state,
        loginErrorMsg: '',
      };

    case LOGIN_ATTEMPT:
      return {
        ...state,
        ...initialState.user,
        language: state.language, 
        isLoggingIn: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.data.username,
        name: action.data.name,
        language: action.data.language,
        roles: action.data.roles,
        accessToken: action.data.access_token,
        refreshToken: action.data.refresh_token,
        isLoggingIn: false,
        loginErrorMsg: '',
        isAdmin: action.data.roles.includes(ADMIN),
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        ...initialState.user,
        language: state.language,
        isLoggingIn: false,
        loginErrorMsg: action.errorMsg,
      };

    case TEST_TOKEN_ATTEMPT:
      return {
        ...state,
        isTestingToken: true,
      };

    case TEST_TOKEN_SUCCESS:
      return {
        ...state,
        isTestingToken: false,
        isAdmin: action.data.isAdmin,
      };

    case TEST_TOKEN_FAILURE:
      return {
        ...state,
        isTestingToken: false,
      };

    case REFRESH_TOKEN_ATTEMPT:
      return {
        ...state,
        ...initialState.user,
        language: state.language,
        isRefreshingToken: true,
      };

    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        username: action.data.username,
        name: action.data.name,
        language: action.data.language,
        roles: action.data.roles,
        accessToken: action.data.access_token,
        refreshToken: action.data.refresh_token,
        isRefreshingToken: false,
        isAdmin: action.data.roles.includes(ADMIN),
      };

    case REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        ...initialState.user,
        language: state.language,
        isRefreshingToken: false,
      };

    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.data,
      };

    default:
      return state;
  }

}
