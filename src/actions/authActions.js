import axios from 'axios';
import { push } from 'connected-react-router';
import {
  INIT_LOGIN, LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILURE,
  TEST_TOKEN_ATTEMPT, TEST_TOKEN_SUCCESS, TEST_TOKEN_FAILURE,
  REFRESH_TOKEN_ATTEMPT, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE,
} from '../constants/actionTypes';
import {
  BASE_URL, BASE_USER_URL
} from '../constants/config';
import { ADMIN } from '../constants/userTypes';

const OUATH_TOKEN_URL = BASE_URL + 'oauth/token';
const CREDENTAILS = btoa('testjwtclientid' + ':' + 'testjwtclientid');

const initLoginAction = dispatch => dispatch({
  type: INIT_LOGIN,
});

const loginAttempt = dispatch => dispatch({
  type: LOGIN_ATTEMPT,
});

const loginSuccess = (dispatch, data) => dispatch({
  type: LOGIN_SUCCESS,
  data,
});

const loginFailure = (dispatch, errorMsg) => dispatch({
  type: LOGIN_FAILURE,
  errorMsg,
});

const testTokenAttempt = dispatch => dispatch({
  type: TEST_TOKEN_ATTEMPT,
});

const testTokenSuccess = (dispatch, data) => dispatch({
  type: TEST_TOKEN_SUCCESS,
  data,
});

const testTokenFailure = (dispatch, errorMsg) => dispatch({
  type: TEST_TOKEN_FAILURE,
  errorMsg,
});

const refreshTokenAttempt = dispatch => dispatch({
  type: REFRESH_TOKEN_ATTEMPT
});

const refreshTokenSuccess = (dispatch, data) => dispatch({
  type: REFRESH_TOKEN_SUCCESS,
  data,
});

const refreshTokenFailure = (dispatch, errorMsg) => dispatch({
  type: REFRESH_TOKEN_FAILURE,
  errorMsg,
});

export const initLogin = () => dispatch => initLoginAction(dispatch);

export function login(username, password) {
  return dispatch => {
    loginAttempt(dispatch);

    const headers = {
      'Authorization': 'Basic ' + CREDENTAILS,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = new URLSearchParams();

    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    console.log(OUATH_TOKEN_URL);
    return axios
      .post(OUATH_TOKEN_URL, params, {
        headers,
      })
      .then(res => {
        loginSuccess(dispatch, res.data);
        res.data.roles.includes(ADMIN) ?
          dispatch(push('/admin')) :
          dispatch(push('/user'));
      })
      .catch(err =>
        loginFailure(dispatch, JSON.stringify(err.response.data))
      );
  };
}

const refreshToken = token => {
  return dispatch => {
    refreshTokenAttempt(dispatch);

    const headers = {
      'Authorization': 'Basic ' + CREDENTAILS,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = new URLSearchParams();

    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', token);

    return axios
      .post(OUATH_TOKEN_URL, params, {
        headers,
      })
      .then(res =>
        refreshTokenSuccess(dispatch, res)
      )
      .catch(err =>
        refreshTokenFailure(dispatch, JSON.stringify(err.response.data))
      );
  };
}

export { refreshToken };

export function testToken(isRequireAdmin, accessToken, refreshTokenData) {
  return dispatch => {
    testTokenAttempt(dispatch);

    const url = BASE_USER_URL + 'test-token';
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    };

    return axios
      .get(url, {
        headers,
      })
      .then(res => {
        testTokenSuccess(dispatch, res.data);
        
        if (isRequireAdmin && !res.data.isAdmin) {
          dispatch(push('/'));
        }
      })
      .catch(err => {
        refreshToken(refreshTokenData)(dispatch);
        testTokenFailure(dispatch, JSON.stringify(err.response.data));
      });
  };
}
