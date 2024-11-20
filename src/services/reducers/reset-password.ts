import { ActionType } from '../../shared/models/action.type';
import {
  RESET_PASSWORD_REJECTED,
  RESET_PASSWORD_REQUEST,
  RESETTING_PASSWORD
} from '../constants';

const initialState = {
  response: {},
  error: null,
  email: ''
};

export const resetPasswordReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case RESETTING_PASSWORD: {
      return {
        ...state,
        response: action.payload
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        error: null
      };
    }
    case RESET_PASSWORD_REJECTED: {
      return {
        ...state,
        error: action.payload?.error
      };
    }
    default: {
      return state;
    }
  }
};
