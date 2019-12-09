import { CHANGE_LANGUAGE } from '../constants/actionTypes';

export const changeLanguage = language => dispatch => {
  return dispatch({
  type: CHANGE_LANGUAGE,
  data: language,
});
}