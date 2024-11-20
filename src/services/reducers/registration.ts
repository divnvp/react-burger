import { ActionType } from '../../shared/models/action.type';
import {
  REGISTRATION,
  REGISTRATION_REJECTED,
  REGISTRATION_REQUEST
} from '../constants';

const initialState = {
  response: {},
  error: null
};

export const registrationReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case REGISTRATION: {
      return {
        ...state,
        response: action?.response
      };
    }
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        error: null
      };
    }
    case REGISTRATION_REJECTED: {
      return {
        ...state,
        error: action?.error
      };
    }
    default: {
      return state;
    }
  }
};
