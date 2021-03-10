import { 
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SENDING_REQUEST,
} from "utils/store_constants";

const initialState = {
  signedUp: false,
  error: null,
  isSigningUp: false,
};

export default (state=initialState, action) => {
  let newState = {...state};

  switch(action.type) {
    default:
      break;
    case SENDING_REQUEST:
      newState.isSigningUp = true;
      break;
    case SIGNUP_SUCCESS:
      newState.signedUp = true;
      newState.error = false;
      newState.isSigningUp = false;
      break;
    case SIGNUP_FAILURE:
      newState.signedUp = false;
      newState.error = action.error;
      newState.isSigningUp = false;
      break;
  }

  return newState;
};