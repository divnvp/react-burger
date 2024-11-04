import { ActionType } from '../../shared/models/action.type';
import {
  FORGOT_PASSWORD_REJECTED,
  FORGOT_PASSWORD_REQUEST,
  SENDING_EMAIL
} from '../actions/forgot-password';

const initialState = {
  error: null,
  response: {},
  email: ''
};

export const forgotPasswordReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SENDING_EMAIL: {
      return {
        ...state,
        response: action.payload
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        error: null,
        email: action.payload
      };
    }
    case FORGOT_PASSWORD_REJECTED: {
      return {
        ...state,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
};
