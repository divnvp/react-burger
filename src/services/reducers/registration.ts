import {
  REGISTRATION,
  REGISTRATION_REJECTED,
  REGISTRATION_REQUEST
} from '../constants';
import { Response } from '../../shared/models/response.type';
import { TRegistrationActions } from '../actions/registration';

type TRegistrationState = {
  response?: Response;
  error: unknown;
};

export const initialStateOfRegistration: TRegistrationState = {
  error: null
};

export const registrationReducer = (
  state = initialStateOfRegistration,
  action: TRegistrationActions
): TRegistrationState => {
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
