import { ActionType } from '../../shared/models/action.type';
import {
  REGISTRATION,
  REGISTRATION_REJECTED,
  REGISTRATION_REQUEST
} from '../actions/registration';

const initialState = {
  response: {},
  error: null
};

type RegistrationReducer = {
  payload: {
    error: unknown;
  };
};

export const registrationReducer = (
  state = initialState,
  action: ActionType & RegistrationReducer
) => {
  switch (action.type) {
    case REGISTRATION: {
      return {
        ...state,
        response: action.payload
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
        error: action.payload?.error
      };
    }
    default: {
      return state;
    }
  }
};
