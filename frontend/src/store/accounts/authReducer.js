import { 
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  SENDING_REQUEST,
} from "utils/store_constants";

const initial_state = {
  user: null,
  error: null,
  isAuthenticating: false,
};

export default (state = initial_state, action) => {
  let new_state = {...state};

  switch(action.type) {
    default:
      break;
    case SENDING_REQUEST:
      new_state.isAuthenticating = action.isAuthenticating;
      break;
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      new_state.error = null;
      new_state.isAuthenticating = false;
      new_state.user = action.user;
      break;
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      new_state.error = action.error;
      new_state.isAuthenticating = false;
      new_state.user = null;
      break;
  }

  return new_state;
}