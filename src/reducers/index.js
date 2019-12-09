import { combineReducers } from 'redux';
import auth from './authReducer';
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  user: auth,
});

export default rootReducer;
