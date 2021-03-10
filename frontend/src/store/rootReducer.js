import { combineReducers } from 'redux';
import authReducer from 'store/accounts/authReducer';
import signupReducer from 'store/accounts/signupReducer';

export default combineReducers({
  auth: authReducer,
  signup: signupReducer,
});
